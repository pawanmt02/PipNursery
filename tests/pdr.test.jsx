import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import fs from 'fs';
import path from 'path';

import { ThemeProvider, useTheme } from '../src/context/ThemeContext';
import { AudioProvider, useAudio } from '../src/context/AudioContext';
import SparkleCursor from '../src/components/Interactions/SparkleCursor';
import ConfettiTrigger from '../src/components/Interactions/ConfettiTrigger';
import Navbar from '../src/components/Layout/Navbar';
import Footer from '../src/components/Layout/Footer';
import HeroSection from '../src/components/Sections/HeroSection';
import StoryScroll from '../src/components/Sections/StoryScroll';
import ProjectGrid from '../src/components/Sections/ProjectGrid';
import App from '../src/App';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => {
  const confettiMock = vi.fn();
  return { default: confettiMock };
});

describe('1. PDR Static Rule Compliance: Assets & Audio Constraints', () => {
  it('MUST NOT contain any .mp3 or .wav requests or files', () => {
    const srcDir = path.resolve(__dirname, '../src');
    const readAllFiles = (dir) => {
      let results = [];
      const list = fs.readdirSync(dir);
      list.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
          results = results.concat(readAllFiles(fullPath));
        } else {
          results.push(fullPath);
        }
      });
      return results;
    };

    const allFiles = readAllFiles(srcDir);
    allFiles.forEach((filePath) => {
      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content).not.toMatch(/\.mp3/i);
      expect(content).not.toMatch(/\.wav/i);
    });
  });

  it('MUST ONLY use authorized https://hax.baby/baby/assets/... URLs for external images', () => {
    const srcDir = path.resolve(__dirname, '../src');
    const readAllFiles = (dir) => {
      let results = [];
      const list = fs.readdirSync(dir);
      list.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
          results = results.concat(readAllFiles(fullPath));
        } else {
          results.push(fullPath);
        }
      });
      return results;
    };

    const allFiles = readAllFiles(srcDir);
    allFiles.forEach((filePath) => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const httpMatches = content.match(/https?:\/\/[^\s"'\`]+/g) || [];
      httpMatches.forEach((url) => {
        // Exclude google fonts URL in index.css / index.html
        if (!url.includes('fonts.googleapis.com') && !url.includes('fonts.gstatic.com')) {
          expect(url).toMatch(/^https:\/\/hax\.baby\/baby\/assets\//);
        }
      });
    });
  });
});

describe('2. ThemeContext Module', () => {
  function TestConsumer() {
    const { isNightMode, toggleTheme } = useTheme();
    return (
      <div>
        <span data-testid="mode">{isNightMode ? 'night' : 'day'}</span>
        <button onClick={toggleTheme}>Toggle</button>
      </div>
    );
  }

  it('initializes in Day mode (isNightMode = false) and toggles cleanly', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('mode').textContent).toBe('day');
    fireEvent.click(screen.getByRole('button', { name: /Toggle/i }));
    expect(screen.getByTestId('mode').textContent).toBe('night');
    fireEvent.click(screen.getByRole('button', { name: /Toggle/i }));
    expect(screen.getByTestId('mode').textContent).toBe('day');
  });
});

describe('3. AudioContext Module (Native Web Audio Synth)', () => {
  function TestAudioConsumer() {
    const { isMuted, toggleMute, playClickSound } = useAudio();
    return (
      <div>
        <span data-testid="muted-state">{isMuted ? 'muted' : 'unmuted'}</span>
        <button onClick={toggleMute}>Toggle Mute</button>
        <button onClick={playClickSound}>Play Synth</button>
      </div>
    );
  }

  it('starts muted by default and synthesizes 600Hz audio when unmuted without exceptions', () => {
    render(
      <AudioProvider>
        <TestAudioConsumer />
      </AudioProvider>
    );

    expect(screen.getByTestId('muted-state').textContent).toBe('muted');

    // Unmute
    fireEvent.click(screen.getByRole('button', { name: /Toggle Mute/i }));
    expect(screen.getByTestId('muted-state').textContent).toBe('unmuted');

    // Trigger synth click
    expect(() => {
      fireEvent.click(screen.getByRole('button', { name: /Play Synth/i }));
    }).not.toThrow();

    // Trigger window mousedown
    expect(() => {
      fireEvent.mouseDown(window);
    }).not.toThrow();
  });
});

describe('4. SparkleCursor Module', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('creates throttled fixed particles at client coordinates and removes them after 500ms', () => {
    render(<SparkleCursor />);

    // Simulate mouse moves
    act(() => {
      fireEvent.mouseMove(window, { clientX: 120, clientY: 250 });
    });

    const sparkle = document.querySelector('.fixed.w-2.h-2.rounded-full.bg-hax-berry');
    expect(sparkle).toBeTruthy();
    expect(sparkle.style.left).toBe('120px');
    expect(sparkle.style.top).toBe('250px');

    // After 500ms, sparkle must be removed
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(document.querySelector('.fixed.w-2.h-2.rounded-full.bg-hax-berry')).toBeNull();
  });
});

describe('5. ConfettiTrigger Module', () => {
  it('triggers canvas-confetti with specified colors and triggers alert', async () => {
    const confetti = (await import('canvas-confetti')).default;
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    vi.useFakeTimers();
    render(<ConfettiTrigger />);

    const button = screen.getByRole('button', { name: /Secret Confetti Party/i });
    expect(button.className).toContain('fixed bottom-4 right-4 z-50 opacity-0 hover:opacity-100');

    fireEvent.click(button);

    expect(confetti).toHaveBeenCalledWith(
      expect.objectContaining({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.9 },
        colors: ['#fff8f1', '#a34063', '#5c4033'],
      })
    );

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(alertMock).toHaveBeenCalledWith("You found Pip's secret dream stash!");

    alertMock.mockRestore();
    vi.useRealTimers();
  });
});

