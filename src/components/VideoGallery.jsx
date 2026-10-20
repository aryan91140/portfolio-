import React, { useState } from 'react';
import { Play, Sparkles, Film, Wand2, Smartphone, Award, Flame, Clapperboard, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/audio';

export const videoProjects = [
  // --- 1. CINEMATICS (FIRST) ---
  {
    id: 'cine-1',
    category: 'cinematics',
    title: 'Cinematic Visual Story 01',
    subtitle: 'Color Grade & Atmospheric Edit',
    description: 'Cinematic color science, precise narrative pacing, and custom ambient sound design.',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    aspectRatio: '16:9',
    badge: 'CINEMATIC GRADE',
    duration: '00:17',
    fps: '24 FPS',
    resolution: '4K DCI',
    videoUrl: './videos/cine1.mp4',
    posterUrl: './thumbnails/cine1.jpg',
    year: '2026',
  },
  {
    id: 'cine-2',
    category: 'cinematics',
    title: 'Cinematic Visual Story 02',
    subtitle: 'Mood & Precision Cut',
    description: 'Dynamic storytelling with rhythm-matched cuts and rich cinematic contrast.',
    tools: ['Premiere Pro', 'After Effects'],
    aspectRatio: '16:9',
    badge: 'ACES COLOR',
    duration: '00:14',
    fps: '24 FPS',
    resolution: '4K DCI',
    videoUrl: './videos/cine2.mp4',
    posterUrl: './thumbnails/cine2.jpg',
    year: '2026',
  },
  {
    id: 'cine-3',
    category: 'cinematics',
    title: 'Cinematic Visual Story 03',
    subtitle: 'Narrative Flow & Foley',
    description: 'Immersive sound architecture, smooth pacing, and moody cinematic color grading.',
    tools: ['Premiere Pro', 'Sound Design'],
    aspectRatio: '16:9',
    badge: 'SOUND SCULPTED',
    duration: '00:25',
    fps: '24 FPS',
    resolution: '4K HDR',
    videoUrl: './videos/cine3.mp4',
    posterUrl: './thumbnails/cine3.jpg',
    year: '2026',
  },

  // --- 2. SHORT-FORM & REELS (SECOND) ---
  {
    id: 'short-1',
    category: 'short-form',
    title: 'Viral Hook Reel 01',
    subtitle: 'High-Retention Mobile Edit',
    description: '3-second hook pacing, kinetic typography, and synchronized sound effects.',
    tools: ['CapCut Pro', 'Premiere Pro'],
    aspectRatio: '9:16',
    badge: 'VIRAL RETENTION',
    duration: '01:50',
    fps: '60 FPS',
    resolution: '1080x1920',
    videoUrl: './videos/reel1.mp4',
    posterUrl: './thumbnails/reel1.jpg',
    year: '2026',
  },
  {
    id: 'short-2',
    category: 'short-form',
    title: 'Dynamic Short Reel 02',
    subtitle: 'Rhythm & Audio Beat Sync',
    description: 'Fast-paced micro-cuts, smooth speed curves, and punchy audio drops.',
    tools: ['CapCut Pro', 'After Effects'],
    aspectRatio: '9:16',
    badge: 'BEAT SYNC',
    duration: '02:11',
    fps: '60 FPS',
    resolution: '1080x1920',
    videoUrl: './videos/reel2.mp4',
    posterUrl: './thumbnails/reel2.jpg',
    year: '2026',
  },
  {
    id: 'short-3',
    category: 'short-form',
    title: 'Kinetic Beat Reel 03',
    subtitle: 'Seamless Loop & Pacing',
    description: 'Engineered for high engagement with seamless loops and crisp sound foley.',
    tools: ['CapCut Pro', 'Premiere Pro'],
    aspectRatio: '9:16',
    badge: 'LOOP MASTER',
    duration: '01:46',
    fps: '60 FPS',
    resolution: '1080x1920',
    videoUrl: './videos/reel3.mp4',
    posterUrl: './thumbnails/reel3.jpg',
    year: '2026',
  },

  // --- 3. VISUAL EDIT & VFX (THIRD) ---
  {
    id: 'vfx-1',
    category: 'visual-edit',
    title: 'Visual Effects & 3D Tracking',
    subtitle: 'Match-Moving & Transitions',
    description: '3D camera tracking, dynamic speed ramps, and seamless visual transitions.',
    tools: ['After Effects', 'Premiere Pro'],
    aspectRatio: '16:9',
    badge: '3D VFX TRACK',
    duration: '00:18',
    fps: '60 FPS',
    resolution: '4K 60FPS',
    videoUrl: './videos/vfx1.mp4',
    posterUrl: './thumbnails/vfx1.jpg',
    year: '2026',
  },
  {
    id: 'vfx-2',
    category: 'visual-edit',
    title: 'Motion Graphics & VFX Overhaul',
    subtitle: 'Kinetic FX & Overlays',
    description: 'Stylized motion graphics, glitch distortion, and high-energy composite VFX.',
    tools: ['After Effects', 'Premiere Pro'],
    aspectRatio: '16:9',
    badge: 'MOTION GRAPHICS',
    duration: '00:17',
    fps: '24 FPS',
    resolution: '4K PRORES',
    videoUrl: './videos/vfx2.mp4',
    posterUrl: './thumbnails/vfx2.jpg',
    year: '2026',
  }
];

export default function VideoGallery({ onSelectVideo }) {
  const [activeTab, setActiveTab] = useState('cinematics'); // Default first to cinematics
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    { id: 'cinematics', label: '1. Cinematics', icon: Film, count: 3, highlight: 'High Aesthetic & Narrative' },
    { id: 'short-form', label: '2. Short-Form & Reels', icon: Smartphone, count: 3, highlight: 'Viral Pacing & Hooks' },
    { id: 'visual-edit', label: '3. Visual Edit & VFX', icon: Wand2, count: 2, highlight: 'Speed Ramps & 3D Tracking' },
  ];

  const filteredProjects = videoProjects.filter((p) => p.category === activeTab);

  return (
    <section id="showcase" className="relative py-24 sm:py-32 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Curated Video Projects</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Crafted With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Intention & Detail</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-3 leading-relaxed">
              Explore Aryan's work across cinematic films, mind-bending visual edits, and viral short-form retention edits.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/[0.03] p-2 rounded-xl border border-white/10 self-start md:self-end">
            <Clapperboard className="w-4 h-4 text-cyan-400" />
            <span>SORTED: 1. CINEMATICS → 2. REELS → 3. VISUAL EDIT & VFX</span>
          </div>
        </div>

        {/* Category Tabs (Cinematics first, then Visual Edit, etc.) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 p-2 bg-[#090b14]/80 rounded-2xl border border-white/10 backdrop-blur-xl">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveTab(cat.id);
                }}
                onMouseEnter={() => sounds.playClick()}
                className={`flex-1 sm:flex-initial flex items-center justify-between gap-3 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] scale-102'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                  <span>{cat.label}</span>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
                  isActive ? 'bg-black/30 text-cyan-200' : 'bg-white/5 text-gray-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Video Cards Grid */}
        <div className={`grid gap-6 sm:gap-8 ${
          activeTab === 'short-form'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {filteredProjects.map((project) => {
            const isVertical = project.aspectRatio === '9:16';
            const isHovered = hoveredCard === project.id;

            return (
              <div
                key={project.id}
                onMouseEnter={() => {
                  setHoveredCard(project.id);
                  sounds.playClick();
                }}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => {
                  sounds.playShutter();
                  onSelectVideo(project);
                }}
                data-cursor="WATCH"
                className="group relative rounded-2xl sm:rounded-3xl bg-[#0b0d18] border border-white/10 hover:border-cyan-400/50 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.3)] flex flex-col"
              >
                {/* Visual Media Container */}
                <div className={`relative w-full overflow-hidden bg-black ${
                  isVertical ? 'aspect-[9/16]' : 'aspect-video'
                }`}>
                  {/* Real Video Preview on Hover / Poster fallback */}
                  {isHovered ? (
                    <video
                      src={project.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : null}
                  <img
                    src={project.posterUrl}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-95 ${
                      isHovered ? 'hidden' : 'block'
                    }`}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-cyan-400/30 text-cyan-300 font-mono text-[11px] font-bold tracking-wider">
                      {project.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 text-gray-300 font-mono text-[10px]">
                      {project.duration}
                    </span>
                  </div>

                  {/* Center Play Button Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-115 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-cyan-500 group-hover:border-transparent transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
                      <Play className="w-7 h-7 fill-current ml-1 text-cyan-200 group-hover:text-white" />
                    </div>
                  </div>

                  {/* Bottom specs tag inside thumbnail */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-gray-300 pointer-events-none">
                    <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      {project.fps}
                    </span>
                    <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs text-purple-300">
                      {project.resolution}
                    </span>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#0b0d18] to-[#070912]">
                  <div>
                    <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
                      {project.subtitle}
                    </div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/8">
                    {/* Tools Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.04] text-gray-300 border border-white/8"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* View project button */}
                    <div className="flex items-center justify-between text-xs font-medium text-cyan-400 group-hover:text-white transition-colors">
                      <span className="font-mono">OPEN FULL THEATER</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner callout */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-cyan-950/40 border border-purple-500/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-base sm:text-lg">
                Have raw footage waiting to be transformed?
              </h4>
              <p className="text-xs sm:text-sm text-gray-300">
                Aryan works with creators, filmmakers, and brands worldwide. Quick turnaround and cinema-grade export.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            onClick={() => sounds.playWhoosh()}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-xs sm:text-sm shadow-lg hover:shadow-cyan-500/25 transition-all shrink-0"
          >
            Start Your Edit Project
          </a>
        </div>
      </div>
    </section>
  );
}
