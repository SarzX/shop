import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [showSizes, setShowSizes] = useState(false);
  const { addItem, openProductModal, triggerFlyEffect } = useCart();

  const handleColorChange = (colorName: string, imageIndex: number) => {
    setSelectedColor(colorName);
    if (imageIndex < product.images.length) {
      setCurrentImageIndex(imageIndex);
    }
  };

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    triggerFlyEffect(rect.left + rect.width / 2, rect.top + rect.height / 2);
    addItem(product, size, selectedColor);
    setShowSizes(false);
  };

  return (
    <div className="group flex flex-col w-full text-left bg-white select-none">
      {/* Media Container */}
      <div
        className="relative w-full aspect-[4/5] bg-[#f2f2f4] overflow-hidden cursor-pointer"
        onClick={() => openProductModal(product)}
      >
        {/* Main Image */}
        <img
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Gallery Dots Indicator (Visible on hover when multi-image) */}
        {product.images.length > 1 && (
          <div className="absolute left-3.5 bottom-3 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
                className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                  currentImageIndex === idx ? 'w-5 bg-black' : 'w-2 bg-black/30 hover:bg-black/60'
                }`}
                aria-label={`Show image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Quick "+" Button for Size Selector */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowSizes((prev) => !prev);
          }}
          className={`absolute right-2 bottom-2 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 shadow-sm cursor-pointer ${
            showSizes ? 'rotate-45 bg-black text-white' : ''
          }`}
          aria-label="Quick size select"
        >
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-3.5 h-3.5">
            <path d="M7 1v12M1 7h12" />
          </svg>
        </button>

        {/* Quick Size Flyout Bar */}
        <div
          className={`absolute inset-x-0 bottom-0 z-30 bg-neutral-100/95 backdrop-blur-sm p-2 flex justify-center border-t border-neutral-200 transition-transform duration-300 ${
            showSizes ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex border border-neutral-300 bg-white">
            {product.sizes.map((s) => (
              <button
                key={s.name}
                type="button"
                disabled={!s.available}
                onClick={(e) => handleQuickAdd(s.name, e)}
                className={`w-8 h-8 text-[11px] font-semibold uppercase flex items-center justify-center border-r border-neutral-300 last:border-r-0 transition-colors ${
                  s.available
                    ? 'hover:bg-black hover:text-white text-black cursor-pointer'
                    : 'text-neutral-300 cursor-not-allowed bg-neutral-50 relative after:content-[""] after:absolute after:inset-0 after:border-t after:border-neutral-300 after:rotate-45'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Details */}
      <div className="pt-3 px-0.5">
        <div className="flex items-baseline justify-between gap-2">
          <h3
            onClick={() => openProductModal(product)}
            className="text-[13px] font-medium tracking-tight text-neutral-900 truncate hover:text-neutral-500 transition-colors cursor-pointer"
          >
            {product.title}
          </h3>
          <p className="text-[13px] font-medium text-neutral-600 shrink-0">
            ${product.price.toFixed(0)}
          </p>
        </div>

        {/* Color Swatches */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => handleColorChange(c.name, c.imageIndex)}
                  title={c.name}
                  className={`w-3.5 h-3.5 rounded-full transition-transform cursor-pointer border border-black/10 ${
                    selectedColor === c.name ? 'scale-125 ring-1 ring-black ring-offset-1' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.swatchHex || '#555' }}
                  aria-label={`Select ${c.name}`}
                />
              ))}
            </div>
            {product.colors.length > 1 && (
              <span className="text-[11px] text-neutral-400 font-normal">
                {selectedColor}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
