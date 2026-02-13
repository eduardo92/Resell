
import { SiteConfig } from '@/lib/sites';
import { AIChatbot } from './AIChatbot';

export function GenericTemplate({ site }: { site: SiteConfig }) {
    return (
        <div className="min-h-screen font-sans">
            {/* Navbar */}
            <nav className="p-4" style={{ backgroundColor: site.colors.primary, color: 'white' }}>
                <div className="container mx-auto font-bold text-xl">{site.businessName}</div>
            </nav>

            {/* Hero */}
            <header className="py-20 text-center bg-gray-100">
                <h1 className="text-4xl font-bold mb-4" style={{ color: site.colors.primary }}>{site.content.heroTitle}</h1>
                <p className="text-xl text-gray-600">{site.content.heroSubtitle}</p>
            </header>

            {/* About */}
            <section className="py-16 container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6">Sobre Nosotros</h2>
                <p className="text-gray-700 leading-relaxed max-w-2xl">{site.content.aboutText}</p>
            </section>

            {/* Services */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-6">Nuestros Servicios</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {site.content.services.map((service, i) => (
                            <div key={i} className="bg-white p-6 rounded shadow-sm border-t-4" style={{ borderColor: site.colors.primary }}>
                                <h3 className="font-bold text-lg">{service}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <footer className="py-10 bg-gray-900 text-white text-center">
                <h2 className="text-xl font-bold mb-4">Contáctanos</h2>
                <p>{site.content.contactPhone}</p>
                <p>{site.content.contactEmail}</p>
            </footer>
            <AIChatbot site={site} />
        </div>
    );
}
