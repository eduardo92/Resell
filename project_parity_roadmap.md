# Project Parity Roadmap & Requirements

This document outlines exactly what is needed to achieve 1-to-1 parity with OpenClaw and how to deploy it cheaply on Azure.

## 1. Feature Parity Checklist
To match OpenClaw, we need to build the following "Superpowers":

### A. The Interface (Telegram Bot)
OpenClaw uses a Telegram Bot as its primary UI.
- [ ] **Desire**: User starts bot -> enters API key -> bot guides them.
- [ ] **Implementation**: Azure Functions (Serverless) listening to Telegram Webhooks.
- **Why Azure?**: Extremely cheap (pay-per-request).

### B. "Find" (Lead Generation)
OpenClaw scrapes "Niche + City" (e.g., "Plumbers in Miami").
- [ ] **Requirement**: Access to Google Maps/Yellow Pages data.
- [ ] **Solution**: Connect to **Outscraper API** or **Apify**.
- **Why?**: Direct scraping from Azure IPs will get banned immediately. Using a dedicated scraping API is cheaper and more reliable than managing rotating proxies.

### C. "Build" (Website Generation)
OpenClaw generates a live website instantly.
- [ ] **Requirement**: A system to generate HTML/CSS based on business details.
- [ ] **Solution**:
    1.  **Templates**: Create 5-10 high-quality "Local Business" templates (Plumber, Lawyer, Dentist, etc.).
    2.  **AI Injection**: Use GPT-4o to fill these templates with the specific business name, reviews, and "About Us" generated from the scraping data.
    3.  **Hosting**: Automatically deploy these pages to a subfolder or subdomain (e.g., `yoursite.com/sites/miami-plumber`).

### D. "Email" (Outreach)
OpenClaw sends emails to the found leads.
- [ ] **Requirement**: SMTP server or Email API.
- [ ] **Solution**: **Resend** or **Azure Communication Services**.
- **Compliance**: You will need a verified domain to send emails without landing in spam.

### E. "Call" (Voice AI)
OpenClaw uses AI agents to call leads.
- [ ] **Requirement**: Programmable Voice API.
- [ ] **Solution**: **Vapi.ai** or **Twilio + OpenAI Realtime API**.
- **Note**: This is the most expensive part ($0.10 - $0.20 per minute).

---

## 2. Azure Architecture (Cost-Optimized)

We will use a **Serverless Architecture** to keep costs near zero when not in use.

| Component | Azure Service | Estimated Cost (Low Volume) |
| :--- | :--- | :--- |
| **Frontend** | Azure Static Web Apps | Free / $9 mo |
| **Backend API / Bot** | Azure Functions (Node.js) | Free (First 1M requests) |
| **Database** | Azure SQL (Serverless) or Cosmos DB | Free Tier available |
| **Storage (Images)** | Azure Blob Storage | pennies / GB |
| **Queues (Jobs)** | Azure Storage Queues | pennies / million ops |

**Total Estimated Fixed Cost**: < $15/month (excluding AI/Scraper usage fees).

---

## 3. Information I Need From You

To build this 1-to-1 clone, I need the following keys (or I can help you generate them):

1.  **Telegram Bot Token**: From @BotFather on Telegram.
2.  **OpenAI API Key**: For generating website copy and analyzing leads.
3.  **Outscraper / Apify API Key**: For scraping Google Maps data.
4.  **Resend / SendGrid API Key**: For sending emails.
5.  **Twilio / Vapi Credentials** (Optional): Only if you want the "Call" feature immediately.

---

## 4. "Even Better" Features
You mentioned creating "all the different projects". I will structure the repo as a Monorepo:
- `apps/web`: The main landing page (OpenClaw clone).
- `apps/bot`: The Telegram bot logic (Azure Functions).
- `packages/scraper`: Shared scraping logic.
- `packages/email`: Shared email logic.
