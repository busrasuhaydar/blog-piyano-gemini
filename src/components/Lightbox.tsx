import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

interface LightboxProps {
  src: string | null;
  alt?: string;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ src, alt = '', onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setIsZoomed(false);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-fadeIn select-none"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all transform hover:rotate-90 duration-300"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Image Container */}
      <div
        className="relative max-w-full max-h-[92vh] flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsZoomed(!isZoomed);
        }}
      >
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          className={`max-w-[95vw] max-h-[88vh] object-contain transition-transform duration-300 ease-out rounded-lg shadow-2xl ${
            isZoomed ? 'scale-175 sm:scale-200 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
        />
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 border border-white/15 text-xs sm:text-sm text-neutral-300 pointer-events-none">
        {isZoomed ? (
          <>
            <ZoomOut className="w-4 h-4 text-cyan-400" />
            <span>Click image to zoom out • Click outside to close</span>
          </>
        ) : (
          <>
            <ZoomIn className="w-4 h-4 text-cyan-400" />
            <span>Click image to zoom • Click outside to close</span>
          </>
        )}
      </div>
    </div>
  );
};
