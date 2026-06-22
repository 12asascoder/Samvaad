'use client';

import { motion } from 'framer-motion';

export function InsightCard({ text, delay = 0 }: { text: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="pl-5 border-l border-white/10 py-1"
    >
      <p className="text-ink-700 font-serif italic text-lg leading-relaxed tracking-wide">
        "{text}"
      </p>
    </motion.div>
  );
}
