import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Footer() {
  const { isNightMode } = useTheme();

  return (
    <footer
      className={`py-8 text-center font-sans border-t border-opacity-20 relative ${
        isNightMode ? 'border-slate-800 text-dream-text/80' : 'border-hax-mocha/20 text-hax-mocha/80'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center gap-4">
        {/* Retro Hit Counter */}
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
          <span>Visitor Hit Counter:</span>
          <span className="font-mono bg-stone-900 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/40 font-bold tracking-widest shadow-inner inline-block">
            00482
          </span>
        </div>

        {/* Built with love notice */}
        <p className="text-sm font-sans flex items-center justify-center gap-1.5 opacity-90">
          <span>Built with</span>
          <Heart className="w-4 h-4 text-hax-berry fill-current animate-pulse" />
          <span>for</span>
          <span className="font-semibold text-hax-berry underline underline-offset-4 decoration-dotted">
            haX.baby
          </span>
        </p>

        {/* Nostalgic Web Badge */}
        <div className="text-[11px] font-mono opacity-50 flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-hax-berry" />
          <span>No cookies • Zero trackers • Pure HTML/CSS soul</span>
          <Sparkles className="w-3 h-3 text-hax-berry" />
        </div>
      </div>
    </footer>
  );
}
