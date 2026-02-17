
import Image from "next/image";
import Link from 'next/link';
import { Rocket, Target, Globe, Mail, Phone, ArrowRight, CheckCircle2, Bot } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-coral-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-coral-500 rounded-lg flex items-center justify-center transform rotate-12">
              <Rocket size={18} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter italic">LOCALCLAW <span className="text-coral-500">MX</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#how" className="hover:text-white transition">Cómo Funciona</a>
            <a href="#features" className="hover:text-white transition">Superpoderes</a>
            <a href="#pricing" className="hover:text-white transition">Precios</a>
          </div>
          <Link href="/admin" className="bg-white text-black px-5 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition">
            Iniciar Consola
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-coral-500/30 to-transparent blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-8 text-coral-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-coral-500"></span>
            </span>
            IA Agent para Vendedores en México
          </div>

          <h1 className="text-5xl lg:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
            VENDE WEBSITES <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">EN PILOTO AUTOMÁTICO</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            LocalClaw encuentra prospectos, genera sitios premium al instante y cierra ventas por ti usando Inteligencia Artificial.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/admin" className="group bg-coral-500 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-coral-600 transition shadow-2xl shadow-coral-500/20">
              Escalar mi Ciudad <ArrowRight className="group-hover:translate-x-1 transition" />
            </Link>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition">
              Ver Demo Live
            </button>
          </div>
        </div>
      </section>

      {/* Superpowers Section */}
      <section id="features" className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-zinc-900 rounded-3xl border border-white/5 hover:border-coral-500/50 transition">
              <div className="w-12 h-12 bg-coral-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="text-coral-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Lead Gen IA</h3>
              <p className="text-gray-400">Extraemos datos reales de Google Maps y redes sociales. Saltamos a los que ya tienen web y buscamos al dueño.</p>
            </div>
            <div className="p-8 bg-zinc-900 rounded-3xl border border-white/5 hover:border-coral-500/50 transition">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Builder Instantáneo</h3>
              <p className="text-gray-400">No más arrastrar y soltar. La IA genera un sitio completo, en español y optimizado para móviles en segundos.</p>
            </div>
            <div className="p-8 bg-zinc-900 rounded-3xl border border-white/5 hover:border-coral-500/50 transition">
              <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Bot className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Chatbot de Ventas</h3>
              <p className="text-gray-400">Incluímos un asistente IA en cada web que responde dudas y agenda citas 24/7. El cierre de venta perfecto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/10 text-center">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-6 h-6 bg-coral-500 rounded flex items-center justify-center">
              <Rocket size={14} />
            </div>
            <span className="font-bold tracking-tight">LOCALCLAW MX</span>
          </div>
          <p className="text-gray-500 mb-8">© 2026 LocalClaw. Hecho con ❤️ para emprendedores Mexicanos.</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <Link href="/sites/view?slug=mariscos-reny" className="hover:text-white">Ver Ejemplo: Mariscos Reny</Link>
            <Link href="/admin" className="hover:text-white">Admin Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
