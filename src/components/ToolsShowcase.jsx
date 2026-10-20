import React, { useState } from 'react';
import { Cpu, CheckCircle2, Sparkles, Layers, Sliders, Play, Award, Zap } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function ToolsShowcase() {
  const [activeTool, setActiveTool] = useState('premiere');

  const tools = [
    {
      id: 'premiere',
      name: 'Adobe Premiere Pro',
      category: 'Primary NLE Assembly & Narrative',
      badge: 'CORE ENGINE',
      accentColor: 'from-[#6c5ce7] to-[#0984e3]',
      glowColor: 'rgba(108, 92, 231, 0.3)',
      iconLetter: 'Pr',
      description: 'The foundation of Aryan’s narrative editing. High-speed pancake timelines, multi-camera sync, optical flow time remapping, and surgical pacing.',
      capabilities: [
        'Multi-Camera & Pancake Timelines',
        'Optical Flow Time Remapping & Speed Curves',
        'Essential Sound Architecture & Audio Ducking',
        'ProRes & DNxHR 4K 10-bit Master Pipelines',
        'Lumetri Color Wheels & S-Log3 / C-Log Transforms'
      ],
      mastery: '99% Mastery',
      usage: 'Narrative Assembly, Pacing & Final Cut'
    },
    {
      id: 'ae',
      name: 'Adobe After Effects',
      category: 'Motion Graphics, VFX & 3D Tracking',
      badge: 'VISUAL EFFECTS',
      accentColor: 'from-[#9980FA] to-[#ED4C67]',
      glowColor: 'rgba(153, 128, 250, 0.3)',
      iconLetter: 'Ae',
      description: 'Where impossible visual ideas come to life. 3D match-moving, rotoscoping, HUD screen replacements, seamless object removal, and kinetic typography.',
      capabilities: [
        '3D Camera Tracking & Match-Moving',
        'Mocha Planar Tracking & Screen Replacement',
        'Complex Masking & AI RotoBrush 3.0',
        'Custom Kinetic Typography & Lower Thirds',
        'Chromatic Aberration, Film Halation & Glitches'
      ],
      mastery: '95% Mastery',
      usage: 'VFX, Motion Graphics & Transitions'
    },
    {
      id: 'capcut',
      name: 'CapCut Pro',
      category: 'Viral Short-Form & High-Retention Pacing',
      badge: 'VIRAL REELS',
      accentColor: 'from-[#00cec9] to-[#0984e3]',
      glowColor: 'rgba(0, 206, 201, 0.3)',
      iconLetter: 'Cc',
      description: 'Engineered specifically for 9:16 mobile domination. Ultra-fast turnaround, animated retention captions, sound effects placement every 2 seconds, and trending hooks.',
      capabilities: [
        'High-Retention 3-Second Opening Hooks',
        'Dynamic Word-by-Word Animated Captions',
        'Micro-Keyframed Zoom & Pan Effects',
        '9:16 Mobile-First Framing & Safe Zones',
        'Trend-Engineered Audio & Speed Ramping'
      ],
      mastery: '98% Mastery',
      usage: 'YouTube Shorts, Instagram Reels & TikTok'
    }
  ];

  return (
    <section id="tools" className="relative py-24 sm:py-32 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Post-Production Suite</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Tools I <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Work With</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed">
            Professional industry-grade software utilized to achieve broadcast-level precision, razor-sharp visual effects, and viral social retention.
          </p>
        </div>

        {/* 3D Holographic Tool Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tools.map((tool) => {
            const isSelected = activeTool === tool.id;

            return (
              <div
                key={tool.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveTool(tool.id);
                }}
                className={`relative rounded-3xl p-6 sm:p-8 bg-[#090b16] border transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-2 ${
                  isSelected
                    ? 'border-white/30 shadow-[0_0_40px_rgba(168,85,247,0.25)]'
                    : 'border-white/10 hover:border-cyan-400/30'
                }`}
                style={{
                  boxShadow: isSelected ? `0 0 35px ${tool.glowColor}` : 'none',
                }}
              >
                {/* Top Badge & Letter Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.accentColor} p-[2px] shadow-lg`}>
                      <div className="w-full h-full bg-[#080914] rounded-[14px] flex items-center justify-center font-heading font-black text-xl text-white">
                        {tool.iconLetter}
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.05] border border-white/10 text-cyan-300">
                      {tool.badge}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
                    {tool.category}
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white group-hover:text-cyan-300 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-3 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Capabilities List */}
                  <div className="mt-6 pt-6 border-t border-white/8 space-y-2.5">
                    <div className="text-[11px] font-mono text-gray-300 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Key Technical Capabilities:</span>
                    </div>
                    {tool.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Stats Footer */}
                <div className="mt-8 pt-4 border-t border-white/8 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">ROLE: {tool.usage}</span>
                  <span className="text-cyan-300 font-bold">{tool.mastery}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Audio & Color Hardware/Software badges */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/8 flex flex-wrap items-center justify-around gap-6 text-center text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>DaVinci Resolve Studio (Color Grading)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>Adobe Audition (Binaural & Spatial Audio)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400" />
            <span>Boris FX Mocha Pro (Planar 3D Tracking)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Topaz Video AI (Frame Interpolation)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
