'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // For this minimalist UI, we'll assume a passwordless "magic link" or default password for the identity state.
  // We'll prompt them to "State your identity" (email).
  // If we need a password, we can add it later, but the design just shows one input.
  const handleIdentitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError(null);

    // For local UI testing without a real Supabase backend yet, 
    // we bypass the actual auth request and route directly to the dashboard
    setTimeout(() => {
      router.push('/dashboard');
      router.refresh();
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans selection:bg-[#333333] flex items-center justify-center overflow-hidden">
      
      {/* Immersive Constellation Background */}
      <AnimatedBackground />

      {/* Main Identity Prompter Card */}
      <div className="relative z-10 w-full max-w-[400px] p-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* The Card Container */}
        <div className="bg-[#050505]/80 backdrop-blur-2xl border border-white/[0.03] rounded-[24px] p-12 shadow-[0_0_50px_rgba(255,255,255,0.02)] flex flex-col items-center text-center relative overflow-hidden">
          
          {/* Faint internal glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-white opacity-[0.02] blur-[40px] rounded-full pointer-events-none" />

          {/* Header */}
          <h1 className="text-3xl font-serif italic text-[#E5E5E5] leading-[1.3] mb-8">
            Welcome back to your<br />Cognitive Space.
          </h1>

          <div className="w-12 h-[1px] bg-[#333333] mb-12"></div>

          {/* Form */}
          <form onSubmit={handleIdentitySubmit} className="w-full flex flex-col items-center">
            
            {error && (
              <div className="text-[#D4AF37] text-[10px] uppercase tracking-widest mb-4">
                {error}
              </div>
            )}

            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="State your identity"
              disabled={loading}
              className="w-full bg-transparent border-b border-[#333333] text-center text-[15px] font-sans text-[#E5E5E5] placeholder-[#555555] pb-3 mb-10 focus:outline-none focus:border-[#888888] transition-colors disabled:opacity-50"
              required
            />

            <button 
              type="submit"
              disabled={loading || !email}
              className="text-[10px] tracking-[0.3em] font-bold text-[#888888] uppercase hover:text-white transition-colors disabled:opacity-50 mb-12"
            >
              {loading ? 'VERIFYING...' : 'ENTER'}
            </button>
          </form>

          {/* Footer Link */}
          <Link 
            href="/login" 
            onClick={(e) => {
              e.preventDefault();
              alert('Registration sequence not yet initialized.');
            }}
            className="text-[11px] font-serif italic text-[#555555] hover:text-[#888888] transition-colors"
          >
            New to Samvaad? Begin your awakening.
          </Link>
        </div>
      </div>

    </div>
  );
}
