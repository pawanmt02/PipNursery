import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

export const AudioContext = createContext({
  isMuted: true,
  toggleMute: () => {},
  playClickSound: () => {},
});

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef(null);

  const initAudio = useCallback(() => {
    try {
      if (typeof window === 'undefined') return;
      if (!audioCtxRef.current) {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (AudioCtxClass) {
          audioCtxRef.current = new AudioCtxClass();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
    } catch {
      // Autoplay policy or unsupported audio handling
    }
  }, []);

  const playSynthSound = useCallback(() => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx || ctx.state !== 'running') return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);

      // Fading out linearly over 0.1 seconds using a GainNode
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      try {
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
      } catch {
        // DOM exception safe guard
      }
    } catch {
      // General Web Audio API safe guard
    }
  }, [initAudio]);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (!next) {
        initAudio();
      }
      return next;
    });
  };

  useEffect(() => {
    const handleMouseDown = () => {
      initAudio();
      if (!isMuted && audioCtxRef.current) {
        if (audioCtxRef.current.state === 'running') {
          playSynthSound();
        } else if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current
            .resume()
            .then(() => {
              playSynthSound();
            })
            .catch(() => {});
        }
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isMuted, initAudio, playSynthSound]);

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playClickSound: playSynthSound }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
