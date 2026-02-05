'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Facebook, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="about" className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <Image
                                src="/logo.png"
                                alt="Ragnild Technologies"
                                width={140}
                                height={40}
                                className="w-auto h-8 object-contain"
                            />
                        </Link>
                        <p className="text-gray-500 max-w-sm mb-6">
                            Ragnild is a fast-growing, AI-driven digital engineering services company, developing cutting-edge solutions across applications and data.
                        </p>
                        <div className="text-sm text-gray-400">
                            <p>Koramangala I Block, Bangalore - 560034</p>
                            <p>Karnataka, India</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Services</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-[#3054fd]">AIOps Platform</Link></li>
                            <li><Link href="#" className="hover:text-[#3054fd]">Voice AI</Link></li>
                            <li><Link href="#" className="hover:text-[#3054fd]">DevOps Consulting</Link></li>
                            <li><Link href="#" className="hover:text-[#3054fd]">Cloud Advisory</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Company</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-[#3054fd]">About Us</Link></li>
                            <li><Link href="#" className="hover:text-[#3054fd]">Careers</Link></li>
                            <li><Link href="#" className="hover:text-[#3054fd]">Contact</Link></li>
                            <li><Link href="#" className="hover:text-[#3054fd]">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">© 2026 Ragnild Technologies Pvt Ltd. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link
                            href={process.env.NEXT_PUBLIC_LINKEDIN_URL || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#3054fd] hover:text-white transition-colors"
                        >
                            <Linkedin className="w-4 h-4" />
                        </Link>
                        <Link href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#3054fd] hover:text-white transition-colors">
                            <Facebook className="w-4 h-4" />
                        </Link>
                        <Link href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#3054fd] hover:text-white transition-colors">
                            <Youtube className="w-4 h-4" />
                        </Link>
                        <Link href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#3054fd] hover:text-white transition-colors">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </Link>
                        <Link href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#3054fd] hover:text-white transition-colors">
                            <Instagram className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
