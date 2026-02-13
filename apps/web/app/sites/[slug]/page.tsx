
import { getSiteData } from '@/lib/sites';
import { notFound } from 'next/navigation';
import { GenericTemplate } from '@/components/templates/GenericTemplate';

import { RestaurantTemplate } from '@/components/templates/RestaurantTemplate';

// Force dynamic rendering since we are checking a DB (even if it's mock for now)
export const dynamic = 'force-dynamic';

export default async function SitePage({ params }: { params: { slug: string } }) {
    const site = await getSiteData(params.slug);

    if (!site) {
        return notFound();
    }

    if (site.templateId === 'restaurant-v1') {
        return <RestaurantTemplate site={site} />;
    }

    return <GenericTemplate site={site} />;
}
