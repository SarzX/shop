import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export const ProductModal: React.FC = () => {
  const { selectedProduct, closeProductModal, addItem, triggerFlyEffect } = useCart();

  const [activeSize, setActiveSize] = useState('M');
  const [activeColor, setActiveColor] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setActiveSize(selectedProduct.sizes[0]?.name || 'M');
      setActiveColor(selectedProduct.colors[0]?.name || 'Standard');
      setSelectedImageIndex(0);
      setIsAdded(false);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const handleColorSelect = (colorName: string, imageIndex: number) => {
    setActiveColor(colorName);
    if (imageIndex < selectedProduct.images.length) {
      setSelectedImageIndex(imageIndex);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerFlyEffect(rect.left + rect.width / 2, rect.top + rect.height / 2);
    addItem(selectedProduct, activeSize, activeColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 md:p-6 select-none animate-[fadeIn_0.2s_ease-out]">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={closeProductModal} />

      {/* Modal Card */}
      <div className="relative w-full max-w-5xl bg-white text-black md:rounded-2xl shadow-2xl overflow-hidden z-10 min-h-screen md:min-h-[640px] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        {/* Left: Gallery (60-65% width) */}
        <div className="w-full md:w-[60%] bg-[#f4f4f6] flex flex-col items-center justify-center p-6 sm:p-10 relative">
          <div className="w-full max-w-[460px] aspect-[4/5] flex items-center justify-center">
            <img
              src={selectedProduct.images[selectedImageIndex] || selectedProduct.images[0]}
              alt={selectedProduct.title}
              className="max-h-full max-w-full object-contain drop-shadow-sm transition-all duration-300"
            />
          </div>

          {/* Thumbnails */}
          {selectedProduct.images.length > 1 && (
            <div className="flex gap-2.5 mt-6 overflow-x-auto no-scrollbar max-w-full px-2">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-16 rounded-md overflow-hidden border transition-all cursor-pointer bg-white ${
                    selectedImageIndex === idx
                      ? 'border-black ring-1 ring-black'
                      : 'border-neutral-300 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Sticky Details Panel */}
        <div className="w-full md:w-[40%] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-[800px] no-scrollbar">
          <div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400">
              {selectedProduct.collection}
            </span>
            <h1 className="font-heading font-semibold text-[26px] sm:text-[32px] tracking-tight leading-tight uppercase mt-1 mb-3">
              {selectedProduct.title}
            </h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-[20px] font-semibold">${selectedProduct.price.toFixed(2)}</span>
              {selectedProduct.originalPrice && (
                <span className="text-[15px] text-neutral-400 line-through">
                  ${selectedProduct.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-[11px] text-neutral-500">Tax included. Free shipping worldwide.</span>
            </div>

            {/* Color Swatch Options */}
            {selectedProduct.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-[12px] font-semibold uppercase text-neutral-600 mb-2.5">
                  Color: <span className="font-normal text-black ml-1">{activeColor}</span>
                </label>
                <div className="flex gap-2">
                  {selectedProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => handleColorSelect(c.name, c.imageIndex)}
                      className={`w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center transition-all cursor-pointer ${
                        activeColor === c.name ? 'ring-2 ring-black scale-105' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.swatchHex || '#333' }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Options */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2.5">
                <label className="block text-[12px] font-semibold uppercase text-neutral-600">
                  Size: <span className="font-normal text-black ml-1">{activeSize}</span>
                </label>
                <span className="text-[11px] text-neutral-400 underline cursor-pointer">
                  Size Guide
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.sizes.map((s) => (
                  <button
                    key={s.name}
                    disabled={!s.available}
                    onClick={() => setActiveSize(s.name)}
                    className={`h-11 min-w-[50px] px-4 rounded border text-[13px] font-semibold uppercase transition-all cursor-pointer ${
                      activeSize === s.name
                        ? 'border-black bg-black text-white'
                        : s.available
                        ? 'border-neutral-300 bg-white hover:border-black text-black'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-300 cursor-not-allowed line-through'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 text-[13px] font-bold tracking-widest uppercase transition-all cursor-pointer shadow-md mb-8 ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-black text-white hover:bg-neutral-800'
              }`}
            >
              {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            {/* Accordions */}
            <div className="border-t border-neutral-200 divide-y divide-neutral-200 text-[13px]">
              {/* Product Details */}
              <div className="py-3.5">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'details' ? null : 'details')
                  }
                  className="w-full flex justify-between items-center font-semibold text-neutral-900 cursor-pointer text-left"
                >
                  <span>Product Details</span>
                  <span className="text-neutral-400">
                    {openAccordion === 'details' ? '−' : '+'}
                  </span>
                </button>
                {openAccordion === 'details' && (
                  <div className="mt-3 text-neutral-600 space-y-1.5 leading-relaxed text-[12px]">
                    <p>{selectedProduct.description}</p>
                    <ul className="list-disc pl-4 space-y-1 mt-2">
                      {selectedProduct.details.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Materials & Care */}
              <div className="py-3.5">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'materials' ? null : 'materials')
                  }
                  className="w-full flex justify-between items-center font-semibold text-neutral-900 cursor-pointer text-left"
                >
                  <span>Materials & Care</span>
                  <span className="text-neutral-400">
                    {openAccordion === 'materials' ? '−' : '+'}
                  </span>
                </button>
                {openAccordion === 'materials' && (
                  <div className="mt-3 text-neutral-600 text-[12px] leading-relaxed">
                    <p>{selectedProduct.materials}</p>
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div className="py-3.5">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')
                  }
                  className="w-full flex justify-between items-center font-semibold text-neutral-900 cursor-pointer text-left"
                >
                  <span>Shipping & Free 04 Returns</span>
                  <span className="text-neutral-400">
                    {openAccordion === 'shipping' ? '−' : '+'}
                  </span>
                </button>
                {openAccordion === 'shipping' && (
                  <div className="mt-3 text-neutral-600 text-[12px] leading-relaxed space-y-1.5">
                    <p>• Worldwide Express tracked shipping within 2-4 business days.</p>
                    <p>• 04-day hassle-free return window on all unworn items.</p>
                    <p>• Custom archival packaging with collectible certificate card.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
