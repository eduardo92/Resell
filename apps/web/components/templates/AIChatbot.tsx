'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { SiteConfig } from '@/lib/sites';

export function AIChatbot({ site }: { site: SiteConfig }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
        { role: 'bot', content: `¡Hola! Soy el asistente virtual de ${site.businessName}. ¿En qué puedo ayudarte hoy?` }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage, siteConfig: site }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
            } else {
                setMessages(prev => [...prev, { role: 'bot', content: 'Lo siento, tuve un problema de conexión. Por favor intenta de nuevo.' }]);
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'bot', content: 'Ops, algo salió mal.' }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-95"
                    style={{ backgroundColor: site.colors.primary }}
                >
                    <MessageCircle size={28} />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 transition-all animate-in fade-in slide-in-from-bottom-4">
                    {/* Header */}
                    <div className="p-4 flex justify-between items-center text-white" style={{ backgroundColor: site.colors.primary }}>
                        <div className="flex items-center gap-3">
                            <Bot size={24} />
                            <div>
                                <p className="font-bold text-sm leading-none">{site.businessName} Assistant</p>
                                <p className="text-[10px] opacity-80">En línea ahora</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                                        }`}
                                    style={msg.role === 'user' ? { backgroundColor: site.colors.secondary } : {}}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start italic text-gray-400 text-xs pl-2">
                                El asistente está escribiendo...
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Escribe tu duda..."
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2"
                            style={{ '--tw-ring-color': site.colors.primary } as any}
                        />
                        <button
                            onClick={handleSend}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-90"
                            style={{ backgroundColor: site.colors.primary }}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
