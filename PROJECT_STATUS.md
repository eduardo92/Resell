# LocalClaw MX: Project Status & Roadmap

This document serves as the single source of truth for all feature requests and their implementation status.

## 🟢 Phase 1: Automation MVP (COMPLETE & LIVE)
*Focused on finding leads via Apify and generating sites with AI. Everything is live on Azure.*

### 📍 Live Azure URLs
- **Main App & Dashboard**: `https://swa-localclaw-mx.azurestaticapps.net`
- **Lead Website Preview**: `https://swa-localclaw-mx.azurestaticapps.net/sites/[slug]`
- **API (Functions)**: `https://swa-localclaw-mx.azurestaticapps.net/api/`

| Feature | Status | Description |
| :--- | :--- | :--- |
| **Azure Infrastructure** | ✅ Done | Resource Group, Cosmos DB (Serverless), and SWA provisioned. |
| **Real Database** | ✅ Done | Cosmos DB integration fully replaces Mock DB. |
| **Apify Integration** | ✅ Done | Automated Google Maps scraping (Niche or URL) is LIVE. |
| **AI Generation** | ✅ Done | OpenAI integration for Spanish copy and dynamic themes is LIVE. |
| **Admin Dashboard** | ✅ Done | Full status visibility (Nuevo, LISTO ✅, Descartado). |
| **Manual Scraping** | ✅ Done | Paste specific Google Maps URLs for target businesses. |

## 🟡 Phase 2: Sales Excellence (PLANNING)
*Focused on outreach and closing.*

- [ ] **Email Automation**: Integration with Resend to send "preview" links to business owners.
- [ ] **Manual Override**: UI to tweak AI-generated text before sending.
- [ ] **Telegram Bot**: Commands for mobile control (`/buscar`, `/construir`).

---
*Last updated: 2026-02-13 13:55*
