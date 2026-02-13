# Implementation Plan: AI Generation & Persistence

We are moving LocalClaw MX from mock data to a live, automated system.

## Proposed Changes

### [Backend] API & Services

#### [NEW] [cosmosDb.ts](file:///Users/eduardocollado/Projects/vibecoding/Resell/apps/api/src/services/cosmosDb.ts)
*   Singleton service to connect to Azure Cosmos DB.
*   Handles CRUD for `SiteConfig`.

#### [NEW] [generateSite.ts](file:///Users/eduardocollado/Projects/vibecoding/Resell/apps/api/src/functions/generateSite.ts)
*   Azure Function triggered by the "GENERAR" button.
*   Calls OpenAI with business data (name, category, description).
*   Returns a full `SiteConfig` JSON.
*   Saves the JSON to Cosmos DB.

### [Frontend] Web App

#### [MODIFY] [sites.ts](file:///Users/eduardocollado/Projects/vibecoding/Resell/apps/web/lib/sites.ts)
*   Update `getSiteData` and `getAllSites` to fetch from the API (`/api/sites`) instead of a local object.

#### [MODIFY] [AdminClient.tsx](file:///Users/eduardocollado/Projects/vibecoding/Resell/apps/web/app/admin/AdminClient.tsx)
*   Implement the `handleGenerate` function to call `/api/generateSite`.

## Infrastructure & URLs
*   **Database**: Azure Cosmos DB (Free Tier).
*   **Storage**: Images will initially use placeholders or searchable URLs (Google Maps).
*   **URLs**:
    *   `https://localclaw-mx.azurestaticapps.net/`
    *   `https://localclaw-mx.azurestaticapps.net/admin`
