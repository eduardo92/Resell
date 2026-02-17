
export interface SiteConfig {
    slug: string;
    templateId: 'plumber-v1' | 'restaurant-v1' | 'generic-v1';
    businessName: string;
    colors: {
        primary: string;
        secondary: string;
        accent?: string;
    };
    visuals?: {
        fontStyle?: string;
        theme?: 'light' | 'dark' | 'glass';
        brandPersonality?: string;
        toneOfVoice?: string;
    };
    content: {
        heroTitle: string;
        heroSubtitle: string;
        aboutText: string;
        services: string[];
        contactEmail: string;
        contactPhone: string;
        address?: string;
    };
    hasExistingWebsite: boolean;
    status: 'nuevo' | 'generando' | 'listo' | 'contactado' | 'vendido';
    lastUpdated: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function getSiteData(slug: string): Promise<SiteConfig | null> {
    try {
        const res = await fetch(`${API_URL}/getSites?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return await res.json() as SiteConfig;
    } catch (error) {
        console.error('Error fetching site data:', error);
        return null;
    }
}

export async function getAllSites(): Promise<SiteConfig[]> {
    try {
        const res = await fetch(`${API_URL}/getSites`, { cache: 'no-store' });
        if (!res.ok) return [];
        return await res.json() as SiteConfig[];
    } catch (error) {
        console.error('Error fetching all sites:', error);
        return [];
    }
}
