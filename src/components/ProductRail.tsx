import React, { useRef } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductRailProps {
  id: string;
  title: string;
  products: Product[];
  onViewAll?: () => void;
}

export const ProductRail: React.FC<ProductRailProps> = ({ id, title, products, onViewAll }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth'
    });
  };

  return (
    <section id={id} className="w-full bg-white text-black py-10 md:py-14 border-b border-neutral-100">
      {/* Header with Title and Nav Arrows */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-5 flex items-center justify-between">
        <h2 className="font-heading font-semibold text-[20px] sm:text-[24px] tracking-tight text-neutral-900">
          {title}
        </h2>

        <div className="flex items-center gap-3">
          <button
            onClick={onViewAll}
            className="px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[13px] font-medium tracking-tight transition-colors cursor-pointer"
          >
            View all
          </button>

          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors cursor-pointer"
              aria-label="Previous products"
            >
              <svg viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-2.5 h-3">
                <path d="M6.25 1.5 1.75 6l4.5 4.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors cursor-pointer"
              aria-label="Next products"
            >
              <svg viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-2.5 h-3">
                <path d="m1.75 1.5 4.5 4.5-4.5 4.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollRef}
        className="max-w-7xl mx-auto px-5 sm:px-8 flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[240px] sm:w-[280px] md:w-[300px] shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
