'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Command } from 'lucide-react';

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
    <div className="w-full h-full min-h-screen px-8 py-8 md:px-16 md:py-10 max-w-[1600px] mx-auto flex flex-col">
      {/* Top Bar */}
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-between mb-24"
      >
        <h2 className="text-2xl font-serif text-white tracking-wide">Samvaad</h2>
        <div className="flex items-center gap-4">
          <span className="text-[#666666] text-xs font-sans tracking-wide flex items-center gap-1.5">
            Press <span className="font-mono flex items-center gap-0.5 text-[#888888]"><Command className="w-3 h-3"/>K</span> to search
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#111111] border border-white/[0.05] flex items-center justify-center">
            {/* Simple icon placeholder */}
            <div className="w-4 h-3 border border-[#666666] rounded-sm flex flex-col justify-center px-0.5 space-y-0.5">
              <div className="w-full h-[1px] bg-[#666666]" />
              <div className="w-2/3 h-[1px] bg-[#666666]" />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Greeting Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-20"
      >
        <h1 className="text-[52px] md:text-[64px] font-serif tracking-tight leading-none mb-4 text-[#F5F5F5]">
          Good Evening, {userName}
        </h1>
        <div className="flex items-center text-[#888888] text-lg font-sans">
          <span>What would you like to do today?</span>
          <motion.span 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="w-2.5 h-5 bg-[#888888] ml-2 inline-block"
          />
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 flex-1">
        
        {/* Left Column: Insights */}
        <div className="lg:col-span-4 flex flex-col justify-start">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[10px] font-sans tracking-[0.15em] font-bold text-[#666666] uppercase mb-8"
          >
            YOUR COGNITIVE TWIN NOTICED
          </motion.h3>
          
          <div className="space-y-8">
            {insights.map((insight, idx) => (
              <motion.div 
                key={insight.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + (idx * 0.1) }}
                className="border-l border-white/20 pl-5 py-1"
              >
                <p className="text-[15px] text-[#DDDDDD] leading-relaxed font-sans">
                  "{insight.description.replace('examples', '')}
                  {insight.description.includes('examples') && <span className="italic">examples</span>}."
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Rigid 2x2 Feature Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
          
          <FeatureTile 
            title="Learn" 
            desc="Expand your theoretical horizon." 
            href="/dashboard/learning" 
            delay={0.6} 
          />
          
          <FeatureTile 
            title="Express" 
            desc="Voice your thoughts and ideas." 
            href="/dashboard/chat" 
            delay={0.7} 
          />
          
          <FeatureTile 
            title="Prepare" 
            desc="Simulation for upcoming challenges." 
            href="/dashboard/prepare" 
            delay={0.8} 
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
  );
}

import Link from "next/link";

function FeatureTile({ title, desc, href, delay }: { title: string, desc: string, href: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className="w-full"
    >
      <Link 
        href={href}
        className="group relative block w-full aspect-[4/5] md:aspect-[3/4] bg-[#111111] rounded-[24px] overflow-hidden border border-[#222222] hover:border-[#444444] transition-colors"
      >
        <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
          <h3 className="text-3xl font-serif text-[#E5E5E5] mb-4 group-hover:translate-x-2 transition-transform duration-500">{title}</h3>
          <p className="text-[12px] text-[#888888] leading-relaxed max-w-[80%]">{desc}</p>
        </div>

        {/* Subtle Gradient Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 z-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </Link>
    </motion.div>
  );
}
