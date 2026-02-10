'use client';

import { motion } from 'framer-motion';
import React from 'react';

const LOGO_API = 'https://cdn.brandfetch.io';

const integrations = [
    { name: 'Grok', url: `${LOGO_API}/grok.com`, height: 28 },
    { name: 'Vapi', url: `${LOGO_API}/vapi.ai`, height: 32 },
    { name: 'Claude', url: `${LOGO_API}/claude.ai`, height: 30 },
    { name: 'OpenAI', url: `${LOGO_API}/openai.com`, height: 30 },
    { name: 'AWS', url: `${LOGO_API}/aws.amazon.com`, height: 28 },
];

// ... imports

export default function Integrations() {
    return (
        <section className="py-24 bg-white border-b border-gray-100 overflow-hidden selection:bg-blue-100">
            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                .group:hover .animate-marquee {
                    animation-play-state: paused;
                }
            `}</style>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-start gap-12">

                    <div className="flex flex-col items-start gap-6 max-w-3xl" style={{ fontFamily: 'var(--font-jakarta)' }}>
                        <span className="inline-flex items-center justify-center bg-[#3054fd] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                            Integrations
                        </span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-5xl font-normal text-[#0b0f19] tracking-tight leading-[1.1]"
                        >
                            Integrated with the best tools
                        </motion.h2>
                    </div>

                    {/* Infinite Marquee Container */}
                    <div className="w-full relative overflow-hidden group">
                        {/* Gradient Masks */}
                        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                        <div className="flex items-center gap-12 w-max animate-marquee">
                            {/* Duplicate logos to create seamless loop */}
                            {[...integrations, ...integrations, ...integrations, ...integrations].map((tool, index) => (
                                <LogoItem key={`${tool.name}-${index}`} tool={tool} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function LogoItem({ tool }: { tool: typeof integrations[0] }) {
    const [error, setError] = React.useState(false);

    return (
        <div className="group/item flex items-center gap-3 px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#3054fd]/20 hover:bg-white transition-all duration-300 ease-in-out cursor-default">
            {!error ? (
                <>
                    <img
                        src={tool.url}
                        alt={tool.name}
                        onError={() => setError(true)}
                        className="h-6 md:h-7 w-auto object-contain shrink-0"
                    />
                    <span className="whitespace-nowrap text-sm font-semibold text-gray-700 group-hover/item:text-[#3054fd] transition-colors duration-300">
                        {tool.name}
                    </span>
                </>
            ) : (
                // Fallback for missing logos
                <span className="text-sm font-bold text-gray-500 whitespace-nowrap px-2">
                    {tool.name}
                </span>
            )}
        </div>
    );
}
