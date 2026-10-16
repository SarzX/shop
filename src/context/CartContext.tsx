import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../data/products';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Product, size?: string, color?: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  totalItems: number;
  subtotal: number;
  discountCode: string;
  discountPercent: number;
  applyDiscount: (code: string) => { success: boolean; message: string };
  selectedProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  quickFlyEffect: { active: boolean; x: number; y: number } | null;
  triggerFlyEffect: (x: number, y: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initial items demo or empty
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('north_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [quickFlyEffect, setQuickFlyEffect] = useState<{ active: boolean; x: number; y: number } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('north_cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (product: Product, size?: string, color?: string, quantity: number = 1) => {
    const selectedSize = size || product.sizes[0]?.name || 'M';
    const selectedColor = color || product.colors[0]?.name || 'Standard';
    const variantKey = `${product.id}-${selectedSize}-${selectedColor}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === variantKey);
      if (existing) {
        return prev.map((item) =>
          item.id === variantKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: variantKey,
          productId: product.id,
          title: product.title,
          collection: product.collection,
          price: product.price,
          image: product.images[0],
          size: selectedSize,
          color: selectedColor,
          quantity
        }
      ];
    });

    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const applyDiscount = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'NORTH10' || clean === 'WELCOME10') {
      setDiscountCode(clean);
      setDiscountPercent(10);
      return { success: true, message: `Code ${clean} (10% off) applied` };
    }
    if (clean === 'VIP20') {
      setDiscountCode(clean);
      setDiscountPercent(20);
      return { success: true, message: `VIP code ${clean} (20% off) applied` };
    }
    return { success: false, message: 'This discount code is not valid.' };
  };

  const triggerFlyEffect = (x: number, y: number) => {
    setQuickFlyEffect({ active: true, x, y });
    setTimeout(() => setQuickFlyEffect(null), 800);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotal = Math.round((rawSubtotal * (1 - discountPercent / 100)) * 100) / 100;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        totalItems,
        subtotal,
        discountCode,
        discountPercent,
        applyDiscount,
        selectedProduct,
        openProductModal: (p) => setSelectedProduct(p),
        closeProductModal: () => setSelectedProduct(null),
        isAccountOpen,
        setIsAccountOpen,
        quickFlyEffect,
        triggerFlyEffect
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
