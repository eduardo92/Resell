import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function telegramWebhook(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const secretToken = request.headers.get("X-Telegram-Bot-Api-Secret-Token");
    // TODO: Verify secret token

    try {
        const update = await request.json() as any;
        context.log('Received Telegram Update:', update);

        if (update.message) {
            const chatId = update.message.chat.id;
            const text = update.message.text;

            context.log(`Message from ${chatId}: ${text}`);

            // TODO: Handle commands here
            // const response = await handleCommand(text, chatId); 
        }

        return { body: "OK" };
    } catch (error) {
        context.error('Error processing webhook:', error);
        return { status: 500, body: "Internal Server Error" };
    }
};

app.http('telegramWebhook', {
    methods: ['POST'],
    authLevel: 'function',
    handler: telegramWebhook
});
