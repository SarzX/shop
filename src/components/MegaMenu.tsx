import React from 'react';
import { CDN_BASE } from '../data/products';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory?: (category: string) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, onSelectCategory }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Scrim */}
      <div
        className="fixed inset-0 top-[calc(var(--north-header-h)+var(--north-ann-h))] bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Unrolling Panel */}
      <div className="fixed top-[calc(var(--north-header-h)+var(--north-ann-h))] left-0 right-0 z-50 bg-white text-black border-b border-black/10 shadow-2xl transition-all duration-300 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-9 flex flex-col md:flex-row justify-between gap-12">
          {/* Navigation Columns */}
          <div className="flex gap-14 sm:gap-20">
            <div>
              <p className="text-[12px] font-bold tracking-widest uppercase text-neutral-400 mb-5">
                Shop Collection
              </p>
              <ul className="space-y-3 font-medium text-[15px] tracking-tight">
                <li>
                  <button
                    onClick={() => {
                      onSelectCategory?.('all');
                      onClose();
                    }}
                    className="hover:text-neutral-500 transition-colors text-left font-semibold"
                  >
                    All products
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectCategory?.('core-essential');
                      onClose();
                    }}
                    className="hover:text-neutral-500 transition-colors text-left"
                  >
                    CORE ESSENTIAL
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectCategory?.('essential-uniform');
                      onClose();
                    }}
                    className="hover:text-neutral-500 transition-colors text-left"
                  >
                    Essential Uniform
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectCategory?.('field-systems-001');
                      onClose();
                    }}
                    className="hover:text-neutral-500 transition-colors text-left"
                  >
                    Field Systems - 001
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectCategory?.('graphic-series');
                      onClose();
                    }}
                    className="hover:text-neutral-500 transition-colors text-left"
                  >
                    Graphic Series · FW 2025
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[12px] font-bold tracking-widest uppercase text-neutral-400 mb-5">
                Categories
              </p>
              <ul className="space-y-3 font-medium text-[15px] tracking-tight">
                <li>
                  <a
                    href="#shop-tops"
                    onClick={onClose}
                    className="hover:text-neutral-500 transition-colors block"
                  >
                    Tops & Hoodies
                  </a>
                </li>
                <li>
                  <a
                    href="#shop-bottoms"
                    onClick={onClose}
                    className="hover:text-neutral-500 transition-colors block"
                  >
                    Pants & Denim
                  </a>
                </li>
                <li>
                  <a
                    href="#jacket-reveal"
                    onClick={onClose}
                    className="hover:text-neutral-500 transition-colors block"
                  >
                    Outerwear Architecture
                  </a>
                </li>
                <li>
                  <a
                    href="#lookbook"
                    onClick={onClose}
                    className="hover:text-neutral-500 transition-colors block text-red-600"
                  >
                    Archive 001 Lookbook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Featured Cards */}
          <div className="grid grid-cols-2 gap-4 w-full md:w-[480px]">
            <a
              href="#shop-tops"
              onClick={onClose}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-200 block shadow-sm"
            >
              <img
                src={`${CDN_BASE}/shop/files/model-base_50b6c21e-cd79-4985-89a7-e05d8be650f9.png`}
                alt="Field Systems - 001"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute inset-x-3 bottom-4 text-center font-extrabold text-[15px] sm:text-[18px] text-white uppercase tracking-tight">
                Field Systems - 001
              </span>
            </a>

            <a
              href="#shop-bottoms"
              onClick={onClose}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-200 block shadow-sm"
            >
              <img
                src={`${CDN_BASE}/shop/files/model-base_3eda3415-afc2-47ca-8b20-7c4134d44e71.png`}
                alt="Graphic Series"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute inset-x-3 bottom-4 text-center font-extrabold text-[15px] sm:text-[18px] text-white uppercase tracking-tight">
                Graphic Series · FW 2025
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
