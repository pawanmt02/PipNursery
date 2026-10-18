import React from 'react';
import { Volume2, VolumeX, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAudio } from '../../context/AudioContext';

export default function Navbar() {
  const { isNightMode, toggleTheme } = useTheme();
  const { isMuted, toggleMute } = useAudio();

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md transition-colors ${
        isNightMode
          ? 'bg-dream-bg/80 text-hax-cream border-b border-dream-card/50'
          : 'bg-hax-cream/80 text-hax-mocha border-b border-hax-mocha/10'
      }`}
    >
      {/* Brand / Logo */}
      <a
        href="#"
        className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-hax-berry rounded-lg px-2 py-1"
      >
        <div className="relative">
          <img
            src="https://hax.baby/baby/assets/pip_avatar_cloud.png"
            alt="Pip"
            className="w-10 h-10 object-contain drop-shadow transition-transform group-hover:scale-110 group-hover:rotate-6"
          />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-hax-berry opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-hax-berry"></span>
          </span>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-serif font-bold text-lg md:text-xl tracking-wide flex items-center gap-1.5">
            Pip&apos;s Nursery
            <Sparkles className="w-3.5 h-3.5 text-hax-berry" />
          </span>
          <span className="text-[10px] uppercase font-sans tracking-widest opacity-70">
            haX.baby hackathon
          </span>
        </div>
      </a>

      {/* Nav Controls */}
      <div className="flex items-center gap-3">
        {/* Audio Mute/Unmute toggle */}
        <button
          onClick={toggleMute}
          type="button"
          aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          title={isMuted ? 'Click to Enable Audio (Synth 600Hz)' : 'Click to Mute Audio'}
          className={`p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 ${
            isNightMode
              ? isMuted
                ? 'bg-dream-card/60 border-slate-700 text-slate-400 hover:text-hax-cream hover:border-slate-500'
                : 'bg-hax-berry/20 border-hax-berry text-hax-cream shadow-sm'
              : isMuted
              ? 'bg-white/80 border-hax-mocha/20 text-hax-mocha/60 hover:text-hax-mocha hover:border-hax-mocha/40'
              : 'bg-hax-berry/15 border-hax-berry text-hax-berry shadow-sm'
          }`}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5 animate-pulse text-hax-berry" />
          )}
        </button>

        {/* Day/Night Theme toggle */}
        <button
          onClick={toggleTheme}
          type="button"
          aria-label={isNightMode ? 'Switch to Day Mode' : 'Switch to Midnight Mode'}
          title={isNightMode ? 'Switch to Day Cozy Mode' : 'Switch to Midnight Dream Mode'}
          className="px-4 py-2 rounded-full bg-hax-berry text-white flex items-center gap-1.5 transition-all duration-300 hover:opacity-90 active:scale-95 shadow-md text-xs font-semibold"
        >
          {isNightMode ? <Sun className="w-4 h-4 text-yellow-300" /> : <Moon className="w-4 h-4 text-hax-cream" />}
          <span className="hidden sm:inline font-sans">{isNightMode ? 'Day' : 'Night'}</span>
        </button>
      </div>
    </nav>
  );
}
