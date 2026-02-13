
import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.COSMOS_ENDPOINT || "";
const key = process.env.COSMOS_KEY || "";
const databaseId = "LocalClawDB";
const containerId = "Sites";

export class CosmosDbService {
    private static instance: CosmosDbService;
    private client: CosmosClient;

    private constructor() {
        this.client = new CosmosClient({ endpoint, key });
    }

    public static getInstance(): CosmosDbService {
        if (!CosmosDbService.instance) {
            CosmosDbService.instance = new CosmosDbService();
        }
        return CosmosDbService.instance;
    }

    async upsertSite(site: any) {
        const { container } = await this.client
            .database(databaseId)
            .containers.createIfNotExists({ id: containerId, partitionKey: "/slug" });

        return await container.items.upsert(site);
    }

    async getSite(slug: string) {
        const container = this.client
            .database(databaseId)
            .container(containerId);

        const { resource } = await container.item(slug, slug).read();
        return resource;
    }

    async getAllSites() {
        const container = this.client
            .database(databaseId)
            .container(containerId);

        const { resources } = await container.items
            .query("SELECT * from c")
            .fetchAll();

        return resources;
    }
}
