
import { SiteConfig } from '@/lib/sites';
import { AIChatbot } from './AIChatbot';
import { Hammer, ShieldCheck, Clock, MapPin, Phone, ArrowRight, Star, Mail, CheckCircle2, ChevronRight, MessageSquare, Instagram, Facebook } from 'lucide-react';

export function PlumberTemplate({ site }: { site: SiteConfig }) {
    const primary = site.colors.primary;
    const isDark = site.visuals?.theme === 'dark';

    const fontClass = {
        'serif': 'font-serif',
        'modern': 'font-sans tracking-tight',
        'display': 'font-black tracking-tight uppercase',
        'minimalist': 'font-light tracking-wide'
    }[site.visuals?.fontStyle || 'modern'] || 'font-sans';

    return (
        <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'} ${fontClass} selection:bg-blue-100`}>
            {/* Top Bar Call to Action */}
            <div className="sticky top-0 z-[60] bg-zinc-900 text-white py-3">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs md:text-sm font-black uppercase tracking-widest">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        Servicio 24/7 Disponible en tu zona
                    </div>
                    <a href={`tel:${site.content.contactPhone}`} className="text-sm font-black flex items-center gap-2 hover:text-coral-400 transition">
                        <Phone size={16} /> <span className="hidden sm:inline">LLAMAR AHORA:</span> {site.content.contactPhone}
                    </a>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="relative z-50 bg-white shadow-xl shadow-slate-200/50 border-b border-slate-100">
                <div className="container mx-auto px-6 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-3 font-black text-2xl tracking-tighter uppercase italic" style={{ color: primary }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: primary }}>
                            <Hammer size={24} />
                        </div>
                        {site.businessName}
                    </div>
                    <div className="hidden lg:flex items-center gap-10 font-black text-[10px] tracking-[0.2em] uppercase text-slate-400">
                        <a href="#about" className="hover:text-slate-900 transition">Nosotros</a>
                        <a href="#services" className="hover:text-slate-900 transition">Servicios</a>
                        <a href="#contact" className="hover:text-slate-900 transition">Ubicación</a>
                        <button className="px-8 py-4 rounded-xl text-white shadow-2xl transition transform hover:scale-105" style={{ backgroundColor: primary }}>
                            SOLICITAR COTIZACIÓN
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-20 pb-40 overflow-hidden bg-slate-900">
                {site.visuals?.heroImage && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={site.visuals.heroImage}
                            alt={site.businessName}
                            className="w-full h-full object-cover opacity-30 animate-slow-zoom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950/20"></div>
                    </div>
                )}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(${primary} 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
                <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="text-white">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 mb-8 text-[11px] font-black uppercase tracking-widest text-white/70">
                            <ShieldCheck size={16} className="text-green-400" /> Profesionales Certificados
                        </div>
                        <h1 className="text-6xl md:text-[5.5rem] font-black mb-8 leading-[0.9] tracking-tight text-white">
                            {site.content.heroTitle}
                        </h1>
                        <p className="text-2xl text-slate-300 font-medium mb-12 leading-relaxed max-w-xl">
                            {site.content.heroSubtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <button className="px-12 py-7 rounded-2xl text-white font-black text-xl shadow-2xl transition-all transform hover:-translate-y-2 flex items-center justify-center gap-4" style={{ backgroundColor: primary }}>
                                <MessageSquare /> AGENDA POR WHATSAPP
                            </button>
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                                <div className="p-3 bg-yellow-500/10 rounded-xl">
                                    <Star className="text-yellow-400 fill-current" />
                                </div>
                                <div className="text-white">
                                    <div className="font-black text-lg">4.9/5 Estrellas</div>
                                    <div className="text-xs text-white/50 font-bold uppercase tracking-widest">Google Reviews</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative group hidden lg:block">
                        <div className="absolute -inset-10 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>
                        <div className="relative bg-white/5 backdrop-blur-3xl p-4 rounded-[4rem] shadow-2xl border border-white/10 overflow-hidden transform group-hover:rotate-1 transition duration-700">
                            <div className="aspect-[4/3] bg-slate-800 rounded-[3.2rem] flex items-center justify-center overflow-hidden">
                                {site.visuals?.gallery && site.visuals.gallery[0] ? (
                                    <img src={site.visuals.gallery[0]} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="Plumbing 1" />
                                ) : (
                                    <div className="text-slate-700 font-black text-[12rem] italic select-none">
                                        {site.businessName.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                {site.visuals?.gallery?.slice(1, 4).map((img, i) => (
                                    <div key={i} className="h-24 bg-slate-800 rounded-2xl overflow-hidden border border-white/5">
                                        <img src={img} className="w-full h-full object-cover" alt={`Gallery ${i + 2}`} />
                                    </div>
                                )) || [1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-800/50 rounded-2xl border border-white/5"></div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Trust Signals / Features */}
            {site.content.features && (
                <section className="py-32 bg-white -mt-20 relative z-20 container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {site.content.features.map((f, i) => (
                            <div key={i} className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:shadow-2xl transition duration-500">
                                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-10" style={{ color: primary }}>
                                    <CheckCircle2 size={32} />
                                </div>
                                <h4 className="text-2xl font-black mb-4 tracking-tight">{f.title}</h4>
                                <p className="text-slate-500 leading-relaxed font-medium">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Services List */}
            <section id="services" className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
                        <div className="max-w-2xl">
                            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8">Soluciones Integrales</h2>
                            <p className="text-xl text-slate-400 font-medium">Equipados con tecnología de punta para diagnosticar y reparar cualquier falla en tiempo récord.</p>
                        </div>
                        <a href={`tel:${site.content.contactPhone}`} className="font-black text-xl italic underline decoration-4 underline-offset-8" style={{ color: primary }}>
                            URGENCIAS 24H <ChevronRight className="inline" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {site.content.services.map((item, i) => (
                            <div key={i} className="p-12 rounded-[3.5rem] border-2 border-slate-100 hover:border-slate-900 transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 text-slate-100 font-black text-8xl leading-none select-none group-hover:text-slate-50 transition duration-500">
                                    0{i + 1}
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-3xl font-black mb-6 tracking-tight group-hover:translate-x-2 transition duration-500">{item}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed mb-10 max-w-xs uppercase text-xs tracking-widest">Servicio Garantizado por Escrito</p>
                                    <button className="flex items-center gap-3 font-black text-sm uppercase tracking-widest text-slate-950 group-hover:gap-6 transition-all">
                                        LO NECESITO <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {site.content.testimonials && (
                <section className="py-32 bg-slate-950 text-white overflow-hidden">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-tight">La confianza es nuestro mayor éxito.</h2>
                                <div className="p-12 rounded-[4rem] bg-white text-slate-900">
                                    <div className="flex gap-2 mb-8">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} fill="#EAB308" className="text-yellow-500" />)}
                                    </div>
                                    <p className="text-2xl font-bold tracking-tight italic leading-relaxed mb-10">
                                        "{site.content.testimonials[0].text}"
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                                        <div className="font-black uppercase text-sm tracking-widest">{site.content.testimonials[0].name}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-8">
                                {site.content.testimonials.slice(1).map((t, i) => (
                                    <div key={i} className="p-10 rounded-[3rem] border border-white/10 bg-white/5">
                                        <div className="flex gap-1 mb-6">
                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" className="text-yellow-500 opacity-50" />)}
                                        </div>
                                        <p className="text-lg font-medium text-slate-300 italic mb-6">"{t.text}"</p>
                                        <div className="font-black uppercase text-[10px] tracking-[0.3em]">{t.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Contact & Map & Hours */}
            <section id="contact" className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
                        <div className="lg:col-span-1 p-12 rounded-[4rem] bg-slate-900 text-white flex flex-col justify-between shadow-2xl">
                            <div>
                                <h2 className="text-4xl font-black mb-12 tracking-tight">Atención Técnica Inmediata</h2>
                                <div className="space-y-10">
                                    <div className="flex gap-6">
                                        <Clock className="shrink-0 text-slate-500" />
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Horarios de Oficina</div>
                                            <div className="space-y-1 text-sm font-bold">
                                                {site.content.businessHours ? Object.entries(site.content.businessHours).map(([days, time]) => (
                                                    <div key={days}><span className="text-slate-500">{days}:</span> {time}</div>
                                                )) : <div>Lunes-Sábado: 8:00 AM - 8:00 PM</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <MapPin className="shrink-0 text-slate-500" />
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Ubicación Central</div>
                                            <div className="text-lg font-black">{site.content.address || 'Ciudad de México'}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <Mail className="shrink-0 text-slate-500" />
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Email Corporativo</div>
                                            <div className="text-sm font-bold truncate underline decoration-blue-500 underline-offset-4">{site.content.contactEmail || `contacto@${site.slug}.mx`}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <a href={`tel:${site.content.contactPhone}`} className="px-8 py-5 rounded-3xl bg-white text-slate-950 font-black text-center shadow-xl hover:scale-105 transition active:scale-95 block w-full">
                                    LLAMAR: {site.content.contactPhone}
                                </a>
                                <a
                                    href={`https://wa.me/${site.content.contactPhone.replace(/\D/g, '')}`}
                                    target="_blank"
                                    className="px-8 py-5 rounded-3xl bg-[#25D366] text-white font-black text-center shadow-xl hover:scale-105 transition active:scale-95 flex items-center justify-center gap-3 w-full"
                                >
                                    <MessageSquare size={18} /> ASISTENCIA WHATSAPP
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-2 rounded-[4rem] overflow-hidden border-8 border-slate-50 shadow-inner bg-slate-50 relative min-h-[500px]">
                            {site.content.googlePlaceId || site.content.address ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'contrast(1.2)' }}
                                    src={site.content.googlePlaceId
                                        ? `https://www.google.com/maps?q=place_id:${site.content.googlePlaceId}&output=embed`
                                        : `https://www.google.com/maps?q=${encodeURIComponent(site.businessName + ' ' + site.content.address)}&output=embed`}
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center font-black text-slate-200 text-4xl uppercase tracking-tighter">
                                    Mapa de Cobertura
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Sticky Action Bar */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-4">
                <a
                    href={`tel:${site.content.contactPhone}`}
                    className="flex items-center gap-3 px-8 py-4 rounded-full bg-slate-900 text-white shadow-2xl shadow-black/40 font-black uppercase text-xs tracking-widest hover:scale-110 hover:-translate-y-1 transition active:scale-95"
                >
                    <Phone size={18} /> LLAMAR
                </a>
                <a
                    href={`https://wa.me/${site.content.contactPhone.replace(/\D/g, '')}`}
                    target="_blank"
                    className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white shadow-2xl shadow-green-500/40 font-black uppercase text-xs tracking-widest hover:scale-110 hover:-translate-y-1 transition active:scale-95"
                >
                    <MessageSquare size={18} /> WHATSAPP
                </a>
            </div>

            {/* Footer */}
            <footer className="py-20 bg-white border-t border-slate-100">
                <div className="container mx-auto px-6 flex flex-col items-center">
                    <div className="flex items-center gap-2 font-black text-3xl tracking-tight uppercase italic mb-8" style={{ color: primary }}>
                        <Hammer size={32} /> {site.businessName}
                    </div>
                    <div className="flex gap-8 mb-12">
                        <Instagram className="text-slate-300 hover:text-slate-900 transition" />
                        <Facebook className="text-slate-300 hover:text-slate-900 transition" />
                    </div>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] text-center">
                        © {new Date().getFullYear()} {site.businessName} • HECHO PARA EL ÉXITO COMERCIAL • MÉXICO
                    </p>
                </div>
            </footer>
            <AIChatbot site={site} />
        </div>
    );
}
