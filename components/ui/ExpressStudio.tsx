'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, Share2, Plus, Terminal } from 'lucide-react';
import Link from 'next/link';

export function ExpressStudio() {
  const [text, setText] = useState("The art of conversation lies not only in the words we choose, but in the silence between them.\n\nWhen we speak with intent, we invite a resonance that transcends literal meaning.\n\nDialogue is the bridge between two solitudes.\n\nChoose words that build, not words that block.");
  const [wordCount, setWordCount] = useState(32);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setWordCount(e.target.value.trim().split(/\s+/).filter(w => w.length > 0).length);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans selection:bg-[#333333] flex flex-col">
      {/* Top Header */}
      <header className="flex items-center justify-between px-10 py-8">
        <Link href="/dashboard" className="text-2xl font-serif tracking-wide text-white">Samvaad</Link>
        <div className="flex items-center gap-10">
          <nav className="flex items-center gap-8 text-[11px] tracking-widest uppercase font-bold text-[#666666]">
            <Link href="/dashboard/learning" className="hover:text-white transition-colors">Learn</Link>
            <Link href="/dashboard/chat" className="text-white">Express</Link>
            <Link href="/dashboard/prepare" className="hover:text-white transition-colors">Prepare</Link>
            <Link href="/dashboard/profile" className="hover:text-white transition-colors">Reflect</Link>
          </nav>
          <div className="w-8 h-8 rounded bg-[#111111] border border-white/[0.05] flex items-center justify-center">
            <Terminal className="w-4 h-4 text-[#888888]" />
          </div>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 px-10 pb-10 overflow-hidden">
        
        {/* Left Column: Tools */}
        <div className="lg:col-span-3 flex flex-col gap-12 pr-6">
          
          {/* Atmosphere */}
          <div>
            <h3 className="text-[10px] tracking-widest font-bold text-[#666666] uppercase mb-6">Atmosphere</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between text-left group">
                <span className="text-[#CCCCCC] text-[13px] group-hover:text-white transition-colors">Warm Study</span>
                <div className="w-2.5 h-2.5 rounded-full bg-[#F3C48C] shadow-[0_0_10px_rgba(243,196,140,0.5)]"></div>
              </button>
              <button className="w-full flex items-center justify-between text-left group">
                <span className="text-[#666666] text-[13px] group-hover:text-white transition-colors">Late Evening</span>
                <div className="w-2.5 h-2.5 rounded-full bg-[#333333]"></div>
              </button>
            </div>
          </div>

          {/* Refinement Tools */}
          <div>
            <h3 className="text-[10px] tracking-widest font-bold text-[#666666] uppercase mb-6">Refinement Tools</h3>
            
            <div className="space-y-4">
              {/* Tone Shift Card */}
              <div className="bg-[#111111] border border-[#222222] rounded-[20px] p-6">
                <Sparkles className="w-5 h-5 text-[#888888] mb-4" />
                <h4 className="text-lg font-serif text-[#F5F5F5] mb-2">Tone Shift</h4>
                <p className="text-[12px] text-[#888888] leading-relaxed mb-6">
                  Gently realigning your intent for clarity and emotional resonance.
                </p>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-1.5 rounded-full bg-[#1A1A1A] border border-[#333333] text-[9px] uppercase tracking-wider text-[#AAAAAA] hover:bg-[#222222] hover:text-white transition-colors">
                    Diplomatic
                  </button>
                  <button className="px-4 py-1.5 rounded-full bg-transparent border border-transparent text-[9px] uppercase tracking-wider text-[#666666] hover:text-[#AAAAAA] transition-colors">
                    Assertive
                  </button>
                </div>
              </div>

              {/* Simulations Card */}
              <div className="bg-[#111111] border border-[#222222] rounded-[20px] p-6">
                <MessageSquare className="w-5 h-5 text-[#888888] mb-4" />
                <h4 className="text-lg font-serif text-[#F5F5F5] mb-2">Simulations</h4>
                <p className="text-[12px] text-[#888888] leading-relaxed mb-6">
                  Interactive scenario builder to test responses before the dialogue.
                </p>
                <button className="text-[11px] text-[#DDDDDD] border-b border-[#555555] pb-0.5 hover:text-white transition-colors">
                  Initialize Scenario
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Unbounded Canvas */}
        <div className="lg:col-span-6 bg-[#0E0E0E] border border-[#1A1A1A] rounded-[24px] flex flex-col relative h-[calc(100vh-120px)]">
          <div className="px-12 py-8 flex items-center gap-4 border-b border-[#1A1A1A]">
            <span className="text-[9px] font-bold text-[#666666] tracking-widest uppercase">Unbounded_Canvas_01</span>
            <div className="flex-1 h-[1px] bg-[#222222]"></div>
          </div>
          
          <div className="flex-1 overflow-y-auto px-12 py-10">
            <textarea
              value={text}
              onChange={handleTextChange}
              className="w-full h-full bg-transparent resize-none outline-none font-serif text-[28px] md:text-[36px] leading-[1.6] text-[#DDDDDD] placeholder-[#333333]"
              placeholder="Begin your thoughts..."
            />
          </div>

          <div className="px-12 py-8 flex items-end justify-between border-t border-[#1A1A1A]">
            <div>
              <p className="text-[9px] tracking-widest text-[#666666] uppercase mb-1 font-bold">Word Count</p>
              <p className="text-xl font-serif text-[#F5F5F5]">{wordCount}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-12 h-12 rounded-full border border-[#333333] flex items-center justify-center hover:bg-[#1A1A1A] transition-colors group">
                <Share2 className="w-4 h-4 text-[#888888] group-hover:text-white transition-colors" />
              </button>
              <button className="px-8 py-3.5 rounded-full bg-white text-black text-[11px] font-bold tracking-widest uppercase hover:bg-[#E5E5E5] transition-colors shadow-lg">
                Save Archive
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Rhythms & Inspiration */}
        <div className="lg:col-span-3 flex flex-col gap-12 pl-6 relative">
          
          {/* Speech Rhythms */}
          <div className="bg-[#111111] border border-[#222222] rounded-[20px] p-6">
            <h3 className="text-[10px] tracking-widest font-bold text-[#666666] uppercase mb-8">Speech Rhythms</h3>
            
            <div className="space-y-6 mb-12">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-[#888888] tracking-widest">CADENCE</span>
                  <span className="text-[10px] text-[#D4AF37] tracking-widest">STEADY</span>
                </div>
                <div className="h-1 w-full bg-[#222222] rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-[#888888] tracking-widest">PAUSE DENSITY</span>
                  <span className="text-[10px] text-[#888888] tracking-widest">LOW</span>
                </div>
                <div className="h-1 w-full bg-[#222222] rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Fake Equalizer Bars */}
            <div className="flex items-end justify-center gap-[3px] h-24 opacity-60">
              {[4, 8, 12, 16, 24, 18, 10, 6, 4, 14, 20, 16, 12, 8].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [h*2, h*3, h*1.5, h*2] }}
                  transition={{ repeat: Infinity, duration: 1.5 + (i * 0.1), ease: "easeInOut" }}
                  className="w-[4px] bg-[#555555] rounded-t-sm"
                  style={{ minHeight: '4px' }}
                />
              ))}
            </div>
          </div>

          {/* Inspiration */}
          <div>
            <h3 className="text-[10px] tracking-widest font-bold text-[#666666] uppercase mb-6">Inspiration</h3>
            {/* Texture Placeholder */}
            <div className="w-full aspect-square rounded-[20px] bg-gradient-to-br from-[#2A2A2A] to-[#111111] border border-[#222222] mb-6 shadow-inner relative overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent" />
               <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cracked-earth.png')]" />
            </div>
            <p className="text-[12px] text-[#888888] leading-relaxed font-serif italic">
              Consider the weight of your opening statement. Does it ground the reader or invite them to float?
            </p>
          </div>

          {/* Floating Action Button */}
          <button className="absolute bottom-0 right-4 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform z-10">
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
