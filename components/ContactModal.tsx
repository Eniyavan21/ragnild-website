'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Loader2, Check } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: Props) {
    // Prevent scrolling when modal is open
    if (typeof window !== 'undefined') {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        message: ''
    });
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing again
        if (status === 'error') setStatus('idle');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        setStatus('idle');

        try {
            const templateParams = {
                to_name: 'Ragnild Team',
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                message: formData.message,
            };

            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            setStatus('success');
            setFormData({ fullName: '', phone: '', email: '', message: '' });
        } catch (error) {
            console.error('Failed to send email:', error);
            setStatus('error');
        } finally {
            setIsSending(false);
        }
    };

    // Reset status when modal closes
    const handleClose = () => {
        setStatus('idle');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative"
                        >
                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Content */}
                            <div className="p-8 sm:p-12">
                                {status === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-8"
                                    >
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                            <Check className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
                                        <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                                            Thank you for reaching out. We will get back to you shortly.
                                        </p>
                                        <button
                                            onClick={handleClose}
                                            className="bg-[#3054fd] hover:bg-[#2546e0] text-white px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                                        >
                                            Close
                                        </button>
                                    </motion.div>
                                ) : (
                                    <>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
                                            CONTACT US
                                        </h2>
                                        <p className="text-[#3054fd] text-sm font-medium mb-8 leading-relaxed">
                                            Fill Out The Form Below, And We Will Be In Touch Shortly.
                                        </p>

                                        {status === 'error' && (
                                            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium border border-red-100">
                                                Failed to send message. Please try again later.
                                            </div>
                                        )}

                                        <form className="space-y-5" onSubmit={handleSubmit}>
                                            <div>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Full Name*"
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3054fd] transition-all text-sm"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/[^0-9]/g, '');
                                                        setFormData(prev => ({ ...prev, phone: val }));
                                                    }}
                                                    required
                                                    pattern="[0-9]*"
                                                    placeholder="Phone* (Numbers Only)"
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3054fd] transition-all text-sm"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Email*"
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3054fd] transition-all text-sm"
                                                />
                                            </div>
                                            <div>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Message*"
                                                    rows={4}
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3054fd] transition-all text-sm resize-none"
                                                />
                                            </div>

                                            <div className="flex justify-end pt-2">
                                                <button
                                                    type="submit"
                                                    disabled={isSending}
                                                    className="bg-[#0052cc] hover:bg-[#0047b3] text-white px-8 py-3 rounded-full font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                                                >
                                                    {isSending ? (
                                                        <>
                                                            Sending...
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        </>
                                                    ) : (
                                                        <>
                                                            Send
                                                            <ArrowRight className="w-4 h-4" />
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
