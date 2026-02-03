import { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuCard } from './MenuCard';
import { menuItems, categoryLabels } from '@/data/mockData';
import { useLayout } from '@/context/LayoutContext';
import { MenuCategory } from '@/types/cafe';

const categories: MenuCategory[] = ['coffee', 'tea', 'pastries', 'breakfast', 'lunch', 'desserts'];

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('coffee');
  const { layoutType } = useLayout();
  const isElegant = layoutType === 'elegant';

  const filteredItems = menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-center mb-12 md:mb-16 ${isElegant ? '' : ''}`}
        >
          {isElegant ? (
            <>
              <span className="text-accent text-sm uppercase tracking-[0.3em] mb-3 block">
                Our Selection
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4">
                The Menu
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Crafted with passion, served with love
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-4">
                <span>🍽️</span>
                <span className="text-sm font-medium">Freshly Made</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                What We Serve
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                From espresso to desserts, everything made with care
              </p>
            </>
          )}
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 md:px-6 py-2 md:py-3 text-sm font-medium transition-all duration-300 ${
                isElegant
                  ? activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-muted-foreground hover:text-foreground border border-border'
                  : activeCategory === category
                    ? 'bg-accent text-accent-foreground rounded-full'
                    : 'bg-card text-muted-foreground hover:bg-muted rounded-full'
              } ${isElegant ? 'rounded-none' : 'rounded-full'}`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`grid gap-4 md:gap-6 ${
            isElegant
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredItems.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
