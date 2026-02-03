import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X, Coffee } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLayout } from '@/context/LayoutContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { layoutType, config } = useLayout();

  const navItems = ['Home', 'Menu', 'About', 'Contact'];

  const isElegant = layoutType === 'elegant';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isElegant 
          ? 'glass-effect border-b border-border/50' 
          : 'bg-card shadow-soft'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2"
          >
            <Coffee className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            <span className={`font-display text-xl md:text-2xl font-semibold text-foreground ${
              isElegant ? 'tracking-wide' : 'tracking-normal'
            }`}>
              {config.title}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isElegant 
                    ? 'text-muted-foreground tracking-wider uppercase' 
                    : 'text-foreground'
                }`}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartClick}
              className="relative p-2 text-foreground hover:text-primary transition-colors"
            >
              <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
              {itemCount > 0 && (
                <Badge 
                  variant="default" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground"
                >
                  {itemCount}
                </Badge>
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-border"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}
