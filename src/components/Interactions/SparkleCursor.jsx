import { useEffect, useRef } from 'react';

export default function SparkleCursor() {
  const lastTimeRef = useRef(0);
  const sparklesRef = useRef(new Set());

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTimeRef.current < 30) {
        return;
      }
      lastTimeRef.current = now;

      const sparkle = document.createElement('div');
      sparkle.className =
        'fixed w-2 h-2 rounded-full bg-hax-berry opacity-80 pointer-events-none transition-all duration-500 ease-out z-[9999]';
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;

      document.body.appendChild(sparkle);
      sparklesRef.current.add(sparkle);

      // Trigger slight drift/scale for soft early-web sparkle feel
      requestAnimationFrame(() => {
        sparkle.style.transform = 'scale(1.5) translate(-50%, -50%)';
        sparkle.style.opacity = '0';
      });

      const timer = setTimeout(() => {
        sparkle.remove();
        sparklesRef.current.delete(sparkle);
      }, 500);

      sparkle._timer = timer;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      sparklesRef.current.forEach((el) => {
        if (el._timer) clearTimeout(el._timer);
        el.remove();
      });
      sparklesRef.current.clear();
    };
  }, []);

  return null;
}
