'use client';

import { useEffect, useState } from 'react';

const fightImages = [
  ['/images/Aegies protocol assault 1.webp', 'Aegis Protocol forces in combat'],
  ['/images/Solar reactor assault 1.webp', 'Combat inside a solar reactor'],
  ['/images/Faction 7 machine works assault.webp', 'Assault on a machine works'],
  ['/images/Solar zealot reactor assault.webp', 'Solar Zealot reactor assault'],
];

const rotationInterval = 4500;

export default function FightCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => {
      setReduceMotion(mediaQuery.matches);
      if (mediaQuery.matches) setActiveIndex(0);
    };

    syncMotionPreference();
    mediaQuery.addEventListener('change', syncMotionPreference);
    return () => mediaQuery.removeEventListener('change', syncMotionPreference);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % fightImages.length);
    }, rotationInterval);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <div className="cinematic-image fight-visual">
      {fightImages.map(([src, alt], index) => (
        <img
          className={index === activeIndex ? 'is-active' : undefined}
          src={src}
          alt={alt}
          aria-hidden={index !== activeIndex}
          key={src}
          loading="lazy"
          sizes="(max-width: 1080px) 100vw, 60vw"
        />
      ))}
      <span className="image-index">02</span>
      <span className="cycle-label">FACTION ENCOUNTERS / ROTATING FEED</span>
    </div>
  );
}
