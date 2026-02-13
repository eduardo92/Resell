# Azure Resource Plan (LocalClaw MX)

To keep costs at **$0 (Free Tier)**, we will use the following resources:

### 1. Azure Static Web App (Free Plan)
*   **Purpose**: Hosts the Next.js Frontend and Managed Azure Functions.
*   **Cost**: $0.00
*   **URL**: `https://localclaw-mx.azurestaticapps.net`

### 2. Azure Cosmos DB (Free Tier)
*   **Purpose**: Stores lead data and site configurations.
*   **Tier**: Serverless / Free Tier (1,000 RU/s, 25GB Storage).
*   **Cost**: $0.00 (Must enable "Free Tier" during creation).

### 3. Azure Functions (Monitored by SWA)
*   **Purpose**: API endpoints for Scraping, Generation, and Contact forms.
*   **Cost**: $0.00 (Consumption plan has 1 million free calls/month).

---

## Environment Variables Needed (Local & Azure)

| Key | Value | Source |
| :--- | :--- | :--- |
| `APIFY_API_KEY` | `your_apify_key` | [Apify Console](https://console.apify.com/) |
| `OPENAI_API_KEY` | `sk-...` | [OpenAI Dashboard](https://platform.openai.com/) |
| `COSMOS_ENDPOINT` | `https://localclaw-db...` | Azure Portal |
| `COSMOS_KEY` | `key...` | Azure Portal |
| `NEXT_PUBLIC_API_URL` | `/api` | Standard |

---

## Deployment Steps
1.  **GitHub Push**: `git push origin master`
2.  **Azure Portal**: 
    *   Create "Static Web App".
    *   Connect to GitHub Repo.
    *   Build Presets: `Next.js`.
    *   App location: `/apps/web`
    *   Api location: `/apps/api`
3.  **Config**: Add the environment variables in the "Configuration" blade of the SWA.
