import React from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

export default function ConfettiTrigger() {
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.9 },
        colors: ['#fff8f1', '#a34063', '#5c4033'],
      });
      setTimeout(() => {
        alert("You found Pip's secret dream stash!");
      }, 100);
    } catch {
      // Safe guard against canvas errors
    }
  };

  return (
    <button
      onClick={triggerConfetti}
      aria-label="Secret Confetti Party"
      title="Secret Nursery Magic! ✨"
      className="fixed bottom-4 right-4 z-50 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity p-2 cursor-pointer rounded-full bg-hax-berry/90 text-hax-cream shadow-xl border border-hax-cream/30"
    >
      <Sparkles className="w-5 h-5 animate-pulse" />
    </button>
  );
}
