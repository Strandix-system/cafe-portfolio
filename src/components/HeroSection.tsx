import { motion } from 'framer-motion';
import { ArrowDown, Clock, MapPin } from 'lucide-react';
import { useLayout } from '@/context/LayoutContext';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-cafe.jpg';
import { useEffect, useState } from 'react';
import LoginPopup from "./LoginPopup"

export function HeroSection() {
  const { layoutType, config } = useLayout();
  const isElegant = layoutType === 'elegant';

   const [open, setOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("cafe_user_logged_in");
    if (!isLoggedIn) {
      setOpen(true);
    }
  }, []);

  return (
    <>
    
      <LoginPopup open={open} onClose={() => setOpen(false)} />

    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Cafe interior"
          className="w-full h-full object-cover"
        />
        <div 
          className={`absolute inset-0 ${
            isElegant 
              ? 'bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent' 
              : 'bg-foreground/50'
          }`} 
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        {isElegant ? (
          <ElegantHeroContent config={config} />
        ) : (
          <CozyHeroContent config={config} />
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground"
      >
        <ArrowDown className="h-6 w-6" />
      </motion.div>
    </section>
        </>
  );
}

function ElegantHeroContent({ config }: { config: any }) {
  return (
    <div className="max-w-2xl">
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-block text-sage-light text-sm uppercase tracking-[0.3em] mb-4"
      >
        Est. 2024
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-primary-foreground leading-[1.1] mb-6"
      >
        {config.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-md leading-relaxed"
      >
        {config.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button
          size="lg"
          className="bg-cream text-coffee hover:bg-cream-dark font-medium tracking-wide"
          onClick={() => {
  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}}
        >
          View Our Menu
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="hover:border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10"
        >
          Reserve a Table
        </Button>
      </motion.div>

      {/* Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex flex-wrap gap-6 mt-12"
      >
        <div className="flex items-center gap-3 text-primary-foreground/80">
          <Clock className="h-5 w-5 text-sage-light" />
          <span className="text-sm">{config.hours.weekdays}</span>
        </div>
        <div className="flex items-center gap-3 text-primary-foreground/80">
          <MapPin className="h-5 w-5 text-sage-light" />
          <span className="text-sm">{config.address}</span>
        </div>
      </motion.div>
    </div>
  );
}

function CozyHeroContent({ config }: { config: any }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <span className="inline-block px-4 py-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full text-primary-foreground text-sm">
          ☕ Welcome to Our Cozy Corner
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground mb-6"
      >
        {config.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-primary-foreground/90 mb-10 max-w-xl mx-auto"
      >
        {config.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8"
          onClick={() => {
  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}}
        >
          Explore Menu
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="hover:border-primary-foreground text-primary-foreground bg-primary-foreground/20 rounded-full px-8"
        >
          Order Now
        </Button>
      </motion.div>

      {/* Quick Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap justify-center gap-8 mt-12"
      >
        <div className="flex flex-col items-center text-primary-foreground">
          <Clock className="h-6 w-6 mb-2 text-sage-light" />
          <span className="text-sm font-medium">Open Daily</span>
          <span className="text-xs opacity-80">{config.hours.weekdays}</span>
        </div>
        <div className="flex flex-col items-center text-primary-foreground">
          <MapPin className="h-6 w-6 mb-2 text-sage-light" />
          <span className="text-sm font-medium">Visit Us</span>
          <span className="text-xs opacity-80">{config.address}</span>
        </div>
      </motion.div>
    </div>
  );
}
