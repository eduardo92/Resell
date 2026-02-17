
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { SqlDbService } from "../services/sqlDb";
import { slugify } from "../utils/slugify";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const DEFAULT_MODEL = "deepseek/deepseek-chat"; // Budget champion with incredible Spanish copy

export async function generateSite(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Generate Site triggered: ${request.url}`);

    try {
        const body = await request.json() as any;
        const { businessName, category, description, phone, address, website } = body;

        if (!businessName) {
            return { status: 400, body: "Business Name is required." };
        }

        const prompt = `
            Eres un Director Creativo de una agencia de diseño web de lujo en México.
            Tu misión es crear una configuración maestra para un sitio web de un negocio llamado "${businessName}".
            Categoría: ${category || 'Negocio Local'}
            Descripción: ${description || 'Especialistas en su área'}
            Ubicación: ${address || 'México'}
            Teléfono: ${phone || ''}

            OBJETIVO VISUAL: El sitio debe verse moderno, premium y profesional.
            
            Genera un JSON con esta estructura exacta:
            {
                "businessName": "${businessName}",
                "templateId": "restaurant-v1" | "plumber-v1" | "generic-v1",
                "colors": { 
                    "primary": "un color hex profundo y elegante acorde al nicho", 
                    "secondary": "un color hex claro para fondos",
                    "accent": "un color hex vibrante que resalte botones" 
                },
                "visuals": {
                    "fontStyle": "minimalist" | "serif" | "modern" | "display",
                    "theme": "light" | "dark" | "glass",
                    "brandPersonality": "una descripción de la personalidad de la marca (ej: Elitista, Cercano, Técnico, Rebelde)",
                    "toneOfVoice": "instrucciones de cómo debe hablar la marca (ej: 'Habla de usted, con mucha cortesía' o 'Usa lenguaje joven y dinámico')"
                },
                "content": {
                    "heroTitle": "Un título corto y de altísimo impacto en español",
                    "heroSubtitle": "Una frase persuasiva que genere confianza en español",
                    "aboutText": "Una descripción cautivadora de 2 párrafos del negocio en español",
                    "services": ["Servicio Premium 1", "Servicio Premium 2", "Servicio Premium 3", "Servicio Premium 4"],
                    "contactEmail": "contacto@${slugify(businessName)}.com",
                    "contactPhone": "${phone || 'Contactar por WhatsApp'}"
                }
            }
            Responde exclusivamente con el JSON. No incluyas explicaciones.
        `;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://localclaw-mx.azurestaticapps.net",
                "X-Title": "LocalClaw MX",
            },
            body: JSON.stringify({
                model: DEFAULT_MODEL,
                messages: [{ role: "user", content: prompt }],
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        if (!response.ok || !data.choices?.[0]?.message?.content) {
            context.error('OpenRouter error:', JSON.stringify(data));
            return { status: 502, body: `AI service error: ${data.error?.message || 'No response from model'}` };
        }
        const config = JSON.parse(data.choices[0].message.content || "{}");
        const slug = slugify(businessName);

        const siteConfig = {
            id: slug,
            slug: slug,
            ...config,
            hasExistingWebsite: !!website,
            status: 'listo',
            lastUpdated: new Date().toISOString()
        };

        // Guardar en SQL
        const db = SqlDbService.getInstance();
        await db.initDatabase();
        await db.upsertSite(siteConfig);

        return {
            status: 200,
            jsonBody: siteConfig
        };
    } catch (error) {
        context.error('Error generating site:', error);
        return { status: 500, body: "Internal Server Error" };
    }
}

app.http('generateSite', {
    methods: ['POST'],
    authLevel: 'function',
    handler: generateSite
});
