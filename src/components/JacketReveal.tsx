import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

export const JacketReveal: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const leftElRef = useRef<HTMLDivElement>(null);
  const rightElRef = useRef<HTMLDivElement>(null);
  const insideElRef = useRef<HTMLDivElement>(null);
  const shadowElRef = useRef<HTMLDivElement>(null);
  const titleElRef = useRef<HTMLDivElement>(null);
  const aboutElRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLParagraphElement>(null);

  const rawText =
    'Modern outerwear with timeless style, quality materials, and refined details. Designed for effortless everyday wear.';

  useEffect(() => {
    const section = sectionRef.current;
    const pinWrap = pinWrapRef.current;
    const leftEl = leftElRef.current;
    const rightEl = rightElRef.current;
    const insideEl = insideElRef.current;
    const shadowEl = shadowElRef.current;
    const titleEl = titleElRef.current;
    const aboutEl = aboutElRef.current;
    const aboutText = aboutTextRef.current;

    if (
      !section ||
      !pinWrap ||
      !leftEl ||
      !rightEl ||
      !insideEl ||
      !shadowEl ||
      !titleEl ||
      !aboutEl ||
      !aboutText
    ) {
      return;
    }

    const charSpans = aboutText.querySelectorAll('.char-span');
    const leftImg = leftEl.querySelector('img');
    const rightImg = rightEl.querySelector('img');

    const TRAVEL_VW_FRACTION = 0.92;
    const MAX_ROTATION_DEG = 1.5;

    function travelPx() {
      return window.innerWidth * 0.5 * TRAVEL_VW_FRACTION;
    }

    const travel = travelPx();

    // Initial state
    gsap.set(insideEl, { opacity: 0, scale: 1.05 });
    gsap.set(shadowEl, { opacity: 0 });
    gsap.set([leftEl, rightEl], { x: 0, rotation: 0, scale: 1 });
    gsap.set(titleEl, { y: 0, opacity: 1 });
    gsap.set(aboutEl, { opacity: 0 });
    gsap.set(charSpans, { opacity: 0.2 });

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      smoothChildTiming: true
    });

    // 1. Initial jacket flap opening & shadow
    tl.to(leftEl, { x: -travel, rotation: -MAX_ROTATION_DEG, scale: 0.985, duration: 40 }, 0);
    tl.to(rightEl, { x: travel, rotation: MAX_ROTATION_DEG, scale: 0.985, duration: 40 }, 0);
    tl.to(shadowEl, { opacity: 1, duration: 5 }, 0);
    tl.to(shadowEl, { opacity: 0, duration: 20 }, 10);

    // 2. Inside image fades in smoothly
    tl.to(insideEl, { opacity: 1, scale: 1, duration: 20, ease: 'power2.out' }, 10);

    // 3. Title fades out / moves up
    tl.to(titleEl, { y: '-60vh', opacity: 0, duration: 25, ease: 'power2.in' }, 15);

    // 4. About container becomes visible
    tl.to(aboutEl, { opacity: 1, duration: 10 }, 25);

    // 5. Letter-by-letter opacity scrub (20% -> 100%)
    if (charSpans.length > 0) {
      tl.to(
        charSpans,
        {
          opacity: 1,
          stagger: 0.25,
          duration: 45,
          ease: 'none'
        },
        28
      );
    }

    // 6. Final parallax push on jacket flaps
    if (leftImg && rightImg) {
      tl.to(leftImg, { xPercent: -5, duration: 25 }, 75);
      tl.to(rightImg, { xPercent: 5, duration: 25 }, 75);
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      pin: pinWrap,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      animation: tl
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="jacket-reveal" id="jacketReveal">
      <div ref={pinWrapRef} className="jacket-reveal__pin-wrap">
        <div className="jacket-reveal__stage">
          {/* Centered Large Title */}
          <div ref={titleElRef} className="jacket-reveal__title">
            <div>STICH</div>
            <div>CLOTHING</div>
          </div>

          {/* About Us text overlay */}
          <div ref={aboutElRef} className="jacket-reveal__about">
            <span className="jacket-reveal__about-subtitle">about us</span>
            <p ref={aboutTextRef} className="jacket-reveal__about-text">
              {rawText.split('').map((char, i) => (
                <span
                  key={i}
                  className="char-span"
                  dangerouslySetInnerHTML={{ __html: char === ' ' ? '&nbsp;' : char }}
                />
              ))}
            </p>
          </div>

          {/* Inside image */}
          <div ref={insideElRef} className="jacket-reveal__inside">
            <img src={ASSETS.jacketInside} alt="Stitch Clothing" draggable={false} />
          </div>

          {/* Seam shadow */}
          <div ref={shadowElRef} className="jacket-reveal__seam-shadow" aria-hidden="true" />

          {/* Left Flap */}
          <div ref={leftElRef} className="jacket-reveal__half jacket-reveal__left">
            <img src={ASSETS.jacketLeft} alt="Jacket left" draggable={false} />
          </div>

          {/* Right Flap */}
          <div ref={rightElRef} className="jacket-reveal__half jacket-reveal__right">
            <img src={ASSETS.jacketRight} alt="Jacket right" draggable={false} />
          </div>
        </div>
      </div>
    </section>
  );
};
