import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const satoshi = localFont({
  src: "../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ragnild.com'),
  title: {
    default: "Ragnild | AI-Driven Digital Engineering",
    template: "%s | Ragnild",
  },
  description: "Empowering businesses with AIOps, Voice AI, and Cloud-Native solutions. Innovation tailored for impact.",
  keywords: ["AI", "AIOps", "Digital Engineering", "Cloud Consulting", "Voice AI", "Ragnild"],
  authors: [{ name: "Ragnild Team" }],
  creator: "Ragnild",
  publisher: "Ragnild",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: "Ragnild | AI-Driven Digital Engineering",
    description: "Empowering businesses with AIOps, Voice AI, and Cloud-Native solutions.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ragnild.com',
    siteName: 'Ragnild',
    images: [
      {
        url: '/logo4.png',
        width: 1200,
        height: 630,
        alt: 'Ragnild Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ragnild | AI-Driven Digital Engineering",
    description: "Empowering businesses with AIOps, Voice AI, and Cloud-Native solutions.",
    images: ['/logo4.png'], // Ensure verification of image path validity
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${satoshi.variable} ${montserrat.variable} ${plusJakarta.variable} antialiased bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900`}
      >
        {children}
      </body>
    </html>
  );
}
