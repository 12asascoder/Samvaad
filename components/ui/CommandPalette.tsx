'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BookOpen, Mic, Target, Activity } from 'lucide-react';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const navigateTo = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 bg-space-900/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl bg-space-800/90 backdrop-blur-3xl border border-white/[0.03] rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto"
            >
              <div className="p-6 border-b border-white/[0.03]">
                <input 
                  autoFocus
                  placeholder="Where would you like to go?"
                  className="w-full bg-transparent text-ink-900 placeholder:text-ink-600 text-3xl font-serif outline-none"
                />
              </div>
              <div className="p-4 space-y-2">
                <PaletteItem icon={<BookOpen size={24} />} label="Learn" desc="Expand your theoretical horizon" onClick={() => navigateTo('/dashboard/learning')} />
                <PaletteItem icon={<Mic size={24} />} label="Express" desc="Voice your thoughts and ideas" onClick={() => navigateTo('/dashboard/chat')} />
                <PaletteItem icon={<Target size={24} />} label="Prepare" desc="Simulation for upcoming challenges" onClick={() => navigateTo('/dashboard/prepare')} />
                <PaletteItem icon={<Activity size={24} />} label="System Audit" desc="Cost Optimization & Performance" onClick={() => navigateTo('/dashboard/cost')} />
              </div>
              <div className="px-6 py-4 bg-white/[0.02] border-t border-white/[0.03] text-xs text-ink-600 flex justify-between font-sans">
                <span>Press <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded">esc</kbd> to close</span>
                <span>Spatial Navigation Active</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function PaletteItem({ icon, label, desc, onClick }: { icon: React.ReactNode, label: string, desc: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-6 p-4 text-left rounded-2xl transition-all duration-300 group hover:bg-white/[0.03]"
    >
      <div className="text-ink-600 group-hover:text-accent-500 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="font-serif text-xl text-ink-800 group-hover:text-ink-900 transition-colors">{label}</h3>
        <p className="font-sans text-sm text-ink-600">{desc}</p>
      </div>
    </button>
  );
}
