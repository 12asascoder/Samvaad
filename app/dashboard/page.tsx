'use client';

import { 
  Brain, 
  TrendingUp, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  ChevronRight,
  Target,
  Zap,
  ShieldCheck
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export const dynamic = 'force-dynamic';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800/50 hidden lg:flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Brain className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Samvaad</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavItem icon={<TrendingUp className="w-5 h-5" />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <NavItem icon={<Brain className="w-5 h-5" />} label="Cognitive Twin" active={activeTab === 'twin'} onClick={() => setActiveTab('twin')} />
          <NavItem icon={<BookOpen className="w-5 h-5" />} label="Learning Path" active={activeTab === 'learning'} onClick={() => setActiveTab('learning')} />
          <Link href="/dashboard/chat">
            <NavItem icon={<MessageSquare className="w-5 h-5" />} label="Advocacy Chat" active={activeTab === 'advocacy'} />
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800/50">
          <Link href="/dashboard/profile">
            <NavItem icon={<Settings className="w-5 h-5" />} label="Settings" />
          </Link>
          <button 
            onClick={async () => {
              const supabase = createClient();
              await supabase.auth.signOut();
              window.location.href = '/';
            }}
            className="w-full"
          >
            <NavItem icon={<LogOut className="w-5 h-5" />} label="Logout" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search neural insights..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-800/50 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 rounded-xl text-sm transition-all text-slate-200 outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-indigo-400 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#020617]" />
            </button>
            <div className="h-8 w-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
              JD
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <header className="mb-8">
              <h1 className="text-2xl font-bold text-white">Neural Overview</h1>
              <p className="text-slate-500">Your cognitive twin is synchronized with 12 new patterns.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cognitive Twin Visualization Card */}
              <div className="lg:col-span-2 bg-slate-900/40 rounded-3xl border border-slate-800/50 p-8 shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Brain className="w-5 h-5 text-indigo-400" />
                    Neural Core Status
                  </h2>
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-full border border-indigo-500/20">
                    Quantum Sync Active
                  </span>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-12">
                  {/* Abstract Visualization */}
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <div className="absolute inset-0 bg-indigo-500/10 rounded-full animate-pulse opacity-20" />
                    <div className="absolute inset-4 bg-purple-500/10 rounded-full animate-pulse opacity-40" />
                    <div className="absolute inset-8 bg-cyan-500/10 rounded-full animate-pulse opacity-60" />
                    <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl rotate-45 flex items-center justify-center shadow-2xl shadow-indigo-500/20">
                      <Brain className="w-12 h-12 text-white -rotate-45" />
                    </div>
                    {/* Orbiting nodes */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-slate-900 shadow-lg shadow-cyan-500/50" />
                    <div className="absolute bottom-4 right-0 w-3 h-3 bg-purple-400 rounded-full border-2 border-slate-900 shadow-lg shadow-purple-500/50" />
                    <div className="absolute bottom-8 left-0 w-5 h-5 bg-indigo-400 rounded-full border-2 border-slate-900 shadow-lg shadow-indigo-500/50" />
                  </div>

                  <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                    <StatBox label="Comprehension" value="94%" color="text-indigo-400" />
                    <StatBox label="Communication" value="88%" color="text-purple-400" />
                    <StatBox label="Adaptability" value="91%" color="text-cyan-400" />
                    <StatBox label="Neural Ready" value="Yes" color="text-emerald-400" />
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-800/50">
                  <h3 className="text-sm font-bold text-white mb-4">Recent Neural Insights</h3>
                  <div className="space-y-3">
                    <InsightItem 
                      icon={<Zap className="w-4 h-4 text-amber-500" />}
                      text="Visual learning efficiency increased by 15% in technical subjects."
                    />
                    <InsightItem 
                      icon={<ShieldCheck className="w-4 h-4 text-emerald-500" />}
                      text="Communication style adjusted to 'Professional-Empathetic' for upcoming salary negotiation."
                    />
                  </div>
                </div>
              </div>

              {/* Learning Progress Sidebar */}
              <div className="space-y-8">
                <div className="bg-slate-900/40 rounded-3xl border border-slate-800/50 p-6 shadow-xl backdrop-blur-sm">
                  <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-rose-500" />
                    Learning Goals
                  </h2>
                  <div className="space-y-6">
                    <ProgressCircle label="Public Speaking" progress={75} color="bg-indigo-600" />
                    <ProgressCircle label="Financial Literacy" progress={42} color="bg-emerald-500" />
                    <ProgressCircle label="Conflict Resolution" progress={90} color="bg-amber-500" />
                  </div>
                  <button className="w-full mt-6 py-3 text-sm font-bold text-indigo-400 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/20 transition-colors border border-indigo-500/20">
                    View All Goals
                  </button>
                </div>

                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/20">
                  <h3 className="font-bold mb-2">Neural Tip</h3>
                  <p className="text-indigo-200 text-sm leading-relaxed mb-4">
                    Your twin noticed you learn best between 8 AM and 10 AM. Schedule your complex tasks then!
                  </p>
                  <button className="text-xs font-bold underline hover:text-white transition-colors">
                    Adjust Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
        active 
          ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
          : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-200'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatBox({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
      <p className="text-xs font-medium text-slate-400 mb-1">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function InsightItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm">
      <div className="mt-0.5">{icon}</div>
      <p className="text-sm text-slate-300 leading-snug">{text}</p>
    </div>
  );
}

function ProgressCircle({ label, progress, color }: { label: string, progress: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-300">{label}</span>
        <span className="text-slate-500 font-bold">{progress}%</span>
      </div>
      <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-1000`} 
          style={{ width: `${progress}%` }} 
        />
      </div>
    </div>
  );
}
