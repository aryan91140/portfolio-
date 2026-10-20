import React, { useState } from 'react';
import { Layers, Volume2, Video, Sparkles, Scissors, Music, Eye, CheckCircle2, Play, Pause } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function TimelineWorkflow() {
  const [selectedClip, setSelectedClip] = useState({
    title: 'Speed Ramp & Impact Cut',
    track: 'V2 (B-Roll Layer)',
    duration: '00:03:12',
    decision: 'Ramped from 120fps down to 24fps on motion peak, paired with low-frequency sub-bass impact to maximize visceral viewer engagement.',
    effect: 'Optical Flow Time Remapping + Motion Blur'
  });
  const [playheadPos, setPlayheadPos] = useState(38); // percentage 0 - 100
  const [isPlaying, setIsPlaying] = useState(false);

  const videoTracks = [
    {
      id: 'V3',
      name: 'V3 · VFX & GRAPHICS',
      color: 'bg-purple-600/30 border-purple-500/50 text-purple-300',
      activeColor: 'bg-purple-600/60',
      clips: [
        { start: 5, width: 22, title: '3D Camera Track', effect: 'Point Tracker + Element 3D', decision: 'Match-moved 3D title into building geometry with realistic depth occlusion.' },
        { start: 35, width: 18, title: 'Speed Ramp & Impact Cut', effect: 'Optical Flow Time Remapping', decision: 'Ramped from 120fps down to 24fps on motion peak, paired with low-frequency sub-bass impact to maximize visceral viewer engagement.' },
        { start: 60, width: 25, title: 'Film Light Leak & Grain', effect: '35mm Film Halation Overlay', decision: 'Authentic 35mm optical gate weave and halation on specular highlights.' },
      ]
    },
    {
      id: 'V2',
      name: 'V2 · B-ROLL CUTAWAYS',
      color: 'bg-cyan-600/30 border-cyan-500/50 text-cyan-300',
      activeColor: 'bg-cyan-600/60',
      clips: [
        { start: 0, width: 28, title: 'Drone Establishing Shot', effect: 'Parallax Horizon Stabilize', decision: 'Ultra-wide landscape shot establishing scale and emotional weight.' },
        { start: 30, width: 35, title: 'Macro Detail Foley Cut', effect: 'Speed Curve 150% -> 50%', decision: 'Extreme macro close-up inserted on the music swell to build curiosity.' },
        { start: 70, width: 28, title: 'Golden Hour Silhouette', effect: 'Orange & Teal Split Grade', decision: 'High contrast silhouette transitioning into final payoff scene.' },
      ]
    },
    {
      id: 'V1',
      name: 'V1 · A-ROLL NARRATIVE',
      color: 'bg-indigo-600/30 border-indigo-500/50 text-indigo-300',
      activeColor: 'bg-indigo-600/60',
      clips: [
        { start: 0, width: 45, title: 'Main Subject Hook', effect: 'Jump Cut Removal & Smooth Pacing', decision: 'The core story anchor. Trimmed all dead air and breathing pauses to keep retention above 90%.' },
        { start: 47, width: 51, title: 'Climax & Brand Revelation', effect: 'Dynamic Punch-in (115% Zoom)', decision: 'Slow scale-in to emphasize the emotional turning point of the speech.' },
      ]
    }
  ];

  const audioTracks = [
    {
      id: 'A1',
      name: 'A1 · DIALOGUE & VO',
      color: 'bg-emerald-600/30 border-emerald-500/50 text-emerald-300',
      clips: [
        { start: 2, width: 43, title: 'Main VO (De-noised + EQ)', effect: 'Multiband Compressor', decision: 'Vocal isolation, dynamic EQ carving out space for music, and warm broadcast compression.' },
        { start: 48, width: 50, title: 'Narrator Climax Delivery', effect: 'Limiter (-1 dB True Peak)', decision: 'Intimate vocal tone with stereo widening for immersive delivery.' }
      ]
    },
    {
      id: 'A2',
      name: 'A2 · SOUND DESIGN & FOLEY',
      color: 'bg-amber-600/30 border-amber-500/50 text-amber-300',
      clips: [
        { start: 10, width: 14, title: 'Cinematic Whoosh Transition', effect: 'Stereo Panning Sweep', decision: 'Directional whip pan whoosh pushing viewer’s ear into the scene shift.' },
        { start: 34, width: 18, title: 'Sub-Bass Drop Impact', effect: '30Hz Low-End Hit', decision: 'Chest-thumping impact hit synchronized exactly to the cut.' },
        { start: 58, width: 20, title: 'Mechanical Click Foley', effect: 'High-Pass Crisp Foley', decision: 'Tactile sound layer adding realism and tactile feedback.' }
      ]
    },
    {
      id: 'A3',
      name: 'A3 · CINEMATIC SCORE',
      color: 'bg-rose-600/30 border-rose-500/50 text-rose-300',
      clips: [
        { start: 0, width: 98, title: 'Orchestral Hybrid Theme', effect: 'Auto-Ducking to Dialogue', decision: 'Theme that builds from subtle synth drone into full orchestral swell at 00:45.' }
      ]
    }
  ];

  const handleClipClick = (clip, trackName) => {
    sounds.playClick();
    setSelectedClip({
      title: clip.title,
      track: trackName,
      duration: '00:02:18',
      decision: clip.decision,
      effect: clip.effect
    });
  };

  return (
    <section id="workflow" className="relative py-24 sm:py-32 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive NLE Engine</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Inside Aryan's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Editing Timeline</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed">
            Editing isn't just cutting clips — it's constructing a multi-layered sensory experience. Click any clip on the interactive timeline below to see the exact creative and technical decisions behind every cut.
          </p>
        </div>

        {/* NLE Editor Container */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#090b14] border border-white/15 overflow-hidden shadow-2xl shadow-purple-950/30">
          
          {/* Top Timeline Transport Bar */}
          <div className="px-4 sm:px-6 py-3 bg-[#0d0f1c] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 border border-white/10 text-cyan-400 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                SEQUENCE: MASTER_CUT_v4.prproj
              </span>
              <span className="hidden sm:inline text-xs font-mono text-gray-400">
                23.976 FPS · 48.0 kHz 24-BIT
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-gray-300">
              <div className="flex items-center gap-1">
                <Scissors className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">RIPPLE EDIT ACTIVE</span>
              </div>
              <div className="flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>-6 dB MASTER PEAK</span>
              </div>
            </div>
          </div>

          {/* Timeline Ruler / Timecode markers */}
          <div className="relative h-8 bg-[#070810] border-b border-white/10 flex items-center px-24 text-[10px] font-mono text-gray-400 select-none overflow-hidden">
            <div className="w-full flex justify-between">
              <span>00:00:00:00</span>
              <span>00:00:15:00</span>
              <span>00:00:30:00</span>
              <span>00:00:45:00</span>
              <span>00:01:00:00</span>
              <span>00:01:15:00</span>
            </div>
            
            {/* Draggable Playhead Needle */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none -ml-2 flex flex-col items-center"
              style={{ left: `${playheadPos}%` }}
            >
              <div className="w-4 h-3 bg-cyan-400 rounded-b clip-path-polygon shadow-[0_0_8px_#22d3ee]" />
              <div className="w-[1px] h-96 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            </div>
          </div>

          {/* Tracks Area */}
          <div className="p-4 sm:p-6 space-y-2 relative overflow-x-auto min-w-[650px]">
            
            {/* Video Tracks Label */}
            <div className="text-[11px] font-mono text-cyan-400/80 uppercase tracking-widest flex items-center gap-2 mb-1">
              <Video className="w-3.5 h-3.5" />
              <span>Video Layers (Overlays, B-Roll, Narrative)</span>
            </div>

            {videoTracks.map((track) => (
              <div key={track.id} className="flex items-center gap-3">
                <div className="w-20 sm:w-28 text-left text-xs font-mono text-gray-400 bg-white/[0.03] px-2.5 py-2.5 rounded-lg border border-white/8 shrink-0">
                  {track.id}
                </div>
                <div className="flex-1 h-11 bg-white/[0.02] rounded-lg border border-white/5 relative overflow-hidden flex items-center">
                  {track.clips.map((clip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleClipClick(clip, track.name)}
                      className={`absolute h-8 rounded-md border text-left px-2.5 flex items-center justify-between text-xs font-mono truncate transition-all duration-200 cursor-pointer ${
                        selectedClip.title === clip.title
                          ? `${track.activeColor} border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] z-10 scale-[1.01]`
                          : `${track.color} hover:brightness-125`
                      }`}
                      style={{
                        left: `${clip.start}%`,
                        width: `${clip.width}%`,
                      }}
                    >
                      <span className="truncate font-semibold">{clip.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Audio Divider */}
            <div className="pt-3 pb-1 text-[11px] font-mono text-purple-400/80 uppercase tracking-widest flex items-center gap-2">
              <Music className="w-3.5 h-3.5" />
              <span>Audio Layers (Voice, Foley, Master Score)</span>
            </div>

            {audioTracks.map((track) => (
              <div key={track.id} className="flex items-center gap-3">
                <div className="w-20 sm:w-28 text-left text-xs font-mono text-gray-400 bg-white/[0.03] px-2.5 py-2.5 rounded-lg border border-white/8 shrink-0">
                  {track.id}
                </div>
                <div className="flex-1 h-11 bg-white/[0.02] rounded-lg border border-white/5 relative overflow-hidden flex items-center">
                  {track.clips.map((clip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleClipClick(clip, track.name)}
                      className={`absolute h-8 rounded-md border text-left px-2.5 flex items-center justify-between text-xs font-mono truncate transition-all duration-200 cursor-pointer ${
                        selectedClip.title === clip.title
                          ? 'bg-purple-600/70 border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] z-10 scale-[1.01]'
                          : `${track.color} hover:brightness-125`
                      }`}
                      style={{
                        left: `${clip.start}%`,
                        width: `${clip.width}%`,
                      }}
                    >
                      <span className="truncate font-semibold">{clip.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Clip Decision Inspector Panel */}
          <div className="p-5 sm:p-6 bg-[#0c0e1a] border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {selectedClip.track}
                </span>
                <h4 className="font-heading font-bold text-base sm:text-lg text-white">
                  {selectedClip.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                <strong className="text-cyan-400">Editor's Intent: </strong>
                {selectedClip.decision}
              </p>
              <div className="text-xs font-mono text-purple-300">
                <strong>Technique / FX Chain: </strong>
                {selectedClip.effect}
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-gray-300">
                <div className="text-[10px] text-gray-400">STATUS</div>
                <div className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  KEYFRAMED & MASTERED
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Aryan's 5-Phase Production Cycle */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { num: '01', title: 'Story Ingest', desc: 'Logging selects, analyzing emotional beats, organizing bins.' },
            { num: '02', title: 'Rough Cut Pacing', desc: 'Trimming fat, locking the rhythm to viewer attention spans.' },
            { num: '03', title: 'Audio Architecture', desc: 'Layering foley, whooshes, impacts, and surgical dialogue leveling.' },
            { num: '04', title: 'Visual FX & Motion', desc: 'Speed ramps, 3D tracking, seamless transitions, typography.' },
            { num: '05', title: 'Color Mastering', desc: 'Film emulation, skin tone matching, high-bitrate ProRes/H.265 master.' },
          ].map((phase, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 rounded-xl border border-white/8 hover:border-cyan-400/30 transition-all text-left"
            >
              <div className="font-mono text-xs font-bold text-cyan-400 mb-1">
                PHASE {phase.num}
              </div>
              <div className="font-heading font-bold text-sm text-white mb-1">
                {phase.title}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                {phase.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
