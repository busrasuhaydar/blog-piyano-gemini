import React from 'react';
import { SectionItem } from '../data/sectionsData';
import { ArtImage } from './ArtImage';
import { VideoPlayer } from './VideoPlayer';

interface SectionViewsProps {
  section: SectionItem;
  index: number;
  onDiveIn: () => void;
  onZoomImage: (src: string, alt: string) => void;
}

export const SectionViews: React.FC<SectionViewsProps> = ({
  section,
  index: _index,
  onDiveIn,
  onZoomImage,
}) => {
  // 1. HERO SECTION
  if (section.type === 'hero') {
    return (
      <div className="relative w-full h-full max-h-full flex flex-col items-center justify-between py-3 sm:py-6 px-4 select-none overflow-hidden">
        {/* Floating Title & Subtitle */}
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center z-10 max-w-4xl mx-auto my-auto">
          <h1 className="font-['Cinzel'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-b from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent glow-cyan drop-shadow-2xl">
            SU'rreal PIANO
          </h1>
          <p className="font-['Orbitron'] text-xl sm:text-2xl md:text-3xl font-light tracking-[0.3em] uppercase text-neutral-200/90 mt-2 mb-2">
            SIMULATION
          </p>
          <p className="text-xs sm:text-sm font-light text-neutral-400/80 tracking-widest">
            by Büşra Su Haydar
          </p>
        </div>

        {/* Piano Silhouette */}
        <div className="w-full max-w-2xl px-4 z-10 flex justify-center items-end opacity-75 mb-4 sm:mb-6 pointer-events-none shrink-0">
          <div className="flex items-end justify-center p-2.5 rounded-2xl bg-black/40 border border-cyan-500/25 backdrop-blur-sm shadow-[0_-15px_40px_rgba(77,208,225,0.3)]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((k) => {
              const isBlack = [2, 4, 7, 9, 11, 14, 16].includes(k);
              return (
                <div
                  key={k}
                  className={`mx-[1.5px] rounded-b-sm ${
                    isBlack
                      ? 'w-3 sm:w-4 h-12 sm:h-18 bg-gradient-to-b from-neutral-900 to-black border border-cyan-500/30 -mx-1.5 z-10'
                      : 'w-4 sm:w-6 h-18 sm:h-26 bg-gradient-to-b from-white/20 to-white/5 border border-white/20'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Dive In Button */}
        <div className="z-30 flex flex-col items-center shrink-0 mb-1 sm:mb-2">
          <button
            onClick={onDiveIn}
            className="group px-7 py-2.5 sm:py-3 rounded-full bg-black/60 hover:bg-black/80 border border-cyan-400/60 hover:border-cyan-300 text-white font-medium tracking-[0.25em] text-xs sm:text-sm uppercase transition-all duration-300 shadow-[0_0_25px_rgba(77,208,225,0.4)] hover:shadow-[0_0_40px_rgba(77,208,225,0.7)] flex flex-col items-center gap-1.5 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="tracking-[0.2em] font-light">Dıve ın</span>
            <div className="w-3.5 h-3.5 border-l-2 border-b-2 border-white/80 -rotate-45 group-hover:translate-y-1 transition-transform animate-bounce" />
          </button>
        </div>
      </div>
    );
  }

  // 2. THE CONCEPT VIDEO
  if (section.type === 'video-concept') {
    return (
      <div className="w-full h-full max-h-full flex flex-col items-center justify-center p-2 sm:p-6 max-w-5xl mx-auto overflow-hidden lg:overflow-visible">
        <VideoPlayer
          src="https://raw.githubusercontent.com/busrasuhaydar/piyanoblogadosyalar/main/assets/piano.MP4"
          fallbackSrc="https://cdn.jsdelivr.net/gh/busrasuhaydar/piyanoblogadosyalar@main/assets/piano.MP4"
        />
      </div>
    );
  }

  // 3. SU'RREAL PIANO SIMULATION (FEATURES)
  if (section.type === 'simulation-features') {
    return (
      <div className="w-full h-full max-h-full flex flex-col justify-center items-center p-2 sm:p-4 max-w-5xl mx-auto overflow-hidden lg:overflow-visible">
        {/* Features header at top */}
        <div className="w-full text-center mb-2.5 sm:mb-3 shrink-0">
          <div className="flex flex-wrap justify-center gap-1.5 mb-2 max-w-4xl mx-auto">
            {[
              'WATER-BASED',
              'LIVING',
              'REAL-TIME',
              'MULTILAYERED (+100)',
              'EVOLVING',
              'TRADITIONAL PAINT BASED GENERATIVE ART',
              'TRADITIONAL PAINT BASED GENERATIVE ART',
            ].map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider text-cyan-300 bg-cyan-950/40 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_12px_rgba(77,208,225,0.2)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="font-['Orbitron'] text-lg sm:text-2xl font-bold tracking-wider text-orange-400 glow-orange uppercase">
            SU'RREAL PIANO SIMULATION
          </h2>
        </div>

        {/* Center: Dream Piano Visual fully visible with natural aspect ratio */}
        <div className="flex justify-center items-center w-full max-w-2xl shrink">
          {section.heroImage && (
            <ArtImage
              src={section.heroImage}
              alt="My Dream Piano"
              onZoom={onZoomImage}
              imgClassName="h-[min(48vh,450px)] max-h-[calc(100dvh-220px)] w-auto max-w-full object-contain"
              className="rounded-2xl border border-cyan-500/30 p-1 bg-black/40 shadow-2xl"
            />
          )}
        </div>
      </div>
    );
  }

  // 4. THE UNIVERSE (DEDICATED SECTION)
  // Generous, readable text box on mobile + desktop, with title completely clear
  if (section.type === 'universe') {
    return (
      <div className="w-full h-full max-h-full flex flex-col justify-center items-center p-2 sm:p-4 max-w-5xl mx-auto overflow-hidden lg:overflow-visible">
        {/* Clear Top Header */}
        <div className="w-full text-center mb-2 sm:mb-2.5 shrink-0">
          <h2 className="font-['Cinzel'] text-xl sm:text-2xl font-bold text-cyan-300 glow-cyan">
            The Universe
          </h2>
        </div>

        {/* Mobile View: Visual on top, comfortable scrollable text box below */}
        <div className="flex lg:hidden flex-col items-center w-full overflow-y-auto custom-scrollbar">
          {section.heroImage && (
            <ArtImage
              src={section.heroImage}
              alt="My Dream Piano"
              onZoom={onZoomImage}
              imgClassName="h-[22vh] sm:h-[26vh] max-w-[200px]"
              className="mb-2.5 rounded-xl border border-cyan-500/30 p-1 bg-black/40 shadow-lg"
            />
          )}
          <div className="w-full max-w-[94vw] sm:max-w-[520px] h-[48vh] sm:h-[54vh] overflow-y-auto custom-scrollbar p-4 sm:p-5 rounded-2xl bg-black/65 border border-cyan-500/30 backdrop-blur-xl shadow-2xl text-left space-y-3">
            <div className="space-y-2 text-xs sm:text-sm text-neutral-200/90 leading-relaxed">
              <p>This deep Story is a live, real-time, simultaneous chronology of LOVE & LIFE.</p>
              <p>
                SU'rreal Piano is a universe where sounds can be seen, colors can be heard, multilayered, filled with water and secrets, alive and capable of evolving.
              </p>
              <p>
                SU'rreal Piano is the first water-based instrument that aims to activate the brain's multisensory integration capacity and transform the experience into a pure omnisensory universe.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 space-y-1">
              <p className="text-xs sm:text-sm font-bold text-orange-400">
                7 notes, 16 keys, 3 octaves, 48 tones. And 7 seconds.
              </p>
              <p className="text-[11px] sm:text-xs italic text-orange-200">
                7 seconds, the entire life of 7 notes. infinite feeling.
              </p>
              <p className="text-[11px] sm:text-xs text-orange-100 italic">
                Can you compose by painting the water with color and sound?
              </p>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-neutral-200/90 leading-relaxed">
              <p>
                Each of the 7 notes is a story, each story a thousand emotions, each emotion a color, each color finds its own sound through touch. Each sound is in the frequency of its own color, each frequency is seen and heard directly in your heart.
              </p>
              <p className="text-xs font-medium text-cyan-300 italic pt-1">
                Just touch and color the silence of this unique universe..
              </p>
            </div>
          </div>
        </div>

        {/* Desktop View: Side-by-Side continuous row matching user's code */}
        <div className="hidden lg:flex flex-row items-center justify-center gap-8 xl:gap-12 w-[88%] max-w-[1400px]">
          {section.heroImage && (
            <ArtImage
              src={section.heroImage}
              alt="My Dream Piano"
              onZoom={onZoomImage}
              imgClassName="h-[65vh] max-h-[650px] w-auto max-w-[480px] xl:max-w-[540px] object-contain"
              className="rounded-2xl border border-cyan-500/30 p-1 bg-black/40 shadow-2xl shrink-0"
            />
          )}

          <div className="flex-1 max-w-[700px] h-[65vh] max-h-[650px] overflow-y-auto custom-scrollbar p-6 xl:p-8 rounded-2xl bg-black/50 border border-cyan-500/30 backdrop-blur-xl shadow-2xl text-left space-y-3">
            <div className="space-y-2 text-sm text-neutral-200/90 leading-relaxed">
              <p>This deep Story is a live, real-time, simultaneous chronology of LOVE & LIFE.</p>
              <p>
                SU'rreal Piano is a universe where sounds can be seen, colors can be heard, multilayered, filled with water and secrets, alive and capable of evolving.
              </p>
              <p>
                SU'rreal Piano is the first water-based instrument that aims to activate the brain's multisensory integration capacity and transform the experience into a pure omnisensory universe.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 space-y-1">
              <p className="text-sm font-bold text-orange-400">
                7 notes, 16 keys, 3 octaves, 48 tones. And 7 seconds.
              </p>
              <p className="text-xs italic text-orange-200">
                7 seconds, the entire life of 7 notes. infinite feeling.
              </p>
              <p className="text-xs text-orange-100 italic">
                Can you compose by painting the water with color and sound?
              </p>
            </div>

            <div className="space-y-2 text-sm text-neutral-200/90 leading-relaxed">
              <p>
                Each of the 7 notes is a story, each story a thousand emotions, each emotion a color, each color finds its own sound through touch. Each sound is in the frequency of its own color, each frequency is seen and heard directly in your heart.
              </p>
              <p className="text-sm font-medium text-cyan-300 italic pt-1">
                Just touch and color the silence of this unique universe..
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. THE MAGIC SECTION
  if (section.type === 'magic') {
    return (
      <div className="w-full h-full max-h-full flex flex-col items-center justify-center p-2 sm:p-5 max-w-4xl mx-auto overflow-hidden lg:overflow-visible">
        <div className="w-full p-5 sm:p-6 rounded-3xl bg-black/60 border border-cyan-500/35 backdrop-blur-xl shadow-2xl text-center space-y-3 max-h-[min(54vh,480px)] lg:max-h-[calc(100dvh-160px)] overflow-y-auto custom-scrollbar">
          <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 via-orange-300 to-orange-500 bg-clip-text text-transparent glow-cyan">
            The Magic
          </h2>

          <div className="text-xs sm:text-sm italic text-neutral-300">
            <p>Already, first of all, don't forget;</p>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-lg mx-auto">
              Although I created it by prioritizing my scientific research on the frequencies of sounds and colors, and since I filtered all the theories and allegories through my own lens, the result naturally became personal.
            </p>

            <p className="text-xs font-semibold tracking-widest uppercase text-orange-400">
              That's the special part.
            </p>

            <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-black to-orange-950/40 border border-cyan-500/30 shadow-inner">
              <p className="text-base sm:text-xl font-medium leading-snug">
                When you look at my <span className="text-orange-400 font-bold glow-orange">blue</span>,<br />
                you can see your own <span className="text-cyan-400 font-bold glow-cyan">orange</span>.
              </p>
              <p className="text-lg sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-cyan-300 to-white mt-2 uppercase tracking-widest glow-cyan">
                Magic is this.
              </p>
            </div>

            <p className="text-xs text-neutral-300">
              And that will still bring us together.
            </p>

            <p className="text-xs font-serif italic text-cyan-200">
              That's exactly where the artwork will come to life.
            </p>
          </div>

          <div className="flex justify-center gap-2 pt-1">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-orange-500 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-orange-500 animate-pulse delay-150" />
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-orange-500 animate-pulse delay-300" />
          </div>
        </div>
      </div>
    );
  }

  // 6. WATER-BASED SECTION (Section 27 in original)
  if (section.type === 'water-based') {
    return (
      <div className="w-full h-full max-h-full flex flex-col justify-center items-center p-2 sm:p-4 max-w-5xl mx-auto overflow-hidden lg:overflow-visible">
        <div className="text-center mb-2 sm:mb-2.5 shrink-0">
          <h2 className="font-['Cinzel'] text-lg sm:text-xl font-bold text-cyan-300 glow-cyan">
            How is the entire artwork, the entire universe completely WATER BASED?
          </h2>
        </div>

        {/* Mobile View: Stacked */}
        <div className="flex lg:hidden flex-col items-center w-full overflow-y-auto custom-scrollbar">
          <div className="w-full max-w-[340px] rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-xl bg-black mb-3 shrink-0">
            <video
              src="https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/vm.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[22vh] object-cover"
            />
          </div>
          <div className="w-full max-w-[94vw] sm:max-w-[500px] h-[48vh] overflow-y-auto custom-scrollbar p-4 rounded-2xl bg-black/60 border border-cyan-500/30 backdrop-blur-xl shadow-2xl text-left space-y-2.5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <p>This universe is built on a real physical water simulation.</p>
            <p>
              In the background, it takes the colors and shades found ONLY on the Su'rreal piano, and based on Su's special traditional painting techniques, it creates generative art.
            </p>
            <p>
              This could also, perhaps somewhat ambitiously, mean bringing the Touch Designer page live to the web in real time. :)
            </p>
            <p className="text-cyan-300 italic font-medium">In summary,</p>
            <p>
              Based on Su's special traditional art techniques, it creates generative art that is conscious, deliberately limited, yet holds infinite possibilities within itself. The shape, speed, intensity of the brushstrokes and all parameters are created in real time from the frequencies of that note.
            </p>
          </div>
        </div>

        {/* Desktop View: Side by side matching user's code */}
        <div className="hidden lg:flex flex-row items-center justify-center gap-8 xl:gap-12 w-[88%] max-w-[1400px]">
          <div className="flex-1 max-w-[600px] h-[60vh] max-h-[600px] overflow-y-auto custom-scrollbar p-6 xl:p-8 rounded-2xl bg-black/60 border border-cyan-500/30 backdrop-blur-xl shadow-2xl text-left space-y-3 text-sm text-neutral-300 leading-relaxed">
            <p>This universe is built on a real physical water simulation.</p>
            <p>
              In the background, it takes the colors and shades found ONLY on the Su'rreal piano, and based on Su's special traditional painting techniques, it creates generative art.
            </p>
            <p>
              This could also, perhaps somewhat ambitiously, mean bringing the Touch Designer page live to the web in real time. :)
            </p>
            <p className="text-cyan-300 italic font-medium">In summary,</p>
            <p>
              Based on Su's special traditional art techniques, it creates generative art that is conscious, deliberately limited, yet holds infinite possibilities within itself. The shape, speed, intensity of the brushstrokes and all parameters are created in real time from the frequencies of that note.
            </p>
          </div>

          <div className="flex-1 max-w-[700px] h-[60vh] max-h-[600px] flex items-center justify-center">
            <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-2xl bg-black">
              <video
                src="https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/vm.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 7. GHOST SECTION (Section Ghost in original)
  if (section.type === 'ghost') {
    return (
      <div className="w-full h-full max-h-full flex flex-col justify-center items-center p-2 sm:p-4 max-w-6xl mx-auto overflow-hidden lg:overflow-visible">
        <h2 className="font-['Cinzel'] text-xl sm:text-2xl font-extrabold text-cyan-300 glow-cyan mb-2 sm:mb-2.5 text-center shrink-0">
          A COLORFUL GHOST LIVES HERE!
        </h2>

        {/* Mobile View: Stacked */}
        <div className="flex lg:hidden flex-col items-center w-full overflow-y-auto custom-scrollbar">
          {section.heroImage && (
            <ArtImage
              src={section.heroImage}
              alt="Colorful Ghost"
              onZoom={onZoomImage}
              imgClassName="h-[20vh] sm:h-[24vh] max-w-[180px]"
              className="mb-2.5 rounded-2xl border-2 border-cyan-400/50 shadow-lg shrink-0"
            />
          )}
          <div className="w-full max-w-[94vw] sm:max-w-[500px] h-[50vh] overflow-y-auto custom-scrollbar space-y-2.5">
            <div className="p-3.5 rounded-2xl bg-black/70 border border-cyan-500/30 backdrop-blur-md text-left">
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                As both a rebellion against and a tribute to the loneliness that art brings, a colorful ghost has been invited into this universe. An artist lives inside the SU'rreal Piano, the colorful ghost, ready to play (create an mp3 playlist and send) all the songs you wish for, as long as you are gentle enough to accompany it.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/70 border border-cyan-500/30 backdrop-blur-md text-left">
              <h3 className="text-xs font-bold text-cyan-300 mb-1 font-mono uppercase">
                A Guide to Bargaining with the Colored Ghost:
              </h3>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                <li>Think of your favorite songs and list them.</li>
                <li>Open them on YouTube and copy the URL.</li>
                <li>
                  Find any MP3 converter website and convert the YouTube URL link into an MP3 file, then download it. (If you like, for example:{' '}
                  <a
                    href="https://notube.net/tr/youtube-app-312"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 underline"
                  >
                    https://notube.net/tr/youtube-app-312
                  </a>
                  )
                </li>
                <li>Create a folder containing the MP3 files of the songs you like.</li>
                <li>Come to the SU'rreal piano universe, and gently touch (click) the colored ghost.</li>
                <li>From the favorite folder you created, select either a single song if you wish or all of them, and confirm.</li>
                <li>The colored ghost has already started playing the songs you love on the SU'rreal piano for you!</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Desktop View: Side by side matching user's code */}
        <div className="hidden lg:flex flex-row items-stretch justify-center gap-8 xl:gap-10 w-[88%] max-w-[1400px] h-[68vh] xl:h-[72vh]">
          {section.heroImage && (
            <div className="flex-[0_0_38%] max-w-[440px] flex items-center justify-center">
              <ArtImage
                src={section.heroImage}
                alt="Colorful Ghost"
                onZoom={onZoomImage}
                imgClassName="max-h-[68vh] xl:max-h-[72vh] w-auto max-w-full object-contain rounded-2xl border-2 border-cyan-400/50 shadow-2xl"
                className="w-full flex items-center justify-center"
              />
            </div>
          )}

          <div className="flex-1 flex flex-col gap-3 h-full min-h-0">
            <div className="p-4 sm:p-5 rounded-2xl bg-black/70 border border-cyan-500/30 backdrop-blur-md text-left overflow-y-auto custom-scrollbar max-h-[35%] shrink-0">
              <p className="text-sm text-neutral-200 leading-relaxed">
                As both a rebellion against and a tribute to the loneliness that art brings, a colorful ghost has been invited into this universe. An artist lives inside the SU'rreal Piano, the colorful ghost, ready to play (create an mp3 playlist and send) all the songs you wish for, as long as you are gentle enough to accompany it.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-black/70 border border-cyan-500/30 backdrop-blur-md text-left overflow-y-auto custom-scrollbar flex-1 min-h-0">
              <h3 className="text-xs font-bold text-cyan-300 mb-1.5 font-mono uppercase">
                A Guide to Bargaining with the Colored Ghost:
              </h3>
              <ol className="list-decimal pl-4 space-y-1.5 text-xs text-neutral-300 leading-relaxed">
                <li>Think of your favorite songs and list them.</li>
                <li>Open them on YouTube and copy the URL.</li>
                <li>
                  Find any MP3 converter website and convert the YouTube URL link into an MP3 file, then download it. (If you like, for example:{' '}
                  <a
                    href="https://notube.net/tr/youtube-app-312"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 underline"
                  >
                    https://notube.net/tr/youtube-app-312
                  </a>
                  )
                </li>
                <li>Create a folder containing the MP3 files of the songs you like.</li>
                <li>Come to the SU'rreal piano universe, and gently touch (click) the colored ghost.</li>
                <li>From the favorite folder you created, select either a single song if you wish or all of them, and confirm.</li>
                <li>The colored ghost has already started playing the songs you love on the SU'rreal piano for you!</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 8. 2-COLUMN SPLIT STORY (2.DO & 3.DO)
  if (section.type === 'story-two-col') {
    return (
      <div className="w-full h-full max-h-full flex flex-col justify-center items-center p-2 sm:p-4 max-w-[1400px] mx-auto select-text overflow-hidden lg:overflow-visible">
        {/* Mobile View: Visuals on top */}
        <div className="flex lg:hidden flex-row items-center justify-center gap-4 mb-2.5 shrink-0">
          {section.leftImage && (
            <ArtImage
              src={section.leftImage}
              alt="2.DO C4 Visual"
              onZoom={onZoomImage}
              imgClassName="h-[20vh] sm:h-[24vh] max-w-[130px]"
            />
          )}
          {section.rightImage && (
            <ArtImage
              src={section.rightImage}
              alt="3.DO C5 Visual"
              onZoom={onZoomImage}
              imgClassName="h-[20vh] sm:h-[24vh] max-w-[130px]"
            />
          )}
        </div>

        {/* Story Box on mobile and center of desktop */}
        <div className="w-full flex flex-row items-center justify-center gap-4 lg:gap-8 max-h-[85vh]">
          {/* Desktop Left Visual */}
          {section.leftImage && (
            <div className="hidden lg:flex">
              <ArtImage
                src={section.leftImage}
                alt="2.DO C4 Visual"
                onZoom={onZoomImage}
                imgClassName="h-[72vh] xl:h-[75vh] max-h-[740px] w-auto max-w-[280px] xl:max-w-[340px] object-contain"
              />
            </div>
          )}

          {/* 2-column box */}
          <div className="w-full max-w-[94vw] sm:max-w-[520px] lg:max-w-[850px] xl:max-w-[920px] grid grid-cols-1 sm:grid-cols-2 gap-3.5 h-[50vh] sm:h-[54vh] lg:h-[72vh] xl:h-[75vh] max-h-[740px] overflow-y-auto custom-scrollbar">
            {/* Column 1: 2.DO */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-black/65 border border-cyan-500/30 backdrop-blur-xl shadow-2xl text-left space-y-2">
              <h2 className="font-['Cinzel'] text-base sm:text-lg font-bold text-cyan-300">
                2.DO - C<br />
                <span className="text-[11px] text-neutral-400 font-mono">8th key</span>
              </h2>

              <div className="p-1 rounded bg-orange-500/10 border-l-2 border-orange-500">
                <p className="font-mono text-[10px] text-orange-300">C4, C3, C5</p>
              </div>

              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                Search, existence continues. But in a slightly clogged way. The first Do was upward spiraled but now time seems about to be completely bent. Perhaps it is bending.
              </p>

              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                Here it is no longer vertical, now horizontal. Between orange and blue. Blue is not hope here. Here hope is tired orange. Finding is blue. Turquoise. A dark and light turquoise that is not very green.
              </p>

              <p className="text-[11px] sm:text-xs text-cyan-200/95 font-medium">
                Waiting has become exhausting. Time at these frequencies is horizontal. Do continues its waiting and searching after birth and continues to seek.
              </p>
            </div>

            {/* Column 2: 3.DO */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-black/65 border border-orange-500/30 backdrop-blur-xl shadow-2xl text-left space-y-2">
              <h2 className="font-['Cinzel'] text-base sm:text-lg font-bold text-orange-400">
                3.DO - C<br />
                <span className="text-[11px] text-neutral-400 font-mono">15th key</span>
              </h2>

              <div className="p-1 rounded bg-cyan-500/10 border-l-2 border-cyan-500">
                <p className="font-mono text-[10px] text-cyan-300">C5, C4, C7</p>
              </div>

              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                The tiredness of waiting, the desperation of searching has now passed into acceptance. Close to the end. As if. Throughout life, it has accepted all birth pains.
              </p>

              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                These frequencies are strong and wise. Now, all memories, all pains. In order to reflect the magnificence of its existence, it sways calmly and is thrown within the gold like a peacock.
              </p>

              <p className="text-[11px] sm:text-xs font-bold text-orange-300 pt-1 border-t border-white/10">
                Worth watching, forcing respect.
              </p>
            </div>
          </div>

          {/* Desktop Right Visual */}
          {section.rightImage && (
            <div className="hidden lg:flex">
              <ArtImage
                src={section.rightImage}
                alt="3.DO C5 Visual"
                onZoom={onZoomImage}
                imgClassName="h-[72vh] xl:h-[75vh] max-h-[740px] w-auto max-w-[280px] xl:max-w-[340px] object-contain"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // 9. LOCKED SECTION (3.RE - D 16th key)
  if (section.type === 'locked') {
    return (
      <div className="w-full h-full max-h-full flex flex-col justify-center items-center p-2 sm:p-4 max-w-[1400px] mx-auto select-none overflow-hidden lg:overflow-visible">
        {/* Mobile View: Visuals on top */}
        <div className="flex lg:hidden flex-row items-center justify-center gap-4 mb-2.5 shrink-0">
          {section.leftImage && (
            <ArtImage
              src={section.leftImage}
              alt="RE D5 Locked Left Visual"
              onZoom={onZoomImage}
              imgClassName="h-[20vh] sm:h-[24vh] max-w-[130px]"
            />
          )}
          {section.rightImage && (
            <ArtImage
              src={section.rightImage}
              alt="RE D5 Locked Right Visual"
              onZoom={onZoomImage}
              imgClassName="h-[20vh] sm:h-[24vh] max-w-[130px]"
            />
          )}
        </div>

        <div className="w-full flex flex-row items-center justify-center gap-4 lg:gap-8 max-h-[85vh]">
          {section.leftImage && (
            <div className="hidden lg:flex">
              <ArtImage
                src={section.leftImage}
                alt="RE D5 Locked Left Visual"
                onZoom={onZoomImage}
                imgClassName="h-[72vh] xl:h-[75vh] max-h-[740px] w-auto max-w-[280px] xl:max-w-[340px] object-contain"
              />
            </div>
          )}

          <div className="w-full max-w-[94vw] sm:max-w-[440px] lg:max-w-[460px] xl:max-w-[500px] h-[48vh] sm:h-[52vh] lg:h-[65vh] xl:h-[70vh] max-h-[700px] p-6 sm:p-8 rounded-3xl bg-black/60 border border-cyan-500/30 backdrop-blur-xl text-center shadow-2xl flex flex-col items-center justify-center">
            <h2 className="font-['Cinzel'] text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-200 bg-clip-text text-transparent glow-cyan uppercase tracking-widest">
              3.RE - D
            </h2>
            <h3 className="font-['Orbitron'] text-sm sm:text-base font-light tracking-[0.25em] text-orange-400/90 mt-1 mb-4 lowercase">
              16th key
            </h3>

            <svg
              className="w-20 h-20 sm:w-28 sm:h-28 filter drop-shadow-[0_0_20px_rgba(77,208,225,0.4)] animate-pulse"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="25"
                y="45"
                width="50"
                height="40"
                rx="5"
                fill="none"
                stroke="rgba(77, 208, 225, 0.5)"
                strokeWidth="3"
              />
              <path
                d="M 35 45 L 35 30 Q 35 15, 50 15 Q 65 15, 65 30 L 65 45"
                fill="none"
                stroke="rgba(77, 208, 225, 0.5)"
                strokeWidth="3"
              />
              <circle cx="50" cy="60" r="5" fill="rgba(77, 208, 225, 0.4)" />
              <rect x="48" y="60" width="4" height="10" fill="rgba(77, 208, 225, 0.4)" />
            </svg>
          </div>

          {section.rightImage && (
            <div className="hidden lg:flex">
              <ArtImage
                src={section.rightImage}
                alt="RE D5 Locked Right Visual"
                onZoom={onZoomImage}
                imgClassName="h-[72vh] xl:h-[75vh] max-h-[740px] w-auto max-w-[280px] xl:max-w-[340px] object-contain"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // 10. FA POEMS SECTION (2.FA - F 11th key with Baudelaire poems)
  if (section.type === 'fa-poems') {
    return (
      <div className="w-full h-full max-h-full flex flex-col justify-center items-center p-2 sm:p-4 max-w-[1400px] mx-auto select-text overflow-hidden lg:overflow-visible">
        {/* Mobile View: Visuals on top */}
        <div className="flex lg:hidden flex-row items-center justify-center gap-4 mb-2.5 shrink-0">
          {section.leftImage && (
            <ArtImage
              src={section.leftImage}
              alt="FA F4 Left Visual"
              onZoom={onZoomImage}
              imgClassName="h-[20vh] sm:h-[24vh] max-w-[130px]"
            />
          )}
          {section.rightImage && (
            <ArtImage
              src={section.rightImage}
              alt="FA F4 Right Visual"
              onZoom={onZoomImage}
              imgClassName="h-[20vh] sm:h-[24vh] max-w-[130px]"
            />
          )}
        </div>

        <div className="w-full flex flex-row items-center justify-center gap-4 lg:gap-8 max-h-[85vh]">
          {section.leftImage && (
            <div className="hidden lg:flex">
              <ArtImage
                src={section.leftImage}
                alt="FA F4 Left Visual"
                onZoom={onZoomImage}
                imgClassName="h-[72vh] xl:h-[75vh] max-h-[740px] w-auto max-w-[280px] xl:max-w-[340px] object-contain"
              />
            </div>
          )}

          <div className="w-full max-w-[94vw] sm:max-w-[500px] lg:max-w-[800px] xl:max-w-[860px] space-y-3 h-[50vh] sm:h-[54vh] lg:h-[72vh] xl:h-[75vh] max-h-[740px] overflow-y-auto custom-scrollbar">
            {/* Main Box */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-black/60 border border-cyan-500/30 backdrop-blur-xl text-left space-y-1.5">
              <h2 className="font-['Cinzel'] text-base sm:text-lg font-bold text-cyan-300">
                2.FA - F<br />
                <span className="text-[11px] text-neutral-400 font-mono">11th key</span>
              </h2>

              <div className="p-2 rounded-lg bg-orange-500/10 border-l-2 border-orange-500 space-y-0.5">
                <p className="font-bold text-orange-400 text-[11px] font-mono">TO SEARCH</p>
                <p className="font-bold text-orange-400 text-[11px] font-mono">ASCENDING TOWARD KNOWLEDGE</p>
                <p className="font-bold text-orange-400 text-[11px] font-mono">?</p>
              </div>

              <p className="text-[11px] sm:text-xs font-semibold text-cyan-300">
                A LITTLE REBELLION TOO — NATURALLY?
              </p>

              <p className="text-[10px] font-mono text-neutral-400">F4, F3, F6</p>

              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                These octaves of the note F (especially, in my view) are referred to as subdominant. Here, I choose to read this as a familiar sensation, a tonal return home. A deep, sharp purple. Knowledge lives here.
              </p>

              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                The calm of knowledge, yet the unavoidable weight it carries.
              </p>

              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                This is somewhat tangled. It touches the soul but the place it touches also aches. A faint blue, yet heavily orange. A bit of black, a bit of yellow, intertwined, with no way out.
              </p>

              <p className="text-[11px] sm:text-xs font-bold text-cyan-300 uppercase">
                A necessity. A surge. A compulsion.
              </p>
            </div>

            {/* Two Baudelaire Poem Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-black/60 border border-cyan-500/25 text-left text-[11px] space-y-1">
                <h3 className="font-mono text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                  WITHDRAWAL INTO SELF
                </h3>
                <p className="italic text-neutral-300 leading-relaxed">
                  Be silent now, O my sorrow!<br />
                  and be more calm.<br />
                  You said evening, here evening has happened.<br />
                  The city is gently surrounded by a thick fog, some reach peace, some find anxiety in this weather.
                </p>
                <p className="text-right text-[10px] text-orange-400 font-mono">Baudelaire</p>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-cyan-500/25 text-left text-[11px] space-y-1">
                <h3 className="font-mono text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                  IT MUST BE DRUNK
                </h3>
                <p className="italic text-neutral-300 leading-relaxed">
                  One must always be drunk! Everything is in this; this is the only problem. In order not to feel the terrible weight of time that crushes your shoulders and pulls you down to the ground, you must be drunk incessantly.<br />
                  <span className="font-semibold text-cyan-300 not-italic">But with what?</span><br />
                  With wine, with poetry, or with virtue,<br />
                  as you wish………<br />
                  But be drunk.
                </p>
                <p className="italic text-neutral-300 leading-relaxed">
                  If you wake up and your drunkenness has lessened or completely passed, ask,<br />
                  the wind, the wave, the star, the bird, the clock..<br />
                  It will immediately give the answer = It is time to be drunk!
                </p>
                <p className="italic text-neutral-300 leading-relaxed">
                  In order not to be the groaning slaves of time, be drunk without stopping.<br />
                  With wine, with poetry, or with virtue,<br />
                  as you wish…..
                </p>
                <p className="text-right text-[10px] text-orange-400 font-mono">Baudelaire</p>
              </div>
            </div>
          </div>

          {section.rightImage && (
            <div className="hidden lg:flex">
              <ArtImage
                src={section.rightImage}
                alt="FA F4 Right Visual"
                onZoom={onZoomImage}
                imgClassName="h-[72vh] xl:h-[75vh] max-h-[740px] w-auto max-w-[280px] xl:max-w-[340px] object-contain"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // 11. GALLERY SECTION - All original artworks & key schematics from codebase
  if (section.type === 'gallery') {
    const galleryItems = [
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/MYDREAMPIANO.JPEG',
        title: "SU'rreal Dream Piano",
        tag: 'Original Concept',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/myghost.png',
        title: 'A Colorful Ghost Lives Here',
        tag: 'Ghost Character',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/PIANO%20WIP%20TELLER.jpeg',
        title: 'Piano Mechanics & Strings',
        tag: 'WIP Studio',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/SADECE%20TUS%CC%A7LAR.jpg',
        title: 'Piano Keys Overview',
        tag: 'Keyboard Map',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/1.c3du%CC%88z.png',
        title: '1.DO - C3 Key Structure',
        tag: '1st Key • C3',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/1.c3.png',
        title: '1.DO - C3 Chromatic Symphony',
        tag: '1st Key • C3',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/2.D3.png',
        title: '1.RE - D3 Living Fluid',
        tag: '2nd Key • D3',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/e3du%CC%88z.png',
        title: '1.MI - E3 Key Structure',
        tag: '3rd Key • E3',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/e3.png',
        title: '1.MI - E3 Emerald Resonance',
        tag: '3rd Key • E3',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/f3.png',
        title: '1.FA - F3 Violet Depth',
        tag: '4th Key • F3',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/5.G3.png',
        title: '1.SOL - G3 Crimson Current',
        tag: '5th Key • G3',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/piyanoblogadosyalar/main/assets/6.A3.png',
        title: '1.LA - A3 Indigo Waves',
        tag: '6th Key • A3',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/7.B3.du%CC%88z.png',
        title: '1.SI - B3 Key Structure',
        tag: '7th Key • B3',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/7.B3.png',
        title: '1.SI - B3 Emerald Water',
        tag: '7th Key • B3',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/8.c4.png',
        title: '2.DO - C4 Amber Octave',
        tag: '8th Key • C4',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/9.d4du%CC%88z.png',
        title: '2.RE - D4 Key Structure',
        tag: '9th Key • D4',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/9.d4.png',
        title: '2.RE - D4 Amber Flow',
        tag: '9th Key • D4',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/10.E4.png',
        title: '2.MI - E4 Golden Fire',
        tag: '10th Key • E4',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/11.F4.du%CC%88z.png',
        title: '2.FA - F4 Key Structure',
        tag: '11th Key • F4',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/11.F4.png',
        title: '2.FA - F4 Purple Baudelaire',
        tag: '11th Key • F4',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/12.G4.png',
        title: '2.SOL - G4 Sunset Rays',
        tag: '12th Key • G4',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/piyanoblogadosyalar/main/assets/13.A4.png',
        title: '2.LA - A4 Deep Azure',
        tag: '13th Key • A4',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/14.B4.du%CC%88z.png',
        title: '2.SI - B4 Key Structure',
        tag: '14th Key • B4',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/14.B4.png',
        title: '2.SI - B4 Fire & Water Symphony',
        tag: '14th Key • B4',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/15.c5yeni.png',
        title: '3.DO - C5 High Octave Wave',
        tag: '15th Key • C5',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/16d5du%CC%88z.png',
        title: '3.RE - D5 Key Structure',
        tag: '16th Key • D5',
      },
      {
        src: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/16d5.png',
        title: '3.RE - D5 Locked Horizon',
        tag: '16th Key • D5',
      },
    ];

    return (
      <div className="w-full h-full max-h-full flex flex-col justify-center items-center p-2 sm:p-4 max-w-6xl mx-auto overflow-hidden lg:overflow-visible">
        {/* Gallery Header */}
        <div className="text-center mb-1.5 sm:mb-2.5 shrink-0">
          <h2 className="font-['Cinzel'] text-xl sm:text-2xl font-bold text-cyan-300 glow-cyan">
            Visual Gallery
          </h2>
          <p className="font-['Orbitron'] text-[11px] sm:text-xs text-neutral-400 tracking-widest uppercase mt-0.5">
            Multilayered Chromatic Chronicles • {galleryItems.length} Project Artworks
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="w-full max-h-[min(58vh,520px)] lg:max-h-[calc(100dvh-170px)] overflow-y-auto custom-scrollbar p-2 rounded-2xl bg-black/50 border border-cyan-500/25 backdrop-blur-md">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2.5">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                onClick={() => onZoomImage(item.src, `${item.title} (${item.tag})`)}
                className="group relative flex flex-col items-center justify-between p-1.5 rounded-xl bg-black/60 border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(77,208,225,0.4)] transition-all duration-300 cursor-zoom-in"
              >
                <div className="w-full aspect-square flex items-center justify-center overflow-hidden rounded-lg bg-black/40">
                  <img
                    src={item.src}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                  />
                </div>
                <div className="w-full pt-1.5 px-0.5 text-center border-t border-white/5 mt-1">
                  <p className="text-[10px] sm:text-[11px] font-medium text-neutral-200 truncate group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[9px] text-cyan-400/80 font-mono truncate">
                    {item.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 12. FINAL PIANO STORY & COLLECTOR LINK
  if (section.type === 'final-story') {
    return (
      <div className="w-full h-full max-h-full flex flex-col justify-center items-center p-2 sm:p-4 max-w-5xl mx-auto overflow-hidden lg:overflow-visible text-center">
        {/* Mobile View: Stacked */}
        <div className="flex lg:hidden flex-col items-center w-full mb-2 overflow-y-auto custom-scrollbar">
          {section.heroImage && (
            <ArtImage
              src={section.heroImage}
              alt="Piano Final Story"
              onZoom={onZoomImage}
              imgClassName="h-[20vh] sm:h-[24vh] max-w-[200px]"
              className="mb-2 rounded-xl border border-cyan-500/30 p-1 bg-black/40 shadow-lg shrink-0"
            />
          )}
          <div className="w-full max-w-[94vw] sm:max-w-[500px] h-[48vh] overflow-y-auto custom-scrollbar p-4 rounded-2xl bg-black/60 border border-cyan-500/30 backdrop-blur-xl shadow-2xl text-left space-y-2.5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <p>
              At first glance, perhaps this may seem like just a piano. 16 keys, colors, sounds. But with each key you touch, you realize this is a journey. A journey stretching from birth to death, from the first breath to the last. And like every great journey, this too is actually a love story.
            </p>
            <p>
              Because isn't love like this too? A beginning, a potential, a moment carrying all colors in their brightest state. Then transitions, bridges, flowing from one state to another. Deepening, fears, continuing to swim even while feeling the danger of drowning. Learning, making sense, reading that person page by page. Then passion - that fire that burns everything, in which you are trapped. And finally... .....?
            </p>
            <p className="text-cyan-300 font-medium">
              This piano listens to seven special moments, with seven breaths.
            </p>
            <p className="text-orange-300 font-medium italic">
              This piano plays seven moments but actually tells a single story. The story of life. The story of love. Beginning, transition, depth, awareness, passion, end. Each note a stage, each key a stop. And each time you press, you don't just hear a sound. You hear a lifetime, a love, a journey.
            </p>
            <p className="italic text-cyan-200">
              Love and life. How thin the line between them is, isn't it?
            </p>
          </div>
        </div>

        {/* Desktop View: Side by side matching user's code */}
        <div className="hidden lg:flex flex-row items-center justify-center gap-8 xl:gap-12 mb-4 w-[88%] max-w-[1400px]">
          {section.heroImage && (
            <ArtImage
              src={section.heroImage}
              alt="Piano Final Story"
              onZoom={onZoomImage}
              imgClassName="h-[65vh] xl:h-[68vh] max-h-[660px] w-auto max-w-[440px] xl:max-w-[500px] object-contain"
              className="rounded-2xl border border-cyan-500/30 p-1 bg-black/40 shadow-2xl shrink-0"
            />
          )}

          <div className="flex-1 max-w-[700px] xl:max-w-[750px] h-[65vh] xl:h-[68vh] max-h-[660px] overflow-y-auto custom-scrollbar p-6 xl:p-8 rounded-2xl bg-black/60 border border-cyan-500/30 backdrop-blur-xl shadow-2xl text-left space-y-3 text-sm text-neutral-300 leading-relaxed">
            <p>
              At first glance, perhaps this may seem like just a piano. 16 keys, colors, sounds. But with each key you touch, you realize this is a journey. A journey stretching from birth to death, from the first breath to the last. And like every great journey, this too is actually a love story.
            </p>
            <p>
              Because isn't love like this too? A beginning, a potential, a moment carrying all colors in their brightest state. Then transitions, bridges, flowing from one state to another. Deepening, fears, continuing to swim even while feeling the danger of drowning. Learning, making sense, reading that person page by page. Then passion - that fire that burns everything, in which you are trapped. And finally... .....?
            </p>
            <p className="text-cyan-300 font-medium">
              This piano listens to seven special moments, with seven breaths.
            </p>
            <p className="text-orange-300 font-medium italic">
              This piano plays seven moments but actually tells a single story. The story of life. The story of love. Beginning, transition, depth, awareness, passion, end. Each note a stage, each key a stop. And each time you press, you don't just hear a sound. You hear a lifetime, a love, a journey.
            </p>
            <p className="italic text-cyan-200">
              Love and life. How thin the line between them is, isn't it?
            </p>
          </div>
        </div>

        {/* SuperRare link button with EXACT original text */}
        <div className="z-10 shrink-0">
          <a
            href="https://superrare.com/artwork/eth/0x678dC78df1AD075C9784011998899FB1F0c09789/5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs sm:text-sm font-semibold text-cyan-300 hover:text-white px-6 sm:px-8 py-2.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/25 border-2 border-cyan-400/50 hover:border-cyan-300 transition-all duration-300 shadow-[0_0_25px_rgba(77,208,225,0.3)] hover:scale-105 active:scale-95"
          >
            - click for compose by painting the water with love, color and sound! -
          </a>
        </div>
      </div>
    );
  }

  // 13. NOTE STORIES (DO, RE, MI, FA, SOL, SI)
  // Clean responsive layout:
  // - On Mobile: Visuals sit on top (20vh - 24vh), text box takes full width (94vw) and ample height (50vh - 54vh) for comfortable scrolling!
  // - On Desktop: Continuous row where visuals flank the box on the left and right, matching the box height from user's code!
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-3 sm:p-5 max-w-[1400px] mx-auto select-text overflow-hidden lg:overflow-visible">
      {/* Mobile View: Visuals on top */}
      <div className="flex lg:hidden flex-row items-center justify-center gap-3 sm:gap-6 mb-2.5 shrink-0">
        {section.leftImage && (
          <ArtImage
            src={section.leftImage}
            alt={`${section.title} Visual Left`}
            onZoom={onZoomImage}
            imgClassName="h-[20vh] sm:h-[24vh] max-w-[130px] sm:max-w-[160px]"
          />
        )}
        {section.rightImage && (
          <ArtImage
            src={section.rightImage}
            alt={`${section.title} Visual Right`}
            onZoom={onZoomImage}
            imgClassName="h-[20vh] sm:h-[24vh] max-w-[130px] sm:max-w-[160px]"
          />
        )}
      </div>

      {/* Main Container */}
      <div className="w-full flex flex-row items-center justify-center gap-4 lg:gap-8 max-h-[85vh]">
        {/* Desktop Left Visual */}
        {section.leftImage && (
          <div className="hidden lg:flex">
            <ArtImage
              src={section.leftImage}
              alt={`${section.title} Visual Left`}
              onZoom={onZoomImage}
              imgClassName="h-[72vh] xl:h-[75vh] max-h-[740px] w-auto max-w-[280px] xl:max-w-[340px] object-contain"
            />
          </div>
        )}

        {/* Center Story Box - Generous & comfortable on desktop, comfortable and full-width on mobile */}
        <div
          className={`w-full max-w-[94vw] sm:max-w-[500px] lg:max-w-[780px] xl:max-w-[860px] h-[50vh] sm:h-[54vh] lg:h-[72vh] xl:h-[75vh] max-h-[740px] overflow-y-auto custom-scrollbar p-5 sm:p-7 xl:p-9 rounded-3xl bg-black/65 border backdrop-blur-xl shadow-2xl text-left space-y-3 ${
            section.themeColor === 'fire'
              ? 'border-red-500/50 shadow-[0_0_35px_rgba(255,51,51,0.25)]'
              : section.themeColor === 'green'
              ? 'border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.25)]'
              : section.themeColor === 'purple'
              ? 'border-purple-500/40 shadow-[0_0_35px_rgba(168,85,247,0.25)]'
              : section.themeColor === 'orange'
              ? 'border-orange-500/40 shadow-[0_0_35px_rgba(255,119,51,0.25)]'
              : 'border-cyan-500/40 shadow-[0_0_35px_rgba(77,208,225,0.25)]'
          }`}
        >
          {/* Section Title clearly visible inside the box header */}
          <div className="border-b border-white/10 pb-2">
            <h2
              className={`font-['Cinzel'] text-lg sm:text-xl font-extrabold ${
                section.themeColor === 'fire'
                  ? 'text-red-400 glow-fire'
                  : section.themeColor === 'green'
                  ? 'text-emerald-300'
                  : section.themeColor === 'purple'
                  ? 'text-purple-300'
                  : section.themeColor === 'orange'
                  ? 'text-orange-400 glow-orange'
                  : 'text-cyan-300 glow-cyan'
              }`}
            >
              {section.title}
            </h2>
          </div>

          {/* Exact original English text */}
          {renderExactNoteContent(section)}
        </div>

        {/* Desktop Right Visual */}
        {section.rightImage && (
          <div className="hidden lg:flex">
            <ArtImage
              src={section.rightImage}
              alt={`${section.title} Visual Right`}
              onZoom={onZoomImage}
              imgClassName="h-[72vh] xl:h-[75vh] max-h-[740px] w-auto max-w-[280px] xl:max-w-[340px] object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Exact original English text from user's provided HTML
function renderExactNoteContent(section: SectionItem) {
  if (section.id === 'do-1') {
    return (
      <>
        <div className="p-2.5 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 space-y-0.5">
          <p className="font-bold text-orange-400 text-xs sm:text-sm">BEGINNING</p>
          <p className="text-orange-300 text-[11px] font-mono">C3, C2, C5</p>
          <p className="italic text-neutral-300 text-[11px]">Birth</p>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Do, as if inside a womb. A baby in the womb, with the most beautiful colors of the universe. This is the purest state of life.
        </p>

        <p className="text-xs sm:text-sm italic text-cyan-200">
          Does a fetus resemble the universal letter in fetal position?
        </p>

        <div className="p-2.5 rounded-xl bg-cyan-950/30 border-l-4 border-cyan-400 space-y-0.5">
          <p className="font-bold text-cyan-300 font-mono text-xs sm:text-sm">130.81 Hz</p>
          <p className="text-[11px] sm:text-xs text-neutral-300">
            Interesting. It feels like the first vibration of existence. Like the spark of life. Like primal energy.
          </p>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          C3, deep vibrations, said to be in a frequency range close to the heartbeat. With this low and deep vibration, I can fully feel calmness and the feeling of safety. While this makes me feel that DO comes from a closed place, it is as if I can see all colors at the same time.
        </p>

        <p className="text-xs sm:text-sm font-semibold text-orange-300">
          Red, blue, orange, pink are what I feel the most.
        </p>

        <div className="p-3 rounded-xl bg-cyan-900/15 border-l-4 border-cyan-500 space-y-1 text-xs text-neutral-300 leading-relaxed">
          <p>The baby in fetal position, not like in a mother's womb, but as if in the womb of the universe, colors in their brightest state.</p>
          <p>Let halos surround the baby faintly. And the color connection, the cord, should rise upward with large curved thin paint strokes.</p>
          <p>The layer that keeps the secret, an uncomfortable dried rose red. Slight earthy tones, green, blue, lilac but cold and pale. Eight large Ns. Upper and lower and only here golden paint strokes will be positioned.</p>
          <p className="text-orange-300 font-semibold">The baby should be an inverted C. It should look to the left, this is very important.</p>
          <p>After the cord rises enough, it should merge with the universe and integrate.</p>
        </div>

        <div className="p-3 rounded-xl bg-orange-950/25 border-l-4 border-orange-500 space-y-1 text-xs text-neutral-300 leading-relaxed">
          <p className="font-bold text-orange-400 font-mono">OMMMMMMMM</p>
          <p>The vibration of the creation sound of the universe begins with OM.</p>
          <p>C, that is DO, symbolizes this primal vibration. Like a calling. But how correct?</p>
          <p className="italic text-orange-200">
            OM TAT SAT — I cannot remember exactly, is it a Vedic mantra or a Mint mantra? But even if this is not correct, because it stayed in my mind, even if I do not know its technical name, it feels aligned with me.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-orange-500/10 border-l-4 border-orange-500">
          <p className="text-xs text-neutral-300">
            RED is very intense. It increases stimulating activity in the cerebral cortex, raises blood pressure.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-black/40 border-l-2 border-orange-400/40 text-xs text-neutral-400 italic space-y-0.5">
          <p className="font-bold not-italic text-neutral-300">Notes</p>
          <p>Pythagoras' harmonic sound of the universe?</p>
          <p>The first thing that should catch my eye must be red.</p>
          <p>Orange, my childlike joy. The beginning of my search.</p>
          <p>It will be 3D.</p>
          <p>I was born, I lived, I died?</p>
        </div>

        <div className="space-y-1 text-xs text-neutral-300 leading-relaxed">
          <p className="font-bold text-orange-400 text-xs sm:text-sm">Continuation</p>
          <p className="font-mono text-[10px] text-orange-300">C3, C2, C5</p>
          <p>Do is accepted as the tonal reference in Western music. I think this is universally so as well.</p>
          <p>In Plato's world of ideas, being begins before everything with the potential of being.</p>
          <p>The baby is not yet in the stage of existence. But all possibilities are hidden within. Like the seed metaphor.</p>
        </div>

        <div className="p-3 rounded-xl bg-cyan-900/15 border-l-4 border-cyan-500 space-y-1 text-xs text-neutral-300 leading-relaxed italic">
          <p>Elan vital equals life impulse. The energy of Do, the frequency of Do. A journey flowing forward and upward. Life is an energy flowing forward and upward.</p>
          <p className="text-cyan-200">Does existence come before essence? What color is it? Is Sartre right?</p>
          <p className="text-cyan-200">The divine baby archetype, Jung?</p>
        </div>

        <div className="p-3 rounded-xl bg-orange-950/25 border-l-4 border-orange-500 space-y-1 text-xs text-neutral-300 leading-relaxed">
          <p>In the Kabbalistic tradition, Kabbalah comes from Egypt, more precisely ancient Egypt. Mithraism.</p>
          <p>The first Sefirah found in the Tree of Life. Sefirah: ten stages that mediate placing God at the center and allowing us to find God. Keter equals crown. The first of the Tree of Life is the Crown. The baby's cord should be shaped upward.</p>
          <p className="text-orange-300 font-semibold">This crown energy is the first leap of creation.</p>
          <p>Not yet formed, but containing all form within.</p>
          <p className="italic text-orange-200">How compatible is Plato's idea of the potential of being? Synchronicity.</p>
        </div>

        <div className="p-2.5 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 space-y-0.5 text-xs">
          <p className="text-neutral-300">This crown represents pure consciousness, it will be the union of pure consciousness and the universe.</p>
          <p className="font-bold text-orange-400">The most hidden of hidden things, hidden light.</p>
        </div>

        <div className="p-2 rounded-lg bg-black/40 border-l-2 border-orange-400/40 text-xs text-neutral-400 italic">
          Colors are very spiraled. The story part is very warm.
        </div>
      </>
    );
  }

  if (section.id === 're-1') {
    return (
      <>
        <div className="p-2.5 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 space-y-0.5">
          <p className="font-bold text-orange-400 text-xs sm:text-sm">BETWEEN</p>
          <p className="font-mono text-[10px] text-orange-300">D3, D2, D5</p>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          In a strong and fundamental vibration. Still clear. Re is truly like a bridge in every octave.
        </p>

        <div className="p-3 rounded-xl bg-cyan-900/15 border-l-4 border-cyan-500 text-xs text-neutral-300 leading-relaxed">
          With the D note, I form the bridge in music between the 'tonic' (do) and the dominant (sol). A smooth, clear balance between contradictory forces, but in every octave, a state of being in between.
        </div>

        <div className="p-3 rounded-xl bg-orange-950/25 border-l-4 border-orange-500 text-xs text-neutral-300 leading-relaxed">
          A little anxious as well. The strokes are hard, large. The color sensation is turquoise, green, purple. But with fuchsia, very much fuchsia.
        </div>

        <div className="p-2.5 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 space-y-0.5 text-xs">
          <p className="text-neutral-300">
            While needing a bit of freshness, a feeling of balance. Mint green that looks white at first glance.
          </p>
          <p className="font-semibold text-orange-400">Direction upward.</p>
        </div>
      </>
    );
  }

  if (section.id === 're-2') {
    return (
      <>
        <div className="p-2.5 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 space-y-0.5">
          <p className="font-bold text-orange-400 text-xs sm:text-sm font-mono tracking-widest">I N T E R V A L</p>
          <p className="font-mono text-[10px] text-orange-300">D4, D3, D6</p>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          The bridge is tired. Like the moments before collapsing. Perhaps in black 2.Re we see it fully for the first time. In the painting part, in the 3rd Re, let this black be much harsher.
        </p>

        <div className="p-3 rounded-xl bg-cyan-900/15 border-l-4 border-cyan-500 space-y-0.5 text-xs text-neutral-300 leading-relaxed">
          <p>Black, navy blue, neon green, purple, blue fall as if from the emptiness of space onto the earth. What does it say?</p>
          <p className="italic text-cyan-200">A choice?</p>
        </div>

        <div className="p-3 rounded-xl bg-orange-950/25 border-l-4 border-orange-500 space-y-0.5 text-xs font-mono font-bold text-orange-400">
          <p>C O N T R A D I C T I O N&nbsp;&nbsp;C H O I C E</p>
          <p>I N T E R V A L</p>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          The golden stripe divides night and day. Good and evil, past and future, yet do we not mostly live life in the interval where we experience both at the same time? life?! I have to look from above, bird's eye view.
        </p>

        <div className="p-2.5 rounded-xl bg-cyan-900/15 border-l-4 border-cyan-500 italic text-[11px] text-cyan-200">
          I am between the one who hides me and the one hidden from me. Where am I…. Where are you…… Not a question.
        </div>

        <div className="p-2.5 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 space-y-0.5 text-xs">
          <p className="text-neutral-300">The balance point, the fate line, how possible is it in this interval, AMOR FATI?</p>
          <p className="font-semibold text-orange-400">The golden line vibrates in the visual spectrum between 520–530 Th2.</p>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Wisdom, the opposition of night and day, covers the first spectrum interval. I walk with balance. Opening my wings. Somewhere between the golden line.....
        </p>
      </>
    );
  }

  if (section.id === 'mi-1') {
    return (
      <>
        <div className="p-2.5 rounded-xl bg-orange-500/10 border-l-4 border-orange-500">
          <p className="font-mono text-[10px] text-orange-300">E3, E2, E5</p>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          It hears the sound of water, I feel as if I smell blue. But it is definitely not that peaceful. On top of an excitement and an inner tightness that is about to explode. This explosion is definitely candy pink. A little orange. Like fragmented, cloudy.
        </p>

        <div className="p-3 rounded-xl bg-cyan-900/15 border-l-4 border-cyan-500 text-xs text-neutral-300 leading-relaxed">
          Inside it, the depth is navy blue but with green undertones. Before my calmness is stolen, cream white begins to stammer as if it has just been born. I do not know.
        </div>

        <div className="space-y-0.5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <p>This range of the E note is said to be used in subconscious therapies. Is it like multiplying the mind in water after trauma?</p>
          <p className="text-orange-400 font-semibold">Bright orange :))</p>
        </div>

        <div className="p-3 rounded-xl bg-orange-950/25 border-l-4 border-orange-500 space-y-1 text-xs">
          <p className="italic text-orange-200">Am I floating uncertainly, am I drowning, am I resting, am I struggling???</p>
          <p className="italic text-orange-300 font-medium">Look at me from the sky! From the most beautiful shade of blue.</p>
        </div>

        <div className="p-3 rounded-xl bg-cyan-900/15 border-l-4 border-cyan-500 space-y-0.5 text-xs text-neutral-300 leading-relaxed">
          <p>The calmness part is blue, if the bubbles do not betray it. Truly why transparent?</p>
          <p>Water is both protective and devouring.</p>
        </div>

        <div className="p-3 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 space-y-1 text-xs text-neutral-300 leading-relaxed">
          <p>I feel Sartre's duality of being and nothingness. A bit surreal surrender…</p>
          <p className="italic text-orange-200">
            Swimming in water is looking at being, at being itself, at water which is its essence, but at the same time sinking towards nothingness. Calmness on the surface, fear of drowning in the depth. Calmly…..
          </p>
        </div>

        <div className="p-3 rounded-xl bg-orange-950/25 border-l-4 border-orange-500 text-xs text-neutral-300 leading-relaxed">
          Water that extinguishes fire, no one knows that water burns, it can drown you too. Are you surrendered?
        </div>

        <div className="p-2.5 rounded-xl bg-black/40 border-l-2 border-orange-400/40 text-xs text-neutral-400 italic">
          For Jung, water is one of the most fundamental symbols of the collective unconscious, but I think Jung is mistaken at this point. Water is the very self of the individual subconscious. At least here, I want to see myself in the position of watching my most inner overflowing state from the outside..
        </div>
      </>
    );
  }

  if (section.id === 'mi-2') {
    return (
      <>
        <div className="p-2.5 rounded-xl bg-orange-500/10 border-l-4 border-orange-500">
          <p className="font-mono text-[10px] text-orange-300">E4, E3, E6</p>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Sunrise. A melancholy that is born as a morning, I think, MI is in a dilemma no matter what. After every octave, I feel as if I hear the sound of a question mark as well.
        </p>

        <div className="p-3 rounded-xl bg-cyan-900/15 border-l-4 border-cyan-500 text-xs text-neutral-300 leading-relaxed">
          From here, in the +1 octave, MI is within the contradiction of drowning and swimming, and at the deepest point, in the −1 octave, there is a tired calmness, and this tired, disturbing calmness is a pale and cold yellow, and with this yellow it gets one more stroke closer to madness.
        </div>

        <div className="p-3 rounded-xl bg-orange-950/25 border-l-4 border-orange-500 text-xs text-neutral-300 leading-relaxed">
          Purple, lilac, blue among very very small, very very vivid red dots.
        </div>
      </>
    );
  }

  if (section.id === 'fa-1') {
    return (
      <>
        <div className="p-2.5 rounded-xl bg-orange-500/10 border-l-4 border-orange-500">
          <p className="font-mono text-[10px] text-orange-300">F3, F2, F5</p>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          It should definitely be in the form of large, clear and upward brush strokes, FA.
        </p>

        <div className="p-3 rounded-xl bg-cyan-900/15 border-l-4 border-cyan-500 text-xs text-neutral-300 leading-relaxed">
          Upward, I think at a very high frequency. It can be in 3 or 4 parts. I am not completely sure. I feel closer to 4 but I cannot decide.
        </div>

        <div className="p-3 rounded-xl bg-orange-950/25 border-l-4 border-orange-500 space-y-1 text-xs">
          <p className="font-bold text-orange-400">Blue, neon tones, pinks, greens, fresh whites.</p>
          <p className="font-semibold text-cyan-300 uppercase">FA IS EXCITED! FA upwards.</p>
        </div>
      </>
    );
  }

  if (section.id === 'sol-1') {
    return (
      <>
        <div className="p-2.5 rounded-xl bg-orange-500/10 border-l-4 border-orange-500">
          <p className="font-mono text-[10px] text-orange-300">G3, G2, G5</p>
        </div>

        <div className="p-3 rounded-xl bg-purple-950/30 border-l-4 border-purple-500">
          <p className="font-bold text-purple-400 text-base sm:text-lg">
            Purple purple purple purple purple purple purple!
          </p>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Very dominant. Harmonic tension. Joyful, bright, powerful.
        </p>

        <div className="p-3 rounded-xl bg-cyan-900/15 border-l-4 border-cyan-500 text-xs text-neutral-300 leading-relaxed">
          Like a long block of neon green and neon fuchsia.
        </div>

        <div className="p-3 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 space-y-0.5 text-xs">
          <p className="font-bold text-orange-400">Like a nebula! Absolutely.</p>
          <p className="text-neutral-300">Neon green should have yellow undertones. Sweet yellow.</p>
        </div>

        <div className="p-2.5 rounded-xl bg-purple-950/25 border-l-4 border-purple-500">
          <p className="font-semibold text-purple-300 italic text-xs">The note G is a nebula! :))</p>
        </div>
      </>
    );
  }

  if (section.id === 'sol-2') {
    return (
      <>
        <div className="p-2.5 rounded-xl bg-orange-500/10 border-l-4 border-orange-500">
          <p className="font-mono text-[10px] text-orange-300">G4, G3, G6</p>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Purple is much stronger. It is intensifying. Because of its position, SOL should stand harsher here. Definitely joyful. But questioning.
        </p>

        <div className="p-3 rounded-xl bg-cyan-900/15 border-l-4 border-cyan-500 text-xs text-neutral-300 leading-relaxed">
          Navy blue for inquiry. Small reds and fuchsias for question marks. As if it knows.
        </div>

        <div className="p-3 rounded-xl bg-orange-950/25 border-l-4 border-orange-500 text-xs font-bold text-orange-400">
          Definitely an explosion. Yet joyful. Even in the middle of a sad story.
        </div>

        <div className="p-2.5 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 text-xs text-neutral-300">
          It does not like being alone. It explodes, disperses, and searches. Its desire to progress is strong.
        </div>

        <div className="p-2.5 rounded-xl bg-black/40 border-l-2 border-orange-400/40 text-xs text-neutral-400 italic">
          SO'leil means sun in French. Even if it has nothing to do with our subject, it exists in my inner world.
        </div>
      </>
    );
  }

  if (section.id === 'si-1') {
    return (
      <>
        <div className="p-2.5 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 space-y-0.5">
          <p className="font-bold text-orange-400 text-xs sm:text-sm">WAITING… WAITING……..</p>
        </div>

        <div className="p-2 rounded-xl bg-orange-500/10 border-l-4 border-orange-500">
          <p className="font-mono text-[10px] text-orange-300">B3, B2, B5</p>
        </div>

        <div className="p-3 rounded-xl bg-emerald-950/30 border-l-4 border-emerald-500">
          <p className="font-bold text-emerald-400 text-base sm:text-lg">So much green!</p>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <span className="text-emerald-300 font-medium">Definitely dark green, dark turquoise, dark navy blue.</span> But it hopes with longing, and that longing is always pink.{' '}
          <span className="text-emerald-300 font-medium">The greens are angry.</span> Mysterious, restless, unfinished. An uncertain feeling.
        </p>

        <div className="p-3 rounded-xl bg-cyan-900/15 border-l-4 border-cyan-500 text-xs text-neutral-300 leading-relaxed">
          Half in all its octaves. <span className="text-emerald-300 font-medium">Green is half, angry because of this.</span>
        </div>

        <div className="p-2.5 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 space-y-0.5 text-xs">
          <p className="font-medium text-orange-300">The note B is right at the center of waiting.</p>
          <p className="font-bold text-orange-400">Endless waiting. Endless uncertain waiting SI.</p>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          The window has to be a long half sphere, the curve of fate, the beginning of the spiral.
        </p>

        <div className="p-2.5 rounded-xl bg-cyan-900/15 border-l-4 border-cyan-500 italic text-[11px] text-cyan-200">
          I am waiting. We are waiting, that is all. With uncertainty.
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Hopes are tired. Longing that is very high, crossing mountains, a hope. My magical portal tree is at the very top of the mountain. It seems to be enduring as well. All its roots are stretched tight.
        </p>

        <div className="p-2.5 rounded-xl bg-black/40 border-l-2 border-orange-400/40 text-xs text-neutral-400 italic">
          According to Bergson's concept of "durée", duration, the moment of waiting is the most intense form of lived time. I think it is the longest, the most never ending, the most uncertain state. I hate it. The more I hate it, the more I am tested. I hope it ends.
        </div>

        <div className="p-2.5 rounded-xl bg-orange-950/25 border-l-4 border-orange-500 text-xs text-orange-300 font-medium">
          Waiting is, I think, the most intense form of being tested.
        </div>
      </>
    );
  }

  if (section.id === 'si-2-fire') {
    return (
      <>
        <div className="p-2.5 rounded-xl bg-red-950/40 border-l-4 border-red-500">
          <p className="font-black text-red-500 font-mono tracking-widest text-sm sm:text-base glow-fire">FIRE</p>
        </div>

        <div className="p-2 rounded-xl bg-orange-500/10 border-l-4 border-orange-500">
          <p className="font-mono text-[10px] text-orange-300">B4, B3, B6</p>
        </div>

        <p className="text-xs sm:text-neutral-200 leading-relaxed">
          A feeling of being trapped. Waiting already suffocates, does it not. This is not a question. Yes.
        </p>

        <div className="p-2.5 rounded-xl bg-red-950/30 border-l-4 border-red-500 space-y-0.5 text-xs">
          <p className="italic text-neutral-400">For the second section</p>
          <p className="text-red-400 font-semibold text-xs sm:text-sm glow-fire">
            The flames collapse over my head, my expectations are burning.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 space-y-0.5 text-xs">
          <p className="text-red-400 font-semibold">B is no longer the same as the first B. Now it is red.</p>
          <p className="italic text-orange-200">Do greens ever turn into red.</p>
        </div>

        <div className="p-2.5 rounded-xl bg-red-950/40 border-l-4 border-red-500 space-y-0.5 text-xs">
          <p className="font-bold text-red-400 text-xs sm:text-sm glow-fire">
            THE HUGE FOREST INSIDE US IS BURNING, OH NO.
          </p>
          <p className="text-neutral-300">Poems have truly become scarce now. Letters are red.</p>
        </div>

        <div className="p-2 rounded-xl bg-red-950/30 border-l-4 border-red-500">
          <p className="font-bold text-red-400 text-xs glow-fire">POMEGRANATE.</p>
        </div>

        <div className="p-2 rounded-xl bg-red-950/40 border-l-4 border-red-500">
          <p className="font-bold text-red-400 text-xs glow-fire">A FIRE SITE.</p>
        </div>

        <div className="p-2.5 rounded-xl bg-red-950/50 border-l-4 border-red-500 space-y-1">
          <p className="font-extrabold text-red-400 text-xs sm:text-sm glow-fire">I AM BURNING.</p>
          <p className="font-extrabold text-red-400 text-xs sm:text-sm glow-fire">I AM ANGRY.</p>
        </div>
      </>
    );
  }

  return null;
}
