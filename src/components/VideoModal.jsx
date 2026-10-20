import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Film } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function VideoModal({ video, isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [totalDuration, setTotalDuration] = useState('00:00');
  const [isVertical, setIsVertical] = useState(false);
  const videoRef = useRef(null);

  const isMainReel = video?.id === 'main-reel' || video?.forceWidescreen;

  // Reset and auto-play cleanly on modal open
  useEffect(() => {
    if (!isOpen || !video) return;

    setProgress(0);
    setCurrentTime('00:00');
    
    // Only Hero showreel is strictly forced to 16:9; other videos keep their original aspect ratio
    if (isMainReel) {
      setIsVertical(false);
    } else {
      setIsVertical(video.aspectRatio === '9:16');
    }

    // Attempt autoplay
    const timer = setTimeout(() => {
      if (videoRef.current) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // If browser blocks unmuted autoplay, mute and play
              if (videoRef.current) {
                videoRef.current.muted = true;
                setIsMuted(true);
                videoRef.current
                  .play()
                  .then(() => setIsPlaying(true))
                  .catch(() => setIsPlaying(false));
              }
            });
        }
      }
    }, 150);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, video, isMainReel]);

  if (!isOpen || !video) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setProgress((current / dur) * 100);

    const formatTime = (t) => {
      const mins = Math.floor(t / 60);
      const secs = Math.floor(t % 60);
      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    setCurrentTime(formatTime(current));
    setTotalDuration(formatTime(dur));
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = pos * (videoRef.current.duration || 1);
  };

  const handleFullscreen = (e) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleMetadata = (e) => {
    // Hero motorcycle showreel is strictly forced to 16:9 widescreen
    if (isMainReel) {
      setIsVertical(false);
      return;
    }

    if (e.target && e.target.videoHeight && e.target.videoWidth) {
      if (e.target.videoHeight > e.target.videoWidth) {
        setIsVertical(true);
      } else {
        setIsVertical(false);
      }
    }
  };

  const showVerticalLayout = !isMainReel && isVertical;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
      
      {/* Top Close Button & HUD */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-black/70 border border-white/10 text-xs font-mono text-cyan-300 backdrop-blur-md">
          <Film className="w-3.5 h-3.5 text-cyan-400" />
          <span>CINEMA MASTER PLAYBACK</span>
          <span className="text-white/20">|</span>
          <span className="text-purple-300 font-bold">{video.badge || 'PRORES'}</span>
          <span className="text-white/20">|</span>
          <span className="text-gray-300">{showVerticalLayout ? '9:16 VERTICAL' : '16:9 CINEMA'}</span>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Theater Container */}
      <div className={`w-full max-h-[94vh] flex flex-col items-center justify-center ${
        showVerticalLayout ? 'w-auto' : 'max-w-5xl'
      }`}>
        
        {/* The Video Player Screen */}
        <div 
          onClick={togglePlay}
          className={`relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_50px_rgba(168,85,247,0.3)] flex items-center justify-center group cursor-pointer ${
            showVerticalLayout ? 'h-[72vh] sm:h-[76vh] aspect-[9/16] max-w-[92vw]' : 'w-full aspect-video'
          }`}
        >
          {/* Real Video Element with dynamic key for clean reloads */}
          <video
            key={video.videoUrl}
            ref={videoRef}
            src={video.videoUrl}
            poster={video.posterUrl}
            playsInline
            muted={isMuted}
            onLoadedMetadata={handleMetadata}
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            className={`w-full h-full ${isMainReel ? 'object-cover' : 'object-contain'} bg-black`}
          />

          {/* Center Play Button Overlay when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none transition-all">
              <div className="w-18 h-18 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 p-[2px] shadow-[0_0_40px_rgba(6,182,212,0.8)] scale-100 animate-pulse">
                <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center text-white">
                  <Play className="w-8 h-8 fill-current ml-1 text-cyan-300" />
                </div>
              </div>
            </div>
          )}

          {/* Muted Warning Pill (Click to Unmute) */}
          {isMuted && isPlaying && (
            <button
              onClick={toggleMute}
              className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-cyan-950/80 border border-cyan-400/40 text-xs font-mono text-cyan-300 backdrop-blur-md transition-all hover:scale-105"
            >
              <VolumeX className="w-3.5 h-3.5 text-red-400" />
              <span>CLICK TO UNMUTE AUDIO</span>
            </button>
          )}

          {/* Custom Transport Controls Bar */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col gap-2 z-10"
          >
            {/* Scrubber Bar */}
            <div
              onClick={handleSeek}
              className="relative w-full h-2 bg-white/20 hover:h-3 rounded-full cursor-pointer transition-all overflow-hidden"
            >
              <div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between text-xs font-mono text-gray-300 pt-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                  )}
                </button>

                <span className="text-gray-300 font-mono">
                  {currentTime} / {totalDuration}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-mono text-[11px]">
                  {video.fps || '60 FPS'} · {video.resolution || (showVerticalLayout ? '1080x1920' : '4K DCI')}
                </span>
                <button
                  onClick={handleFullscreen}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Details Footer */}
        <div className={`mt-3 p-3.5 sm:p-4 rounded-2xl bg-[#090b16]/95 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left ${
          showVerticalLayout ? 'w-full max-w-[440px]' : 'w-full'
        }`}>
          <div>
            <h3 className="font-heading font-bold text-sm sm:text-base text-white">
              {video.title}
            </h3>
            <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
              {video.description}
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap gap-1.5 self-start sm:self-center">
            {video.tools?.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-purple-500/15 border border-purple-500/30 text-purple-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
