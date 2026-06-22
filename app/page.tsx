import Link from "next/link";
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans selection:bg-accent-900 selection:text-accent-500 overflow-hidden flex flex-col items-center justify-center">
      
      {/* Immersive Background */}
      <AnimatedBackground />

      {/* Main Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-[1500ms]">
        <h1 className="text-5xl md:text-[64px] font-serif tracking-tight text-[#E5E5E5] mb-6 drop-shadow-2xl">
          Meet Samvaad.
        </h1>
        <p className="text-[10px] tracking-[0.3em] font-bold text-[#666666] uppercase">
          .YOUR COGNITIVE TWIN
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-10 animate-in fade-in duration-[2000ms] delay-500 fill-mode-both">
        <Link 
          href="/login" 
          className="text-[10px] tracking-[0.2em] font-bold text-[#888888] uppercase hover:text-white transition-colors"
        >
          BEGIN AWAKENING
        </Link>
        {/* Vertical line indicator */}
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#444444] to-transparent"></div>
      </div>
      
    </div>
  );
}
