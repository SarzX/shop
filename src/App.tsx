import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { PageTransition } from './components/PageTransition';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductShowcase } from './components/ProductShowcase';
import { ProductRail } from './components/ProductRail';
import { JacketReveal } from './components/JacketReveal';
import { InstagramCarousel } from './components/InstagramCarousel';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { AccountModal } from './components/AccountModal';
import { FloatingProductBar } from './components/FloatingProductBar';
import { PRODUCTS, ASSETS } from './data/products';

const AppContent: React.FC = () => {
  const [introState, setIntroState] = useState<'center' | 'docked'>('center');
  const { quickFlyEffect } = useCart();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-north-intro', introState);
    root.classList.add('north-intro-ready', 'north-has-hero');

    const handleScroll = () => {
      if (window.scrollY > 20 && introState === 'center') {
        setIntroState('docked');
      } else if (window.scrollY === 0 && introState === 'docked') {
        // Can stay docked or allow user to toggle
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 2 && introState === 'center') {
        setIntroState('docked');
      } else if (e.deltaY < -4 && window.scrollY <= 0 && introState === 'docked') {
        setIntroState('center');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key) && introState === 'center') {
        setIntroState('docked');
      } else if (['ArrowUp', 'PageUp', 'Home'].includes(e.key) && window.scrollY <= 0) {
        setIntroState('center');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [introState]);

  const topsProducts = PRODUCTS.filter((p) => p.category === 'tops');
  const bottomsProducts = PRODUCTS.filter((p) => p.category === 'bottoms');

  const scrollToSection = (id: string) => {
    setIntroState('docked');
    setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="relative min-h-screen bg-white text-[#111] overflow-x-hidden">
      {/* Signature Tile Peel Page Transition */}
      <PageTransition />

      {/* Marquee Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Header with Animated Logo Docking */}
      <Header
        introState={introState}
        onToggleIntro={() => setIntroState((prev) => (prev === 'center' ? 'docked' : 'center'))}
      />

      {/* Hero Section */}
      <Hero onExplore={() => scrollToSection('showcase-tops')} />

      {/* Interactive Tops Showcase with 400vh Scroll-Driven Track */}
      <ProductShowcase
        id="showcase-tops"
        categoryTitle="Tops"
        modelBaseUrl={ASSETS.modelBaseTops}
        products={topsProducts}
      />

      {/* Shop Tops Rail Carousel */}
      <ProductRail
        id="shop-tops"
        title="Shop Tops"
        products={topsProducts}
        onViewAll={() => scrollToSection('showcase-tops')}
      />

      {/* Interactive Bottoms Showcase with 300vh Scroll-Driven Track */}
      <ProductShowcase
        id="showcase-bottoms"
        categoryTitle="Bottoms"
        modelBaseUrl={ASSETS.modelBaseBottoms}
        products={bottomsProducts}
      />

      {/* Shop Bottoms Rail Carousel */}
      <ProductRail
        id="shop-bottoms"
        title="Shop Bottoms"
        products={bottomsProducts}
        onViewAll={() => scrollToSection('showcase-bottoms')}
      />

      {/* STICH CLOTHING GSAP ScrollTrigger Jacket Reveal */}
      <JacketReveal />

      {/* @Hanzife Instagram Lookbook Stream */}
      <InstagramCarousel />

      {/* Editorial Minimalist Footer with NØRTH Watermark */}
      <Footer />

      {/* Sticky Bottom Floating Product Bar */}
      <FloatingProductBar />

      {/* Cart & Customer Modals */}
      <CartDrawer />
      <ProductModal />
      <AccountModal />

      {/* Flying Particle Add-to-Cart Effect */}
      {quickFlyEffect?.active && (
        <div
          className="spc-fly"
          style={{
            transform: `translate3d(${quickFlyEffect.x - 16}px, ${quickFlyEffect.y - 16}px, 0)`
          }}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3.5 8.5l3 3 6-7" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
