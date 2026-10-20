import React, { useState, useRef } from 'react';
import { Play, Pause, Sparkles, Film, ArrowDown, ChevronRight, Eye, Layers, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Hero({ onOpenReel }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHeroPlaying, setIsHeroPlaying] = useState(true);
  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const videoRef = useRef(null);
  const viewportRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 16), y: x * 16 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const toggleHeroPlay = (e) => {
    e.stopPropagation();
    sounds.playClick();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsHeroPlaying(true);
    } else {
      videoRef.current.pause();
      setIsHeroPlaying(false);
    }
  };

  const toggleHeroMute = (e) => {
    e.stopPropagation();
    sounds.playClick();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsHeroMuted(videoRef.current.muted);
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center items-center overflow-hidden">
      
      {/* Viewfinder Frame Corner Brackets (Cinematic HUD) */}
      <div className="absolute top-24 left-6 sm:left-12 w-6 h-6 border-t-2 border-l-2 border-cyan-400/50 pointer-events-none" />
      <div className="absolute top-24 right-6 sm:right-12 w-6 h-6 border-t-2 border-r-2 border-cyan-400/50 pointer-events-none" />
      <div className="absolute bottom-12 left-6 sm:left-12 w-6 h-6 border-b-2 border-l-2 border-cyan-400/50 pointer-events-none" />
      <div className="absolute bottom-12 right-6 sm:right-12 w-6 h-6 border-b-2 border-r-2 border-cyan-400/50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center z-10">

        {/* Top Tagline Pill */}
        <div 
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 shadow-[0_0_20px_rgba(168,85,247,0.15)] mb-8 backdrop-blur-md"
          data-cursor="DIRECTOR"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-xs sm:text-sm font-mono tracking-widest text-cyan-300 uppercase">
            Visual Storyteller & Video Editor
          </span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline text-xs text-purple-300 font-mono">
            Cinematics · Visual VFX · Short-Form
          </span>
        </div>

        {/* Main Headline from User */}
        <div className="relative mb-6 max-w-5xl">
          <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-white">
            BEHIND EVERY FRAME,{' '}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              THERE'S A STORY.
              {/* Anamorphic cyan/pink underglow */}
              <span className="absolute -inset-x-6 -bottom-2 h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-400/80 to-purple-500/0 blur-xs" />
            </span>
          </h1>
        </div>

        {/* Subhead with User's introduction */}
        <div className="max-w-2xl mb-10 text-center">
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-200 mb-3">
            I'm <span className="text-cyan-300 font-semibold underline decoration-purple-500 underline-offset-4">Aryan</span> — a Video Editor & Visual Storyteller.
          </p>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            I transform raw footage into engaging visual experiences through creative storytelling, precise pacing, cinematic visuals, and sound design.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          {/* Watch Showreel Button */}
          <button
            onClick={() => {
              sounds.playShutter();
              onOpenReel();
            }}
            onMouseEnter={() => sounds.playClick()}
            data-cursor="PLAY"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-semibold text-base shadow-[0_0_35px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white text-white group-hover:text-purple-900 transition-colors">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <span>Watch 2026 Showreel</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-black/30 font-mono text-cyan-200">
              01:45
            </span>
          </button>

          {/* Explore Projects Button */}
          <a
            href="#showcase"
            onClick={() => sounds.playWhoosh()}
            onMouseEnter={() => sounds.playClick()}
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-cyan-400/50 text-gray-200 hover:text-white font-medium text-base transition-all duration-300 backdrop-blur-md"
          >
            <Film className="w-5 h-5 text-purple-400" />
            <span>Explore Works</span>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Let's Talk CTA */}
          <a
            href="#contact"
            onClick={() => sounds.playClick()}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.03] hover:bg-purple-950/40 border border-purple-500/20 text-purple-300 hover:text-white font-medium text-base transition-all"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Let's Create</span>
          </a>
        </div>

        {/* 3D INTERACTIVE 16:9 CINEMATIC VIEWPORT / DIRECTOR'S MONITOR */}
        <div
          ref={viewportRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full max-w-4xl relative group"
          style={{ perspective: '1200px' }}
        >
          {/* Ambient Anamorphic Backlight Glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-cyan-500/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity pointer-events-none" />

          {/* 3D Monitor Chassis */}
          <div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-[#0a0b14] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(168,85,247,0.25)] transition-transform duration-200 ease-out"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Viewfinder Header Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0c0e1a] border-b border-white/10 text-xs font-mono text-gray-400 select-none">
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="flex items-center gap-1.5 text-red-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  REC
                </span>
                <span className="text-gray-300">SHUTTER: 1/48</span>
                <span className="hidden sm:inline text-gray-400">ISO: 800</span>
              </div>
              <div className="flex items-center gap-3 text-cyan-300">
                <span className="hidden sm:inline">COLOR: ACEScc</span>
                <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                  16:9 CINEMA 4K
                </span>
              </div>
            </div>

            {/* Cinematic 16:9 Video Teaser with Overlays */}
            <div 
              className="relative aspect-video w-full bg-black cursor-pointer overflow-hidden group/video"
              onClick={() => {
                sounds.playShutter();
                onOpenReel();
              }}
              data-cursor="PLAY REEL"
            >
              {/* Background Video Player (Plays user's /videos/main-reel.mp4 or sample) */}
              <video
                ref={videoRef}
                src="./videos/main-reel.mp4"
                autoPlay
                loop
                muted={isHeroMuted}
                playsInline
                poster="./thumbnails/main-reel.jpg"
                className="w-full h-full object-cover opacity-90 group-hover/video:opacity-100 group-hover/video:scale-105 transition-all duration-700"
                onError={(e) => {
                  if (!e.target.dataset.retried) {
                    e.target.dataset.retried = 'root';
                    e.target.src = '/videos/main-reel.mp4';
                  } else if (e.target.dataset.retried === 'root') {
                    e.target.dataset.retried = 'sample';
                    e.target.src = 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4';
                  }
                }}
              />

              {/* Anamorphic Letterbox Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/35 pointer-events-none" />

              {/* Viewfinder Crosshairs */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover/video:opacity-75 transition-opacity">
                <div className="w-16 h-16 border border-cyan-400/60 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                </div>
                <div className="absolute w-28 h-[1px] bg-cyan-400/40" />
                <div className="absolute h-28 w-[1px] bg-cyan-400/40" />
              </div>

              {/* In-Video Audio & Play/Pause Controls */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={toggleHeroMute}
                  className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                  title={isHeroMuted ? 'Unmute Sound' : 'Mute Sound'}
                >
                  {isHeroMuted ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                  )}
                </button>

                <button
                  onClick={toggleHeroPlay}
                  className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                  title={isHeroPlaying ? 'Pause Video' : 'Play Video'}
                >
                  {isHeroPlaying ? (
                    <Pause className="w-4 h-4 text-white" />
                  ) : (
                    <Play className="w-4 h-4 text-cyan-300 ml-0.5 fill-current" />
                  )}
                </button>
              </div>

              {/* Center Floating Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 p-[2px] shadow-[0_0_40px_rgba(168,85,247,0.7)] group-hover/video:scale-110 group-hover/video:shadow-[0_0_60px_rgba(6,182,212,0.9)] transition-all duration-300">
                  <div className="w-full h-full rounded-full bg-[#0a0a14]/90 flex items-center justify-center text-white backdrop-blur-sm">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current text-cyan-300 ml-1 group-hover/video:text-white transition-colors" />
                  </div>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs sm:text-sm font-mono text-gray-200">
                  CLICK TO LAUNCH CINEMATIC SHOWREEL
                </div>
              </div>

              {/* Floating 3D Badges */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90 pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span className="hidden sm:inline">MASTER CUT:</span>
                  <span className="text-cyan-300 font-bold">STORY · SOUND · COLOR</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>PREVIEW MODE</span>
                </div>
              </div>
            </div>

            {/* Bottom Timeline Waveform Scrubber Simulation */}
            <div className="px-4 sm:px-6 py-2.5 bg-[#090a12] border-t border-white/10 flex items-center justify-between gap-4 text-xs font-mono text-gray-400">
              <span className="text-cyan-400">00:00:00:00</span>
              {/* Audio waveform bars */}
              <div className="flex-1 flex items-center justify-center gap-0.5 sm:gap-1 h-4 overflow-hidden">
                {[40, 60, 20, 80, 95, 30, 70, 85, 40, 100, 65, 35, 90, 75, 45, 60, 85, 30, 95, 50, 70, 80, 40, 90, 60, 30, 80, 50, 100, 70].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <span className="text-purple-400">01:45:00:00</span>
            </div>
          </div>
        </div>

        {/* Floating Quick Stats Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl mt-14">
          {[
            { value: '500+', label: 'Videos Mastered', sub: 'Short-Form & Cinematic' },
            { value: '50M+', label: 'Total Views Generated', sub: 'Across YT & Socials' },
            { value: '3+', label: 'NLE Pro Engines', sub: 'Premiere · AE · CapCut' },
            { value: '100%', label: 'Pacing & Attention', sub: 'Zero Frame Wastage' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 sm:p-5 rounded-2xl text-left border border-white/8 hover:border-purple-500/40 hover:bg-white/[0.04] transition-all group"
            >
              <div className="font-heading font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-400 group-hover:scale-105 transition-transform origin-left">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-200 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-gray-400 font-mono mt-0.5">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <div className="mt-14 flex flex-col items-center gap-2 text-gray-500">
          <span className="text-[11px] uppercase tracking-widest font-mono">
            Scroll To Explore 3D Story
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-cyan-400" />
        </div>
      </div>
    </section>
  );
}
