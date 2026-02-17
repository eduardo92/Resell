
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { SqlDbService } from "../services/sqlDb";

export async function getSites(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`GetSites Function triggered: ${request.url}`);

    try {
        const slug = request.query.get('slug');
        const db = SqlDbService.getInstance();

        await db.initDatabase();

        if (slug) {
            const site = await db.getSiteBySlug(slug);
            if (!site) return { status: 404, body: "Site not found" };
            return {
                status: 200,
                jsonBody: site
            };
        }

        const sites = await db.getAllSites();
        return {
            status: 200,
            jsonBody: sites
        };
    } catch (error) {
        context.error('Error getting sites:', error);
        return { status: 500, body: "Internal Server Error" };
    }
}
;

app.http('getSites', {
    methods: ['GET'],
    authLevel: 'function',
    handler: getSites
});
