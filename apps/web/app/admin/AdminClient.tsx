'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, Loader2, Rocket, Globe, ExternalLink, RefreshCw, Zap } from 'lucide-react';
import { SiteConfig } from '@/lib/sites';

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
    nuevo:      { label: 'Nuevo',       className: 'bg-blue-50 text-blue-700 border-blue-200' },
    generando:  { label: 'Generando…',  className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    listo:      { label: 'Listo ✓',     className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    contactado: { label: 'Contactado',  className: 'bg-purple-50 text-purple-700 border-purple-200' },
    vendido:    { label: 'Vendido 💰',   className: 'bg-green-50 text-green-700 border-green-200' },
};

const TEMPLATE_LABELS: Record<string, string> = {
    'restaurant-v1': '🍽 Restaurante',
    'plumber-v1':    '🔧 Servicios',
    'generic-v1':    '🏢 General',
};

const STEPS = [
    'Analizando datos reales de Google Maps…',
    'Curando galería de imágenes premium…',
    'Redactando copy persuasivo de alta conversión…',
    'Diseñando identidad visual disruptiva…',
    'Optimizando SEO y metadatos locales…',
    'Finalizando propuesta comercial banger…',
];

export default function AdminClient({ initialSites }: { initialSites: SiteConfig[] }) {
    const [sites, setSites]                         = useState(initialSites);
    const [isLoading, setIsLoading]                 = useState(initialSites.length === 0);
    const [error, setError]                         = useState<string | null>(null);
    const [niche, setNiche]                         = useState('');
    const [location, setLocation]                   = useState('');
    const [businessUrl, setBusinessUrl]             = useState('');
    const [isScraping, setIsScraping]               = useState(false);
    const [generatingSlug, setGeneratingSlug]       = useState<string | null>(null);
    const [generationStep, setGenerationStep]       = useState(0);
    const [search, setSearch]                       = useState('');
    const [activeFilter, setActiveFilter]           = useState('all');

    const fetchSites = useCallback(async () => {
        try {
            const res = await fetch('/api/getSites');
            if (!res.ok) throw new Error(`Error ${res.status}`);
            setSites(await res.json());
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchSites(); }, [fetchSites]);

    const handleScrape = async () => {
        if (!businessUrl && (!niche || !location)) return;
        setIsScraping(true);
        try {
            const res = await fetch('/api/findLeads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ niche, location, url: businessUrl }),
            });
            if (res.ok) {
                await fetchSites();
                setNiche(''); setLocation(''); setBusinessUrl('');
            } else {
                alert('Error al raspar prospectos. Verifica tu API Key.');
            }
        } catch {
            alert('Error de conexión.');
        } finally {
            setIsScraping(false);
        }
    };

    const handleGenerate = async (lead: SiteConfig) => {
        setGeneratingSlug(lead.slug);
        setGenerationStep(0);
        const interval = setInterval(() => {
            setGenerationStep(prev => (prev + 1) % STEPS.length);
        }, 3000);
        try {
            const res = await fetch('/api/generateSite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slug: lead.slug,
                    businessName: lead.businessName,
                    category:    (lead as any).rawScrapedData?.categoryName  || lead.content.heroSubtitle,
                    description: (lead as any).rawScrapedData?.description   || lead.content.aboutText,
                    phone:       (lead as any).rawScrapedData?.phone         || lead.content.contactPhone,
                    address:     (lead as any).rawScrapedData?.address       || lead.content.address,
                    website:     (lead as any).rawScrapedData?.website       || '',
                }),
            });
            if (res.ok) {
                await fetchSites();
            } else {
                alert('Error al generar sitio con AI.');
            }
        } catch { /* swallow */ } finally {
            clearInterval(interval);
            setGeneratingSlug(null);
            setGenerationStep(0);
        }
    };

    // --- filter logic ---
    const counts = {
        all:    sites.length,
        nuevo:  sites.filter(s => s.status === 'nuevo').length,
        listo:  sites.filter(s => s.status === 'listo').length,
        hasweb: sites.filter(s => s.hasExistingWebsite).length,
    };

    const filtered = sites.filter(site => {
        const q = search.toLowerCase();
        const matchesSearch =
            site.businessName.toLowerCase().includes(q) ||
            (site.content.address || '').toLowerCase().includes(q);
        const matchesFilter =
            activeFilter === 'all' ||
            (activeFilter === 'hasweb' && site.hasExistingWebsite) ||
            site.status === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const FILTER_TABS = [
        { key: 'all',    label: 'Todos',      count: counts.all },
        { key: 'nuevo',  label: 'Nuevos',     count: counts.nuevo },
        { key: 'listo',  label: 'Listos',     count: counts.listo },
        { key: 'hasweb', label: 'Tienen Web', count: counts.hasweb },
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ── Top bar ─────────────────────────────────────── */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-coral-500 rounded-xl flex items-center justify-center shrink-0">
                            <Rocket size={18} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-black text-gray-900 leading-none">
                                LOCALCLAW <span className="text-coral-500">MX</span>
                            </h1>
                            <p className="text-xs text-gray-400 font-medium">Panel de Administración</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-6 text-center">
                            <div>
                                <div className="text-xl font-black text-gray-900 leading-none">{sites.length}</div>
                                <div className="text-xs text-gray-400 font-medium mt-0.5">Prospectos</div>
                            </div>
                            <div>
                                <div className="text-xl font-black text-emerald-500 leading-none">{counts.listo}</div>
                                <div className="text-xs text-gray-400 font-medium mt-0.5">Listos</div>
                            </div>
                        </div>
                        <button
                            onClick={() => { setIsLoading(true); fetchSites(); }}
                            className="p-2 text-gray-400 hover:text-coral-500 hover:bg-gray-50 rounded-lg transition"
                            title="Recargar prospectos"
                        >
                            <RefreshCw size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">

                {/* ── Scraper card ─────────────────────────────── */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Search size={16} className="text-coral-500" />
                        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                            Buscar prospectos en Google Maps
                        </h2>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Nicho — ej. Plomeros, Restaurantes"
                            value={niche}
                            onChange={e => setNiche(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleScrape()}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
                        />
                        <input
                            type="text"
                            placeholder="Ciudad — ej. León, CDMX"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleScrape()}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
                        />
                        <button
                            onClick={handleScrape}
                            disabled={isScraping || (!businessUrl && (!niche || !location))}
                            className="bg-coral-500 hover:bg-coral-600 disabled:opacity-50 text-white font-bold text-sm px-6 py-3 rounded-xl transition flex items-center justify-center gap-2 shrink-0"
                        >
                            {isScraping
                                ? <><Loader2 size={15} className="animate-spin" /> Scrapeando…</>
                                : <><Zap size={15} /> Iniciar Scraping</>}
                        </button>
                    </div>
                    <div className="mt-3">
                        <input
                            type="text"
                            placeholder="O pega un URL de Google Maps para un solo negocio"
                            value={businessUrl}
                            onChange={e => setBusinessUrl(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
                        />
                    </div>
                </div>

                {/* ── Filter bar ───────────────────────────────── */}
                <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                        {FILTER_TABS.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveFilter(tab.key)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition border ${
                                    activeFilter === tab.key
                                        ? 'bg-gray-900 text-white border-gray-900'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900'
                                }`}
                            >
                                {tab.label}
                                <span className={`text-xs px-1.5 py-0.5 rounded-md font-bold ${
                                    activeFilter === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                                }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-72">
                        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar negocio o dirección…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
                        />
                    </div>
                </div>

                {/* ── Sites grid ───────────────────────────────── */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Loader2 className="animate-spin text-coral-500" size={36} />
                        <p className="text-gray-400 font-medium text-sm">Conectando con la base de datos…</p>
                    </div>

                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                        <p className="text-red-600 font-medium text-sm mb-3">{error}</p>
                        <button
                            onClick={() => { setError(null); setIsLoading(true); fetchSites(); }}
                            className="text-sm font-bold text-coral-500 hover:underline"
                        >
                            Reintentar conexión
                        </button>
                    </div>

                ) : filtered.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
                        <Globe size={44} className="mx-auto text-gray-200 mb-4" strokeWidth={1.5} />
                        <h4 className="text-base font-bold text-gray-800 mb-1">
                            {sites.length === 0 ? 'Sin prospectos aún' : 'Sin resultados'}
                        </h4>
                        <p className="text-gray-400 text-sm max-w-xs mx-auto">
                            {sites.length === 0
                                ? 'Usa el buscador de arriba para encontrar negocios en Google Maps.'
                                : 'Prueba con otro filtro o término de búsqueda.'}
                        </p>
                    </div>

                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filtered.map(site => {
                            const status = STATUS_CONFIG[site.status] ?? { label: site.status, className: 'bg-gray-100 text-gray-600 border-gray-200' };
                            const isGenerating = generatingSlug === site.slug;
                            const accentColor = site.colors?.primary || '#6366f1';
                            const isReady = site.status === 'listo';

                            return (
                                <div key={site.slug} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md hover:shadow-gray-100 transition-shadow group">
                                    {/* Accent bar with brand color */}
                                    <div className="h-1" style={{ backgroundColor: accentColor }} />

                                    <div className="p-5">
                                        {/* Business name + status */}
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <h3 className="font-bold text-gray-900 text-base leading-snug">
                                                {site.businessName}
                                            </h3>
                                            <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg border whitespace-nowrap ${status.className}`}>
                                                {status.label}
                                            </span>
                                        </div>

                                        {/* Address */}
                                        <p className="text-sm text-gray-500 mb-3 truncate">
                                            {site.content.address || <span className="italic text-gray-300">Sin dirección</span>}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                                            <span className="text-xs font-semibold text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                                                {TEMPLATE_LABELS[site.templateId] ?? site.templateId}
                                            </span>
                                            {site.hasExistingWebsite && (
                                                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                                                    🌐 Tiene web
                                                </span>
                                            )}
                                        </div>

                                        {/* Action buttons — GENERAR available for ALL sites */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleGenerate(site)}
                                                disabled={generatingSlug !== null}
                                                className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-bold py-2.5 px-4 rounded-xl transition disabled:opacity-40 ${
                                                    isReady
                                                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                                        : 'bg-coral-500 hover:bg-coral-600 text-white shadow-sm shadow-coral-500/20'
                                                }`}
                                            >
                                                {isGenerating
                                                    ? <><Loader2 size={14} className="animate-spin" /> Procesando…</>
                                                    : isReady
                                                        ? <><RefreshCw size={14} /> Rehacer</>
                                                        : <><Zap size={14} /> Generar</>}
                                            </button>
                                            <Link
                                                href={`/sites/view?slug=${site.slug}`}
                                                target="_blank"
                                                className="flex items-center justify-center gap-1.5 text-sm font-bold py-2.5 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition"
                                            >
                                                <ExternalLink size={14} /> Ver
                                            </Link>
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                                            <span className="text-xs text-gray-400 font-mono">/{site.slug}</span>
                                            <span className="text-xs text-gray-400">
                                                {new Date(site.lastUpdated).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ── Generation overlay ────────────────────────── */}
            {generatingSlug && (
                <div className="fixed inset-0 bg-white/85 backdrop-blur-xl z-[100] flex flex-col items-center justify-center p-6 text-center">
                    <div className="relative w-20 h-20 mb-8">
                        <div className="absolute inset-0 bg-coral-500/20 rounded-full animate-ping" />
                        <div className="relative bg-white shadow-2xl rounded-full w-full h-full flex items-center justify-center">
                            <Loader2 className="animate-spin text-coral-500" size={40} />
                        </div>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight mb-3 text-gray-900">CREANDO OBRA MAESTRA</h2>
                    <p className="text-gray-400 font-medium text-base max-w-sm animate-pulse">
                        {STEPS[generationStep]}
                    </p>
                    <div className="mt-10 w-56 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-coral-500 transition-all duration-700 ease-out"
                            style={{ width: `${((generationStep + 1) / STEPS.length) * 100}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
