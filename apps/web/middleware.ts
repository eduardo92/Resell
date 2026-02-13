
import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /_static (inside /public)
         * 4. all root files inside /public (e.g. /favicon.ico)
         */
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get("host")!;

    // TODO: Replace with your actual domain when deploying
    const currentHost =
        process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
            ? hostname.replace(`.localclaw.com`, "")
            : hostname.replace(`.localhost:3000`, "");

    // If it's the admin dashboard or the root landing page, let it pass
    if (url.pathname.startsWith('/admin') || url.pathname === '/' || url.pathname.startsWith('/sites')) {
        return NextResponse.next();
    }

    // CUSTOM DOMAIN LOGIC (Future Upgrade)
    // If the hostname is NOT our main domain (localclaw.com), it must be a client site.
    // We rewrite the request to /sites/[slug] based on a DB lookup.

    // const tenant = await getTenantFromHost(hostname);
    // if (tenant) {
    //   return NextResponse.rewrite(new URL(`/sites/${tenant.slug}${url.pathname}`, req.url));
    // }

    return NextResponse.next();
}
