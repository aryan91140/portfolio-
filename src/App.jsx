import React, { useState } from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoGallery, { videoProjects } from './components/VideoGallery';
import ColorGradeCompare from './components/ColorGradeCompare';
import TimelineWorkflow from './components/TimelineWorkflow';
import AboutAryan from './components/AboutAryan';
import ToolsShowcase from './components/ToolsShowcase';
import ContactSection from './components/ContactSection';
import VideoModal from './components/VideoModal';

export default function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Opens 2026 Director 16:9 Cinematic Showreel
  const handleOpenShowreel = () => {
    setSelectedVideo({
      id: 'main-reel',
      forceWidescreen: true,
      title: "Aryan — 2026 Director Showreel",
      subtitle: "Cinematics · Visual Effects · Sound Architecture",
      description: "Aryan's primary featured master showcase: high-retention narrative flow, custom sound design impacts, optical flow speed ramps, and Hollywood color science.",
      tools: ['Adobe Premiere Pro', 'Adobe After Effects', 'CapCut Pro'],
      aspectRatio: '16:9',
      badge: 'DIRECTOR MASTER SHOWREEL',
      duration: '01:45',
      fps: '24 FPS',
      resolution: '4K DCI',
      videoUrl: './videos/main-reel.mp4',
      posterUrl: './thumbnails/main-reel.jpg',
      storyQuote: "Behind every frame, there's a story."
    });
    setIsModalOpen(true);
  };

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#030306] text-[#e2e8f0] selection:bg-purple-600 selection:text-white">
      {/* 1. Subtle 35mm Film Grain Overlay */}
      <div className="film-grain" />

      {/* 2. Interactive 3D WebGL Background (Three.js with camera scroll parallax) */}
      <ThreeCanvas />

      {/* 3. Futuristic Camera Reticle Custom Cursor */}
      <CustomCursor />

      {/* 4. Cinematic Glassmorphic Navbar with Live Timecode & Audio Synthesizer */}
      <Navbar />

      {/* 5. Main Content Flow */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero onOpenReel={handleOpenShowreel} />

        {/* Video Showcase (Cinematics first, then Visual Edit, Short-Form, etc.) */}
        <VideoGallery onSelectVideo={handleSelectVideo} />

        {/* Interactive Before & After Color Grading Comparison Slider */}
        <ColorGradeCompare />

        {/* Interactive Premiere/AE Multi-Track Timeline Workflow Simulator */}
        <TimelineWorkflow />

        {/* About Aryan — Story, Vision & Core Pillars */}
        <AboutAryan />

        {/* Tools I Work With — Premiere Pro, After Effects, CapCut Pro */}
        <ToolsShowcase />

        {/* Contact & "Let's create something worth watching" */}
        <ContactSection />
      </main>

      {/* 6. Fullscreen Cinematic Theater Video Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
