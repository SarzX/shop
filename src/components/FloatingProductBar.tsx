import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const FloatingProductBar: React.FC = () => {
  const { addItem, openProductModal, triggerFlyEffect } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [added, setAdded] = useState(false);

  // Pick a featured hero item
  const product = PRODUCTS[0]; // “OFF GRID” HEAVYWEIGHT ZIP JACKET

  useEffect(() => {
    const handleScroll = () => {
      // Appear once user scrolls past 300px, hide near very bottom footer
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const nearBottom = scrollHeight - (scrollY + windowHeight) < 400;

      setIsVisible(scrollY > 400 && !nearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    triggerFlyEffect(rect.left + rect.width / 2, rect.top + rect.height / 2);
    addItem(product, 'M', 'Washed Olive');
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <aside
      className="fixed left-1/2 -translate-x-1/2 bottom-5 z-40 w-[min(480px,calc(100%-32px))] p-2 rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 shadow-xl flex items-center justify-between text-black select-none transition-all duration-500 animate-[fadeIn_0.4s_ease-out]"
      aria-label="Featured product"
    >
      {/* Product Info Link */}
      <div
        onClick={() => openProductModal(product)}
        className="flex items-center gap-3 cursor-pointer min-w-0 flex-1 hover:opacity-80 transition-opacity"
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-11 h-11 rounded-lg object-cover bg-neutral-100 shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-[12px] font-semibold tracking-tight truncate">
            {product.title}
          </span>
          <span className="text-[10px] text-neutral-500 truncate">
            {product.collection}
          </span>
        </div>
      </div>

      {/* Price */}
      <span className="mx-3 text-[13px] font-bold shrink-0">
        ${product.price.toFixed(0)}
      </span>

      {/* CTA Button */}
      <button
        type="button"
        onClick={handleAddToCart}
        className={`px-4 py-2.5 rounded-xl text-[11px] font-bold tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
          added
            ? 'bg-emerald-600 text-white'
            : 'bg-black text-white hover:bg-neutral-800'
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 8h14l-1 12H6L5 8Z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
        <span>{added ? 'Added' : 'Add to cart'}</span>
      </button>
    </aside>
  );
};
