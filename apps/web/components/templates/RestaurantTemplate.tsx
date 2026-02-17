
import { SiteConfig } from '@/lib/sites';
import { AIChatbot } from './AIChatbot';
import { Utensils, Clock, MapPin, Phone, Instagram, Facebook } from 'lucide-react';

export function RestaurantTemplate({ site }: { site: SiteConfig }) {
    const primary = site.colors.primary;
    const secondary = site.colors.secondary;
    const accent = site.colors.accent || site.colors.primary;
    const isDark = site.visuals?.theme === 'dark';

    const fontClass = {
        'serif': 'font-serif',
        'modern': 'font-sans tracking-tight',
        'display': 'font-black tracking-tighter italic',
        'minimalist': 'font-light'
    }[site.visuals?.fontStyle || 'display'] || 'font-sans';

    return (
        <div className={`min-h-screen ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-gray-900'} ${fontClass} uppercase-none`}>
            {/* Navbar */}
            <nav className="fixed w-full z-50 top-0 bg-white/70 backdrop-blur-2xl border-b border-gray-100/50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="font-black text-2xl tracking-tighter italic" style={{ color: primary }}>
                        {site.businessName}
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-2 rounded-full font-bold text-white shadow-lg transition transform hover:scale-105" style={{ backgroundColor: primary }}>
                            Reservar
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-40 pb-32 overflow-hidden bg-zinc-50">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${primary} 0%, transparent 70%)` }}></div>
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-gray-100 mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
                            <Utensils size={14} style={{ color: primary }} /> Experiencia Gourmet
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                            {site.content.heroTitle}
                        </h1>
                        <p className="text-xl text-gray-500 font-medium max-w-lg mb-12">
                            {site.content.heroSubtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="px-10 py-5 rounded-2xl text-white font-black text-lg shadow-2xl transition transform hover:-translate-y-1" style={{ backgroundColor: primary }}>
                                Ver Menú Completo
                            </button>
                            <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white shadow-sm border border-gray-100">
                                <div className="text-left">
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Ubicación</div>
                                    <div className="font-bold text-sm">Ciudad de México</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-tr opacity-20 blur-3xl rounded-[4rem] pointer-events-none" style={{ backgroundImage: `linear-gradient(to top right, ${primary}, ${accent})` }}></div>
                        <div className="relative aspect-[4/5] bg-zinc-200 rounded-[3rem] overflow-hidden shadow-2xl skew-y-3 transition group-hover:skew-y-0 duration-700">
                            <div className="absolute inset-0 flex items-center justify-center font-black text-9xl text-white/30 italic underline decoration-8 underline-offset-8" style={{ textDecorationColor: accent }}>
                                {site.businessName.charAt(0)}
                            </div>
                            <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Specialties Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-16">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-black tracking-tighter mb-4">Especialidades del Chef</h2>
                            <p className="text-gray-500 font-medium">Sabores auténticos preparados con los ingredientes más frescos de la temporada.</p>
                        </div>
                        <div className="hidden md:block h-px flex-1 mx-12 bg-gray-100"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {site.content.services.map((item, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="aspect-square bg-zinc-100 rounded-3xl mb-6 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                    <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-white opacity-0 group-hover:opacity-100 transition duration-500 transform translate-y-4 group-hover:translate-y-0">
                                        LO QUIERO
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-1">{item}</h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm font-medium">Receta Tradicional</span>
                                    <span className="font-black" style={{ color: primary }}>$245</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 bg-zinc-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-black tracking-tighter mb-8 leading-tight">
                            " {site.content.aboutText} "
                        </h2>
                        <div className="flex justify-center gap-2 mb-12">
                            {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primary }}></div>)}
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Cards */}
            <section className="py-24">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-10 rounded-3xl bg-zinc-950 text-white">
                        <Clock className="mb-6 opacity-30" size={32} />
                        <h4 className="text-xl font-bold mb-4">Horario</h4>
                        <p className="text-zinc-500 font-medium">Lunes - Domingo<br />1:00 PM - 11:00 PM</p>
                    </div>
                    <div className="p-10 rounded-3xl border-2 border-gray-100">
                        <MapPin className="mb-6 opacity-30" size={32} style={{ color: primary }} />
                        <h4 className="text-xl font-bold mb-4">Ubicación</h4>
                        <p className="text-gray-500 font-medium">Av. Insurgentes Sur 1234<br />Ciudad de México</p>
                    </div>
                    <div className="p-10 rounded-3xl" style={{ backgroundColor: primary + '10' }}>
                        <Phone className="mb-6 opacity-30" size={32} style={{ color: primary }} />
                        <h4 className="text-xl font-bold mb-4">Reservaciones</h4>
                        <p className="font-black text-2xl" style={{ color: primary }}>{site.content.contactPhone}</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-20">
                <div className="container mx-auto px-6 flex flex-col items-center">
                    <div className="font-black text-3xl tracking-tighter italic mb-10" style={{ color: primary }}>
                        {site.businessName}
                    </div>
                    <div className="flex gap-8 mb-12">
                        <Instagram className="text-gray-300 hover:text-black transition cursor-pointer" />
                        <Facebook className="text-gray-300 hover:text-black transition cursor-pointer" />
                    </div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                        © {new Date().getFullYear()} {site.businessName} • Hecho con LocalClaw
                    </p>
                </div>
            </footer>
            <AIChatbot site={site} />
        </div>
    );
}
