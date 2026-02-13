# Scraping & Website Cloning Strategy

## 1. Connecting to Accessible Scrapers
You asked if we can connect to "easily accessible scrapers". **Yes.**

The best approach for a "Resell" operation is NOT to build your own maintainence-heavy scrapers, but to use **APIs that handle the dirty work**.

### Recommended APIs
1.  **Outscraper**:
    *   **Best for**: Google Maps (Business Name, Phone, Email, Website).
    *   **Cost**: Pay-as-you-go (approx $2 for 1,000 leads).
    *   **Integration**: I will write a module that sends a request to Outscraper and receives a clean JSON list of businesses in your city.

2.  **Apify**:
    *   **Best for**: Instagram, Facebook, and generic website scraping.
    *   **Cost**: $49/mo subscription or pay-per-usage.
    *   **Integration**: Official Node.js client (`apify-client`).

### How We Will Implement It
I will create a standard **Lead Provider Interface** in the code.
```typescript
interface LeadSource {
  findLeads(niche: string, location: string): Promise<Lead[]>;
}
```
This allows us to switch between Outscraper, Apify, or a custom script easily.

---

## 2. How to "Clone" Websites to Resell
You want to "clone the websites we will resell." There are two ways to interpret this:

### A. "I want to copy a competitor's site and sell it to my client."
*   **Tools**: `Save Webpage` (SingleFile), `HTTrack`, or a custom Puppeteer script.
*   **The "Better" Way**: I can build a tool for you where you paste a URL (e.g., a nice plumbing site from another city), and our AI:
    1.  Downloads the HTML structure.
    2.  **Rewrites the text** (so you don't plagiarize).
    3.  **Swaps the images** (using stock photos or client photos).
    4.  **Changes the colors** to match your client's brand.

### B. "I want to generate a high-quality site from scratch." (OpenClaw style)
*   **Process**:
    1.  We build 5 premium templates (Hero, Services, Testimonials, Contact).
    2.  When a lead is found (e.g., "Bob's Plumbing"), the system auto-fills these templates.
    3.  **Enhancement**: We can use **Vercel AI SDK** to generate custom sections based on the lead's actual services found on Google Maps.

### Recommendation
For your "Resell" model, **Option B (Generation)** is safer and scalable. **Option A (Copying)** has legal risks, but I can provide a "Style Stealer" tool that copies the *layout* (CSS grid/flex) without copying the assets/text.

## Summary of Next Steps
1.  I will set up the Azure Functions project to handle the **Backend Logic**.
2.  I will create the **Lead Generation Service** using Outscraper (I will assume we use this for now, it's the industry standard for this).
3.  I will build the **Website Generator** engine.
