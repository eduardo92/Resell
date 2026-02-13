
import { SiteConfig } from '@/lib/sites';
import { AIChatbot } from './AIChatbot';

export function RestaurantTemplate({ site }: { site: SiteConfig }) {
    return (
        <div className="min-h-screen font-sans bg-white">
            {/* Navbar */}
            <nav className="fixed w-full z-10 top-0 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-gray-100">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="font-extrabold text-2xl tracking-tighter" style={{ color: site.colors.primary }}>
                        {site.businessName}
                    </h1>
                    <button className="px-6 py-2 rounded-full font-bold text-white transition hover:opacity-90 shadow-lg"
                        style={{ backgroundColor: site.colors.secondary }}>
                        Ver Menú
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `radial-gradient(circle at 70% 20%, ${site.colors.primary} 0%, transparent 50%), radial-gradient(circle at 20% 80%, ${site.colors.secondary} 0%, transparent 50%)`
                    }}
                />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-gray-900 leading-tight">
                        {site.content.heroTitle}
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 font-light">
                        {site.content.heroSubtitle}
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="px-8 py-4 rounded-full font-bold text-white text-lg shadow-xl transition transform hover:-translate-y-1 hover:shadow-2xl"
                            style={{ backgroundColor: site.colors.primary }}>
                            Ordenar Ahora
                        </button>
                        <button className="px-8 py-4 rounded-full font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition">
                            Ubicación
                        </button>
                    </div>
                </div>
            </header>

            {/* Menu / Services */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Nuestro Menú</h3>
                        <h2 className="text-4xl font-bold text-gray-900">Platillos Favoritos</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {site.content.services.map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition border border-gray-100 group">
                                <div className="w-16 h-16 rounded-full mb-6 flex items-center justify-center text-white font-bold text-2xl shadow-inner"
                                    style={{ backgroundColor: site.colors.secondary }}>
                                    {item[0]}
                                </div>
                                <h4 className="font-bold text-xl mb-2 text-gray-900">{item}</h4>
                                <p className="text-gray-500 text-sm">Delicioso y fresco, preparado al momento.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About */}
            <section className="py-20">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <div className="w-full h-96 rounded-3xl bg-gray-200 animate-pulse"
                            style={{ backgroundColor: site.colors.primary + '20' }}>
                            {/* Placeholder for image */}
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-bold mb-6 text-gray-900">Nuestra Historia</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            {site.content.aboutText}
                        </p>
                        <a href="#" className="font-bold text-lg underline decoration-2 underline-offset-4 hover:opacity-75"
                            style={{ color: site.colors.primary, textDecorationColor: site.colors.secondary }}>
                            Leer más sobre nosotros
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Footer */}
            <footer className="py-20 text-white" style={{ backgroundColor: '#1a1a1a' }}>
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-8">Visítanos Hoy</h2>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span>Abierto Ahora</span>
                        </div>
                        <div className="text-gray-400">{site.content.contactPhone}</div>
                        <div className="text-gray-400">{site.content.contactEmail}</div>
                    </div>
                    <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} {site.businessName}. Powered by LocalClaw.
                    </p>
                </div>
            </footer>
            <AIChatbot site={site} />
        </div>
    );
}
