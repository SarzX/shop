import React, { useEffect, useRef } from 'react';

export const PageTransition: React.FC = () => {
  const executedRef = useRef(false);

  useEffect(() => {
    if (executedRef.current) return;
    executedRef.current = true;

    const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';
    const DUR = 440;
    const MAX_DELAY = 450;
    const FROM = ['scale(0,1)', 'scale(1,0)', 'scale(0)'];
    const ORIGINS = ['0 0', '100% 0', '0 100%', '100% 100%', '50% 50%'];
    const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

    const layer = document.createElement('div');
    layer.setAttribute('aria-hidden', 'true');
    layer.className = 'pt-layer';
    layer.style.cssText =
      'position:fixed;inset:0;z-index:2147483647;overflow:hidden;pointer-events:none;background:transparent;';
    document.body.appendChild(layer);

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cols = vw < 750 ? 4 : 8;
    const rows = vw < 750 ? 8 : 5;
    const w = vw / cols;
    const h = vh / rows;
    const tiles: HTMLDivElement[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const t = document.createElement('div');
        t.style.cssText =
          `position:absolute;background:#fff;left:${Math.floor(c * w)}px;top:${Math.floor(r * h)}px;width:${Math.ceil(w) + 1}px;height:${Math.ceil(h) + 1}px;transform-origin:${pick(ORIGINS)};will-change:transform;`;
        layer.appendChild(t);
        tiles.push(t);
      }
    }

    // Play tile peel reveal
    Promise.all(
      tiles.map((t) => {
        const from = pick(FROM);
        return t.animate(
          [{ transform: 'none' }, { transform: from }],
          {
            duration: DUR,
            delay: Math.random() * MAX_DELAY,
            easing: EASE,
            fill: 'both'
          }
        ).finished;
      })
    ).then(() => {
      layer.remove();
    }).catch(() => {
      layer.remove();
    });

    return () => {
      layer.remove();
    };
  }, []);

  return null;
};
