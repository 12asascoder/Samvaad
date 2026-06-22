'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AdaptiveInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function AdaptiveInput({ value, onChange, placeholder = "Begin drafting your thoughts..." }: AdaptiveInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <motion.div 
      initial={{ opacity: 0, filter: 'blur(4px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.2, delay: 0.2 }}
      className="relative w-full"
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck="false"
        className="w-full bg-transparent border-none outline-none resize-none text-4xl md:text-5xl font-serif text-ink-900 placeholder:text-ink-700/50 leading-tight tracking-wide min-h-[300px]"
        style={{
          lineHeight: '1.4',
        }}
      />
    </motion.div>
  );
}
