import React, { useState, useEffect, useRef } from 'react';

export const Footer: React.FC = () => {
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!watermarkRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(watermarkRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <footer
        className={`nf w-full bg-[#f5f5f7] text-[#1d1d1f] font-sans pt-16 md:pt-24 pb-8 overflow-hidden border-t border-neutral-200 ${
          isInView ? 'is-in' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Top Center Logo Glyph */}
          <div className="flex justify-center pb-8 mb-12 border-b border-black/10">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[28px] font-extrabold tracking-tight text-neutral-900 hover:opacity-75 transition-opacity"
              aria-label="Back to top"
            >
              Ø
            </a>
          </div>

          {/* Nav Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left Column: Collections */}
            <div>
              <h2 className="text-[12px] font-bold tracking-wider uppercase text-neutral-900 mb-4">
                Collections
              </h2>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-[14px] text-neutral-600">
                <li>
                  <a href="#showcase-tops" className="hover:text-black transition-colors">
                    CORE ESSENTIAL
                  </a>
                </li>
                <li>
                  <a href="#showcase-tops" className="hover:text-black transition-colors">
                    Essential Uniform
                  </a>
                </li>
                <li>
                  <a href="#shop-tops" className="hover:text-black transition-colors">
                    Featured Tops
                  </a>
                </li>
                <li>
                  <a href="#showcase-tops" className="hover:text-black transition-colors">
                    Field Systems - 001
                  </a>
                </li>
                <li>
                  <a href="#showcase-bottoms" className="hover:text-black transition-colors">
                    Graphic Series · FW 2025
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Column: About & Contact */}
            <div className="flex justify-start md:justify-end gap-16">
              <div>
                <h2 className="text-[12px] font-bold tracking-wider uppercase text-neutral-900 mb-4">
                  About
                </h2>
                <ul className="space-y-2.5 text-[14px] text-neutral-600">
                  <li>
                    <button
                      onClick={() =>
                        setModalContent(
                          'NØRTH is an independent uniform and functional outerwear studio founded in 2024. Designed between Morocco and London, prioritizing heavyweight raw textiles, technical garments, and architectural silhouettes.'
                        )
                      }
                      className="hover:text-black transition-colors cursor-pointer text-left"
                    >
                      Our story
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        setModalContent(
                          'NØRTH Journal: Exploring the rugged Atlas peaks, night desert logistics, and functional textile tests in 31°37\'N 8°01\'W.'
                        )
                      }
                      className="hover:text-black transition-colors cursor-pointer text-left"
                    >
                      Journal
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-[12px] font-bold tracking-wider uppercase text-neutral-900 mb-4">
                  Contact
                </h2>
                <ul className="space-y-2.5 text-[14px] text-neutral-600">
                  <li>
                    <button
                      onClick={() =>
                        setModalContent(
                          'Direct Inquiries: studio@north-uniform.com\nStudio hours: Mon - Fri, 09:00 - 18:00 GMT'
                        )
                      }
                      className="hover:text-black transition-colors cursor-pointer text-left"
                    >
                      Contact us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        setModalContent(
                          'Frequently Asked Questions:\n\n• Shipping: 2-4 business days worldwide via DHL Express.\n• Sizing: Boxy, oversized drop-shoulder cut.\n• Returns: Free returns within 04 days of receipt.'
                        )
                      }
                      className="hover:text-black transition-colors cursor-pointer text-left"
                    >
                      Help & FAQ
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Giant SVG Wordmark "NØRTH" with rise animation */}
          <div ref={watermarkRef} className="nf__wm mt-14 md:mt-24 select-none pointer-events-none overflow-hidden">
            <svg
              viewBox="0 0 1000 215"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-auto block"
            >
              <defs>
                <linearGradient id="nf-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#111111" stopOpacity="1" />
                  <stop offset="100%" stopColor="#111111" stopOpacity="0.08" />
                </linearGradient>
              </defs>
              <g className="nf__wm-g">
                <text
                  x="0"
                  y="205"
                  fontSize="290"
                  textLength="1000"
                  lengthAdjust="spacingAndGlyphs"
                  fontFamily="Archivo, sans-serif"
                  fontWeight="800"
                  fill="url(#nf-grad)"
                >
                  NØRTH
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between text-[12px] text-neutral-500 gap-3">
            <p>© 2026 Password: 001. All rights reserved.</p>
            <div className="flex gap-4">
              <button
                onClick={() =>
                  setModalContent(
                    'Privacy Policy: NØRTH values customer confidentiality. No personal information is ever sold or shared with external advertising brokers.'
                  )
                }
                className="hover:text-black transition-colors cursor-pointer"
              >
                Privacy policy
              </button>
              <span>•</span>
              <button
                onClick={() =>
                  setModalContent(
                    'Terms of Service: All orders are subject to availability and confirmation of order payment.'
                  )
                }
                className="hover:text-black transition-colors cursor-pointer"
              >
                Terms of service
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Info Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-black">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
            <div className="whitespace-pre-line text-[14px] leading-relaxed text-neutral-700 mt-2">
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
