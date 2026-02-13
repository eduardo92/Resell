
export interface SiteConfig {
    slug: string;
    templateId: 'plumber-v1' | 'restaurant-v1' | 'generic-v1';
    businessName: string;
    colors: {
        primary: string;
        secondary: string;
    };
    content: {
        heroTitle: string;
        heroSubtitle: string;
        aboutText: string;
        services: string[];
        contactEmail: string;
        contactPhone: string;
    };
    hasExistingWebsite: boolean;
    status: 'nuevo' | 'generando' | 'listo' | 'contactado' | 'vendido';
    lastUpdated: string;
}

// MOCK DATABASE
// In production, this would fetch from Cosmos DB or Azure SQL
const MOCK_DB: Record<string, SiteConfig> = {
    'tacos-el-primo': {
        slug: 'tacos-el-primo',
        templateId: 'restaurant-v1',
        businessName: 'Tacos El Primo',
        colors: { primary: '#d32f2f', secondary: '#fbc02d' },
        content: {
            heroTitle: 'Los Mejores Tacos de la Ciudad',
            heroSubtitle: 'Auténtico sabor mexicano en cada mordida.',
            aboutText: 'Fundado en 1995, Tacos El Primo ha servido a la comunidad con recetas tradicionales...',
            services: ['Tacos al Pastor', 'Quesadillas', 'Servicio a Domicilio'],
            contactEmail: 'hola@tacoselprimo.com',
            contactPhone: '555-0123'
        },
        hasExistingWebsite: false,
        status: 'listo',
        lastUpdated: new Date().toISOString()
    },
    'plomeria-garcia': {
        slug: 'plomeria-garcia',
        templateId: 'plumber-v1',
        businessName: 'Plomería García',
        colors: { primary: '#0288d1', secondary: '#ffffff' },
        content: {
            heroTitle: 'Soluciones Rápidas a Problemas de Plomería',
            heroSubtitle: 'Disponibles 24/7 para emergencias.',
            aboutText: 'Somos expertos en fugas, instalaciones y mantenimiento...',
            services: ['Reparación de Fugas', 'Instalación de Baños', 'Limpieza de Drenajes'],
            contactEmail: 'contacto@plomeriagarcia.com',
            contactPhone: '555-9876'
        },
        hasExistingWebsite: true,
        status: 'nuevo',
        lastUpdated: new Date().toISOString()
    },
    'mariscos-reny': {
        slug: 'mariscos-reny',
        templateId: 'restaurant-v1',
        businessName: 'Mariscos Reny',
        colors: { primary: '#00A896', secondary: '#FF7F50' },
        content: {
            heroTitle: 'Los Mejores Mariscos de Lindavista',
            heroSubtitle: 'Cócteles frescos, micheladas y el mejor ambiente familiar en León.',
            aboutText: 'Disfruta de nuestros famosos cócteles de camarón, agujas de res y tostadas de ceviche en nuestra terraza al aire libre. Un lugar relajado para disfrutar con amigos y familia.',
            services: ['Cóctel de Camarón', 'Agujas de Res', 'Tostada de Ceviche', 'Micheladas'],
            contactEmail: 'contacto@mariscosreny.com',
            contactPhone: 'Océano Atlántico 131, Lindavista'
        },
        hasExistingWebsite: false,
        status: 'listo',
        lastUpdated: new Date().toISOString()
    }
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function getSiteData(slug: string): Promise<SiteConfig | null> {
    try {
        const res = await fetch(`${API_URL}/getSites`);
        const sites: SiteConfig[] = await res.json();
        return sites.find(s => s.slug === slug) || null;
    } catch (error) {
        console.error('Error fetching site data:', error);
        return null;
    }
}

export async function getAllSites(): Promise<SiteConfig[]> {
    try {
        const res = await fetch(`${API_URL}/getSites`);
        return await res.json();
    } catch (error) {
        console.error('Error fetching all sites:', error);
        return [];
    }
}
