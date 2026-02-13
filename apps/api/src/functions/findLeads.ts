
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ApifyScraperService } from "../services/apifyScraper";

export async function findLeads(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Find Leads triggered: ${request.url}`);

    try {
        const body = await request.json() as any;
        const { niche, location } = body;

        if (!niche || !location) {
            return { status: 400, body: "Niche and Location are required." };
        }

        const apiKey = process.env.APIFY_API_KEY;
        if (!apiKey) {
            context.error("APIFY_API_KEY is not set in environment variables.");
            return { status: 500, body: "Server configuration error." };
        }

        const scraper = new ApifyScraperService(apiKey);

        // MOCK: In a real scenario, we'd fetch existing leads from DB for deduplication
        const existingLeads: any[] = [];

        context.log(`Scraping ${niche} in ${location}...`);
        const newLeads = await scraper.findLeads(niche, location);

        const deduplicated = scraper.deduplicateLeads(newLeads, existingLeads);

        context.log(`Found ${newLeads.length} leads, ${deduplicated.length} after deduplication.`);

        // TODO: Save deduplicated leads to DB

        return {
            status: 200,
            jsonBody: {
                count: deduplicated.length,
                leads: deduplicated
            }
        };
    } catch (error) {
        context.error('Error finding leads:', error);
        return { status: 500, body: "Internal Server Error" };
    }
};

app.http('findLeads', {
    methods: ['POST'],
    authLevel: 'function',
    handler: findLeads
});
