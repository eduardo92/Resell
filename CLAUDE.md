# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**LocalClaw MX** — a monorepo for automatically finding Mexican business leads, generating AI-powered websites for them, and selling those sites via an admin dashboard. The target market is Mexican entrepreneurs/agencies.

## Repository Structure

```
Resell/
├── apps/
│   ├── api/        # Azure Functions v4 backend (Node.js/TypeScript)
│   └── web/        # Next.js 16 frontend (App Router)
└── packages/       # Shared packages (reserved, currently empty)
```

## Commands

### Web App (`apps/web/`)
```bash
npm run dev     # Dev server at http://localhost:3000
npm run build   # Production build
npm run lint    # ESLint
```

### API App (`apps/api/`)
```bash
npm run watch   # TypeScript watch mode (for development)
npm start       # Start Azure Functions emulator locally (runs build first)
npm run build   # Compile TypeScript → dist/
```

No tests exist yet (`npm test` prints a placeholder message).

## Architecture

### Data Flow
```
Admin Dashboard (/admin)
  → POST /api/findLeads      # Scrape Google Maps via Apify, save leads to Azure SQL
  → POST /api/generateSite   # AI generates site config (Claude 3.5 via OpenRouter)
  → GET  /sites/[slug]       # SSR renders template based on SiteConfig.templateId
                             # + AI chatbot widget talks to POST /api/chat
```

### Core Data Model: `SiteConfig`

Defined in `apps/web/lib/sites.ts`. The full config is stored as JSON in Azure SQL (`configJson` column). Key fields:
- `slug` — primary key, URL-safe identifier
- `templateId` — `'restaurant-v1' | 'plumber-v1' | 'generic-v1'`
- `status` — lifecycle: `'nuevo' → 'generando' → 'listo' → 'contactado' → 'vendido'`
- `colors`, `visuals`, `content` — AI-generated brand configuration

### API Functions (`apps/api/src/functions/`)
| File | Endpoint | Auth |
|---|---|---|
| `getSites.ts` | GET `/api/getSites` | function |
| `findLeads.ts` | POST `/api/findLeads` | function |
| `generateSite.ts` | POST `/api/generateSite` | function |
| `chat.ts` | POST `/api/chat` | anonymous |

### Database (`apps/api/src/services/sqlDb.ts`)
- Azure SQL Database via `mssql`
- **Singleton pattern** with lazy connection pool initialization
- Single `Sites` table — slug (PK), businessName, status, configJson (NVARCHAR MAX), lastUpdated
- `initDatabase()` auto-creates the table if missing on first connect

### Template System (`apps/web/components/templates/`)
`/sites/[slug]` fetches SiteConfig from the API and renders the matching template:
- `RestaurantTemplate` — food/dining businesses
- `PlumberTemplate` — service providers (plumbing, repairs, etc.)
- `GenericTemplate` — fallback for any other niche
- `AIChatbot` — floating widget on all templates; calls `/api/chat` with business context

All templates are in Spanish, use dynamic colors from `SiteConfig`, and support `fontStyle`/`theme` variants.

### AI Integration
- **Model:** `anthropic/claude-3.5-sonnet:beta` via **OpenRouter API** (not direct Anthropic API)
- `generateSite.ts` uses structured JSON output to produce brand config in Spanish
- `chat.ts` builds a system prompt from the site's SiteConfig to answer visitor questions

### Frontend Routing
- `middleware.ts` handles route protection; custom-domain multi-tenant logic is prepared but not yet active
- `apps/web/lib/sites.ts` includes a mock `SITES_DB` with 3 demo sites used as fallback when the API is unavailable

## Environment Variables

**`apps/api/local.settings.json`** (local dev, not committed):
```
OPENROUTER_API_KEY
APIFY_API_KEY
SQL_USER / SQL_PASSWORD / SQL_SERVER / SQL_DATABASE
```

**`apps/web/.env.local`**:
```
NEXT_PUBLIC_API_URL="/api"
```

## Key Constraints & Patterns
- The API strict TypeScript is **disabled** (`"strict": false` in `apps/api/tsconfig.json`); the web app has strict mode enabled.
- All user-facing copy is in **Spanish** (Mexico).
- Lead deduplication is done in `apifyScraper.ts` by matching name + address before inserting to DB.
- The `cosmosDb.ts` service is deprecated — Azure SQL (`sqlDb.ts`) is the active database layer.
