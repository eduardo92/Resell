'use client';

import { useEffect, useState, Suspense } from 'react';
import { getSiteData, SiteConfig } from '@/lib/sites';
import { GenericTemplate } from '@/components/templates/GenericTemplate';
import { RestaurantTemplate } from '@/components/templates/RestaurantTemplate';
import { PlumberTemplate } from '@/components/templates/PlumberTemplate';
import { useSearchParams } from 'next/navigation';

function SiteContent() {
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug');
    const [site, setSite] = useState<SiteConfig | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            setLoading(true);
            getSiteData(slug).then(data => {
                setSite(data);
                setLoading(false);
            });
        }
    }, [slug]);

    if (loading) return <div className="p-8 text-center bg-black min-h-screen text-white">Cargando sitio...</div>;
    if (!site) return <div className="p-8 text-center bg-black min-h-screen text-red-500 font-bold">Sitio no encontrado</div>;

    switch (site.templateId) {
        case 'restaurant-v1':
            return <RestaurantTemplate site={site} />;
        case 'plumber-v1':
            return <PlumberTemplate site={site} />;
        default:
            return <GenericTemplate site={site} />;
    }
}

export default function SitePage() {
    return (
        <Suspense fallback={<div className="p-8 text-center bg-black min-h-screen text-white">Iniciando...</div>}>
            <SiteContent />
        </Suspense>
    );
}
