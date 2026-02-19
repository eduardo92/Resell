import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ApifyScraperService } from "../services/apifyScraper";
import { SqlDbService } from '../services/sqlDb';
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

        const db = SqlDbService.getInstance();
        await db.initDatabase();
        const existingResources = await db.getAllSites();
        // Use businessName + address (stored in content.aboutText origin) for dedup.
        // The scraper stores address in content.contactPhone fallback, so we compare by slug-friendly name only when address is unavailable.
        const existingLeads = existingResources.map((r: any) => ({
            name: r.businessName,
            address: r.rawScrapedData?.address || r.content?.address || ''
        }));

        const deduplicated = scraper.deduplicateLeads(leads, existingLeads as any);

        // Filter out leads that already have a website to focus on those who need one
        const leadsWithoutWebsite = deduplicated.filter(lead => !lead.website);

        context.log(`Found ${leads.length} leads, ${deduplicated.length} after deduplication, ${leadsWithoutWebsite.length} without website.`);

        const detectTemplate = (category: string = ''): 'restaurant-v1' | 'plumber-v1' | 'generic-v1' => {
            const c = category.toLowerCase();
            if (/restaur|comida|taco|pizza|sushi|caf[eé]|buffet|mariscos|panadería|pastelería|tortill|fonda|taquería|cocina|hamburgues|antojitos/.test(c)) return 'restaurant-v1';
            if (/plomer|fontaner|eléctric|electric|gas|técnic|reparaci|mantenimi|instalaci|hvac|aire acond|chapister|pintur|construc|albañil|herrería|cerrajer|carpinter/.test(c)) return 'plumber-v1';
            return 'generic-v1';
        };

        // Save leads as initial SiteConfig objects with 'nuevo' status
        const savePromises = leadsWithoutWebsite.map(lead => {
            const slug = slugify(lead.name);
            return db.upsertSite({
                id: slug,
                slug: slug,
                businessName: lead.name,
                templateId: detectTemplate(lead.category),
                colors: { primary: '#6366f1', secondary: '#f8fafc' },
                content: {
                    heroTitle: lead.name,
                    heroSubtitle: lead.category || 'Negocio Local',
                    aboutText: lead.description || 'Impulsamos tu negocio con tecnología.',
                    services: [lead.category || 'Servicio Profesional'],
                    contactEmail: `contacto@${slug}.mx`,
                    contactPhone: lead.phone || '',
                    address: lead.address || ''
                },
                hasExistingWebsite: !!lead.website,
                status: 'nuevo',
                lastUpdated: new Date().toISOString(),
                rawScrapedData: lead.raw
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
