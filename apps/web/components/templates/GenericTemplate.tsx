
import { SiteConfig } from '@/lib/sites';
import { AIChatbot } from './AIChatbot';
import { CheckCircle2, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export function GenericTemplate({ site }: { site: SiteConfig }) {
    const primary = site.colors.primary;
    const secondary = site.colors.secondary;
    const accent = site.colors.accent || site.colors.primary;
    const isDark = site.visuals?.theme === 'dark';

    const fontClass = {
        'serif': 'font-serif',
        'modern': 'font-sans tracking-tight',
        'display': 'font-black tracking-tighter',
        'minimalist': 'font-light'
    }[site.visuals?.fontStyle || 'modern'] || 'font-sans';

    return (
        <div className={`min-h-screen ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-gray-900'} ${fontClass}`}>
            {/* Navbar */}
            <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/50 backdrop-blur-xl border-b border-gray-100/50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="font-extrabold text-2xl tracking-tighter" style={{ color: primary }}>
                        {site.businessName}
                    </div>
                    <div className="hidden md:flex gap-8 font-medium text-sm items-center">
                        <a href="#servicios" className="hover:opacity-70 transition">Servicios</a>
                        <a href="#nosotros" className="hover:opacity-70 transition">Nosotros</a>
                        <button className="px-6 py-2.5 rounded-full text-white font-bold transition transform hover:scale-105" style={{ backgroundColor: primary }}>
                            Contáctanos
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${primary} 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-opacity-10 mb-6 text-sm font-bold uppercase tracking-wider" style={{ backgroundColor: primary, color: primary }}>
                        {site.businessName} • Calidad Garantizada
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[1.1]">
                        {site.content.heroTitle}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-12 font-medium">
                        {site.content.heroSubtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-10 py-4 rounded-2xl text-white font-bold text-lg shadow-xl transition transform hover:-translate-y-1" style={{ backgroundColor: primary }}>
                            Agendar Cita
                        </button>
                        <button className="px-10 py-4 rounded-2xl font-bold text-lg border-2 transition hover:bg-gray-50 flex items-center justify-center gap-2" style={{ borderColor: primary, color: primary }}>
                            Ver Servicios <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section id="servicios" className="py-24 bg-gray-50/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black tracking-tighter mb-4">Nuestros Servicios</h2>
                        <div className="h-1.5 w-20 mx-auto rounded-full" style={{ backgroundColor: primary }}></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {site.content.services.map((service, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition group-hover:scale-110" style={{ backgroundColor: `${primary}15`, color: primary }}>
                                    <CheckCircle2 size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{service}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Ofrecemos la mejor atención y profesionalismo en cada {service.toLowerCase()} que realizamos.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="nosotros" className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl font-black tracking-tighter mb-8">
                                Líderes en {site.businessName}
                            </h2>
                            <div className="space-y-6 text-lg text-gray-600 font-medium leading-relaxed">
                                <p>{site.content.aboutText}</p>
                            </div>
                            <div className="mt-12 grid grid-cols-2 gap-8">
                                <div>
                                    <div className="text-4xl font-black mb-2" style={{ color: primary }}>10+</div>
                                    <div className="text-gray-400 font-bold uppercase text-xs tracking-widest">Años de Experiencia</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black mb-2" style={{ color: primary }}>100%</div>
                                    <div className="text-gray-400 font-bold uppercase text-xs tracking-widest">Satisfacción</div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
                            <div className="absolute inset-0 flex items-center justify-center text-white/20 font-black text-9xl select-none">
                                {site.businessName.charAt(0)}
                            </div>
                            <div className="absolute inset-0" style={{ background: `linear-gradient(45deg, ${primary}44, ${accent}88)` }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-zinc-950 text-white py-20 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                        <div>
                            <div className="text-2xl font-black tracking-tighter mb-6">
                                {site.businessName}
                            </div>
                            <p className="text-zinc-500 font-medium">
                                Transformando el mercado local con excelencia y compromiso.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-zinc-400 uppercase tracking-widest text-xs">Contacto</h4>
                            <div className="space-y-4 font-bold text-lg">
                                <div className="flex items-center gap-3"><Phone size={20} className="text-zinc-600" /> {site.content.contactPhone}</div>
                                <div className="flex items-center gap-3"><Mail size={20} className="text-zinc-600" /> {site.content.contactEmail}</div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-zinc-400 uppercase tracking-widest text-xs">Ubicación</h4>
                            <div className="flex items-center gap-3 font-bold text-lg">
                                <MapPin size={20} className="text-zinc-600" /> México
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-zinc-900 pt-10 text-center text-zinc-600 font-bold text-sm">
                        © {new Date().getFullYear()} {site.businessName}. Hecho con LocalClaw MX.
                    </div>
                </div>
            </footer>
            <AIChatbot site={site} />
        </div>
    );
}
