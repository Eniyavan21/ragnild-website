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
  title: "Ragnild | AI-Driven Digital Engineering",
  description: "Empowering businesses with AIOps, Voice AI, and Cloud-Native solutions. Innovation tailored for impact.",
  keywords: ["AI", "AIOps", "Digital Engineering", "Cloud Consulting", "Voice AI", "Ragnild"],
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
