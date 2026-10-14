'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageComponent from './ImageComponent';

const logos = [
  { src: 'avia_logo.webp', alt: 'Logo 1' },
  { src: 'avia_logo.webp', alt: 'Logo 2' },
];

export default function LogoSwitcher() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % logos.length);
    }, 3000); // Change logo every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-24 h-12 overflow-hidden relative">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full h-full flex items-center justify-center"
        >
          <ImageComponent
            src={logos[current].src}
            alt={logos[current].alt}
            cdn={false}
            width={100}
            height={40}
            className="object-contain"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}