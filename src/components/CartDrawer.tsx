import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLayout } from "@/context/LayoutContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();
  const { layoutType } = useLayout();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isOrdering, setIsOrdering] = useState(false);
  const isElegant = layoutType === "elegant";

  const handlePlaceOrder = async () => {
    if (!customerName || !customerPhone) {
      toast.error("Please fill in your name and phone number");
      return;
    }

    setIsOrdering(true);

    // Simulate order placement
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(
      "Order placed successfully! We'll notify you when it's ready.",
    );
    clearCart();
    setCustomerName("");
    setCustomerPhone("");
    setNotes("");
    setIsOrdering(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 flex flex-col ${
              isElegant ? "shadow-medium" : "shadow-soft rounded-l-3xl"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-medium">Your Order</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    Add some delicious items from our menu
                  </p>
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8"
                    onClick={() => {
                      
                     onClose()
                      document
                        .getElementById("menu")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    View Our Menu
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 p-3 bg-card rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}

                  {/* Customer Info */}
                  <div className="pt-4 border-t border-border space-y-4">
                    <h4 className="font-medium text-foreground">
                      Your Details
                    </h4>
                    <Input
                      placeholder="Your Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={isElegant ? "" : "rounded-xl"}
                    />
                    <Input
                      placeholder="Phone Number"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className={isElegant ? "" : "rounded-xl"}
                    />
                    <Textarea
                      placeholder="Special instructions (optional)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={isElegant ? "" : "rounded-xl"}
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 md:p-6 border-t border-border bg-card/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-display text-2xl font-semibold text-foreground">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <Button
                  className={`w-full h-12 font-medium ${
                    isElegant
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground rounded-xl"
                  }`}
                  onClick={handlePlaceOrder}
                  disabled={isOrdering}
                >
                  {isOrdering ? "Placing Order..." : "Place Order"}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
