'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, AlignLeft, Calendar, User } from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { CommandPalette } from '@/components/ui/CommandPalette';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isExpressRoute = pathname === '/dashboard/chat';

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-ink-900 overflow-hidden font-sans selection:bg-accent-900 selection:text-accent-500">
      <AnimatedBackground />
      <CommandPalette />
      
      <main className={`relative z-10 w-full h-full min-h-screen ${isExpressRoute ? '' : 'pb-40'}`}>
        {children}
      </main>

      {/* Floating Bottom Dock */}
      {!isExpressRoute && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-50">
          <span className="text-[10px] tracking-[0.2em] text-[#666666] uppercase mb-6 font-medium">TYPE TO COMMUNICATE DIRECTLY</span>
          <div className="flex items-center gap-1 bg-[#050505]/90 border border-white/[0.05] rounded-[32px] px-2 py-2 backdrop-blur-xl shadow-2xl">
            <Link href="/dashboard/learning" className="flex items-center gap-2 px-5 py-2 rounded-full hover:bg-white/5 transition-colors">
              <BookOpen className="w-3.5 h-3.5 text-white/50" />
              <span className="text-[11px] tracking-wide font-sans text-white/80">Learn</span>
            </Link>
            <Link href="/dashboard/chat" className="flex items-center gap-2 px-5 py-2 rounded-full hover:bg-white/5 transition-colors">
              <AlignLeft className="w-3.5 h-3.5 text-white/50" />
              <span className="text-[11px] tracking-wide font-sans text-white/80">Express</span>
            </Link>
            <Link href="/dashboard/prepare" className="flex items-center gap-2 px-5 py-2 rounded-full hover:bg-white/5 transition-colors">
              <Calendar className="w-3.5 h-3.5 text-white/50" />
              <span className="text-[11px] tracking-wide font-sans text-white/80">Prepare</span>
            </Link>
            <Link href="/dashboard/profile" className="flex items-center gap-2 px-5 py-2 rounded-full hover:bg-white/5 transition-colors">
              <User className="w-3.5 h-3.5 text-white/50" />
              <span className="text-[11px] tracking-wide font-sans text-white/80">Reflect</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
