import React, { useState, useRef, useCallback } from 'react';
import { Sliders, Eye, Sparkles, RefreshCw, Sun, CheckCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function ColorGradeCompare() {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const startDrag = () => {
    setIsDragging(true);
    sounds.playClick();
  };

  const stopDrag = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  return (
    <section 
      id="color-grade" 
      className="relative py-24 sm:py-32 z-10 overflow-hidden"
      onMouseUp={stopDrag}
      onTouchEnd={stopDrag}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Color Science & Grading</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            From Flat Log To <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-300 to-pink-500">Cinematic Master</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed">
            Drag the interactive slider below to reveal the transformation from washed-out raw S-Log3 / C-Log footage to a rich, atmospheric Hollywood color grade with balanced skin tones and dynamic contrast.
          </p>
        </div>

        {/* Interactive Before / After Split Screen Viewport */}
        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={startDrag}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchStart={startDrag}
            data-cursor="DRAG"
            className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-black select-none shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(6,182,212,0.15)] group cursor-ew-resize"
          >
            {/* 1. AFTER: COLOR GRADED LAYER (Full Background) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85"
                alt="Color Graded Master"
                className="w-full h-full object-cover filter contrast-125 saturate-125 brightness-95"
              />
              {/* Cinematic Grade Color Tint Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/20 via-transparent to-amber-950/25 pointer-events-none mix-blend-overlay" />
            </div>

            {/* 2. BEFORE: RAW FLAT LOG PROFILE (Clipped to Slider Position) */}
            <div
              className="absolute inset-0 h-full overflow-hidden transition-all duration-75"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85"
                alt="Raw Log Footage"
                className="absolute top-0 left-0 max-w-none h-full object-cover filter grayscale-40 brightness-130 contrast-70"
                style={{
                  width: containerRef.current
                    ? `${containerRef.current.clientWidth}px`
                    : '100%',
                }}
              />
              {/* Flat Log Haze Simulation */}
              <div className="absolute inset-0 bg-slate-300/15 pointer-events-none" />
            </div>

            {/* Floating Labels */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <div className="px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 text-xs font-mono text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span>RAW 10-BIT S-LOG3 (UNGRADED)</span>
              </div>
            </div>

            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <div className="px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-cyan-400/40 text-xs font-mono text-cyan-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>CINEMATIC GRADE (ACEScc + KODAK LUT)</span>
              </div>
            </div>

            {/* The Draggable Vertical Divider Line */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none flex items-center justify-center -ml-[1px]"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Glowing vertical laser line */}
              <div className="w-[2px] h-full bg-gradient-to-b from-cyan-400 via-white to-purple-400 shadow-[0_0_12px_#38bdf8]" />

              {/* Center Handle Button */}
              <div className="absolute w-10 h-10 -ml-5 rounded-full bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.8)] flex items-center justify-center font-bold text-xs pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
                <div className="flex items-center gap-0.5">
                  <span className="text-[10px]">◀</span>
                  <span className="text-[10px]">▶</span>
                </div>
              </div>
            </div>

            {/* Bottom Scopes / Waveform HUD Bar */}
            <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-[11px] font-mono text-gray-300 bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10 pointer-events-none">
              <div className="flex items-center gap-3">
                <span className="text-cyan-400">HISTOGRAM: 100 IRE PEAK</span>
                <span className="hidden sm:inline text-white/30">|</span>
                <span className="hidden sm:inline text-purple-300">REC.709 GAMUT</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-300">
                <Sun className="w-3.5 h-3.5" />
                <span>DYNAMIC RANGE PRESERVED</span>
              </div>
            </div>
          </div>

          {/* Quick preset switch buttons below comparison */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>DRAG SLIDER HORIZONTALLY TO COMPARE CONTRAST & SATURATION</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  setSliderPos(0);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 transition-colors"
              >
                100% Final Grade
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setSliderPos(50);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-cyan-300 transition-colors"
              >
                50 / 50 Split
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setSliderPos(100);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 transition-colors"
              >
                100% Raw Log
              </button>
            </div>
          </div>
        </div>

        {/* 3 Step Color Pipeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          {[
            {
              step: 'STEP 01',
              title: 'Exposure & White Balance',
              desc: 'Normalizing 10-bit raw sensor data, pulling down blown highlights, and restoring deep shadow details with precise IRE waveform monitoring.',
              color: 'text-cyan-400',
              border: 'hover:border-cyan-400/40',
            },
            {
              step: 'STEP 02',
              title: 'Skin Tone Isolation & Match',
              desc: 'Vector-scoping human skin to the exact skin-tone indicator line to ensure natural, healthy, lifelike complexions across different camera bodies.',
              color: 'text-pink-400',
              border: 'hover:border-pink-400/40',
            },
            {
              step: 'STEP 03',
              title: 'Cinematic Look & Film Grain',
              desc: 'Applying custom film curves, subtle split-toning (cool shadows, warm highlights), and authentic 35mm optical grain texture.',
              color: 'text-purple-400',
              border: 'hover:border-purple-400/40',
            },
          ].map((pipeline, i) => (
            <div
              key={i}
              className={`glass-panel p-6 rounded-2xl border border-white/8 ${pipeline.border} transition-all duration-300 group`}
            >
              <div className={`font-mono text-xs font-bold ${pipeline.color} tracking-widest mb-2`}>
                {pipeline.step}
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-cyan-200 transition-colors">
                {pipeline.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                {pipeline.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
