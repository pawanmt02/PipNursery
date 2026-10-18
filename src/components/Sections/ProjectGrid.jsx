import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, ExternalLink, X, Music, Lightbulb, Map } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAudio } from '../../context/AudioContext';

const PROJECTS = [
  {
    id: 'lullaby-lab',
    title: 'The Lullaby Lab',
    tag: 'Generative Audio',
    description: 'A generative music box for cozy sleep.',
    detail:
      'Forged from synthesized 600Hz sine waves and analog stardust, this generative audio box produces infinite soothing frequencies to lull wandering cyber-spirits into peaceful slumber.',
    image: 'https://hax.baby/baby/assets/pip_lullaby_box.png',
    isLucideIcon: false,
    stats: '600 Hz • Zero CORS',
    actionText: 'Play Synth Chime',
    actionType: 'audio',
  },
  {
    id: 'nightlight-collection',
    title: 'Nightlight Collection',
    tag: 'Ambient Glow',
    description: 'Glowing amber lamps to chase away the dark.',
    detail:
      'Hand-crafted brass lamps burning with captured twilight photons. Certified midnight-safe to protect sweet dreams from lurking 404 phantoms and cold terminal screens.',
    image: 'https://hax.baby/baby/assets/pip_dream_lantern.png',
    isLucideIcon: false,
    stats: '12 Lumens • Midnight Safe',
    actionText: 'Kindle Warmth Glow',
    actionType: 'glow',
  },
  {
    id: 'dream-routes',
    title: 'Dream Routes',
    tag: 'Flight Maps',
    description: 'Interactive flight maps over the neighborhood.',
    detail:
      'An ancient hyperlinked cartography atlas mapping starlight paths between bedroom windows, puffy cloud rests, and the safe haven of Pip’s Midnight Nursery.',
    image: null,
    isLucideIcon: true,
    stats: 'Hyperlink Nav • 1999 Atlas',
    actionText: 'Trace Star Route',
    actionType: 'route',
  },
];

export default function ProjectGrid() {
  const { isNightMode } = useTheme();
  const { playClickSound } = useAudio();
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [actionActive, setActionActive] = useState(false);

  const handleAction = (artifact) => {
    playClickSound();
    setActionActive(true);
    setTimeout(() => setActionActive(false), 2000);
  };

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
            onClick={() => setSelectedArtifact(project)}
            className={`p-6 rounded-3xl shadow-xl flex flex-col items-center text-center transition-colors border group cursor-pointer ${
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

      {/* Interactive Artifact Inspection Modal */}
      <AnimatePresence>
        {selectedArtifact && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedArtifact(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className={`max-w-lg w-full rounded-3xl p-6 md:p-8 shadow-2xl border relative text-center ${
                isNightMode
                  ? 'bg-dream-card border-slate-700 text-dream-text'
                  : 'bg-white border-hax-mocha/20 text-hax-mocha'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArtifact(null)}
                className="absolute top-5 right-5 p-2 rounded-full border border-current/20 hover:bg-current/10 transition-colors"
                aria-label="Close Artifact View"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Visual */}
              <div className="w-36 h-36 mx-auto mb-4 flex items-center justify-center">
                {selectedArtifact.isLucideIcon ? (
                  <div className="w-28 h-28 rounded-full border-2 border-dashed border-hax-berry/50 flex items-center justify-center bg-hax-berry/10">
                    <Compass className="w-16 h-16 text-hax-berry animate-spin-slow" />
                  </div>
                ) : (
                  <img
                    src={selectedArtifact.image}
                    alt={selectedArtifact.title}
                    className="w-full h-full object-contain drop-shadow-xl animate-float"
                  />
                )}
              </div>

              {/* Tag & Title */}
              <span className="inline-block text-[11px] font-mono uppercase px-3 py-1 rounded-full bg-hax-berry/15 text-hax-berry font-bold mb-2">
                {selectedArtifact.tag}
              </span>
              <h3 className="font-serif text-3xl font-bold mb-3">{selectedArtifact.title}</h3>
              <p className="font-sans text-sm opacity-90 leading-relaxed mb-6">
                {selectedArtifact.detail}
              </p>

              {/* Interactive Artifact Action */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-current/10">
                <button
                  onClick={() => handleAction(selectedArtifact)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-hax-berry text-white font-sans text-sm font-semibold shadow-md hover:bg-hax-berry/90 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {selectedArtifact.actionType === 'audio' && <Music className="w-4 h-4" />}
                  {selectedArtifact.actionType === 'glow' && <Lightbulb className="w-4 h-4" />}
                  {selectedArtifact.actionType === 'route' && <Map className="w-4 h-4" />}
                  <span>{actionActive ? '✨ Activated! ✨' : selectedArtifact.actionText}</span>
                </button>
                <button
                  onClick={() => setSelectedArtifact(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-current/20 text-xs font-mono uppercase hover:bg-current/10 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
