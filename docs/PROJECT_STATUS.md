# LocalClaw MX — Project Status

Single source of truth for what's built, what's live, and what's next.

## Live URLs (Azure SWA)

| | URL |
|---|---|
| Admin Dashboard | `https://kind-pebble-0c8247f0f.4.azurestaticapps.net/admin` |
| Lead Site Preview | `https://kind-pebble-0c8247f0f.4.azurestaticapps.net/sites/view?slug=[slug]` |
| API Base | `https://kind-pebble-0c8247f0f.4.azurestaticapps.net/api/` |

---

## Phase 1: Automation MVP — COMPLETE

### What's Built

| Feature | File(s) | Notes |
|---|---|---|
| **Apify Scraper** | `apps/api/src/services/apifyScraper.ts` | Google Maps via `compass/crawler-google-places`. |
| **Lead Deduplication** | same | Dedupes by name + address before DB insert. |
| **Azure SQL DB** | `apps/api/src/services/sqlDb.ts` | Singleton pool, UPSERT, auto-creates `Sites` table. |
| **Find Leads API** | `apps/api/src/functions/findLeads.ts` | `POST /api/findLeads` — scrape → dedup → save. |
| **Generate Site API** | `apps/api/src/functions/generateSite.ts` | `POST /api/generateSite` — OpenRouter + DeepSeek V3 → SQL. |
| **Get Sites API** | `apps/api/src/functions/getSites.ts` | `GET /api/getSites` and `GET /api/getSites?slug=...`. |
| **AI Chatbot API** | `apps/api/src/functions/chat.ts` | `POST /api/chat` — business-context chatbot. Auth: `anonymous` (visitor-facing). |
| **Admin Dashboard** | `apps/web/app/admin/` | Scraper form (niche+city or URL) + leads table + GENERAR button. |
| **Site Templates** | `apps/web/components/templates/` | Spanish, dynamic colors. |
| **AI Chatbot Widget** | `apps/web/components/templates/AIChatbot.tsx` | Floating bubble on all templates. |
| **Static Router** | `apps/web/app/sites/view/page.tsx` | Client-side fetch via `?slug=`. |

### Data Flow

```
Admin at /admin
  → POST /api/findLeads      Apify scrapes Google Maps → saves leads (status: 'nuevo') to SQL
  → POST /api/generateSite   DeepSeek V3 generates brand config → updates site (status: 'listo') in SQL
  → GET  /sites/view?slug=.. Client fetch from SQL → renders template
  → POST /api/chat           Visitor chatbot with business context
```

### Lead Status Lifecycle

```
nuevo → generando → listo → contactado → vendido
```

### AI Model

- **Model**: `deepseek/deepseek-chat` (DeepSeek V3) — Budget champion with high intelligence.
- **Provider**: OpenRouter
- **Output**: Structured JSON (colors, copy, template selection, brand personality, tone of voice)

### Database Schema

Azure SQL — single `Sites` table:
```sql
slug          NVARCHAR(255) PRIMARY KEY
businessName  NVARCHAR(500)
status        NVARCHAR(50)
configJson    NVARCHAR(MAX)   -- full SiteConfig JSON blob
lastUpdated   DATETIME2
```

### Infrastructure

| Service | Detail | Cost |
|---|---|---|
| Azure Static Web App | Hosts Next.js (Static Export) + Functions | Free |
| Azure SQL (Serverless) | `eduardo` database on shared server | ~$0 idle |
| Azure Functions (via SWA) | Node 18, consumption plan | Free |
| Apify | `compass/crawler-google-places` actor | Pay-per-run |
| OpenRouter | DeepSeek V3 | Pay-per-token |

---

## Phase 2: Sales Excellence — PLANNING

Key items:
- Email outreach via Resend (send preview links to leads)
- Manual text override before sending
- Telegram Bot (`/buscar`, `/construir` commands)

---

*Last updated: 2026-02-16*
