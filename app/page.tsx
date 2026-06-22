'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';

export default function Home() {
  const [sequenceState, setSequenceState] = useState(0);

  useEffect(() => {
    // Stage 0: Darkness (1.5s)
    // Stage 1: "You are constantly changing." (4s)
    // Stage 2: "So should the technology that understands you." (4.5s)
    // Stage 3: Meet Samvaad (Final State)
    
    const timers = [
      setTimeout(() => setSequenceState(1), 1500),
      setTimeout(() => setSequenceState(2), 6000),
      setTimeout(() => setSequenceState(3), 11500)
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans selection:bg-accent-900 selection:text-accent-500 overflow-hidden flex flex-col items-center justify-center">
      
      {/* Immersive Background: Becomes more active in State 3 */}
      <AnimatedBackground intensity={sequenceState === 3 ? "active" : "dormant"} />

      {/* Main Sequential Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          
          {sequenceState === 1 && (
            <motion.h2 
              key="stage-1"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="text-2xl md:text-3xl font-serif italic text-[#888888] tracking-wide"
            >
              You are constantly changing.
            </motion.h2>
          )}

          {sequenceState === 2 && (
            <motion.h2 
              key="stage-2"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="text-2xl md:text-3xl font-serif italic text-[#888888] tracking-wide"
            >
              So should the technology<br />that understands you.
            </motion.h2>
          )}

          {sequenceState === 3 && (
            <motion.div 
              key="stage-3"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <h1 className="text-5xl md:text-[64px] font-serif tracking-tight text-[#E5E5E5] mb-8 drop-shadow-2xl">
                Meet Samvaad.
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
                className="text-[10px] tracking-[0.4em] font-bold text-[#555555] uppercase"
              >
                .YOUR COGNITIVE TWIN
              </motion.p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <AnimatePresence>
        {sequenceState === 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 3 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8 z-10"
          >
            <Link 
              href="/login" 
              className="text-[9px] tracking-[0.3em] font-bold text-[#666666] uppercase hover:text-white transition-colors"
            >
              BEGIN AWAKENING
            </Link>
            <div className="w-[1px] h-16 bg-gradient-to-b from-[#333333] to-transparent"></div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
