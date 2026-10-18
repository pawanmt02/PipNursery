# 🍼 Pip's Midnight Nursery

> **haX.baby Hackathon (Track 1)** — An interactive, cozy, nostalgic single-page portfolio celebrating **Pip the Skull Baby**, Junior Dream Engineer at Midnight Nursery.

[![Built with React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Powered by Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)
[![Tests Passing](https://img.shields.io/badge/Tests-12%2F12%20Passing-brightgreen?logo=vitest)](https://vitest.dev/)

---

## 🌟 Key Features

- **Cozy & Nostalgic Aesthetic:** Built with early-web soul, warm cream (`#fff8f1`), berry accents (`#a34063`), and a midnight dream palette (`#0f172a`).
- **Native Web Audio Synthesis:** Synthesizes click sounds via `window.AudioContext` with a 600Hz sine wave and linear gain fadeout. Zero `.mp3` or `.wav` dependencies for 0 network/CORS issues.
- **Sparkle Cursor:** Throttled retro sparkle particles that follow the cursor on desktop and gently fade away.
- **Framer Motion Storytelling:** 3 gentle, under-50-word story scenes illuminating Pip's mission as a protector of sweet dreams.
- **Curated Curiosities Grid:** Showcase of Pip's creations including *The Lullaby Lab*, *Nightlight Collection*, and *Dream Routes*.
- **Secret Easter Egg:** Hidden confetti trigger in the bottom-right corner celebrating Pip's secret dream stash with custom haX colors.
- **Monospace Retro Hit Counter:** Authentic visitor hit counter (`00482`) in the footer.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run Automated PDR Test Suite
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```

---

## 📂 Project Architecture

```text
PipNursery/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   └── AudioContext.jsx
│   └── components/
│       ├── Layout/
│       │   ├── Navbar.jsx
│       │   └── Footer.jsx
│       ├── Sections/
│       │   ├── HeroSection.jsx
│       │   ├── StoryScroll.jsx
│       │   └── ProjectGrid.jsx
│       └── Interactions/
│           ├── SparkleCursor.jsx
│           └── ConfettiTrigger.jsx
└── tests/
    ├── setup.js
    └── pdr.test.jsx
```

---

## 💖 Credits & Acknowledgments
Built with ❤️ for the [haX.baby](https://hax.baby) hackathon.
Pip the Skull Baby assets courtesy of haX.baby.
