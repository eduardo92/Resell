
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
        // Updated to use "compass/crawler-google-places" as requested
        const input = {
            searchStringsArray: [niche],
            locationQuery: location,
            maxCrawledPlacesPerSearch: 20,
            language: "es", // Priority Spanish for MX context
            searchMatching: "all",
            placeMinimumStars: "",
            website: "allPlaces",
            skipClosedPlaces: false,
            scrapePlaceDetailPage: true, // Needed for more details
            scrapeTableReservationProvider: false,
            includeWebResults: false,
            scrapeDirectories: false,
            maxQuestions: 0,
            scrapeContacts: false,
            maximumLeadsEnrichmentRecords: 0,
            maxReviews: 0,
            reviewsSort: "newest",
            reviewsFilterString: "",
            reviewsOrigin: "all",
            scrapeReviewsPersonalData: false,
            maxImages: 0,
            scrapeImageAuthors: false,
            allPlacesNoSearchAction: ""
        };

        try {
            const run = await this.client.actor("compass/crawler-google-places").call(input);
            const { items } = await this.client.dataset(run.defaultDatasetId).listItems();

            return items.map((item: any) => ({
                name: item.title || item.name,
                category: item.categoryName || item.category,
                address: item.address,
                phone: item.phone,
                website: item.website,
                description: item.description,
                reviewsCount: item.reviewsCount,
                rating: item.totalScore || item.stars,
            }));
        } catch (error) {
            console.error('Error in ApifyScraperService:', error);
            throw error;
        }
    }

    async scrapeSingleUrl(url: string): Promise<ScrapedBusiness | null> {
        // Using crawler-google-places with a specific start URL
        const input = {
            searchStringsArray: [url], // Scrapers usually resolve URLs in search
            maxCrawledPlacesPerSearch: 1,
            language: "es",
            scrapePlaceDetailPage: true,
            // ... rest of defaults to stay consistent
        };

        try {
            const run = await this.client.actor("compass/crawler-google-places").call(input);
            const { items } = await this.client.dataset(run.defaultDatasetId).listItems();

            if (items.length === 0) return null;

            const item: any = items[0];
            return {
                name: item.title || item.name,
                category: item.categoryName || item.category,
                address: item.address,
                phone: item.phone,
                website: item.website,
                description: item.description,
                reviewsCount: item.reviewsCount,
                rating: item.totalScore || item.stars,
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
