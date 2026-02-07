'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ContactModal from './ContactModal';

type NavItem = {
    label: string;
    href?: string;
    dropdown: boolean;
    submenu?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
    { label: 'Products', href: '#products', dropdown: false },
    { label: 'Services', href: '#services', dropdown: false },
    { label: 'Industries', href: '#industries', dropdown: false },
    {
        label: 'Company',
        dropdown: true,
        submenu: [
            { label: 'About', href: '#about' },
            { label: 'Testimonials', href: '#what-they-say' },
        ]
    },
];

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={`absolute top-6 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'pt-2' : 'pt-4'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group mr-8">
                            <Image
                                src="/logo.png"
                                alt="Ragnild Technologies"
                                width={180}
                                height={50}
                                className="w-auto h-12 object-contain"
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation Pill */}
                        <div className="hidden lg:flex items-center bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-full py-4 pl-16 pr-6 shadow-sm transition-all hover:shadow-md hover:border-blue-100 gap-12">

                            {/* Links & Language */}
                            <div className="flex items-center gap-8">
                                <nav className="flex items-center gap-6">
                                    {navItems.map((item) => (
                                        item.dropdown ? (
                                            <div
                                                key={item.label}
                                                className="relative"
                                                onMouseEnter={() => setOpenDropdown(item.label)}
                                                onMouseLeave={() => setOpenDropdown(null)}
                                            >
                                                <button className="text-sm font-bold text-gray-600 hover:text-[#3054fd] flex items-center gap-1 transition-colors whitespace-nowrap">
                                                    {item.label}
                                                    <ChevronDown className="w-3 h-3 opacity-50 stroke-[3]" />
                                                </button>
                                                <AnimatePresence>
                                                    {openDropdown === item.label && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                            transition={{ duration: 0.2, ease: 'easeOut' }}
                                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 min-w-[200px] bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden"
                                                        >
                                                            <div className="py-2">
                                                                {item.submenu?.map((subItem, index) => (
                                                                    <Link
                                                                        key={subItem.label}
                                                                        href={subItem.href}
                                                                        className="block px-6 py-3 text-sm font-bold text-gray-600 hover:text-[#3054fd] hover:bg-blue-50/50 transition-all"
                                                                    >
                                                                        {subItem.label}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="text-sm font-bold text-gray-600 hover:text-[#3054fd] flex items-center gap-1 transition-colors whitespace-nowrap"
                                            >
                                                {item.label}
                                            </Link>
                                        )
                                    ))}
                                </nav>

                                {/* Blog Link - Separated */}
                                <Link
                                    href="/blog"
                                    className="flex items-center gap-2 text-sm font-bold text-gray-600 cursor-pointer hover:text-[#3054fd] transition-colors border-l border-gray-200 pl-6"
                                >
                                    <span>Blog</span>
                                    <ArrowRight className="w-3 h-3 -rotate-45" />
                                </Link>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsContactOpen(true)}
                                    className="bg-[#3054fd] hover:bg-[#2546e0] text-white text-sm font-semibold rounded-full pl-6 pr-2 py-2 flex items-center gap-3 transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 whitespace-nowrap"
                                >
                                    <span>Contact Us</span>
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#3054fd]">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Content */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl overflow-hidden"
                        >
                            <div className="px-6 py-8 space-y-6">
                                <nav className="flex flex-col gap-6">
                                    {navItems.map((item) => (
                                        item.dropdown ? (
                                            <div key={item.label} className="flex flex-col gap-3">
                                                <span className="text-lg font-medium text-gray-900">
                                                    {item.label}
                                                </span>
                                                <div className="flex flex-col gap-3 pl-4">
                                                    {item.submenu?.map((subItem) => (
                                                        <Link
                                                            key={subItem.label}
                                                            href={subItem.href}
                                                            className="text-base font-medium text-gray-600 hover:text-[#3054fd]"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="text-lg font-medium text-gray-900 hover:text-[#3054fd]"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        )
                                    ))}
                                    <Link
                                        href="/blog"
                                        className="text-lg font-medium text-gray-900 hover:text-[#3054fd]"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Blog
                                    </Link>
                                </nav>
                                <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            setIsContactOpen(true);
                                        }}
                                        className="w-full justify-center bg-[#3054fd] text-white py-3 rounded-full flex items-center gap-2 font-semibold"
                                    >
                                        <span>Contact Us</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    );
}
