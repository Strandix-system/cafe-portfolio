export type LayoutType = 'elegant' | 'cozy';

export interface CafeConfig {
  layoutType: LayoutType;
  title: string;
  description: string;
  heroImage: string;
  logo?: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  isPopular?: boolean;
  isNew?: boolean;
}

export type MenuCategory = 'coffee' | 'tea' | 'pastries' | 'breakfast' | 'lunch' | 'desserts' | 'beverages';

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  customerPhone: string;
  status: OrderStatus;
  createdAt: Date;
  notes?: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
