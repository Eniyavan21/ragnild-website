'use client';

import { motion } from 'framer-motion';
import LottieIcon from './LottieIcon';

const services = [
    {
        number: '01',
        title: 'AIOps Platform',
        desc: 'Harness the power of AI-driven operations monitoring, anomaly detection, and self-healing automation.',
        path: '/animations/aiops.json',
    },
    {
        number: '02',
        title: 'Voice AI & IVR',
        desc: 'Hyper-personalized customer interactions with advanced voice models and NLP.',
        path: '/animations/voice.json',
    },
    {
        number: '03',
        title: 'DevOps Consulting',
        desc: 'Revolutionize software delivery with CI/CD pipelines, K8s orchestration, and GitOps.',
        path: '/animations/devops.json',
    },
    {
        number: '04',
        title: 'Cloud Advisory',
        desc: 'End-to-end cloud strategy, architecture, and migration for AWS, GCP, and Azure.',
        path: '/animations/cloud.json',
    },
    {
        number: '05',
        title: 'FinOps Optimization',
        desc: 'Reduce cloud waste and control spending with forecasting and cost visibility tooling.',
        path: '/animations/finops.json',
    },
    {
        number: '06',
        title: 'AI & ML Solutions',
        desc: 'Custom AI capabilities with LLMs, vector databases, and workflow automation.',
        path: '/animations/ml.json',
    },
];

export default function Services() {
    return (
        <section id="services" className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center gap-6 mb-20" style={{ fontFamily: 'var(--font-jakarta)' }}>
                    <span className="inline-flex items-center justify-center bg-[#3054fd] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        Our Services
                    </span>
                    <h3 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#0b0f19] leading-[1.1] tracking-tight max-w-4xl">
                        Crafting success through <br className="hidden md:block" />
                        <span className="text-[#3054fd]">digital engineering.</span>
                    </h3>
                    <div className="max-w-2xl mx-auto">
                        <p className="text-[17px] text-gray-500 leading-[1.6] font-medium">
                            Innovative, efficient, and built to solve real problems across your enterprise.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-blue-50/50 flex items-center justify-center mb-6 group-hover:bg-blue-100/50 transition-colors">
                                <LottieIcon path={service.path} className="w-16 h-16" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
