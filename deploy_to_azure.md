# manual azure deployment

1. Push code to GitHub.
2. Create **Azure Static Web App** in Azure Portal.
3. Select **GitHub** as source.
4. Settings:
   - App Location: `/apps/web`
   - Api Location: `/apps/api`
   - Output Location: `.next`
5. Click **Create**.

Your site "Mariscos Reny" will be at `[your-app-url]/sites/mariscos-reny`.

## Azure Communication Services (ACS) vs Resend
- **ACS**: Good if you are already deep in Azure, but complex to set up (requires domain verification, huge SDKs).
- **Resend**: Much easier for "Email API". Free tier is great (3000 emails/mo). **I recommend Resend** for the MVP.

## AI Chatbot
- We can easily add a "Chat Bubble" using the Vercel AI SDK + OpenAI.
- I can add this as a feature in the `RestaurantTemplate` later.
