import React from 'react';
import { ASSETS } from '../data/products';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="north-hero relative w-full" data-hero="" data-north-intro-hero="">
      <div className="north-hero-section relative w-full h-[calc(100vh-var(--north-ann-h,36px))] min-h-[520px] overflow-hidden flex items-center justify-center bg-black select-none">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="north-hero-section__media absolute inset-0 w-full h-full object-cover z-1 pointer-events-none block"
        >
          <source src={ASSETS.heroVideo} type="video/webm" />
        </video>

        {/* Video Overlay */}
        <div className="north-hero-section__overlay absolute inset-0 w-full h-full bg-black/30 z-2 pointer-events-none" />

        {/* Intro text (transitions in when docked) */}
        <div className="north-hero-section__intro relative z-3 w-full flex flex-col items-center text-center text-white px-5">
          <p className="north-hero-section__eyebrow text-[10px] tracking-[0.18em] uppercase font-semibold m-0 text-neutral-300">
            Fall / Winter 2025
          </p>

          <h1 className="north-hero-section__heading font-heading text-[clamp(34px,5.5vw,76px)] leading-[0.96] tracking-[-0.07em] font-semibold my-4 md:my-6 whitespace-nowrap">
            Welcome to North
          </h1>

          <a
            href="#showcase-tops"
            onClick={(e) => {
              e.preventDefault();
              onExplore();
            }}
            className="north-hero-section__cta inline-flex items-center justify-center gap-7 px-5 py-4 text-[10px] tracking-[0.13em] uppercase font-bold text-black border-none cursor-pointer"
          >
            Shop collection
          </a>
        </div>

        {/* Bottom Bar Labels */}
        <div className="hero-bottom absolute bottom-7 left-[4.2vw] right-[4.2vw] flex justify-between font-heading text-[9px] tracking-[0.15em] uppercase text-white/75 z-3 pointer-events-none">
          <span>INDEPENDENT UNIFORM</span>
          <a
            href="#showcase-tops"
            onClick={(e) => {
              e.preventDefault();
              onExplore();
            }}
            className="pointer-events-auto hover:text-white transition-colors cursor-pointer"
          >
            SCROLL TO DISCOVER ↓
          </a>
        </div>
      </div>
    </section>
  );
};
