'use client';

import { motion, AnimatePresence } from 'framer-motion';
import LottieIcon from './LottieIcon';
import { useState, useEffect } from 'react';

const products = [
    {
        number: '01',
        title: 'AIOps Platform',
        desc: 'Harness the power of AI-driven operations monitoring, anomaly detection, and self-healing automation.',
        detailedDesc: 'Transform your IT operations with intelligent monitoring and predictive analytics. Our AIOps platform uses machine learning to detect anomalies, predict failures, and automatically remediate issues before they impact your business. Real-time dashboards provide complete visibility across your infrastructure.',
        path: '/animations/aiops.json',
    },
    {
        number: '02',
        title: 'Voice AI & IVR',
        desc: 'Hyper-personalized customer interactions with advanced voice models and NLP.',
        detailedDesc: 'Elevate customer experiences with conversational AI that understands context and intent. Our Voice AI solution delivers natural, human-like interactions through advanced NLP and voice synthesis, reducing wait times and improving satisfaction while scaling your support operations.',
        path: '/animations/voice.json',
    },
    {
        number: '03',
        title: 'DevOps Consulting',
        desc: 'Revolutionize software delivery with CI/CD pipelines, K8s orchestration, and GitOps.',
        detailedDesc: 'Accelerate your software delivery with modern DevOps practices. We design and implement robust CI/CD pipelines, containerized architectures with Kubernetes, and GitOps workflows that enable your teams to deploy faster, more reliably, and with greater confidence.',
        path: '/animations/devops.json',
    },
    {
        number: '04',
        title: 'Cloud Advisory',
        desc: 'End-to-end cloud strategy, architecture, and migration for AWS, GCP, and Azure.',
        detailedDesc: 'Navigate your cloud journey with expert guidance. From initial strategy to full migration and optimization, we help you leverage AWS, GCP, or Azure to reduce costs, improve scalability, and enhance security while maintaining business continuity throughout the transition.',
        path: '/animations/cloud.json',
    },
    {
        number: '05',
        title: 'FinOps Optimization',
        desc: 'Reduce cloud waste and control spending with forecasting and cost visibility tooling.',
        detailedDesc: 'Take control of your cloud spending with comprehensive FinOps practices. Our platform provides real-time cost visibility, identifies optimization opportunities, and delivers actionable insights to reduce waste, forecast expenses, and align cloud investments with business value.',
        path: '/animations/finops.json',
    },
    {
        number: '06',
        title: 'AI & ML Solutions',
        desc: 'Custom AI capabilities with LLMs, vector databases, and workflow automation.',
        detailedDesc: 'Unlock the power of artificial intelligence for your specific business needs. We build custom AI solutions leveraging large language models, vector databases for semantic search, and intelligent automation that transforms how you process information and make decisions.',
        path: '/animations/ml.json',
    },
];

export default function Services() {
    const [selectedProduct, setSelectedProduct] = useState(0);

    // Auto-rotation effect
    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedProduct((prev) => (prev + 1) % products.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="products" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center gap-6 mb-20" style={{ fontFamily: 'var(--font-jakarta)' }}>
                    <span className="inline-flex items-center justify-center bg-[#3054fd] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        Our Products
                    </span>
                    <h3 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#0b0f19] leading-[1.1] tracking-tight max-w-4xl">
                        Crafting success through <br className="hidden md:block" />
                        <span className="text-[#3054fd]">innovative products.</span>
                    </h3>
                    <div className="max-w-2xl mx-auto">
                        <p className="text-[17px] text-gray-500 leading-[1.6] font-medium">
                            Innovative, efficient, and built to solve real problems across your enterprise.
                        </p>
                    </div>
                </div>

                {/* New Two-Column Layout */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Product Cards Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {products.map((product, index) => (
                            <motion.button
                                key={product.number}
                                onClick={() => setSelectedProduct(index)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    bg-white rounded-2xl p-6 border-2 transition-all duration-300 text-left
                                    ${selectedProduct === index
                                        ? 'border-[#3054fd] shadow-lg shadow-blue-500/20'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }
                                `}
                            >
                                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4">
                                    <LottieIcon path={product.path} className="w-10 h-10" />
                                </div>
                                <h4 className="text-base font-bold text-gray-900 leading-snug">
                                    {product.title}
                                </h4>
                            </motion.button>
                        ))}
                    </div>

                    {/* Right: Product Details */}
                    <div className="lg:sticky lg:top-24">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedProduct}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl p-8 lg:p-12"
                            >
                                <div className="flex flex-col items-center text-center gap-6">
                                    {/* Large Icon */}
                                    <div className="w-32 h-32 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                                        <LottieIcon path={products[selectedProduct].path} className="w-24 h-24" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-3xl md:text-4xl font-bold text-[#0b0f19] leading-tight">
                                        {products[selectedProduct].title}
                                    </h3>

                                    {/* Detailed Description */}
                                    <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                                        {products[selectedProduct].detailedDesc}
                                    </p>

                                    {/* Progress Indicator */}
                                    <div className="flex gap-2 mt-4">
                                        {products.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`h-1 rounded-full transition-all duration-300 ${
                                                    index === selectedProduct
                                                        ? 'w-8 bg-[#3054fd]'
                                                        : 'w-1 bg-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
