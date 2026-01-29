'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import LottieIcon from './LottieIcon';

const industries = [
    {
        title: 'Healthcare',
        desc: 'Automated patient outreach, lab follow-ups, HIPAA-ready infra',
        path: '/animations/ml.json',
    },
    {
        title: 'FinTech',
        desc: 'Secure IVR bots, compliance-first cloud, fraud alert automations',
        path: '/animations/finops.json',
    },
    {
        title: 'SaaS',
        desc: 'AIOps for uptime, CI/CD consulting, FinOps for multi-tenant SaaS',
        path: '/animations/devops.json',
    },
    {
        title: 'Retail',
        desc: 'Smart promotions, delivery call automation, cloud app modernization',
        path: '/animations/cloud.json',
    },
    {
        title: 'Enterprises',
        desc: 'Policy Q&A bots, internal IT ticket intelligence, spend governance',
        path: '/animations/aiops.json',
    },
];

export default function Industries() {
    return (
        <section id="industries" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center gap-6 mb-20" style={{ fontFamily: 'var(--font-jakarta)' }}>
                    <span className="inline-flex items-center justify-center bg-[#3054fd] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        Industries
                    </span>

                    <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#0b0f19] leading-[1.1] tracking-tight max-w-4xl">
                        AI that adapts to <br className="hidden md:block" />
                        <span className="text-[#3054fd]">needs of your business.</span>
                    </h2>

                    <div className="max-w-2xl mx-auto">
                        <p className="text-[17px] text-gray-500 leading-[1.6] font-medium">
                            Ragnild is helping to transform the operation of different industries,
                            automating processes and ensuring that their performance is accurate and supervised:
                        </p>
                    </div>
                </div>

                {/* List Section */}
                <div className="border-t border-gray-200">
                    {industries.map((industry, index) => (
                        <motion.div
                            key={industry.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative border-b border-gray-200 py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center hover:bg-gray-50/50 transition-colors duration-500 ease-in-out px-4 -mx-4 md:px-0 md:mx-0"
                        >
                            {/* Title */}
                            <div className="md:col-span-3">
                                <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
                                    {industry.title}
                                </h3>
                            </div>

                            {/* Icon/Animation - Centered */}
                            <div className="md:col-span-6 flex justify-center">
                                <div className="w-24 h-24 md:w-32 md:h-32 transition-transform duration-500 group-hover:scale-110">
                                    <LottieIcon path={industry.path} className="w-full h-full" />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-3">
                                <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed max-w-xs ml-auto">
                                    {industry.desc}
                                </p>
                            </div>

                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
