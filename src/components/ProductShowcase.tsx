import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductShowcaseProps {
  id: string;
  categoryTitle: string;
  modelBaseUrl: string;
  products: Product[];
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  id,
  modelBaseUrl,
  products
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchOffset, setTouchOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const { openProductModal } = useCart();
  const lastIndex = products.length - 1;

  // Desktop Scroll-driven index update
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current || !stageRef.current) return;
      if (window.innerWidth <= 900) return; // Handled by swipe on mobile

      const trackRect = trackRef.current.getBoundingClientRect();
      const stageHeight = stageRef.current.offsetHeight;
      if (stageHeight <= 0) return;

      const rawIndex = Math.round(-trackRect.top / stageHeight);
      const clampedIndex = Math.min(lastIndex, Math.max(0, rawIndex));

      setCurrentIndex((prev) => (prev !== clampedIndex ? clampedIndex : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastIndex]);

  // Mobile Touch Gestures
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    touchStartRef.current = { x: clientX, y: clientY };
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !touchStartRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const dx = clientX - touchStartRef.current.x;
    const dy = clientY - touchStartRef.current.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      let offset = dx;
      if ((currentIndex === 0 && dx > 0) || (currentIndex === lastIndex && dx < 0)) {
        offset = dx * 0.3; // Resistance at boundaries
      }
      setTouchOffset(offset);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (touchOffset < -50 && currentIndex < lastIndex) {
      goTo(currentIndex + 1);
    } else if (touchOffset > 50 && currentIndex > 0) {
      goTo(currentIndex - 1);
    }

    setTouchOffset(0);
    touchStartRef.current = null;
  };

  const goTo = (index: number) => {
    const targetIndex = Math.min(lastIndex, Math.max(0, index));
    setCurrentIndex(targetIndex);

    if (window.innerWidth > 900 && trackRef.current && stageRef.current) {
      const trackTop =
        trackRef.current.getBoundingClientRect().top + window.pageYOffset;
      const targetScroll = trackTop + targetIndex * stageRef.current.offsetHeight;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const currentProduct = products[currentIndex] || products[0];

  return (
    <section id={id} className="ps relative w-full bg-[#f6f6f6] text-[#111] select-none">
      {/* Scroll Track: height is (items * 100vh) on desktop, creating virtual scroll stops */}
      <div
        ref={trackRef}
        className="ps-track relative"
        style={{
          height: window.innerWidth > 900 ? `${products.length * 100}vh` : 'auto'
        }}
      >
        {/* Sticky Stage: pinned for full 100vh during the scroll track */}
        <div
          ref={stageRef}
          className="ps-stage relative md:sticky top-0 h-[88vh] md:h-screen overflow-hidden bg-[#f6f6f6] flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
        >
          {/* Left Info Panel (Staggered Text Reveal) */}
          <div className="ps-info-wrap absolute left-6 md:left-14 top-14 md:top-1/2 md:-translate-y-1/2 z-20 w-[min(90%,480px)]">
            <div className="ps-info active">
              <span className="ps-rv ps-eyebrow text-[12px] font-normal tracking-[0.16em] uppercase text-neutral-500 mb-5 block">
                <span key={`col-${currentIndex}`} style={{ '--i': 0 } as React.CSSProperties}>
                  {currentProduct.collection}
                </span>
              </span>

              <h2 className="ps-title font-heading text-[28px] sm:text-[42px] md:text-[50px] font-semibold leading-[1.08] tracking-[-0.035em] uppercase">
                <span className="ps-rv">
                  <span key={`tit-${currentIndex}`} style={{ '--i': 1 } as React.CSSProperties}>
                    {currentProduct.title}
                  </span>
                </span>
              </h2>

              <div className="ps-rv ps-price mt-4 text-[22px] sm:text-[26px] font-normal tracking-tight">
                <span key={`prc-${currentIndex}`} style={{ '--i': 2 } as React.CSSProperties}>
                  ${currentProduct.price.toFixed(2)}
                </span>
              </div>

              <div className="ps-rv ps-btn-row mt-6">
                <span key={`btn-${currentIndex}`} style={{ '--i': 3 } as React.CSSProperties}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openProductModal(currentProduct);
                    }}
                    className="ps-btn cursor-pointer"
                  >
                    <span>Shop Now</span>
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-4 h-4">
                      <path d="M2 8h12M9.5 3.5 14 8l-4.5 4.5" />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          </div>

          {/* Model Base Silhouette (Always anchored in center) */}
          <img
            src={modelBaseUrl}
            alt="Model Base"
            className="ps-model pointer-events-none"
            draggable={false}
          />

          {/* Overlay Garment Slides */}
          {products.map((product, idx) => {
            const diff = idx - currentIndex;
            // Slot spacing based on slide width + gap (approx 448px)
            const slot = 448;
            const translateX = diff * slot + (isDragging ? touchOffset : 0);

            const isActive = diff === 0;
            const isNext = diff === 1;
            const isPrev = diff < 0;

            let className = 'ps-shirt';
            if (isActive) className += ' active';
            else if (isNext) className += ' next is-next';
            else if (isPrev) className += ' prev';

            return (
              <img
                key={product.id}
                src={product.overlayImage || product.images[0]}
                alt={product.title}
                className={className}
                style={{
                  transform: `translate3d(${translateX}px, 0, 0) translate(-50%, -50%)`,
                  opacity: isActive ? 1 : isNext ? 0.4 : diff === 2 ? 0.15 : 0
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isActive) {
                    openProductModal(product);
                  } else if (isNext) {
                    goTo(idx);
                  }
                }}
                draggable={false}
              />
            );
          })}

          {/* Bottom Right "Drag to explore" badge */}
          <div
            className="ps-explore text-neutral-600 transition-opacity duration-500"
            style={{ opacity: currentIndex === lastIndex ? 0 : 1 }}
          >
            <span>Drag to explore</span>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M2 8h12M9.5 3.5 14 8l-4.5 4.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
