import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';

interface ArtImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  onZoom: (src: string, alt: string) => void;
}

export const ArtImage: React.FC<ArtImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  onZoom,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex items-center justify-center p-3 rounded-xl border border-cyan-500/20 bg-neutral-900/60 text-xs text-neutral-400">
        <span>{alt}</span>
      </div>
    );
  }

  return (
    <div
      onClick={() => onZoom(src, alt)}
      className={`group relative cursor-zoom-in transition-all duration-300 hover:scale-[1.02] select-none flex items-center justify-center shrink ${className}`}
    >
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] filter transition-all duration-300 group-hover:drop-shadow-[0_20px_40px_rgba(77,208,225,0.5)] ${
          imgClassName || 'h-[44vh] sm:h-[50vh] lg:h-[52vh] max-w-full'
        } ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Floating zoom indicator */}
      <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/80 border border-white/20 text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
        <ZoomIn className="w-3.5 h-3.5" />
      </div>
    </div>
  );
};
