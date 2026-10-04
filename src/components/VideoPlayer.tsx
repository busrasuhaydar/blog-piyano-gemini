import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  fallbackSrc?: string;
  poster?: string;
  autoPlayWhenActive?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  fallbackSrc,
  poster,
  autoPlayWhenActive = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [currentSource, setCurrentSource] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Auto-play when section is active
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (autoPlayWhenActive) {
      video.muted = isMuted;
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fallback to muted playback if browser restricts sound autoplay
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [autoPlayWhenActive]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !video.muted;
    video.muted = newMuted;
    setIsMuted(newMuted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      video.requestFullscreen?.();
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const current = video.currentTime;
    const total = video.duration;
    setProgress((current / total) * 100);
    setCurrentTime(formatTime(current));
    setDuration(formatTime(total));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    const bar = progressRef.current;
    if (!video || !bar) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = percentage * (video.duration || 0);
  };

  const handleError = () => {
    if (fallbackSrc && currentSource !== fallbackSrc) {
      setCurrentSource(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="relative w-full max-w-[1100px] max-h-[calc(100dvh-130px)] flex flex-col mx-auto rounded-2xl overflow-hidden border border-cyan-500/40 bg-black/60 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(77,208,225,0.25)] group">
      {/* Video container */}
      <div className="relative aspect-video max-h-[calc(100dvh-190px)] w-full bg-black cursor-pointer flex items-center justify-center overflow-hidden" onClick={() => togglePlay()}>
        <video
          ref={videoRef}
          src={currentSource}
          poster={poster}
          playsInline
          loop
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={handleError}
          className="w-full h-full object-contain"
        />

        {/* Big center play button overlay when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[2px] transition-opacity">
            <button
              onClick={togglePlay}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-orange-500 to-cyan-400 p-[2px] shadow-[0_0_40px_rgba(255,119,51,0.6)] transform hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer z-30"
              aria-label="Play Video"
            >
              <div className="w-full h-full rounded-full bg-black/85 flex items-center justify-center pl-1">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-300 fill-cyan-300" />
              </div>
            </button>
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 p-4 text-center">
            <p className="text-orange-400 font-semibold mb-2">Loading video stream…</p>
            <p className="text-neutral-400 text-xs max-w-md">
              Please wait a moment while the high-resolution video stream initializes.
            </p>
          </div>
        )}
      </div>

      {/* Control bar */}
      <div className="relative z-30 flex items-center gap-3 sm:gap-4 px-4 py-3 bg-neutral-950/90 border-t border-cyan-500/20 backdrop-blur-md">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="p-2 sm:p-2.5 rounded-lg bg-orange-500/15 hover:bg-orange-500/30 text-orange-400 hover:text-orange-300 border border-orange-500/30 transition-all flex items-center justify-center cursor-pointer"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />}
        </button>

        {/* Progress Bar */}
        <div
          ref={progressRef}
          onClick={handleSeek}
          className="relative flex-1 h-3 sm:h-3.5 bg-white/10 hover:bg-white/15 rounded-full overflow-hidden cursor-pointer p-0.5 transition-colors"
        >
          <div
            className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-cyan-400 rounded-full transition-all duration-75 relative"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Time display */}
        <span className="text-xs sm:text-sm font-mono text-orange-300/80 min-w-[70px] sm:min-w-[85px] text-center select-none">
          {currentTime} / {duration}
        </span>

        {/* Mute/Unmute */}
        <button
          onClick={toggleMute}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="hidden sm:flex p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          aria-label="Fullscreen"
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
