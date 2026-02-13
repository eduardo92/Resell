
import { ApifyClient } from 'apify-client';

export interface ScrapedBusiness {
    name: string;
    category: string;
    address: string;
    phone?: string;
    website?: string;
    description?: string;
    reviewsCount?: number;
    rating?: number;
}

export class ApifyScraperService {
    private client: ApifyClient;

    constructor(apiKey: string) {
        this.client = new ApifyClient({
            token: apiKey,
        });
    }

    async findLeads(niche: string, location: string): Promise<ScrapedBusiness[]> {
        // We use the "google-maps-scraper" actor from Apify
        const input = {
            searchStrings: [`${niche} in ${location}`],
            maxPagesPerQuery: 1,
            maxItemsPerQuery: 20,
            language: "es", // Priorities Spanish
        };

        try {
            const run = await this.client.actor("compass/google-maps-scraper").call(input);
            const { items } = await this.client.dataset(run.defaultDatasetId).listItems();

            return items.map((item: any) => ({
                name: item.title,
                category: item.categoryName,
                address: item.address,
                phone: item.phone,
                website: item.website,
                description: item.description,
                reviewsCount: item.reviewsCount,
                rating: item.totalScore,
            }));
        } catch (error) {
            console.error('Error in ApifyScraperService:', error);
            throw error;
        }
    }

    async scrapeSingleUrl(url: string): Promise<ScrapedBusiness | null> {
        const input = {
            startUrls: [{ url }],
            maxPagesPerQuery: 1,
            maxItemsPerQuery: 1,
            language: "es",
        };

        try {
            const run = await this.client.actor("compass/google-maps-scraper").call(input);
            const { items } = await this.client.dataset(run.defaultDatasetId).listItems();

            if (items.length === 0) return null;

            const item: any = items[0];
            return {
                name: item.title,
                category: item.categoryName,
                address: item.address,
                phone: item.phone,
                website: item.website,
                description: item.description,
                reviewsCount: item.reviewsCount,
                rating: item.totalScore,
            };
        } catch (error) {
            console.error('Error scraping single URL:', error);
            throw error;
        }
    }

    /**
     * Deduplicates leads based on name and address.
     */
    deduplicateLeads(leads: ScrapedBusiness[], existingLeads: ScrapedBusiness[]): ScrapedBusiness[] {
        const existingKeys = new Set(
            existingLeads.map(l => `${l.name.toLowerCase()}|${l.address.toLowerCase()}`)
        );

        return leads.filter(l => {
            const key = `${l.name.toLowerCase()}|${l.address.toLowerCase()}`;
            if (existingKeys.has(key)) {
                return false;
            }
            existingKeys.add(key);
            return true;
        });
    }
}
