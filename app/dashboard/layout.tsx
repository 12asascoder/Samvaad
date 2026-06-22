'use client';

import React from 'react';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { CommandPalette } from '@/components/ui/CommandPalette';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-space-900 text-ink-900 overflow-hidden font-sans selection:bg-accent-900 selection:text-accent-500">
      <AnimatedBackground />
      <CommandPalette />
      
      <main className="relative z-10 w-full h-full min-h-screen">
        {children}
      </main>
    </div>
  );
}
