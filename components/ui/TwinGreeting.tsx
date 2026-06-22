'use client';

import { motion } from 'framer-motion';

export function TwinGreeting({ name, subtext }: { name: string, subtext: string }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="mb-20"
    >
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-ink-900 tracking-tight mb-6">
        {getGreeting()}, {name}
      </h1>
      <div className="flex items-center gap-3">
        <p className="text-ink-600 font-sans text-lg tracking-wide">{subtext}</p>
        <motion.div 
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-1.5 h-5 bg-ink-700"
        />
      </div>
    </motion.div>
  );
}
