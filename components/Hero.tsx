'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ParticleSphere = dynamic(() => import('./ParticleSphere'), { ssr: false });

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
            {/* Animated Sphere Background */}
            <div className="absolute inset-0 -z-0 opacity-80 pointer-events-none">
                <ParticleSphere />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold mb-8"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>Transforming Enterprises with AI</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 max-w-5xl mx-auto leading-[1.1]"
                >
                    AI-Driven Engineering, <br className="hidden md:block" />
                    <span className="text-[#3054fd]">Tailored for Impact</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    We empower businesses to do things differently with customized AIOps, Voice AI, and Cloud-Native platforms. A relentless pursuit of innovation.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="#contact"
                        className="h-14 px-8 rounded-full bg-[#3054fd] text-white font-bold flex items-center gap-3 hover:bg-[#2546e0] transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                    >
                        Start Your Journey
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        href="#services"
                        className="h-14 px-8 rounded-full bg-white text-gray-700 font-bold border border-gray-200 flex items-center gap-3 hover:border-blue-200 hover:bg-blue-50/50 transition-all hover:-translate-y-0.5"
                    >
                        Explore Services
                    </Link>
                </motion.div>


            </div>
        </section>
    );
}
