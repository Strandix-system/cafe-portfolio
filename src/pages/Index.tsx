import { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { LayoutProvider } from '@/context/LayoutContext';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { MenuSection } from '@/components/MenuSection';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { LayoutToggle } from '@/components/LayoutToggle';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <LayoutProvider>
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Header onCartClick={() => setIsCartOpen(true)} />
          <main className='overflow-hidden'>
            <HeroSection />
            <MenuSection />
            <AboutSection />
            <ContactSection />
          </main>
          <Footer />
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <LayoutToggle />
        </div>
      </CartProvider>
    </LayoutProvider>
  );
};

export default Index;
