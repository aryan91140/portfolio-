import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Film, ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Navbar() {
  const [soundActive, setSoundActive] = useState(false);
  const [timecode, setTimecode] = useState('00:00:00:00');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live Cinema 24 FPS Timecode Generator
  useEffect(() => {
    let frame = 0;
    let sec = 14;
    let min = 2;
    let hr = 1;

    const interval = setInterval(() => {
      frame++;
      if (frame >= 24) {
        frame = 0;
        sec++;
        if (sec >= 60) {
          sec = 0;
          min++;
          if (min >= 60) {
            min = 0;
            hr = (hr + 1) % 24;
          }
        }
      }
      const pad = (n) => String(n).padStart(2, '0');
      setTimecode(`${pad(hr)}:${pad(min)}:${pad(sec)}:${pad(frame)}`);
    }, 1000 / 24);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSoundToggle = () => {
    const newState = sounds.toggle();
    setSoundActive(newState);
  };

  const navLinks = [
    { label: 'Cinematics', href: '#showcase' },
    { label: 'Reels / Shorts', href: '#showcase' },
    { label: 'Visual VFX', href: '#showcase' },
    { label: 'Color Grade', href: '#color-grade' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'About Aryan', href: '#about' },
    { label: 'Tools', href: '#tools' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#05060b]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-purple-950/20'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          onMouseEnter={() => sounds.playClick()}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#080912] rounded-[11px] flex items-center justify-center">
              <Film className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading font-black tracking-wider text-lg text-white group-hover:text-cyan-300 transition-colors">
                ARYAN
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono tracking-widest bg-red-500/20 text-red-400 border border-red-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                REC
              </span>
            </div>
            <span className="text-[11px] text-gray-400 tracking-widest uppercase font-mono">
              Video Editor & Storyteller
            </span>
          </div>
        </a>

        {/* Live Cinema HUD Specs (Desktop) */}
        <div className="hidden xl:flex items-center gap-4 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-300">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>TC {timecode}</span>
          </div>
          <span className="text-white/20">|</span>
          <span className="text-purple-300">23.976 FPS</span>
          <span className="text-white/20">|</span>
          <span className="text-emerald-400">4K PRORES 422HQ</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/8 rounded-full p-1.5 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              onMouseEnter={() => sounds.playClick()}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Audio Toggle & CTA */}
        <div className="flex items-center gap-3">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleSoundToggle}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
              soundActive
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
            }`}
            title="Toggle Cinematic UI Sound Effects"
          >
            {soundActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">SFX: ON</span>
                {/* Visualizer wave bars */}
                <div className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 h-full bg-cyan-400 animate-pulse" />
                  <span className="w-0.5 h-1.5 bg-cyan-300 animate-bounce" />
                  <span className="w-0.5 h-2 bg-cyan-400 animate-pulse" />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">SFX: MUTED</span>
              </>
            )}
          </button>

          {/* Book Edit / Let's Talk CTA */}
          <a
            href="#contact"
            className="relative group overflow-hidden rounded-full p-[1px] font-medium text-xs"
            onMouseEnter={() => sounds.playWhoosh()}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0a0b16] text-white transition-all group-hover:bg-opacity-80">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition-transform" />
              <span>Let's Create</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white border border-white/10"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-5 bg-[#070810]/95 backdrop-blur-2xl border-b border-white/10 mt-2 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-cyan-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 font-mono">
            <span>LIVE TIMECODE</span>
            <span className="text-cyan-400">{timecode}</span>
          </div>
        </div>
      )}
    </header>
  );
}