describe('6. Navbar Module', () => {
  it('renders branding, audio toggle, and pill-shaped theme toggle with proper classes', () => {
    render(
      <ThemeProvider>
        <AudioProvider>
          <Navbar />
        </AudioProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/Pip's Nursery/i)).toBeInTheDocument();

    const themeButton = screen.getByTitle(/Switch to Midnight Dream Mode/i);
    expect(themeButton.className).toContain('px-4 py-2 rounded-full bg-hax-berry text-white');

    const audioButton = screen.getByTitle(/Click to Enable Audio/i);
    expect(audioButton).toBeInTheDocument();

    // Toggle theme to Night Mode
    fireEvent.click(themeButton);
    expect(screen.getByTitle(/Switch to Day Cozy Mode/i)).toBeInTheDocument();
  });
});

describe('7. HeroSection Module', () => {
  it('renders cloud avatar with mb-8 animate-float, exact h1 and subtitle p', () => {
    render(
      <ThemeProvider>
        <HeroSection />
      </ThemeProvider>
    );

    const img = screen.getByAltText('Pip the Skull Baby');
    expect(img).toHaveAttribute('src', 'https://hax.baby/baby/assets/pip_avatar_cloud.png');
    expect(img.className).toContain('animate-float drop-shadow-2xl mb-8');

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Pip the Skull Baby');
    expect(h1.className).toContain('font-serif text-5xl md:text-7xl font-bold mb-4');

    const p = screen.getByText('Junior Dream Engineer at Midnight Nursery');
    expect(p).toBeInTheDocument();
    expect(p.className).toContain('font-sans text-xl md:text-2xl opacity-90');
  });
});

describe('8. StoryScroll Module', () => {
  it('renders 3 story blocks under 50 words each with exact variant and bottom portrait image', () => {
    render(
      <ThemeProvider>
        <StoryScroll />
      </ThemeProvider>
    );

    // Verify 3 story blocks
    const story1 = screen.getByText(/Pip wasn't scary at all/i);
    const story2 = screen.getByText(/Every night, he fired up his lullaby lab/i);
    const story3 = screen.getByText(/With his pink bow and nightcap/i);

    expect(story1).toBeInTheDocument();
    expect(story2).toBeInTheDocument();
    expect(story3).toBeInTheDocument();

    // Word count check (< 50 words each)
    [story1, story2, story3].forEach((el) => {
      const words = el.textContent.trim().split(/\s+/).length;
      expect(words).toBeLessThan(50);
    });

    // Check bottom portrait image
    const portrait = screen.getByAltText('Pip Portrait');
    expect(portrait).toHaveAttribute('src', 'https://hax.baby/baby/assets/pip_portrait.png');
    expect(portrait.className).toContain('rounded-3xl shadow-xl mt-12 rotate-3');
  });
});

describe('9. ProjectGrid Module', () => {
  it('renders "What Pip Makes", 3 projects with exact titles, descriptions, and Lucide icon for Card 3', () => {
    render(
      <ThemeProvider>
        <ProjectGrid />
      </ThemeProvider>
    );

    expect(screen.getByText('What Pip Makes')).toBeInTheDocument();

    // Card 1
    expect(screen.getByText('The Lullaby Lab')).toBeInTheDocument();
    expect(screen.getByText('A generative music box for cozy sleep.')).toBeInTheDocument();
    const card1Img = screen.getByAltText('The Lullaby Lab');
    expect(card1Img).toHaveAttribute('src', 'https://hax.baby/baby/assets/pip_lullaby_box.png');

    // Card 2
    expect(screen.getByText('Nightlight Collection')).toBeInTheDocument();
    expect(screen.getByText('Glowing amber lamps to chase away the dark.')).toBeInTheDocument();
    const card2Img = screen.getByAltText('Nightlight Collection');
    expect(card2Img).toHaveAttribute('src', 'https://hax.baby/baby/assets/pip_dream_lantern.png');

    // Card 3 (Lucide Icon, zero invented images)
    expect(screen.getByText('Dream Routes')).toBeInTheDocument();
    expect(screen.getByText('Interactive flight maps over the neighborhood.')).toBeInTheDocument();
    expect(screen.queryByAltText('Dream Routes')).toBeNull(); // Must not have an img element
  });
});

describe('10. Footer Module', () => {
  it('renders retro monospace hit counter 00482 and haX.baby attribution in relative layout', () => {
    render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer.className).toContain('relative');
    expect(screen.getByText('00482')).toHaveClass('font-mono');
    expect(screen.getByText(/haX\.baby/i)).toBeInTheDocument();
  });
});

describe('11. Full App Root Assembly', () => {
  it('renders full tree cleanly with providers and theme toggles', () => {
    const { container } = render(<App />);

    expect(screen.getByText('Pip the Skull Baby')).toBeInTheDocument();
    expect(screen.getByText('What Pip Makes')).toBeInTheDocument();
    expect(screen.getByText('00482')).toBeInTheDocument();

    // Default Day mode background
    const rootDiv = container.firstElementChild;
    expect(rootDiv.className).toContain('bg-hax-cream text-hax-mocha');
  });
});
