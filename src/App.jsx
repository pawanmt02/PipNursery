import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import SparkleCursor from './components/Interactions/SparkleCursor';
import ConfettiTrigger from './components/Interactions/ConfettiTrigger';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import HeroSection from './components/Sections/HeroSection';
import StoryScroll from './components/Sections/StoryScroll';
import ProjectGrid from './components/Sections/ProjectGrid';

function AppContent() {
  const { isNightMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans selection:bg-hax-berry selection:text-white relative ${
        isNightMode ? 'bg-dream-bg text-dream-text' : 'bg-hax-cream text-hax-mocha'
      }`}
    >
      <SparkleCursor />
      <Navbar />
      <main>
        <HeroSection />
        <StoryScroll />
        <ProjectGrid />
      </main>
      <Footer />
      <ConfettiTrigger />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <AppContent />
      </AudioProvider>
    </ThemeProvider>
  );
}
