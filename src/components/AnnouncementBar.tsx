import React from 'react';

const ANNOUNCEMENTS = [
  '480 GSM Made Heavy Drop',
  '04 Free Returns',
  'Limited Drops',
  'Worldwide Shipping'
];

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="relative z-50 w-full h-[36px] bg-black text-white overflow-hidden flex items-center text-[11px] font-semibold tracking-[0.12em] uppercase whitespace-nowrap select-none border-b border-white/10">
      <div className="flex w-max animate-north-marquee">
        {/* Repeating groups to ensure seamless loop */}
        {[0, 1, 2, 3].map((groupIndex) => (
          <div key={groupIndex} className="flex items-center shrink-0">
            {ANNOUNCEMENTS.map((text, i) => (
              <div key={i} className="inline-flex items-center pr-6">
                <span>{text}</span>
                <span className="inline-block w-3 h-3 ml-6 opacity-75 shrink-0">
                  <svg viewBox="0 0 12 12" fill="currentColor" className="w-full h-full">
                    <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
