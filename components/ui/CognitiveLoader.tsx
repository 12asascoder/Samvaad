'use client';

import { motion } from 'framer-motion';

export function CognitiveLoader() {
  const words = ["Learning", "Understanding", "Remembering", "Adapting", "SAMVAAD"];
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] overflow-hidden">
      
      {/* Central Neural Node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute w-3 h-3 rounded-full bg-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,1)]"
      />

      {/* Orbiting Connections */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute w-[200px] h-[200px] border border-white/[0.02] rounded-full"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[300px] h-[300px] border border-white/[0.02] rounded-full"
      />

      {/* Word Fade Sequence */}
      <div className="absolute mt-32 text-[10px] tracking-[0.4em] font-bold text-[#666666] uppercase text-center w-full">
        {words.map((word, i) => (
          <motion.div
            key={word}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: [10, 0, -10]
            }}
            transition={{ 
              duration: i === words.length - 1 ? 4 : 2, 
              delay: 1.5 + (i * 2), // Sequence them
              ease: "easeInOut"
            }}
            className="absolute left-0 right-0"
            style={{ 
              color: i === words.length - 1 ? '#D4AF37' : '#666666',
              textShadow: i === words.length - 1 ? '0 0 10px rgba(212,175,55,0.5)' : 'none'
            }}
          >
            {word}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
