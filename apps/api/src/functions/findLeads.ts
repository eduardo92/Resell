import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ApifyScraperService } from "../services/apifyScraper";
import { CosmosDbService } from "../services/cosmosDb";
import { slugify } from "../utils/slugify";

export async function findLeads(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Find Leads triggered: ${request.url}`);

    try {
        const body = await request.json() as any;
        const { niche, location, url } = body;

        if (!url && (!niche || !location)) {
            return { status: 400, body: "Niche and Location OR Business URL are required." };
        }

        const apiKey = process.env.APIFY_API_KEY;
        if (!apiKey) {
            context.error("APIFY_API_KEY is not set in environment variables.");
            return { status: 500, body: "Server configuration error." };
        }

        const scraper = new ApifyScraperService(apiKey);
        let leads: any[] = [];

        if (url) {
            context.log(`Scraping single business URL: ${url}`);
            const lead = await scraper.scrapeSingleUrl(url);
            if (lead) leads = [lead];
        } else {
            context.log(`Scraping niche ${niche} in ${location}...`);
            leads = await scraper.findLeads(niche, location);
        }

        const db = CosmosDbService.getInstance();
        const existingResources = await db.getAllSites();
        const existingLeads = existingResources.map(r => ({ name: r.businessName, address: r.content.contactPhone || '' }));

        const deduplicated = scraper.deduplicateLeads(leads, existingLeads as any);

        context.log(`Found ${leads.length} leads, ${deduplicated.length} after deduplication.`);

        // Save leads as initial SiteConfig objects with 'nuevo' status
        const savePromises = deduplicated.map(lead => {
            const slug = slugify(lead.name);
            return db.upsertSite({
                id: slug,
                slug: slug,
                businessName: lead.name,
                templateId: lead.category?.toLowerCase().includes('rest') ? 'restaurant-v1' : 'generic-v1',
                colors: { primary: '#6366f1', secondary: '#f8fafc' }, // Default colors
                content: {
                    heroTitle: lead.name,
                    heroSubtitle: lead.category || 'Negocio Local',
                    aboutText: lead.description || 'Impulsamos tu negocio con tecnología.',
                    services: [lead.category || 'Servicio Profesional'],
                    contactEmail: lead.website || '',
                    contactPhone: lead.phone || lead.address || ''
                },
                hasExistingWebsite: !!lead.website,
                status: 'nuevo',
                lastUpdated: new Date().toISOString()
            });
        });

        await Promise.all(savePromises);

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
