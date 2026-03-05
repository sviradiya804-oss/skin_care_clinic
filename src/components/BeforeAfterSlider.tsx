import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImage, afterImage }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[40px] overflow-hidden cursor-col-resize select-none group shadow-2xl border border-gold/10"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* Before Image (Pimple/Texture) */}
      <div className="absolute inset-0">
        <img 
          src={beforeImage} 
          alt="Before" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md text-cream text-[10px] font-bold uppercase tracking-widest rounded-full">
          Before
        </div>
      </div>

      {/* After Image (Clear/Beautiful) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img 
          src={afterImage} 
          alt="After" 
          className="w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current?.offsetWidth || '100vw' }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 left-6 px-4 py-2 bg-gold/80 backdrop-blur-md text-ink text-[10px] font-bold uppercase tracking-widest rounded-full whitespace-nowrap">
          After Treatment
        </div>
      </div>

      {/* Slider Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-gold z-10 shadow-[0_0_15px_rgba(212,175,55,0.5)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-xl border-4 border-cream">
          <div className="flex gap-1">
            <div className="w-0.5 h-3 bg-ink rounded-full" />
            <div className="w-0.5 h-3 bg-ink rounded-full" />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="px-6 py-2 bg-ink/80 backdrop-blur-md text-cream text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
          Slide to reveal results
        </div>
      </div>
    </div>
  );
};
