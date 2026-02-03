import { motion } from 'framer-motion';
import { Coffee, Heart } from 'lucide-react';
import { useLayout } from '@/context/LayoutContext';

export function Footer() {
  const { config } = useLayout();

  return (
    <footer className="py-8 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <Coffee className="h-5 w-5" />
            <span className="font-display text-lg font-medium">{config.title}</span>
          </div>

          <p className="text-sm text-primary-foreground/80 flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-terracotta" /> in 2024
          </p>

          <div className="flex items-center gap-4 text-sm text-primary-foreground/80">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Terms
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
