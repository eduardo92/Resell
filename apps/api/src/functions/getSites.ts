
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosDbService } from "../services/cosmosDb";

export async function getSites(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Get Sites triggered: ${request.url}`);

    try {
        const db = CosmosDbService.getInstance();
        const resources = await db.getAllSites();

        return {
            status: 200,
            jsonBody: resources
        };
    } catch (error) {
        context.error('Error fetching sites:', error);
        return { status: 500, body: "Internal Server Error" };
    }
};

app.http('getSites', {
    methods: ['GET'],
    authLevel: 'function',
    handler: getSites
});
