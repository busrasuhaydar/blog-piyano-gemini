import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Compass, Volume2, VolumeX, X, Download, ExternalLink } from 'lucide-react';
import { SECTIONS } from '../data/sectionsData';

interface NavigationProps {
  currentIndex: number;
  totalSections: number;
  onGoToSection: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isBackgroundMusicMuted: boolean;
  onToggleMusic: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentIndex,
  totalSections,
  onGoToSection,
  onNext,
  onPrev,
  isBackgroundMusicMuted,
  onToggleMusic,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentSection = SECTIONS[currentIndex];

  const handleDownloadHTML = () => {
    const fullHtml = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'surreal-piano-simulation.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Top Floating Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-6 md:px-8 py-3 bg-gradient-to-b from-black/90 via-black/50 to-transparent backdrop-blur-[2px]">
        {/* Brand */}
        <div
          onClick={() => onGoToSection(0)}
          className="cursor-pointer group flex items-center gap-2 shrink-0"
        >
          <span className="font-['Cinzel'] text-sm sm:text-base font-bold tracking-widest bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent group-hover:glow-cyan transition-all">
            SU'RREAL PIANO
          </span>
          <span className="hidden md:inline-block text-[10px] tracking-widest uppercase px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-300/80 bg-cyan-950/20">
            SIMULATION
          </span>
        </div>

        {/* Center: Current section info */}
        <div className="hidden md:flex items-center gap-2.5 text-xs text-neutral-300 mx-2 truncate max-w-xs xl:max-w-md">
          <span className="font-mono text-cyan-400/90 font-medium shrink-0">
            {String(currentIndex + 1).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
          </span>
          <span className="text-neutral-500">·</span>
          <span className="truncate text-neutral-300/80">
            {currentSection.title}
          </span>
        </div>

        {/* Right Actions - Padded and protected so Keşfet & İndir buttons are 100% visible */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 pr-1 sm:pr-3">
          {/* Direct HTML Download Button */}
          <button
            onClick={handleDownloadHTML}
            title="Bu web sayfasını HTML dosyası olarak bilgisayarına indir"
            className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(77,208,225,0.4)]"
          >
            <Download className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden sm:inline">HTML İndir</span>
          </button>

          {/* Sound ambient toggle */}
          <button
            onClick={onToggleMusic}
            title={isBackgroundMusicMuted ? 'Sesi Aç (Ambient)' : 'Sesi Kapat (Ambient)'}
            className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-white/15 text-xs text-neutral-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            {isBackgroundMusicMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                <span className="hidden lg:inline text-[11px]">Sessiz</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="hidden lg:inline text-[11px] text-cyan-300">Ses Açık</span>
              </>
            )}
          </button>

          {/* Keşfet (Sections) Drawer Button - Always completely visible */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/60 hover:border-cyan-300 text-cyan-300 hover:text-white text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(77,208,225,0.3)] hover:shadow-[0_0_25px_rgba(77,208,225,0.6)]"
            aria-label="Keşfet Menüsü"
            title="Keşfet (Bölümler)"
          >
            <Compass className="w-4 h-4 text-cyan-300" />
            <span className="inline font-medium">Keşfet</span>
          </button>
        </div>
      </header>

      {/* Floating Side Indicators (Dots) */}
      <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-2">
        {SECTIONS.map((sec, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={sec.id}
              onClick={() => onGoToSection(idx)}
              className="group relative p-1 focus:outline-none cursor-pointer"
              aria-label={`Section ${idx + 1}: ${sec.title}`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-6 bg-gradient-to-b from-orange-400 to-cyan-400 shadow-[0_0_12px_rgba(77,208,225,0.8)]'
                    : 'bg-white/20 group-hover:bg-cyan-400/60 group-hover:scale-125'
                }`}
              />
              {/* Tooltip */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-black/90 border border-cyan-500/30 text-[11px] text-cyan-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {String(idx + 1).padStart(2, '0')}. {sec.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Up & Down Floating Navigation Arrows */}
      {currentIndex > 0 && (
        <button
          onClick={onPrev}
          className="fixed top-16 left-4 sm:left-8 z-30 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 border border-cyan-500/30 hover:border-cyan-400 text-white/80 hover:text-cyan-300 transition-all backdrop-blur-sm group active:scale-95 animate-bounce-up cursor-pointer"
          aria-label="Previous Section"
        >
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {currentIndex < totalSections - 1 && (
        <button
          onClick={onNext}
          className="fixed bottom-6 left-4 sm:left-8 z-30 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 border border-cyan-500/30 hover:border-cyan-400 text-white/80 hover:text-cyan-300 transition-all backdrop-blur-sm group active:scale-95 animate-bounce-down cursor-pointer"
          aria-label="Next Section"
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Table of Contents Drawer Modal */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-fadeIn"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="w-full max-w-md h-full bg-neutral-950/95 border-l border-cyan-500/30 p-6 flex flex-col custom-scrollbar overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <h3 className="font-['Cinzel'] font-bold text-lg text-white">Keşfet · Bölümler</h3>
                <p className="text-xs text-neutral-400">SU'rreal Piano SIMULATION</p>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="space-y-1.5 flex-1">
              {SECTIONS.map((sec, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      onGoToSection(idx);
                      setMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-950/80 to-orange-950/40 border border-cyan-500/40 text-cyan-300'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span className="font-mono text-xs opacity-60">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="truncate">{sec.title}</span>
                    </div>
                    {sec.keyLabel && (
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/10 shrink-0">
                        {sec.keyLabel}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Actions (Download HTML & Open in New Tab) */}
            <div className="pt-4 pb-2 border-t border-white/10 space-y-2">
              <button
                onClick={handleDownloadHTML}
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/50 hover:border-cyan-400 text-cyan-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(77,208,225,0.25)]"
              >
                <Download className="w-4 h-4 text-cyan-300" />
                <span>Sayfayı HTML Olarak İndir (.html)</span>
              </button>

              <a
                href="https://ais-pre-2ykhpzqw2xegosfijaztcv-679594448252.europe-west1.run.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-medium flex items-center justify-center gap-2 transition-all"
              >
                <ExternalLink className="w-4 h-4 text-neutral-400" />
                <span>Yeni Sekmede Tam Ekran Aç</span>
              </a>
            </div>

            {/* Footer */}
            <div className="pt-2 text-[11px] text-neutral-500 text-center">
              Artwork & Simulation by Büşra Su Haydar
            </div>
          </div>
        </div>
      )}
    </>
  );
};
