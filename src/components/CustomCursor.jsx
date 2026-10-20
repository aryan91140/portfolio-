import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [hoveredState, setHoveredState] = useState(null); // 'play', 'drag', 'link', 'inspect'
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on devices with fine pointer (mouse/trackpad, not touch)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      // Check hovered element data attribute
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setHoveredState(target.getAttribute('data-cursor'));
      } else {
        const isClickable = e.target.closest('button, a, input, textarea, select, [role="button"]');
        setIsPointer(!!isClickable);
        setHoveredState(null);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animId;
    const followCursor = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      animId = requestAnimationFrame(followCursor);
    };
    animId = requestAnimationFrame(followCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-50">
      {/* Precision Center Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${hoveredState ? 0 : 1})`,
        }}
      />

      {/* Outer Reticle / Crosshair */}
      <div
        className={`fixed top-0 left-0 -ml-5 -mt-5 flex items-center justify-center rounded-full border transition-all duration-200 ${
          hoveredState
            ? 'w-16 h-16 -ml-8 -mt-8 bg-purple-600/30 border-purple-400 backdrop-blur-xs scale-110'
            : isPointer
            ? 'w-10 h-10 -ml-5 -mt-5 border-cyan-400/80 scale-125 bg-cyan-500/10'
            : 'w-8 h-8 -ml-4 -mt-4 border-white/30'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        {/* Reticle Marks */}
        {!hoveredState && (
          <>
            <span className="absolute top-0 w-0.5 h-1 bg-white/40" />
            <span className="absolute bottom-0 w-0.5 h-1 bg-white/40" />
            <span className="absolute left-0 w-1 h-0.5 bg-white/40" />
            <span className="absolute right-0 w-1 h-0.5 bg-white/40" />
          </>
        )}

        {/* Hover Label */}
        {hoveredState && (
          <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-200">
            {hoveredState}
          </span>
        )}
      </div>
    </div>
  );
}
