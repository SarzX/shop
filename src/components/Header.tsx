import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { MegaMenu } from './MegaMenu';

interface HeaderProps {
  introState: 'center' | 'docked';
  onToggleIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ introState, onToggleIntro }) => {
  const { totalItems, setIsOpen, setIsAccountOpen } = useCart();
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);

      const heroHeight = window.innerHeight - 36;
      setIsOverHero(scrollY < heroHeight - 46);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkSurface = isOverHero && !isScrolled && !isMegaOpen;
  const textColor = isDarkSurface ? 'text-white' : 'text-black';
  const headerBg = isMegaOpen
    ? 'bg-white'
    : isScrolled
    ? 'bg-white/80 backdrop-blur-md border-b border-black/5 shadow-xs'
    : 'bg-transparent';

  return (
    <>
      <header
        className={`fixed top-[36px] left-0 right-0 h-[46px] z-50 px-5 flex items-center justify-between transition-colors duration-300 ${headerBg} ${textColor}`}
        style={{ '--north-header-top': '36px' } as React.CSSProperties}
      >
        {/* Left: Mega Menu Trigger */}
        <div className="flex-1 flex items-center justify-start">
          <button
            onClick={() => setIsMegaOpen(!isMegaOpen)}
            className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.08em] uppercase py-2 cursor-pointer focus:outline-none hover:opacity-75 transition-opacity"
            aria-expanded={isMegaOpen}
          >
            <span>Catalog</span>
            <svg
              viewBox="0 0 9 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-[9px] h-[6px] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isMegaOpen ? 'rotate-180' : ''
              }`}
            >
              <path d="M1 1l3.5 3.5L8 1" />
            </svg>
          </button>
        </div>

        {/* Center: Brand Logo with exact intro docking animation */}
        <div className="flex-none flex items-center justify-center">
          <h2 className="north-header__logo m-0 font-heading font-extrabold text-[21px] tracking-[-0.09em] uppercase leading-none">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onToggleIntro?.();
              }}
              className="text-inherit no-underline cursor-pointer"
            >
              NØRTH
            </a>
          </h2>
        </div>

        {/* Right: Account & Cart Icons */}
        <div className="flex-1 flex items-center justify-end gap-5">
          {/* Account Button */}
          <button
            onClick={() => setIsAccountOpen(true)}
            className="p-1 hover:opacity-70 transition-opacity cursor-pointer focus:outline-none"
            aria-label="Account"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13.125 5a3.125 3.125 0 1 1-6.25 0 3.125 3.125 0 0 1 6.25 0Z" />
              <path d="M3.75 16.765C3.778 15.125 4.45 13.562 5.618 12.412 6.787 11.262 8.361 10.617 10 10.617c1.64 0 3.215.645 4.384 1.795 1.17 1.15 1.84 2.713 1.867 4.353-1.96.9-4.092 1.36-6.251 1.36-2.23 0-4.347-.487-6.25-1.36Z" />
            </svg>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-1 hover:opacity-70 transition-opacity cursor-pointer focus:outline-none"
            aria-label="Cart"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13.123 8.75V5a3.125 3.125 0 0 0-6.25 0v3.75" />
              <path d="m16.337 7.09 1.052 10c.058.554-.375 1.035-.932 1.035H3.54a.972.972 0 0 1-.933-1.035l1.053-10a1.002 1.002 0 0 1 .933-.84h10.812a1.003 1.003 0 0 1 .932.84Z" />
            </svg>

            {totalItems > 0 && (
              <span
                className={`absolute -top-1 -right-2 min-w-[15px] h-[15px] px-1 rounded-full text-[9px] font-bold flex items-center justify-center leading-none ${
                  isDarkSurface ? 'bg-white text-black' : 'bg-black text-white'
                }`}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mega Menu Dropdown */}
      <MegaMenu isOpen={isMegaOpen} onClose={() => setIsMegaOpen(false)} />
    </>
  );
};
