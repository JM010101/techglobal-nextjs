import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Team from '@/components/sections/Team';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import Blog from '@/components/sections/Blog';
import CTA from '@/components/sections/CTA';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Team />
      <Portfolio limit={20} />
      <Testimonials />
      <Blog />
      <CTA />
      <Footer />
    </main>
  );
}