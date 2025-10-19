"use client";

import { useState } from "react";
import { Play, Pause } from "lucide-react";

interface DemoVideoProps {
  src?: string;
  poster?: string;
  className?: string;
}

export function DemoVideo({ 
  src = "/videos/demo.mp4", 
  poster,
  className = "" 
}: DemoVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlayPause = () => {
    const video = document.querySelector('video') as HTMLVideoElement;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div 
      className={`demo-video-container ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="demo-video-wrapper">
        <video
          className="demo-video"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient Overlay */}
        <div className="demo-video-overlay" />
        
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className={`demo-video-control ${isHovered ? 'visible' : ''}`}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}