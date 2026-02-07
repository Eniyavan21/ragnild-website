import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Integrations from '@/components/Integrations';
import Services from '@/components/Services';
import ServicesOffered from '@/components/ServicesOffered';
import Industries from '@/components/Industries';
import Clients from '@/components/Clients';
import WhatTheySay from '@/components/WhatTheySay';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      <Navigation />
      <Hero />
      <Integrations />
      <Services />
      <ServicesOffered />
      <Industries />
      <Clients />
      <WhatTheySay />
      <Footer />
    </main>
  );
}
