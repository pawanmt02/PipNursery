import '@testing-library/jest-dom';

// Polyfill window.AudioContext for tests
class MockAudioContext {
  constructor() {
    this.state = 'suspended';
    this.currentTime = 0;
    this.destination = {};
  }
  resume() {
    this.state = 'running';
    return Promise.resolve();
  }
  createOscillator() {
    return {
      type: 'sine',
      frequency: {
        setValueAtTime: (val) => {
          this.lastFrequency = val;
        },
      },
      connect: () => {},
      start: () => {
        this.oscillatorStarted = true;
      },
      stop: () => {
        this.oscillatorStopped = true;
      },
    };
  }
  createGain() {
    return {
      gain: {
        setValueAtTime: (val) => {
          this.lastGainStart = val;
        },
        linearRampToValueAtTime: (val, time) => {
          this.lastGainEnd = val;
          this.lastGainTime = time;
        },
      },
      connect: () => {},
    };
  }
}

window.AudioContext = MockAudioContext;
window.webkitAudioContext = MockAudioContext;

// Polyfill IntersectionObserver for Framer Motion whileInView
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};
