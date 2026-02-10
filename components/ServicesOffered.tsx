'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const services = [
    {
        title: 'CI/CD design & optimization',
        description: 'GitHub Actions, GitLab CI, Jenkins',
    },
    {
        title: 'Kubernetes implementation and scaling',
        description: 'Container orchestration and management',
    },
    {
        title: 'Infrastructure as Code',
        description: 'Terraform, Pulumi',
    },
    {
        title: 'Observability setup',
        description: 'Grafana, Prometheus, ELK, Loki',
    },
    {
        title: 'On-prem to cloud DevOps modernization',
        description: 'Seamless cloud migration strategies',
    },
];

export default function ServicesOffered() {
    return (
        <section id="services" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center gap-6 mb-20" style={{ fontFamily: 'var(--font-jakarta)' }}>
                    <span className="inline-flex items-center justify-center bg-[#3054fd] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        Services
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#0b0f19] leading-[1.1] tracking-tight max-w-4xl">
                        Comprehensive DevOps & Cloud <br className="hidden md:block" />
                        <span className="text-[#3054fd]">Engineering Services</span>
                    </h2>
                    <div className="max-w-2xl mx-auto">
                        <p className="text-[17px] text-gray-500 leading-[1.6] font-medium">
                            Expert services to accelerate your digital transformation journey
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#3054fd] hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-6 h-6 text-[#3054fd]" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3054fd] transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
