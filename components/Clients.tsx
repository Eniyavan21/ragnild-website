'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const brands = [
    { name: 'Bulkathon', logo: '/customers/bulkathon.jpg' },
    { name: 'Instapract', logo: '/customers/instaPract.jpg' },
    { name: 'Beta Corporates', logo: '/customers/betaCorp.jpg' },
    { name: 'Taxapillar', logo: '/customers/taxapillar.jpg' },
    { name: 'TrustFour', logo: '/customers/turstfour.jpg' },
];

export default function Clients() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center gap-6"
                    style={{ fontFamily: 'var(--font-jakarta)' }}
                >
                    <span className="inline-flex items-center justify-center bg-[#3054fd] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        Clients
                    </span>
                    <h2 className="text-3xl md:text-5xl font-normal text-[#0b0f19] tracking-tight leading-[1.1] mb-12">
                        We&apos;re backed by
                    </h2>

                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-12 w-full">
                        {brands.map((brand, index) => (
                            <motion.div
                                key={brand.name}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="relative h-14 w-36 transition-all duration-300 hover:scale-105 cursor-pointer"
                            >
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    fill
                                    className="object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
