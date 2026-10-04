import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SECTIONS } from './data/sectionsData';
import { ThreeOcean } from './components/ThreeOcean';
import { SectionViews } from './components/SectionViews';
import { Navigation } from './components/Navigation';
import { Lightbox } from './components/Lightbox';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDiving, setIsDiving] = useState(false);
  const [lightboxData, setLightboxData] = useState<{ src: string; alt: string } | null>(null);
  const [isMusicMuted, setIsMusicMuted] = useState(false);

  const isTransitioningRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);

  // Background Ambient Sound - Always automatically playing
  useEffect(() => {
    const audio = new Audio('https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/vm.mp4');
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    // Try playing immediately
    audio.play().then(() => {
      setIsMusicMuted(false);
    }).catch(() => {
      // Browser autoplay policy might require a user interaction (click, touch, scroll)
      const enableAudioOnGesture = () => {
        if (audioRef.current) {
          audioRef.current.play().then(() => setIsMusicMuted(false)).catch(() => {});
        }
        window.removeEventListener('click', enableAudioOnGesture);
        window.removeEventListener('touchstart', enableAudioOnGesture);
        window.removeEventListener('wheel', enableAudioOnGesture);
        window.removeEventListener('keydown', enableAudioOnGesture);
      };

      window.addEventListener('click', enableAudioOnGesture, { once: true, passive: true });
      window.addEventListener('touchstart', enableAudioOnGesture, { once: true, passive: true });
      window.addEventListener('wheel', enableAudioOnGesture, { once: true, passive: true });
      window.addEventListener('keydown', enableAudioOnGesture, { once: true, passive: true });
    });

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicMuted) {
      audioRef.current.play().then(() => setIsMusicMuted(false)).catch(() => {});
    } else {
      audioRef.current.pause();
      setIsMusicMuted(true);
    }
  };

  const goToSection = useCallback((targetIndex: number) => {
    if (isTransitioningRef.current) return;
    if (targetIndex < 0 || targetIndex >= SECTIONS.length) return;

    isTransitioningRef.current = true;
    setCurrentIndex(targetIndex);

    // Background ocean video is visible starting from Page 2 (index 1), Page 3 (index 2) and all subsequent pages!
    if (bgVideoRef.current) {
      if (targetIndex >= 1) {
        bgVideoRef.current.play().catch(() => {});
      } else {
        bgVideoRef.current.pause();
      }
    }

    setTimeout(() => {
      isTransitioningRef.current = false;
      setIsDiving(false);
    }, 600);
  }, []);

  // Ensure sea video playback starts on sections >= 1
  useEffect(() => {
    if (bgVideoRef.current && currentIndex >= 1) {
      bgVideoRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < SECTIONS.length - 1) {
      goToSection(currentIndex + 1);
    }
  }, [currentIndex, goToSection]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      goToSection(currentIndex - 1);
    }
  }, [currentIndex, goToSection]);

  // Smooth single-action dive from hero to concept video
  const handleDiveIn = useCallback(() => {
    if (isTransitioningRef.current) return;
    setIsDiving(true);
    setTimeout(() => {
      goToSection(1);
    }, 450);
  }, [goToSection]);

  // Intelligent scroll interception: allow scrolling inside text boxes without jumping sections!
  const isInsideScrollableContent = (target: EventTarget | null, deltaY: number): boolean => {
    if (!target || !(target instanceof HTMLElement)) return false;
    const container = target.closest<HTMLElement>('.custom-scrollbar, .overflow-y-auto');
    if (!container) return false;

    const hasScrollableContent = container.scrollHeight > container.clientHeight + 4;
    if (!hasScrollableContent) return false;

    const isScrollingDown = deltaY > 0;
    const isScrollingUp = deltaY < 0;

    const canScrollDown = container.scrollTop + container.clientHeight < container.scrollHeight - 6;
    const canScrollUp = container.scrollTop > 6;

    if (isScrollingDown && canScrollDown) return true;
    if (isScrollingUp && canScrollUp) return true;

    return false;
  };

  // Wheel listener
  useEffect(() => {
    let lastWheelTime = 0;

    const onWheel = (e: WheelEvent) => {
      if (isInsideScrollableContent(e.target, e.deltaY)) {
        return;
      }

      e.preventDefault();

      const now = Date.now();
      if (now - lastWheelTime < 500) return;
      if (isTransitioningRef.current) return;

      const delta = e.deltaY;
      if (Math.abs(delta) < 18) return;

      lastWheelTime = now;

      if (currentIndex === 0 && delta > 0) {
        handleDiveIn();
      } else if (delta > 0) {
        handleNext();
      } else if (delta < 0) {
        handlePrev();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [currentIndex, handleDiveIn, handleNext, handlePrev]);

  // Touch Swipe listener
  useEffect(() => {
    let touchStartY = 0;
    let touchStartX = 0;
    let targetElement: EventTarget | null = null;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      targetElement = e.target;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length !== 1) return;
      const endY = e.changedTouches[0].clientY;
      const endX = e.changedTouches[0].clientX;
      const dy = touchStartY - endY;
      const dx = touchStartX - endX;

      if (Math.abs(dy) < 35 || Math.abs(dy) < Math.abs(dx) * 1.3) return;

      if (isInsideScrollableContent(targetElement, dy)) {
        return;
      }

      if (currentIndex === 0 && dy > 0) {
        handleDiveIn();
      } else if (dy > 0) {
        handleNext();
      } else if (dy < 0) {
        handlePrev();
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [currentIndex, handleDiveIn, handleNext, handlePrev]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        if (currentIndex === 0) handleDiveIn();
        else handleNext();
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentIndex, handleDiveIn, handleNext, handlePrev]);

  const currentSection = SECTIONS[currentIndex];

  return (
    <main className="relative w-full h-[100dvh] min-h-[100dvh] bg-black text-white overflow-hidden select-none">
      {/* 3D WebGL Ocean Canvas with original colors across all devices */}
      <ThreeOcean currentSection={currentIndex} isDiving={isDiving} />

      {/* Atmospheric Ocean Background Video: visible on Page 2, Page 3, Page 4 and all deeper pages */}
      <video
        ref={bgVideoRef}
        src="https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/vm.mp4"
        loop
        muted
        playsInline
        autoPlay
        className={`fixed inset-0 w-full h-full object-cover pointer-events-none z-0 transition-opacity duration-700 ${
          currentIndex >= 1 ? 'opacity-95 sm:opacity-100' : 'opacity-0'
        }`}
      />

      {/* Navigation Bars & Floating Controls */}
      <Navigation
        currentIndex={currentIndex}
        totalSections={SECTIONS.length}
        onGoToSection={goToSection}
        onNext={handleNext}
        onPrev={handlePrev}
        isBackgroundMusicMuted={isMusicMuted}
        onToggleMusic={toggleMusic}
      />

      {/* Main Section Content Stage */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pt-12 pb-6 sm:pt-14 sm:pb-8">
        <div
          key={currentSection.id}
          className="w-full h-full flex items-center justify-center animate-fadeIn transition-opacity duration-500"
        >
          <SectionViews
            section={currentSection}
            index={currentIndex}
            onDiveIn={handleDiveIn}
            onZoomImage={(src, alt) => setLightboxData({ src, alt })}
          />
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        src={lightboxData?.src || null}
        alt={lightboxData?.alt || ''}
        onClose={() => setLightboxData(null)}
      />
    </main>
  );
}
