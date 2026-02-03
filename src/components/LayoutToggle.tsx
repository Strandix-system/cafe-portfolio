import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useLayout } from '@/context/LayoutContext';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function LayoutToggle() {
  const { layoutType, toggleLayout } = useLayout();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 left-6 z-50"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={toggleLayout}
            size="lg"
            className="rounded-full shadow-medium bg-primary text-primary-foreground hover:bg-primary/90 h-14 w-14"
          >
            <Palette className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-foreground text-background">
          <p>Switch to {layoutType === 'elegant' ? 'Cozy' : 'Elegant'} Layout</p>
        </TooltipContent>
      </Tooltip>
    </motion.div>
  );
}
