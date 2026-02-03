import { motion } from "framer-motion";
import { Plus, Star, Sparkles } from "lucide-react";
import { MenuItem } from "@/types/cafe";
import { useCart } from "@/context/CartContext";
import { useLayout } from "@/context/LayoutContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import coffeeArt from "@/assets/coffee-art.jpg";
import pastry from "@/assets/pastry.jpg";
import breakfast from "@/assets/breakfast.jpg";
import toast from "react-hot-toast";

const placeholderImages: Record<string, string> = {
  coffee: coffeeArt,
  tea: coffeeArt,
  pastries: pastry,
  breakfast: breakfast,
  lunch: breakfast,
  desserts: pastry,
  beverages: coffeeArt,
};

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

export function MenuCard({ item, index }: MenuCardProps) {
  const { addItem } = useCart();
  const { layoutType } = useLayout();
  const isElegant = layoutType === "elegant";

  const image = placeholderImages[item.category] || coffeeArt;

  if (isElegant) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group relative bg-card rounded-lg overflow-hidden shadow-card card-hover"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {item.isPopular && (
              <Badge className="bg-accent text-accent-foreground gap-1">
                <Star className="h-3 w-3" /> Popular
              </Badge>
            )}
            {item.isNew && (
              <Badge className="bg-terracotta text-primary-foreground gap-1">
                <Sparkles className="h-3 w-3" /> New
              </Badge>
            )}
          </div>

          {/* Add Button */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute bottom-3 right-3"
          >
            <Button
              size="icon"
              className="bg-primary text-primary-foreground rounded-full shadow-medium opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => addItem(item)}
            >
              <Plus className="h-14 w-4" />
            </Button>
          </motion.div> */}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-display text-lg font-medium text-foreground">
              {item.name}
            </h3>
            <span className="text-primary font-semibold">
              ${item.price.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
          <div className="justify-center flex m-2">
            <Button
              // size="md"
              variant="outline"
              className="h-7 px-8 py-4 text-md rounded-full"
              onClick={() => {
                addItem(item);
                toast.success("Item added to cart.");
              }}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Cozy Layout
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group flex gap-4 p-4 bg-card rounded-2xl shadow-card hover:shadow-medium transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
        <img
          src={image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {(item.isPopular || item.isNew) && (
          <div className="absolute top-1 left-1">
            {item.isPopular && (
              <span className="flex items-center justify-center w-5 h-5 bg-accent rounded-full">
                <Star className="h-3 w-3 text-accent-foreground" />
              </span>
            )}
            {item.isNew && (
              <span className="flex items-center justify-center w-5 h-5 bg-terracotta rounded-full">
                <Sparkles className="h-3 w-3 text-primary-foreground" />
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-display text-base font-medium text-foreground truncate">
            {item.name}
          </h3>
          <span className="text-accent font-bold ml-2">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {item.description}
        </p>
        <Button
          size="sm"
          variant="outline"
          className="h-7 px-3 text-xs rounded-full"
          onClick={() => {
            addItem(item);
            toast.success("Item added to cart.");
          }}
        >
          <Plus className="h-3 w-3 mr-1" />
          Add
        </Button>
      </div>
    </motion.div>
  );
}
