
import { SiteConfig } from '@/lib/sites';
import { AIChatbot } from './AIChatbot';
import { CheckCircle2, Phone, Mail, MapPin, ArrowRight, Star, Instagram, Facebook, Globe, Clock, MessageCircle } from 'lucide-react';

export function GenericTemplate({ site }: { site: SiteConfig }) {
    const primary = site.colors.primary;
    const isDark = site.visuals?.theme === 'dark';

    const fontClass = {
        'serif': 'font-serif',
        'modern': 'font-sans tracking-tight',
        'display': 'font-black tracking-tighter',
        'minimalist': 'font-light'
    }[site.visuals?.fontStyle || 'modern'] || 'font-sans';

    return (
        <div className={`min-h-screen ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'} ${fontClass} selection:bg-zinc-200`}>
            {/* Navbar */}
            <nav className={`fixed w-full z-50 top-0 bg-white/70 backdrop-blur-2xl border-b border-zinc-100/50`}>
                <div className="container mx-auto px-6 py-5 flex justify-between items-center">
                    <div className="font-extrabold text-2xl tracking-tighter flex items-center gap-3" style={{ color: primary }}>
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-sm" style={{ backgroundColor: primary }}>
                            {site.businessName.charAt(0)}
                        </div>
                        {site.businessName}
                    </div>
                    <div className="hidden md:flex gap-10 font-black text-[10px] items-center tracking-[0.2em] uppercase text-zinc-400">
                        <a href="#services" className="hover:text-zinc-900 transition">Especialidades</a>
                        <a href="#about" className="hover:text-zinc-900 transition">Propuesta</a>
                        <a href="#contact" className="hover:text-zinc-900 transition">Contacto</a>
                        <button className="px-8 py-3.5 rounded-2xl text-white font-black transition transform hover:scale-105 shadow-xl shadow-zinc-200" style={{ backgroundColor: primary }}>
                            SOLICITAR INFO
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-40 pb-32 overflow-hidden bg-zinc-900">
                {site.visuals?.heroImage && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={site.visuals.heroImage}
                            alt={site.businessName}
                            className="w-full h-full object-cover opacity-40 animate-slow-zoom"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent"></div>
                    </div>
                )}
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                    <div className="text-center lg:text-left text-white">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-white">
                            Líderes en Calidad Elite
                        </div>
                        <h1 className="text-6xl md:text-[6.5rem] font-black mb-10 leading-[0.9] tracking-tighter drop-shadow-2xl">
                            {site.content.heroTitle}
                        </h1>
                        <p className="text-2xl text-zinc-300 font-medium max-w-xl mx-auto lg:mx-0 mb-12 leading-relaxed">
                            {site.content.heroSubtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
                            <button className="px-12 py-7 rounded-3xl text-white font-black text-xl shadow-2xl transition transform hover:-translate-y-2 flex items-center justify-center gap-3" style={{ backgroundColor: primary }}>
                                COMENZAR AHORA <ArrowRight />
                            </button>
                            <a href="#contact" className="px-10 py-7 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/20 transition text-white">
                                <MapPin size={18} /> Ver Ubicación
                            </a>
                        </div>
                    </div>

                    <div className="relative group hidden lg:block">
                        <div className="absolute -inset-10 bg-white/10 opacity-20 blur-3xl rounded-full"></div>
                        <div className="relative aspect-square bg-white/5 backdrop-blur-3xl p-6 rounded-[5rem] overflow-hidden shadow-2xl border border-white/10 group">
                            {site.visuals?.gallery && site.visuals.gallery[0] ? (
                                <img src={site.visuals.gallery[0]} className="w-full h-full object-cover rounded-[4rem] group-hover:scale-105 transition duration-700" alt="Gallery preview" />
                            ) : (
                                <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center font-black text-[18rem] text-zinc-700 leading-none italic select-none">
                                    {site.businessName.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            {site.content.features && (
                <section className="py-24 bg-white border-y border-zinc-100">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            {site.content.features.map((f, i) => (
                                <div key={i} className="group">
                                    <h4 className="text-2xl font-black mb-4 tracking-tight group-hover:translate-x-2 transition duration-500">{f.title}</h4>
                                    <p className="text-zinc-500 leading-relaxed font-medium mb-6">{f.description}</p>
                                    <div className="w-12 h-1 bg-zinc-100 group-hover:w-24 transition-all duration-500" style={{ backgroundColor: i % 2 === 0 ? primary : '#eee' }}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Services Grid */}
            <section id="services" className="py-32 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8">Nuestros Servicios de Autor</h2>
                        <p className="text-xl text-zinc-400 font-medium leading-relaxed">Cada proceso está diseñado bajo los más altos estándares internacionales, garantizando una ejecución impecable.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {site.content.services.map((service, i) => (
                            <div key={i} className="bg-zinc-50 p-12 rounded-[4rem] hover:bg-zinc-100/50 transition duration-500 group relative flex flex-col justify-between items-start border border-transparent hover:border-zinc-200">
                                <div className="p-6 rounded-3xl bg-white shadow-sm mb-10 transition group-hover:scale-110" style={{ color: primary }}>
                                    <CheckCircle2 size={32} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black mb-6 tracking-tight italic uppercase">{service}</h3>
                                    <p className="text-zinc-500 text-lg leading-relaxed font-medium mb-10">
                                        Especialistas dedicados a la excelencia en {service.toLowerCase()}, utilizando metodologías exclusivas de {site.businessName}.
                                    </p>
                                </div>
                                <button className="font-black text-sm uppercase tracking-widest underline decoration-2 underline-offset-8" style={{ color: primary }}>Contactar</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-32 bg-zinc-950 text-white relative flex items-center">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `linear-gradient(45deg, ${primary} 0%, transparent 50%)` }}></div>
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                    <div className="p-16 rounded-[5rem] bg-white/5 backdrop-blur-3xl border border-white/10">
                        <h2 className="text-5xl font-black mb-12 leading-none uppercase italic tracking-tighter">La Visión Detrás de {site.businessName}</h2>
                        <div className="space-y-8 text-xl text-zinc-300 font-medium leading-relaxed italic">
                            <p>{site.content.aboutText}</p>
                        </div>
                        <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-5xl font-black mb-2" style={{ color: primary }}>100%</div>
                                <div className="text-zinc-500 font-black uppercase text-[10px] tracking-widest">Satisfacción Elite</div>
                            </div>
                            <div>
                                <div className="text-5xl font-black mb-2" style={{ color: primary }}>Premium</div>
                                <div className="text-zinc-500 font-black uppercase text-[10px] tracking-widest">Estatus de Marca</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                        {site.content.testimonials && site.content.testimonials.map((t, i) => (
                            <div key={i} className="p-10 bg-white text-zinc-900 rounded-[3rem] shadow-2xl skew-y-1 hover:skew-y-0 transition duration-700">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />)}
                                </div>
                                <p className="text-xl font-bold leading-snug mb-8">"{t.text}"</p>
                                <div className="font-black uppercase text-xs tracking-widest text-zinc-400">{t.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact & Map & Info */}
            <section id="contact" className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                        <div className="lg:col-span-1 space-y-8">
                            <div className="p-12 rounded-[4rem] bg-zinc-50 border border-zinc-100 shadow-sm flex flex-col justify-between">
                                <h2 className="text-4xl font-black mb-10 tracking-tighter italic">Línea Directa</h2>
                                <div className="space-y-8">
                                    <div className="flex items-center gap-6 group">
                                        <a href={`tel:${site.content.contactPhone}`} className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition duration-500" style={{ color: primary }}><Phone size={24} /></a>
                                        <a href={`tel:${site.content.contactPhone}`} className="text-2xl font-black tracking-tight underline decoration-zinc-100">{site.content.contactPhone}</a>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center shrink-0" style={{ color: primary }}><Mail size={24} /></div>
                                        <div className="text-sm font-bold truncate opacity-60">{site.content.contactEmail || `hola@${site.slug}.mx`}</div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center shrink-0" style={{ color: primary }}><MapPin size={24} /></div>
                                        <div className="text-lg font-bold">{site.content.address || 'Ubicación Premium'}</div>
                                    </div>
                                </div>
                                <a
                                    href={`https://wa.me/${site.content.contactPhone.replace(/\D/g, '')}`}
                                    target="_blank"
                                    className="mt-12 px-8 py-5 rounded-[2rem] bg-[#25D366] text-white font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:scale-105 transition flex items-center justify-center gap-3"
                                >
                                    <MessageCircle size={18} /> WhatsApp Directo
                                </a>
                            </div>

                            <div className="p-12 rounded-[4rem] bg-zinc-950 text-white shadow-2xl">
                                <Clock className="mb-8 opacity-40 text-coral-400" size={32} />
                                <h3 className="text-xl font-black mb-6 tracking-tighter uppercase italic">Horarios de Atención</h3>
                                <div className="space-y-4 opacity-80 text-sm font-bold">
                                    {site.content.businessHours ? Object.entries(site.content.businessHours).map(([days, time]) => (
                                        <div key={days} className="flex justify-between border-b border-white/5 pb-2"><span>{days}</span> <span>{time}</span></div>
                                    )) : <div className="flex justify-between border-b border-white/5 pb-2"><span>Lunes-Sábado</span> <span>9:00 - 18:00</span></div>}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2 rounded-[5rem] overflow-hidden border-8 border-white bg-zinc-50 shadow-2xl relative min-h-[600px] group">
                            {site.content.googlePlaceId || site.content.address ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(0.5) contrast(1.2)' }}
                                    src={site.content.googlePlaceId
                                        ? `https://www.google.com/maps?q=place_id:${site.content.googlePlaceId}&output=embed`
                                        : `https://www.google.com/maps?q=${encodeURIComponent(site.businessName + ' ' + site.content.address)}&output=embed`}
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center font-black text-zinc-100 text-7xl select-none italic">UBICACIÓN</div>
                            )}
                            <div className="absolute inset-0 pointer-events-none border-[3rem] border-white/10 group-hover:border-transparent transition-all duration-700 rounded-[5rem]"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sticky Action Bar */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-4">
                <a
                    href={`tel:${site.content.contactPhone}`}
                    className="flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-950 text-white shadow-2xl shadow-black/40 font-black uppercase text-xs tracking-widest hover:scale-110 hover:-translate-y-1 transition active:scale-95"
                >
                    <Phone size={18} /> LLAMAR
                </a>
                <a
                    href={`https://wa.me/${site.content.contactPhone.replace(/\D/g, '')}`}
                    target="_blank"
                    className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white shadow-2xl shadow-green-500/40 font-black uppercase text-xs tracking-widest hover:scale-110 hover:-translate-y-1 transition active:scale-95"
                >
                    <MessageCircle size={18} /> WHATSAPP
                </a>
            </div>

            {/* Footer */}
            <footer className="bg-white py-20 border-t border-zinc-100">
                <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-12">
                    <div className="font-extrabold text-3xl tracking-tighter" style={{ color: primary }}>{site.businessName}</div>
                    <div className="flex gap-10 font-black text-[10px] tracking-widest uppercase text-zinc-300">
                        <a href="#" className="hover:text-zinc-900 transition">Instagram</a>
                        <a href="#" className="hover:text-zinc-900 transition">Facebook</a>
                        <a href="#" className="hover:text-zinc-900 transition">LinkedIn</a>
                    </div>
                    <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">
                        © {new Date().getFullYear()} {site.businessName.toUpperCase()} • POWERED BY LOCALCLAW
                    </p>
                </div>
            </footer>
            <AIChatbot site={site} />
        </div>
    );
}
