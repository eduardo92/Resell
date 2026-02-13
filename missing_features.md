# Missing Features Tracker

This document tracks features that are NOT yet implemented in LocalClaw MX but are required for full parity or future growth.

## Phase 1: Manual MVP (Current Focus)
- [ ] **Data Persistence**: Currently using `MOCK_DB`. Need to connect to **Azure SQL** or **Cosmos DB**.
- [ ] **CSV/Manual Upload**: UI to paste or upload leads from your manual scraping sessions.
- [ ] **Business Deduplication**: Logic to prevent importing the same business multiple times (based on name + address/phone).
- [ ] **AI Copywriting**: Automated generation of Spanish marketing copy using OpenAI API.
- [ ] **Image Generation / Search**: Finding relevant images for the business (e.g. searching Google for photos of high-rated seafood).

## Phase 2: Automation & Parity
- [ ] **Automated Scraper Connection**: Integrating with Outscraper/Apify API.
- [ ] **Telegram Bot Commands**: Full logic for `/buscar`, `/construir` via the Telegram bot.
- [ ] **Email Outreach (ACS/Resend)**: Automated email sequences with tracking (opens/clicks).
- [ ] **Custom Domains**: Automated SSL and domain mapping for paid clients.

## Phase 3: "Even Better" Features
- [ ] **AI Voice Calling (Vapi/Twilio)**: Automated appointment booking.
- [ ] **Client Dashboard**: A portal where businesses can see their stats (leads, chat history).
- [ ] **AI Chatbot Training**: Training the chatbot on the client's specific menu/files.
