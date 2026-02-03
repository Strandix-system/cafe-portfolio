import { motion } from 'framer-motion';
import { useLayout } from '@/context/LayoutContext';
import coffeeArt from '@/assets/coffee-art.jpg';

export function AboutSection() {
  const { layoutType, config } = useLayout();
  const isElegant = layoutType === 'elegant';

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${
          isElegant ? '' : 'md:grid-cols-[1fr,1.2fr]'
        }`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={isElegant ? 'order-2 md:order-1' : ''}
          >
            <div className={`relative ${isElegant ? '' : 'p-4'}`}>
              <img
                src={coffeeArt}
                alt="Our coffee"
                className={`w-full aspect-square object-cover ${
                  isElegant ? 'rounded-none' : 'rounded-3xl'
                }`}
              />
              {isElegant && (
                <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 max-w-[200px]">
                  <span className="font-display text-4xl font-medium block">15+</span>
                  <span className="text-sm">Years of Excellence</span>
                </div>
              )}
              {!isElegant && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground p-4 rounded-2xl shadow-medium"
                >
                  <span className="font-display text-3xl font-bold block">☕</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={isElegant ? 'order-1 md:order-2' : ''}
          >
            {isElegant ? (
              <>
                <span className="text-accent text-sm uppercase tracking-[0.3em] mb-3 block">
                  Our Story
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-6">
                  Passion in Every Cup
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded with a simple mission: to create a space where great coffee meets
                    meaningful connections. Every bean is carefully sourced, every cup crafted
                    with intention.
                  </p>
                  <p>
                    Our baristas are artisans, trained in the delicate art of espresso making.
                    From the first pour to the final sip, we ensure an experience that
                    transcends the ordinary.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-8">
                  <div>
                    <span className="font-display text-3xl font-medium text-primary block">
                      50K+
                    </span>
                    <span className="text-sm text-muted-foreground">Happy Customers</span>
                  </div>
                  <div>
                    <span className="font-display text-3xl font-medium text-primary block">
                      20+
                    </span>
                    <span className="text-sm text-muted-foreground">Coffee Varieties</span>
                  </div>
                  <div>
                    <span className="font-display text-3xl font-medium text-primary block">
                      5★
                    </span>
                    <span className="text-sm text-muted-foreground">Rating</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                  <span>✨</span>
                  <span className="text-sm font-medium">About Us</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  More Than Just Coffee
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We're a community hub where every cup tells a story. Our passion for
                  quality meets our love for creating warm, welcoming spaces where
                  friendships bloom and ideas percolate.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-card px-4 py-3 rounded-xl">
                    <span className="text-2xl">🌱</span>
                    <div>
                      <span className="font-medium text-foreground block">Organic</span>
                      <span className="text-xs text-muted-foreground">100% organic beans</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-card px-4 py-3 rounded-xl">
                    <span className="text-2xl">🤝</span>
                    <div>
                      <span className="font-medium text-foreground block">Fair Trade</span>
                      <span className="text-xs text-muted-foreground">Ethically sourced</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-card px-4 py-3 rounded-xl">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <span className="font-medium text-foreground block">Award Winning</span>
                      <span className="text-xs text-muted-foreground">Best local cafe 2024</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
