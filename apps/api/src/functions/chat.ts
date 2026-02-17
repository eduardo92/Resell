import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

// Local interface definition to avoid rootDir issues
interface SiteConfig {
    businessName: string;
    colors: { primary: string; secondary: string; accent?: string };
    visuals?: { brandPersonality?: string; toneOfVoice?: string };
    content: {
        aboutText: string;
        services: string[];
        contactPhone: string;
        contactEmail: string;
    };
}

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const DEFAULT_MODEL = "deepseek/deepseek-chat"; // Cheapest professional model for 2026

export async function chat(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Chat Function triggered: ${request.url}`);

    try {
        const body = await request.json() as any;
        const { message, siteConfig } = body as { message: string, siteConfig: SiteConfig };

        if (!message || !siteConfig) {
            return { status: 400, body: "Message and SiteConfig are required." };
        }

        const systemPrompt = `
            Eres el asistente virtual oficial de "${siteConfig.businessName}".
            
            PERSONALIDAD DE MARCA: ${siteConfig.visuals?.brandPersonality || 'Profesional y servicial'}
            TONO DE VOZ: ${siteConfig.visuals?.toneOfVoice || 'Cercano y amable'}
            
            INFORMACIÓN DEL NEGOCIO:
            - Descripción: ${siteConfig.content.aboutText}
            - Servicios: ${siteConfig.content.services.join(', ')}
            - Teléfono: ${siteConfig.content.contactPhone}
            - Email: ${siteConfig.content.contactEmail}
            
            REGLAS:
            1. Mantente SIEMPRE en el personaje y tono definidos arriba.
            2. Si no sabes algo, invita amablemente a que contacten al teléfono ${siteConfig.content.contactPhone}.
            3. Sé conciso y directo.
            4. Responde en español (MX).
        `;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: DEFAULT_MODEL,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();
        if (!response.ok || !data.choices?.[0]?.message?.content) {
            context.error('OpenRouter error:', JSON.stringify(data));
            return { status: 502, jsonBody: { reply: 'Lo siento, tuve un problema técnico. Por favor intenta de nuevo.' } };
        }
        const reply = data.choices[0].message.content;

        return {
            status: 200,
            jsonBody: { reply }
        };
    } catch (error) {
        context.error('Error in chat function:', error);
        return { status: 500, body: "Internal Server Error" };
    }
}

app.http('chat', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: chat
});
