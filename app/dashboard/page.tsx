'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { TwinGreeting } from "@/components/ui/TwinGreeting";
import { InsightCard } from "@/components/ui/InsightCard";

interface NeuralInsight {
  id: string;
  description: string;
}

export default function Dashboard() {
  const [userName, setUserName] = useState<string>("Arnav");
  const [insights, setInsights] = useState<NeuralInsight[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const name = user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0] || "Arnav";
      setUserName(name);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: insightsData } = await (supabase as any)
        .from('neural_insights')
        .select('id, description')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      if (insightsData && insightsData.length > 0) {
        setInsights(insightsData);
      } else {
        // Fallback realistic insights
        setInsights([
          { id: '1', description: "You understand concepts faster with examples." },
          { id: '2', description: "Your confidence increased by 14% this week." },
          { id: '3', description: "You hesitate before difficult conversations." }
        ]);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="w-full h-full min-h-screen px-6 py-12 md:px-16 md:py-20 max-w-[1600px] mx-auto">
      {/* Top Bar */}
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-between mb-24"
      >
        <h2 className="text-xl font-serif text-ink-900 tracking-wide">Samvaad</h2>
        <div className="flex items-center gap-4 text-ink-600 text-sm tracking-wide">
          <span>Press <kbd className="font-mono bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">⌘K</kbd> to search</span>
        </div>
      </motion.header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 xl:gap-24">
        
        {/* Left Column: Greeting & Insights */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <TwinGreeting name={userName} subtext="What would you like to do today?" />
          
          <div className="mt-8 space-y-8">
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs font-sans tracking-[0.2em] text-ink-600 uppercase mb-6"
            >
              Your Cognitive Twin Noticed
            </motion.h3>
            
            <div className="space-y-10">
              {insights.map((insight, idx) => (
                <InsightCard key={insight.id} text={insight.description} delay={0.5 + (idx * 0.1)} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Feature Masonry Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          
          <div className="space-y-6">
            <FeatureTile 
              title="Learn" 
              desc="Expand your theoretical horizon." 
              href="/dashboard/learning" 
              delay={0.6} 
            />
            <FeatureTile 
              title="Prepare" 
              desc="Simulation for upcoming challenges." 
              href="/dashboard/prepare" 
              delay={0.8} 
            />
          </div>
          
          <div className="space-y-6 sm:mt-12">
            <FeatureTile 
              title="Express" 
              desc="Voice your thoughts and ideas." 
              href="/dashboard/chat" 
              delay={0.7} 
              isHighlighted={true}
            />
            <FeatureTile 
              title="Reflect" 
              desc="Quiet space for internal auditing." 
              href="/dashboard/profile" 
              delay={0.9} 
            />
          </div>

        </div>
      </div>
    </div>
  );
}

function FeatureTile({ title, desc, href, delay, isHighlighted = false }: { title: string, desc: string, href: string, delay: number, isHighlighted?: boolean }) {
  const router = useRouter();
  
  return (
    <motion.button
      onClick={() => router.push(href)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.4, ease: "easeOut" } }}
      whileTap={{ scale: 0.98 }}
      className={`w-full relative flex flex-col justify-end text-left p-10 rounded-[32px] h-[360px] md:h-[420px] overflow-hidden group border border-white/[0.03] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] transition-colors duration-700 ${
        isHighlighted ? 'bg-space-700/60 hover:bg-space-700/80' : 'bg-space-800/40 hover:bg-space-800/60'
      } backdrop-blur-3xl`}
    >
      {/* Decorative blurred blob inside the tile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white opacity-0 group-hover:opacity-[0.02] blur-[50px] transition-opacity duration-700 rounded-full pointer-events-none" />
      
      {isHighlighted && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.05] via-transparent to-transparent pointer-events-none" />
      )}

      <div className="relative z-10">
        <h2 className="text-3xl font-serif text-ink-900 mb-3 tracking-wide">{title}</h2>
        <p className="text-ink-600 font-sans text-sm tracking-wide leading-relaxed">{desc}</p>
      </div>

      {isHighlighted && (
        <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
          <span className="text-xs font-sans text-ink-900 tracking-wide">Enter Space</span>
        </div>
      )}
    </motion.button>
  );
}
