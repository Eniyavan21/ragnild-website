'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const testimonials = [
    {
        quote: "We rely on Ragnild for complete end-to-end Cloud and DevOps support and consulting. They’ve helped us design, implement, and maintain a secure, scalable, and cost-effective infrastructure that enables us to focus on delivering value to our customers.",
        author: "Technical Lead",
        company: "TrustFour"
    },
    {
        quote: "Ragnild helped us move to a reliable, cost-optimized cloud setup while introducing robust AIOps monitoring. They don’t just consult—they implement and enable your team for the long term.",
        author: "Operations Manager",
        company: "Beta Corporates"
    },
    {
        quote: "Ragnild delivered exceptional DevOps support while also building our AI-powered telecalling agent for appointment scheduling. Their ability to blend infrastructure expertise with practical AI solutions made them an invaluable partner for our healthcare platform.",
        author: "Head of Engineering",
        company: "Instapract"
    },
    {
        quote: "We needed expert guidance to modernize our DevOps and cloud strategy. Ragnild delivered exactly what we hoped for: faster releases, stronger security, and significant savings.",
        author: "Founder & CEO",
        company: "Taxapillar"
    },
    {
        quote: "Ragnild transformed our infrastructure with a modern DevOps approach, dramatically reducing deployment times and downtime. Their team felt like an extension of ours—proactive, skilled, and truly invested in our success.",
        author: "CTO",
        company: "Bulkathon"
    }
];

export default function WhatTheySay() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    // Calculate which card to show
    // We want 1 card visible.
    // AnimatePresence works well with single component unmounting/mounting.
    // "Slide from right to left" means:
    // Enter from x: 100%, Exit to x: -100%

    return (
        <section id="what-they-say" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16" style={{ fontFamily: 'var(--font-jakarta)' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#0b0f19] leading-[1.1] tracking-tight mb-6"
                    >
                        What They <span className="text-[#3054fd]">Say</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[17px] text-gray-500 leading-[1.6] font-medium max-w-2xl mx-auto"
                    >
                        Trusted by industry leaders to deliver mission-critical solutions.
                    </motion.p>
                </div>

                {/* Single Card Carousel */}
                <div className="relative w-full max-w-2xl mx-auto h-[350px] md:h-[300px]">
                    {/* Fixed height container to prevent layout shifts during transition */}

                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={index}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0 w-full"
                        >
                            <div className="bg-gray-50 p-8 md:p-12 rounded-2xl relative group hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-center">
                                <Quote className="w-10 h-10 text-blue-100 absolute top-6 left-6 -z-0" />

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 italic font-medium">
                                        &quot;{testimonials[index].quote}&quot;
                                    </p>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">{testimonials[index].author}</h4>
                                        <p className="text-blue-600 font-medium">{testimonials[index].company}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                </div>

                {/* Dots / Controls */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-[#3054fd] w-6' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
