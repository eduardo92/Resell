
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import OpenAI from "openai";
import { CosmosDbService } from "../services/cosmosDb";
import { slugify } from "../utils/slugify";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSite(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Generate Site triggered: ${request.url}`);

    try {
        const body = await request.json() as any;
        const { businessName, category, description, phone, address, website } = body;

        if (!businessName) {
            return { status: 400, body: "Business Name is required." };
        }

        const prompt = `
            Eres un experto en marketing digital para el mercado mexicano.
            Genera un archivo JSON de configuración para un sitio web de un negocio llamado "${businessName}".
            Categoría: ${category || 'Negocio Local'}
            Descripción: ${description || 'Especialistas en su área'}
            Ubicación: ${address || 'México'}
            Teléfono: ${phone || ''}

            El JSON debe tener exactamente esta estructura:
            {
                "businessName": "${businessName}",
                "templateId": "restaurant-v1" o "plumber-v1" o "generic-v1",
                "colors": { "primary": "un color hex premium", "secondary": "un color hex complementario" },
                "content": {
                    "heroTitle": "Un título corto y potente en español",
                    "heroSubtitle": "Una frase que venda en español",
                    "aboutText": "Una descripción profesional de 2-3 párrafos en español",
                    "services": ["Servicio 1", "Servicio 2", "Servicio 3", "Servicio 4"],
                    "contactEmail": "contacto@${slugify(businessName)}.com",
                    "contactPhone": "${phone || 'Contactar por WhatsApp'}"
                }
            }
            Responde ÚNICAMENTE con el objeto JSON, sin texto adicional.
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const config = JSON.parse(response.choices[0].message.content || "{}");
        const slug = slugify(businessName);

        const siteData = {
            id: slug,
            slug: slug,
            ...config,
            hasExistingWebsite: !!website,
            status: 'listo',
            lastUpdated: new Date().toISOString()
        };

        const db = CosmosDbService.getInstance();
        await db.upsertSite(siteData);

        return {
            status: 200,
            jsonBody: siteData
        };
    } catch (error) {
        context.error('Error generating site:', error);
        return { status: 500, body: "Internal Server Error" };
    }
};

app.http('generateSite', {
    methods: ['POST'],
    authLevel: 'function',
    handler: generateSite
});
