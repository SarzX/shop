import React from 'react';
import { INSTAGRAM_POSTS } from '../data/products';

export const InstagramCarousel: React.FC = () => {
  return (
    <section id="lookbook" className="w-full bg-white text-black py-16 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-[32px] sm:text-[42px] tracking-[-0.04em] uppercase leading-none">
            @Hanzife
          </h2>
          <p className="mt-2 text-[14px] text-neutral-500 tracking-tight">
            Follow the latest looks, moments and stories.
          </p>
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-black text-white text-[12px] font-semibold tracking-wider uppercase rounded-xl hover:bg-neutral-800 transition-colors self-start sm:self-auto cursor-pointer"
        >
          Follow
        </a>
      </div>

      {/* Infinite Marquee Track */}
      <div className="w-full overflow-hidden flex">
        <div className="flex gap-3 w-max animate-instagram-scroll hover:[animation-play-state:paused]">
          {/* Repeat twice for continuous loop */}
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-3 shrink-0">
              {INSTAGRAM_POSTS.map((item, idx) => (
                <div
                  key={`${copy}-${idx}`}
                  className="group relative w-[240px] sm:w-[320px] md:w-[380px] aspect-[4/5] rounded-lg overflow-hidden bg-neutral-100 shrink-0 cursor-pointer shadow-xs"
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle vignette and tag */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute left-3.5 bottom-3.5 z-10 text-[10px] font-semibold tracking-widest uppercase text-white opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    Instagram
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
