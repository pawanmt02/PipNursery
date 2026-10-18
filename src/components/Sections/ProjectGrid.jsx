import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, ExternalLink, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const PROJECTS = [
  {
    id: 'lullaby-lab',
    title: 'The Lullaby Lab',
    tag: 'Generative Audio',
    description: 'A generative music box for cozy sleep.',
    image: 'https://hax.baby/baby/assets/pip_lullaby_box.png',
    isLucideIcon: false,
    stats: '600 Hz • Zero CORS',
  },
  {
    id: 'nightlight-collection',
    title: 'Nightlight Collection',
    tag: 'Ambient Glow',
    description: 'Glowing amber lamps to chase away the dark.',
    image: 'https://hax.baby/baby/assets/pip_dream_lantern.png',
    isLucideIcon: false,
    stats: '12 Lumens • Midnight Safe',
  },
  {
    id: 'dream-routes',
    title: 'Dream Routes',
    tag: 'Flight Maps',
    description: 'Interactive flight maps over the neighborhood.',
    image: null,
    isLucideIcon: true,
    stats: 'Hyperlink Nav • 1999 Atlas',
  },
];

export default function ProjectGrid() {
  const { isNightMode } = useTheme();

  return (
    <section id="projects" className="max-w-6xl mx-auto py-24 px-6 scroll-mt-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-3 bg-hax-berry/10 text-hax-berry border border-hax-berry/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Nursery Creations</span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight">
          What Pip Makes
        </h2>
        <p className="font-sans text-lg opacity-85 mt-3">
          Cozy artifacts designed by Pip to soothe wanderers and illuminate the night.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -10 }}
            className={`p-6 rounded-3xl shadow-xl flex flex-col items-center text-center transition-colors border group ${
              isNightMode
                ? 'bg-dream-card border-slate-700/80 text-dream-text hover:border-hax-berry/50'
                : 'bg-white border-hax-mocha/10 text-hax-mocha hover:border-hax-berry/40'
            }`}
          >
            {/* Visual Header (Image or Lucide Icon) */}
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 flex items-center justify-center relative p-4 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
              {project.isLucideIcon ? (
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-hax-berry/40 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-2 rounded-full bg-hax-berry/10 flex items-center justify-center">
                    <Compass className="w-16 h-16 text-hax-berry animate-spin-slow transition-transform" />
                  </div>
                </div>
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
                />
              )}

              {/* Tag pill */}
              <span className="absolute top-3 right-3 text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-hax-berry/15 text-hax-berry font-semibold backdrop-blur-sm border border-hax-berry/20">
                {project.tag}
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="font-serif text-2xl font-bold mb-2 group-hover:text-hax-berry transition-colors">
              {project.title}
            </h3>

            <p className="font-sans text-sm opacity-85 leading-relaxed flex-grow mb-6">
              {project.description}
            </p>

            {/* Card Footer */}
            <div className="w-full pt-4 border-t border-current/10 flex items-center justify-between text-xs font-mono opacity-70">
              <span>{project.stats}</span>
              <span className="inline-flex items-center gap-1 text-hax-berry font-sans font-semibold group-hover:translate-x-1 transition-transform">
                Inspect <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
