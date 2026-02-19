
import { SiteConfig } from '@/lib/sites';
import { AIChatbot } from './AIChatbot';
import { Utensils, Clock, MapPin, Phone, Instagram, Facebook, Star, CheckCircle, ChevronDown, MessageCircle, CheckCircle2, Globe } from 'lucide-react';

export function RestaurantTemplate({ site }: { site: SiteConfig }) {
    const primary = site.colors.primary;
    const secondary = site.colors.secondary;
    const accent = site.colors.accent || site.colors.primary;
    const isDark = site.visuals?.theme === 'dark';
    const isGlass = site.visuals?.theme === 'glass';

    const fontClass = {
        'serif': 'font-serif',
        'modern': 'font-sans tracking-tight',
        'display': 'font-black tracking-tighter italic',
        'minimalist': 'font-light'
    }[site.visuals?.fontStyle || 'display'] || 'font-sans';

    return (
        <div className={`min-h-screen ${isDark ? 'bg-zinc-950 text-zinc-100' : isGlass ? 'bg-zinc-50' : 'bg-white text-zinc-900'} ${fontClass} selection:bg-coral-200`}>
            {/* Navbar */}
            <nav className={`fixed w-full z-50 top-0 ${isGlass ? 'bg-white/40 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-md'} border-b border-zinc-100/50`}>
                <div className="container mx-auto px-6 py-5 flex justify-between items-center">
                    <div className="font-black text-2xl tracking-tighter italic flex items-center gap-2" style={{ color: primary }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-base overflow-hidden" style={{ backgroundColor: primary }}>
                            {site.businessName.charAt(0)}
                        </div>
                        {site.businessName}
                    </div>
                    <div className="hidden md:flex gap-8 items-center text-sm font-bold uppercase tracking-widest text-zinc-400">
                        <a href="#menu" className="hover:text-zinc-900 transition">Menú</a>
                        <a href="#about" className="hover:text-zinc-900 transition">Nosotros</a>
                        <a href="#contact" className="hover:text-zinc-900 transition">Contacto</a>
                        <button className="px-8 py-3 rounded-full font-black text-white shadow-xl shadow-coral-500/20 transition transform hover:scale-105" style={{ backgroundColor: primary }}>
                            RESERVAR AHORA
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden bg-zinc-900">
                {site.visuals?.heroImage && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={site.visuals.heroImage}
                            alt={site.businessName}
                            className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent"></div>
                    </div>
                )}
                <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 80% 20%, ${primary}33 0%, transparent 60%)` }}></div>

                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                    <div className="text-center lg:text-left text-white">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                            <Star size={14} className="fill-current text-yellow-400" />
                            {site.content.heroSubtitle.split(' ').slice(0, 3).join(' ')}
                        </div>
                        <h1 className="text-7xl md:text-[7.5rem] font-black mb-10 leading-[0.85] tracking-tighter drop-shadow-2xl">
                            {site.content.heroTitle}
                        </h1>
                        <p className="text-xl text-zinc-300 font-medium max-w-xl mx-auto lg:mx-0 mb-12 leading-relaxed">
                            {site.content.heroSubtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
                            <button className="px-12 py-6 rounded-3xl text-white font-black text-xl shadow-2xl shadow-coral-500/40 transition transform hover:-translate-y-2" style={{ backgroundColor: primary }}>
                                EXPLORAR EL MENÚ
                            </button>
                            <a href="#contact" className="flex items-center justify-center gap-4 px-8 py-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold hover:bg-white/20 transition">
                                <MapPin size={20} style={{ color: primary }} />
                                Visítanos Hoy
                            </a>
                        </div>
                    </div>

                    <div className="relative group hidden lg:block">
                        <div className="absolute -inset-10 bg-gradient-to-tr from-coral-100 to-indigo-100 opacity-20 blur-[100px] rounded-full"></div>
                        <div className="relative aspect-[4/5] bg-zinc-800 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex items-center justify-center group border-4 border-white/5">
                            {site.visuals?.gallery && site.visuals.gallery[0] ? (
                                <img src={site.visuals.gallery[0]} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="Gallery 1" />
                            ) : (
                                <div className="absolute inset-0 bg-zinc-200 flex items-center justify-center font-black text-[15rem] leading-none text-white/50 italic select-none group-hover:scale-110 transition duration-700">
                                    {site.businessName.charAt(0)}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-10 left-10 right-10 p-8 bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl">
                                <div className="text-xs font-black uppercase tracking-widest mb-1 text-white opacity-80">Experiencia Única</div>
                                <div className="text-2xl font-black text-white">{site.businessName}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features / Value Proposition */}
            {site.content.features && (
                <section className="py-32 bg-zinc-50 border-y border-zinc-100 italic">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            {site.content.features.map((f, i) => (
                                <div key={i} className="group flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-[2rem] bg-white shadow-2xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-3 transition duration-500 border border-zinc-50" style={{ color: primary }}>
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h4 className="text-3xl font-black tracking-tighter mb-6 uppercase italic">{f.title}</h4>
                                    <p className="text-zinc-400 leading-relaxed font-bold text-lg max-w-xs">{f.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Specialties / Menu */}
            <section id="menu" className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 underline decoration-zinc-100 underline-offset-8 uppercase italic leading-none">Especialidades <span style={{ color: primary }}>de Autor</span></h2>
                        <p className="text-xl text-zinc-400 font-medium max-w-2xl mx-auto italic">Una curaduría de sabores que definen nuestra identidad gastronómica.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {site.content.services.map((item, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="aspect-[4/5] bg-zinc-50 rounded-[3rem] mb-8 overflow-hidden relative shadow-2xl shadow-zinc-200/50 border border-zinc-100">
                                    {site.visuals?.gallery && site.visuals.gallery[i + 1] ? (
                                        <img src={site.visuals.gallery[i + 1]} alt={item} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-9xl font-black text-zinc-100 italic group-hover:scale-110 transition duration-700">
                                            {item.charAt(0)}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-8">
                                        <button className="bg-white text-zinc-900 font-black px-6 py-4 rounded-2xl transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition duration-500 shadow-2xl flex items-center gap-2 text-xs">
                                            <Utensils size={14} /> DETALLES
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start mb-2 px-2">
                                    <h3 className="text-2xl font-black tracking-tight uppercase italic">{item}</h3>
                                    <div className="text-xl font-black" style={{ color: primary }}>$$</div>
                                </div>
                                <p className="text-zinc-400 text-sm font-medium px-2">Preparado al momento con ingredientes de la más alta calidad y técnica artesanal.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {site.content.testimonials && (
                <section className="py-32 bg-zinc-950 text-white overflow-hidden relative">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 80%, ${primary} 0%, transparent 40%)` }}></div>
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
                            <h2 className="text-5xl font-black tracking-tighter flex-shrink-0">Lo que dicen de nosotros</h2>
                            <div className="h-2 flex-grow bg-white/10 rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {site.content.testimonials.map((t, i) => (
                                <div key={i} className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-xl relative">
                                    <div className="flex gap-1 mb-8">
                                        {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />)}
                                    </div>
                                    <p className="text-2xl font-medium leading-relaxed mb-10 italic text-zinc-300">"{t.text}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-black">{t.name.charAt(0)}</div>
                                        <div className="font-bold tracking-tight">{t.name}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            {site.content.faqs && (
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl font-black tracking-tighter mb-4">Preguntas Frecuentes</h2>
                            <p className="text-zinc-400 font-medium">Todo lo que necesitas saber antes de visitarnos.</p>
                        </div>
                        <div className="space-y-6">
                            {site.content.faqs.map((faq, i) => (
                                <details key={i} className="group p-8 rounded-3xl bg-zinc-50 cursor-pointer border border-transparent hover:border-zinc-200 transition">
                                    <summary className="list-none flex justify-between items-center font-black text-xl tracking-tight">
                                        {faq.question}
                                        <ChevronDown className="group-open:rotate-180 transition duration-300" />
                                    </summary>
                                    <p className="mt-6 text-zinc-500 leading-relaxed font-medium">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact & Map & Hours */}
            <section id="contact" className="py-32 bg-zinc-50 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
                        <div className="flex flex-col justify-between">
                            <div>
                                <h2 className="text-6xl font-black tracking-tighter mb-12">Encuéntranos</h2>
                                <div className="space-y-12">
                                    <div className="flex gap-8 group">
                                        <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition duration-500" style={{ color: primary }}>
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Dirección</div>
                                            <div className="text-2xl font-black tracking-tight">{site.content.address || 'Ciudad de México, CP 06700'}</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-8 group">
                                        <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition duration-500" style={{ color: primary }}>
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Horarios</div>
                                            <div className="space-y-1">
                                                {site.content.businessHours ? Object.entries(site.content.businessHours).map(([days, time]) => (
                                                    <div key={days} className="text-zinc-600 font-bold"><span className="text-zinc-400 uppercase text-[10px] tracking-widest mr-2">{days}:</span> {time}</div>
                                                )) : <div className="text-zinc-600 font-bold">L-D: 1:00 PM - 11:00 PM</div>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-8 group">
                                        <a href={`tel:${site.content.contactPhone}`} className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition duration-500" style={{ color: primary }}>
                                            <Phone size={24} />
                                        </a>
                                        <div>
                                            <div className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Reservas</div>
                                            <a href={`tel:${site.content.contactPhone}`} className="text-2xl font-black tracking-tight underline decoration-zinc-200 block">{site.content.contactPhone}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-20 pt-10 border-t border-zinc-200 flex flex-wrap gap-4">
                                <a href="#" className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition"><Instagram size={20} /></a>
                                <a href="#" className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition"><Facebook size={20} /></a>
                                <a
                                    href={`https://wa.me/${site.content.contactPhone.replace(/\D/g, '')}`}
                                    target="_blank"
                                    className="px-8 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-widest hover:scale-105 transition shadow-lg"
                                >
                                    <MessageCircle size={16} /> WhatsApp Directo
                                </a>
                            </div>
                        </div>

                        <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white bg-white min-h-[500px]">
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
                                <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 italic text-zinc-300 font-black text-6xl text-center px-10">
                                    MAPA DE UBICACIÓN
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
                    className="flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-950 text-white shadow-2xl shadow-black/40 font-black uppercase text-xs tracking-widest hover:scale-110 hover:-translate-y-1 transition active:scale-95"
                >
                    <Phone size={18} /> LLAMAR AHORA
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
                <div className="container mx-auto px-6 flex flex-col items-center">
                    <div className="font-black text-4xl tracking-tighter italic mb-10" style={{ color: primary }}>
                        {site.businessName}
                    </div>
                    <p className="text-zinc-300 text-[10px] font-black uppercase tracking-[0.5em] text-center max-w-xs">
                        © {new Date().getFullYear()} {site.businessName.toUpperCase()} • DESARROLLADO POR LOCALCLAW • MÉXICO
                    </p>
                </div>
            </footer>
            <AIChatbot site={site} />
        </div>
    );
}
