'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Activity, Share2, Plus } from 'lucide-react';
import { AdaptiveInput } from './AdaptiveInput';

export function ConversationStudio() {
  const [text, setText] = useState('The art of conversation lies not only in the words we choose, but in the silence between them.');
  
  return (
    <div className="w-full h-full min-h-screen px-6 py-12 md:px-12 md:py-16 max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Left Column: Atmosphere & Refinement */}
      <div className="lg:col-span-3 space-y-12">
        {/* Atmosphere */}
        <section>
          <h3 className="text-xs font-sans tracking-[0.2em] text-ink-600 uppercase mb-6">Atmosphere</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between group">
              <span className="text-ink-800 font-sans group-hover:text-ink-900 transition-colors">Warm Study</span>
              <div className="w-2 h-2 rounded-full bg-accent-500 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
            </button>
            <button className="w-full flex items-center justify-between group">
              <span className="text-ink-600 font-sans group-hover:text-ink-800 transition-colors">Late Evening</span>
              <div className="w-2 h-2 rounded-full bg-white/10" />
            </button>
          </div>
        </section>

        {/* Refinement Tools */}
        <section>
          <h3 className="text-xs font-sans tracking-[0.2em] text-ink-600 uppercase mb-6">Refinement Tools</h3>
          
          <div className="space-y-6">
            <div className="bg-space-800/40 border border-white/[0.03] backdrop-blur-3xl rounded-3xl p-6 shadow-2xl">
              <Sparkles className="w-5 h-5 text-accent-500 mb-4" />
              <h4 className="text-xl font-serif text-ink-900 mb-3">Tone Shift</h4>
              <p className="text-xs font-sans text-ink-600 leading-relaxed mb-6">
                Gently realigning your intent for clarity and emotional resonance.
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-ink-700 bg-white/5 hover:bg-white/10 transition-colors">
                  Diplomatic
                </button>
                <button className="px-4 py-1.5 rounded-full border border-transparent text-[10px] uppercase tracking-widest text-ink-600 hover:text-ink-800 transition-colors">
                  Assertive
                </button>
              </div>
            </div>

            <div className="bg-space-800/40 border border-white/[0.03] backdrop-blur-3xl rounded-3xl p-6 shadow-2xl">
              <Activity className="w-5 h-5 text-ink-700 mb-4" />
              <h4 className="text-xl font-serif text-ink-900 mb-3">Simulations</h4>
              <p className="text-xs font-sans text-ink-600 leading-relaxed mb-6">
                Interactive scenario builder to test responses before the dialogue.
              </p>
              <button className="text-xs font-sans text-ink-800 border-b border-ink-800 pb-0.5 hover:text-ink-900 transition-colors">
                Initialize Scenario
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Center Column: Drafting Area */}
      <div className="lg:col-span-6 bg-space-800/20 rounded-[40px] border border-white/[0.02] backdrop-blur-md p-10 flex flex-col relative h-[80vh]">
        <div className="flex items-center justify-between mb-12">
          <span className="text-[10px] font-sans tracking-[0.2em] text-ink-700 uppercase">Unbounded_Canvas_01</span>
          <div className="w-12 h-px bg-white/10" />
        </div>

        <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide">
          <AdaptiveInput value={text} onChange={setText} />
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-8">
          <div>
            <span className="block text-[10px] font-sans tracking-[0.2em] text-ink-700 uppercase mb-1">Word Count</span>
            <span className="text-2xl font-serif text-ink-900">{text.split(' ').filter(w => w.length > 0).length}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-ink-600 hover:text-ink-900 hover:bg-white/5 transition-all">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="px-8 py-3 bg-white text-space-900 rounded-full font-sans text-xs uppercase tracking-widest font-bold hover:bg-ink-800 transition-colors">
              Save Archive
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Audio & Inspiration */}
      <div className="lg:col-span-3 space-y-12">
        <section>
          <h3 className="text-xs font-sans tracking-[0.2em] text-ink-600 uppercase mb-6">Speech Rhythms</h3>
          <div className="bg-space-800/40 border border-white/[0.03] backdrop-blur-3xl rounded-3xl p-6 shadow-2xl h-64 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[10px] tracking-widest uppercase text-ink-600 mb-2">
                  <span>Cadence</span>
                  <span>Steady</span>
                </div>
                <div className="w-full h-0.5 bg-white/5 relative">
                  <div className="absolute top-0 left-0 w-2/3 h-full bg-ink-800" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] tracking-widest uppercase text-ink-600 mb-2">
                  <span>Pause Density</span>
                  <span>Low</span>
                </div>
                <div className="w-full h-0.5 bg-white/5 relative">
                  <div className="absolute top-0 left-0 w-1/4 h-full bg-ink-800" />
                </div>
              </div>
            </div>
            
            <div className="flex items-end justify-center gap-1 h-24 opacity-40">
              {/* Abstract Waveform */}
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: ['20%', `${Math.random() * 80 + 20}%`, '20%'] }}
                  transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 bg-ink-700 rounded-t-sm"
                />
              ))}
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-sans tracking-[0.2em] text-ink-600 uppercase mb-6">Inspiration</h3>
          <div className="relative rounded-3xl overflow-hidden aspect-square border border-white/[0.05] mb-6">
            <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-transparent to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Textural inspiration" 
              className="object-cover w-full h-full opacity-60 mix-blend-luminosity"
            />
          </div>
          <p className="text-sm font-serif italic text-ink-600 leading-relaxed">
            Consider the weight of your opening statement. Does it ground the reader or invite them to float?
          </p>
        </section>

        <div className="flex justify-end pt-8">
          <button className="w-16 h-16 rounded-full bg-white text-space-900 flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
