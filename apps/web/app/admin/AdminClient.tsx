'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Loader2, Rocket, Globe } from 'lucide-react';
import { SiteConfig } from '@/lib/sites';

export default function AdminClient({ initialSites }: { initialSites: SiteConfig[] }) {
    const [sites, setSites] = useState(initialSites);
    const [niche, setNiche] = useState('');
    const [location, setLocation] = useState('');
    const [isScraping, setIsScraping] = useState(false);

    const handleScrape = async () => {
        if (!niche || !location) return;
        setIsScraping(true);

        try {
            const response = await fetch('/api/findLeads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ niche, location }),
            });

            if (response.ok) {
                const data = await response.json();
                // Merge new leads into local state or refetch
                alert(`¡Éxito! Encontrados ${data.count} prospectos nuevos.`);
                // In a real app, we'd probably re-render with new data
                window.location.reload();
            } else {
                alert('Error al raspar prospectos. Verifica tu API Key.');
            }
        } catch (error) {
            console.error(error);
            alert('Error de conexión.');
        } finally {
            setIsScraping(false);
        }
    };

    const handleGenerate = async (lead: any) => {
        setIsScraping(true); // Reusing loading state
        try {
            const response = await fetch('/api/generateSite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(lead),
            });

            if (response.ok) {
                const site = await response.json();
                alert(`¡Sitio generado para ${site.businessName}!`);
                window.location.reload();
            } else {
                alert('Error al generar sitio con AI.');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsScraping(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            <Rocket className="text-coral-500" /> LOCALCLAW <span className="text-coral-500">ADMIN</span>
                        </h1>
                        <p className="text-gray-500 font-medium">Gestiona tus prospectos y genera sitios al instante.</p>
                    </div>
                </header>

                {/* Scraper Tool Card */}
                <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 mb-12 border border-gray-100">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Search size={20} className="text-coral-500" /> Nueva Sesión de Scraping (Apify)
                    </h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Nicho (ej. Plomeros, Restaurantes)"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                            className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-coral-500 transition"
                        />
                        <input
                            type="text"
                            placeholder="Ciudad (ej. León, CDMX)"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-coral-500 transition"
                        />
                        <button
                            onClick={handleScrape}
                            disabled={isScraping || !niche || !location}
                            className="bg-coral-500 hover:bg-coral-600 disabled:opacity-50 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-lg shadow-coral-500/20 flex items-center justify-center gap-3 min-w-[200px]"
                        >
                            {isScraping ? (
                                <><Loader2 className="animate-spin" /> Raspando...</>
                            ) : (
                                'Iniciar Scraping 🚀'
                            )}
                        </button>
                    </div>
                </div>

                {/* Leads Table */}
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-xl font-bold">Prospectos Generados</h3>
                        <span className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-sm font-bold">
                            {sites.length} Sitios
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-black tracking-widest">
                                <tr>
                                    <th className="px-8 py-4">Negocio</th>
                                    <th className="px-8 py-4">Status / Link</th>
                                    <th className="px-8 py-4">Tiene Web?</th>
                                    <th className="px-8 py-4">Plantilla</th>
                                    <th className="px-8 py-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {sites.map((site) => (
                                    <tr key={site.slug} className="hover:bg-gray-50/50 transition">
                                        <td className="px-8 py-6">
                                            <div className="font-bold text-gray-900">{site.businessName}</div>
                                            <div className="text-xs text-gray-400 font-medium">{site.content.contactEmail}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <Link href={`/sites/${site.slug}`} target="_blank" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline">
                                                    <Globe size={14} /> /{site.slug}
                                                </Link>
                                                <span className="text-[10px] text-gray-400 uppercase font-bold">
                                                    Actualizado: {new Date(site.lastUpdated).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-2">
                                                {site.hasExistingWebsite ? (
                                                    <span className="text-[10px] font-black bg-red-50 text-red-500 px-3 py-1 rounded-lg border border-red-100 inline-block w-fit">
                                                        DESCARTADO
                                                    </span>
                                                ) : (
                                                    <span className={`text-[10px] font-black px-3 py-1 rounded-lg border inline-block w-fit uppercase ${site.status === 'listo' ? 'bg-green-50 text-green-500 border-green-100' :
                                                        site.status === 'nuevo' ? 'bg-blue-50 text-blue-500 border-blue-100' :
                                                            'bg-gray-50 text-gray-500 border-gray-100'
                                                        }`}>
                                                        {site.status === 'listo' ? 'LISTO ✅' : site.status}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-3 py-1 rounded-lg uppercase">
                                                {site.templateId}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                {site.status === 'nuevo' && !site.hasExistingWebsite && (
                                                    <button
                                                        onClick={() => handleGenerate(site)}
                                                        disabled={isScraping}
                                                        className="bg-coral-500 text-white text-[10px] font-bold px-3 py-1 rounded-lg hover:bg-coral-600 transition disabled:opacity-50"
                                                    >
                                                        {isScraping ? '...' : 'GENERAR'}
                                                    </button>
                                                )}
                                                <button className="text-gray-400 hover:text-coral-500 font-bold text-sm transition">
                                                    Configurar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
