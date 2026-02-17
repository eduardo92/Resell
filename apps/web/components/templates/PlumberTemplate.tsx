
import { SiteConfig } from '@/lib/sites';
import { AIChatbot } from './AIChatbot';
import { Hammer, ShieldCheck, Clock, MapPin, Phone, ArrowRight, Star, Mail } from 'lucide-react';

export function PlumberTemplate({ site }: { site: SiteConfig }) {
    const primary = site.colors.primary;
    const accent = site.colors.accent || site.colors.primary;

    const fontClass = {
        'serif': 'font-serif',
        'modern': 'font-sans tracking-tight',
        'display': 'font-black tracking-tighter uppercase',
        'minimalist': 'font-light'
    }[site.visuals?.fontStyle || 'modern'] || 'font-sans';

    return (
        <div className={`min-h-screen bg-white text-slate-900 ${fontClass}`}>
            {/* Urgent Tag */}
            <div className="bg-red-600 text-white py-2 text-center text-xs font-black uppercase tracking-widest">
                Servicio de Emergencia 24/7 disponible en tu zona
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 font-black text-2xl tracking-tight uppercase" style={{ color: primary }}>
                        <Hammer size={28} /> {site.businessName}
                    </div>
                    <div className="hidden lg:flex items-center gap-8 font-bold text-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Clock size={16} /> <span className="text-slate-900">Respuesta rápida</span>
                        </div>
                        <a href={`tel:${site.content.contactPhone}`} className="px-6 py-3 rounded-xl text-white font-black flex items-center gap-2 shadow-lg active:scale-95 transition" style={{ backgroundColor: primary }}>
                            <Phone size={18} /> LLAMAR AHORA
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative py-24 bg-slate-50 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 pointer-events-none" style={{ backgroundColor: primary }}></div>
                <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="flex items-center gap-2 text-yellow-500 mb-4">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                            <span className="text-slate-400 text-xs font-bold ml-2">MÁS DE 500 CLIENTES SATISFECHOS</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
                            {site.content.heroTitle}
                        </h1>
                        <p className="text-xl text-slate-500 font-medium mb-12 max-w-lg">
                            {site.content.heroSubtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-10 py-5 rounded-2xl text-white font-black text-lg shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition" style={{ backgroundColor: primary }}>
                                Cotización Gratis <ArrowRight />
                            </button>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <div className="bg-white p-10 rounded-[3rem] shadow-2xl space-y-8 border border-slate-100">
                            <h3 className="text-2xl font-black">Nuestras Garantías</h3>
                            <div className="space-y-6">
                                {[
                                    { t: "Precios Justos", d: "Sin cuotas ocultas o sorpresas al final." },
                                    { t: "Garantía de Obra", d: "Todo nuestro trabajo está garantizado por escrito." },
                                    { t: "Técnicos Certificados", d: "Personal altamente capacitado y confiable." }
                                ].map((g, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${primary}15`, color: primary }}>
                                            <ShieldCheck size={24} />
                                        </div>
                                        <div>
                                            <div className="font-bold">{g.t}</div>
                                            <div className="text-sm text-slate-400 font-medium">{g.d}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Servicios Profesionales</h2>
                        <div className="h-2 w-20 mx-auto rounded-full" style={{ backgroundColor: primary }}></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {site.content.services.map((item, i) => (
                            <div key={i} className="p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all group">
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition" style={{ color: primary }}>
                                    <Hammer size={32} />
                                </div>
                                <h4 className="text-xl font-black mb-4">{item}</h4>
                                <p className="text-slate-500 font-medium text-sm mb-6 leading-relaxed">
                                    Realizamos {item.toLowerCase()} con las mejores herramientas y materiales del mercado para asegurar durabilidad.
                                </p>
                                <div className="text-sm font-bold flex items-center gap-2 group-hover:gap-4 transition-all" style={{ color: primary }}>
                                    SOLICITAR <ArrowRight size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24" style={{ backgroundColor: primary }}>
                <div className="container mx-auto px-6 text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-black mb-8">¿Tienes una Emergencia?</h2>
                    <p className="text-white/80 text-xl font-medium mb-12 max-w-2xl mx-auto">
                        No esperes a que el problema empeore. Nuestros técnicos están listos para salir a tu domicilio.
                    </p>
                    <a href={`tel:${site.content.contactPhone}`} className="inline-flex items-center gap-4 bg-white text-slate-900 px-12 py-6 rounded-3xl font-black text-2xl shadow-2xl active:scale-95 transition">
                        <Phone size={28} /> {site.content.contactPhone}
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 bg-slate-900 text-white">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex items-center justify-center gap-2 font-black text-2xl tracking-tight uppercase mb-12" style={{ color: primary }}>
                        <Hammer size={28} /> {site.businessName}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 text-left max-w-4xl mx-auto">
                        <div>
                            <div className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6">Nosotros</div>
                            <p className="text-slate-400 font-medium leading-relaxed">{site.content.aboutText}</p>
                        </div>
                        <div>
                            <div className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6">Contacto</div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 font-bold"><MapPin size={20} className="text-slate-600" /> México</div>
                                <div className="flex items-center gap-3 font-bold"><Mail size={20} className="text-slate-600" /> {site.content.contactEmail}</div>
                                <div className="flex items-center gap-3 font-bold"><Phone size={20} className="text-slate-600" /> {site.content.contactPhone}</div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-10 border-t border-slate-800 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} {site.businessName} • LOCALCLAW MX SERVICES
                    </div>
                </div>
            </footer>
            <AIChatbot site={site} />
        </div>
    );
}
