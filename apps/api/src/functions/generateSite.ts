
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { SqlDbService } from "../services/sqlDb";
import { slugify } from "../utils/slugify";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const DEFAULT_MODEL = "openrouter/auto";

export async function generateSite(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Generate Site triggered: ${request.url}`);

    try {
        const body = await request.json() as any;
        const { businessName, category, description, phone, address, website, slug: providedSlug } = body;

        if (!businessName) {
            return { status: 400, body: "Business Name is required." };
        }

        const db = SqlDbService.getInstance();
        await db.initDatabase();

        const slug = providedSlug || slugify(businessName);
        let existingSite = await db.getSiteBySlug(slug);

        const raw = existingSite?.rawScrapedData;
        const rawImages = raw?.imageUrls || [];
        const reviews = raw?.reviews?.slice(0, 5) || [];
        const categoryLabel = category || raw?.categoryName || 'Negocio Local';

        const prompt = `
            ERES UN DIRECTOR CREATIVO DE ÉLITE Y CONSULTOR DE NEGOCIOS GASTRONÓMICOS/SERVICIOS. 
            Tu objetivo es crear una propuesta de sitio web "BANGER" — irresistible, premium y lista para venderse por miles de dólares.
            No hagas algo genérico. Crea una experiencia que cautive y venda.

            DATOS DEL NEGOCIO (EXTRAÍDOS DE GOOGLE MAPS):
            Nombre: ${businessName}
            Categoría Real: ${categoryLabel}
            Ubicación: ${address || raw?.address || 'León, Guanajuato'}
            Teléfono: ${phone || raw?.phone || ''}
            Rating: ${raw?.totalScore || raw?.stars || '4.8'} basado en ${raw?.reviewsCount || 'más de 50'} reseñas.
            
            CONTEXTO REAL PARA PERSONALIZACIÓN:
            - IMÁGENES REALES: ${JSON.stringify(rawImages)}
            - RESEÑAS REALES (Usa sus nombres y fragmentos de texto si son positivos): ${JSON.stringify(reviews)}
            - DESCRIPCIÓN GOOGLE: ${raw?.description || 'No hay descripción, infiere el estilo por la categoría.'}

            REGLAS DE DISEÑO MAESTRAS:
            - templateId: "restaurant-v1" si es comida/bebida, "plumber-v1" si son servicios técnicos/a domicilio, "generic-v1" para lo demás.
            - Colores: Paletas sofisticadas (Ej: #1A1A2E con #E94560, o #2D3436 con #FAB1A0).
            - Copy: PERSUASIVO, EMOCIONAL, IMPACTANTE. Usa "El Secreto Mejor Guardado de..." o "La Excelencia en cada...". Usa el nombre del negocio estratégicamente.

            GENERA UN JSON COMPLETO:
            {
                "businessName": "${businessName}",
                "templateId": "restaurant-v1" | "plumber-v1" | "generic-v1",
                "colors": { "primary": "hex", "secondary": "hex", "accent": "hex" },
                "visuals": {
                    "fontStyle": "minimalist" | "serif" | "modern" | "display",
                    "theme": "light" | "dark" | "glass",
                    "brandPersonality": "Descripción de marca de lujo",
                    "toneOfVoice": "Instrucciones de actitud",
                    "heroImage": "Si hay imágenes reales del negocio en los datos, USA LA MEJOR. Si no, usa una de Unsplash (ej: https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1600)",
                    "gallery": ["3-4 imágenes adicionales: mezcla de reales si existen y Unsplash si faltan"]
                },
                "content": {
                    "heroTitle": "Título de impacto masivo",
                    "heroSubtitle": "Frase que rompa objeciones",
                    "aboutText": "Historia emocional de 2-3 párrafos",
                    "services": ["Servicio Elite 1", "Servicio Elite 2", "Servicio Elite 3", "Servicio Elite 4"],
                    "businessHours": { "Lunes-Viernes": "13:00 - 22:00", "Sábado": "12:00 - 23:00", "Domingo": "12:00 - 20:00" },
                    "testimonials": [
                        { "name": "Cliente VIP 1", "text": "Usa una reseña real si está en los datos raw, si no inventa una excelente", "rating": 5 },
                        { "name": "Cliente VIP 2", "text": "Reseña positiva corta en español", "rating": 5 }
                    ],
                    "faqs": [
                        { "question": "¿Pregunta común?", "answer": "Respuesta profesional" },
                        { "question": "¿Otra duda?", "answer": "Respuesta que genere confianza" }
                    ],
                    "features": [
                        { "title": "Calidad Garantizada", "description": "Por qué son los mejores", "icon": "star" },
                        { "title": "Atención Personalizada", "description": "Compromiso con el cliente", "icon": "user" }
                    ],
                    "contactEmail": "contacto@${slug}.mx",
                    "contactPhone": "${phone || raw?.phone || 'Contactar vía WhatsApp'}",
                    "address": "${address || raw?.address || 'Ubicación Premium'}",
                    "googlePlaceId": "${raw?.placeId || ''}"
                }
            }
            RESPONDE SOLO EL JSON. SIN PREÁMBULOS.
        `;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://kind-pebble-0c8247f0f.4.azurestaticapps.net",
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
        let config;
        try {
            // Claude sometimes wraps JSON in markdown code fences — strip them
            const rawContent = (data.choices[0].message.content || "{}").trim();
            const cleanJson = rawContent.replace(/^```json?\s*/i, '').replace(/\s*```$/i, '').trim();
            config = JSON.parse(cleanJson);
        } catch (parseError) {
            context.error('Failed to parse AI JSON response:', data.choices[0].message.content);
            return { status: 502, body: 'AI returned invalid JSON. Please retry.' };
        }

        const siteConfig = {
            id: slug,
            slug: slug,
            ...config,
            hasExistingWebsite: !!(website || raw?.website),
            status: 'listo',
            lastUpdated: new Date().toISOString()
        };

        // Guardar en SQL preservando rawScrapedData
        await db.upsertSite({
            ...siteConfig,
            rawScrapedData: raw
        });

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
