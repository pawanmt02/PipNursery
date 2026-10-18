import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const STORY_BLOCKS = [
  "Pip wasn't scary at all. He just wanted to make sure everyone had good dreams, soft clouds, and starlight.",
  "Every night, he fired up his lullaby lab, weaving gentle 600Hz synth frequencies into sweet midnight comfort.",
  "With his pink bow and nightcap, he kept the nightmares away, guarding the digital nursery until morning.",
];

export default function StoryScroll() {
  const { isNightMode } = useTheme();

  return (
    <section id="story" className="max-w-4xl mx-auto py-24 px-6 flex flex-col items-center scroll-mt-16">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-3 bg-hax-berry/10 text-hax-berry border border-hax-berry/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Nursery Story</span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight">
          Tales of Pip
        </h2>
        <div className="w-16 h-1 bg-hax-berry mx-auto mt-4 rounded-full" />
      </div>

      {/* 3 Story Blocks (<50 words each) using the exact specified variant */}
      <div className="w-full max-w-2xl space-y-4">
        {STORY_BLOCKS.map((text, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className={`text-center font-serif text-2xl mb-16 p-8 rounded-3xl border transition-colors shadow-lg ${
              isNightMode
                ? 'bg-dream-card/70 border-slate-700/60 text-dream-text'
                : 'bg-white/80 border-hax-mocha/10 text-hax-mocha'
            }`}
          >
            <p className="leading-relaxed">{text}</p>
          </motion.div>
        ))}
      </div>

      {/* Image Integration at bottom of the scroll */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-50px' }}
        className="text-center mt-4"
      >
        <img
          src="https://hax.baby/baby/assets/pip_portrait.png"
          className="w-full max-w-sm mx-auto rounded-3xl shadow-xl mt-12 rotate-3 hover:rotate-0 transition-transform duration-500"
          alt="Pip Portrait"
        />
        <p className="font-mono text-xs opacity-60 mt-4 tracking-wider">
          Pip keeping vigil in the starlight ✨
        </p>
      </motion.div>
    </section>
  );
}
