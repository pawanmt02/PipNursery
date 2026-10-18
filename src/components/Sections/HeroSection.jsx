import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Heart } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function HeroSection() {
  const { isNightMode } = useTheme();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center pt-20 px-4 relative overflow-hidden">
      {/* Decorative early-web retro badges */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider mb-8 border border-current opacity-75 backdrop-blur-sm shadow-sm"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-hax-berry animate-ping" />
        haX.baby Hackathon 2026 • Midnight Edition
      </motion.div>

      {/* Floating Cloud Avatar */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-hax-berry/15 blur-3xl rounded-full scale-125 pointer-events-none" />
        <img
          src="https://hax.baby/baby/assets/pip_avatar_cloud.png"
          alt="Pip the Skull Baby"
          className="w-64 h-64 object-contain animate-float drop-shadow-2xl mb-8 relative z-10 mx-auto"
        />
      </div>

      {/* Typography */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="font-serif text-5xl md:text-7xl font-bold mb-4 tracking-tight"
      >
        Pip the Skull Baby
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="font-sans text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed"
      >
        Junior Dream Engineer at Midnight Nursery
      </motion.p>

      {/* Interactive Cozy Badges & CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-sans"
      >
        <a
          href="#story"
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md flex items-center gap-2 hover:scale-105 active:scale-95 ${
            isNightMode
              ? 'bg-hax-berry text-white hover:bg-hax-berry/90'
              : 'bg-hax-mocha text-hax-cream hover:bg-hax-mocha/90'
          }`}
        >
          <span>Read Pip&apos;s Tale</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
        <a
          href="#projects"
          className={`px-6 py-3 rounded-full font-semibold border transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95 flex items-center gap-2 ${
            isNightMode
              ? 'border-slate-700 bg-dream-card/40 text-dream-text hover:bg-dream-card'
              : 'border-hax-mocha/20 bg-white/60 text-hax-mocha hover:bg-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-hax-berry" />
          <span>Explore Artifacts</span>
        </a>
      </motion.div>

      {/* Retro Web Pill */}
      <div className="mt-12 text-xs font-mono opacity-60 flex items-center gap-2">
        <span>★ Best viewed in any browser</span>
        <span>•</span>
        <span className="flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-hax-berry inline fill-current" /> for haX.baby
        </span>
      </div>
    </section>
  );
}
