# LocalClaw MX — Dev & Deployment Guide

## Repository Structure

```
Resell/
├── apps/
│   ├── api/   Azure Functions v4 (Node 18/TypeScript) — backend + scraper + AI
│   └── web/   Next.js 15 (App Router, SSR) — admin dashboard + site templates
└── packages/  (reserved)
```

---

## Running Locally

### Prerequisites
- Node 18+
- Azure Functions Core Tools v4 (`npm i -g azure-functions-core-tools@4`)
- An Apify account with `APIFY_API_KEY`
- An OpenRouter account with `OPENROUTER_API_KEY`
- An Azure SQL database

### 1. API — `apps/api/local.settings.json`

Create this file (it is gitignored):

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "OPENROUTER_API_KEY": "sk-or-xxxxxxxx",
    "APIFY_API_KEY": "apify_api_xxxxxxxx",
    "SQL_USER": "your-sql-user",
    "SQL_PASSWORD": "your-sql-password",
    "SQL_SERVER": "your-server.database.windows.net",
    "SQL_DATABASE": "your-database-name"
  }
}
```

### 2. Web — `apps/web/.env.local`

```
# Points to the local Azure Functions emulator
NEXT_PUBLIC_API_URL=http://localhost:7071/api
```

> In production (Azure SWA) this is `/api` — the SWA proxy handles routing automatically.

### 3. Start both services

```bash
# Terminal 1 — API (compiles TypeScript then starts Functions emulator)
cd apps/api && npm start

# Terminal 2 — Web
cd apps/web && npm run dev
```

Open `http://localhost:3000/admin`.

### 4. Test the flow

1. Enter a niche (e.g. `Plomeros`) + city (e.g. `León`) → **Iniciar Scraping**
   - Or paste a full Google Maps URL for a single business
2. Leads appear with status **NUEVO**
3. Click **GENERAR** on any lead → AI generates the site (status → **LISTO**)
4. Click the slug link → preview the generated site + test the chatbot

---

## Deploying to Azure SWA

### First-time setup

1. Push code to GitHub (`main` branch).
2. In Azure Portal → Create **Static Web App**:
   - **Source**: GitHub
   - **App location**: `/apps/web`
   - **Api location**: `/apps/api`
   - **Output location**: `.next`
   - **Runtime**: Node 18
3. Add environment variables in SWA → **Configuration**:

| Key | Value |
|---|---|
| `OPENROUTER_API_KEY` | `sk-or-...` |
| `APIFY_API_KEY` | `apify_api_...` |
| `SQL_USER` | your SQL user |
| `SQL_PASSWORD` | your SQL password |
| `SQL_SERVER` | `your-server.database.windows.net` |
| `SQL_DATABASE` | your database name |

4. `NEXT_PUBLIC_API_URL` does **not** need to be set in Azure — it defaults to `/api` which SWA proxies automatically.

### Re-deploys

Every push to `main` triggers a rebuild via GitHub Actions (auto-configured by SWA on first setup).

### ⚠️ Auth Level Warning

`findLeads`, `generateSite`, and `getSites` use `authLevel: 'function'`. In Azure SWA, browser-side fetch calls to `/api/*` do **not** automatically include a function key. If the admin dashboard returns 401 in production, change those three functions to `authLevel: 'anonymous'` and protect the `/admin` route using SWA's built-in authentication instead.

---

## API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/getSites` | function | All sites, ordered by last updated |
| `GET` | `/api/getSites?slug=<slug>` | function | Single site by slug |
| `POST` | `/api/findLeads` | function | Scrape → dedup → save leads |
| `POST` | `/api/generateSite` | function | AI generate site config → save |
| `POST` | `/api/chat` | anonymous | Visitor chatbot for a site |

### `POST /api/findLeads` body

```json
{ "niche": "Plomeros", "location": "León" }
// OR
{ "url": "https://maps.google.com/..." }
```

### `POST /api/generateSite` body

```json
{
  "businessName": "Plomería García",
  "category": "Plomería",
  "description": "Expertos en fugas e instalaciones",
  "phone": "555-9876",
  "address": "León, Guanajuato"
}
```

### `POST /api/chat` body

```json
{
  "message": "¿Cuáles son sus horarios?",
  "siteConfig": { ...full SiteConfig object... }
}
```
