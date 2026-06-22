'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function TwinPresence() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed bottom-10 left-10 z-50 flex items-center justify-center">
      {/* Outer Glow Ring */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-12 h-12 rounded-full border border-[#D4AF37]/20"
      />

      {/* Inner Active Ring */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-10 h-10 rounded-full border-t border-[#D4AF37]/50 border-r border-transparent border-b border-transparent border-l border-[#D4AF37]/20"
      />

      {/* The Core Entity */}
      <motion.div 
        animate={{ 
          x: mousePosition.x,
          y: mousePosition.y,
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          x: { type: 'spring', damping: 20, stiffness: 100 },
          y: { type: 'spring', damping: 20, stiffness: 100 }
        }}
        className="w-4 h-4 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8A7323] shadow-[0_0_15px_rgba(212,175,55,0.6)] cursor-pointer hover:scale-125 transition-transform"
      />
    </div>
  );
}
