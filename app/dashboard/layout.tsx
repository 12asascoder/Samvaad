'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Brain, 
  TrendingUp, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  LogOut,
  Sunrise
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans">
      {/* Premium Sidebar */}
      <aside className="w-64 bg-slate-950/80 backdrop-blur-2xl border-r border-slate-800/50 hidden lg:flex flex-col relative z-20">
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="p-6 flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)] border border-white/10">
            <Brain className="text-white w-6 h-6 animate-pulse" />
          </div>
          <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Samvaad
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 relative z-10">
          <NavItem href="/dashboard/morning-brief" icon={<Sunrise className="w-5 h-5" />} label="Morning Brief" active={pathname === '/dashboard/morning-brief'} />
          <NavItem href="/dashboard" icon={<TrendingUp className="w-5 h-5" />} label="Neural Overview" active={pathname === '/dashboard'} exact />
          <NavItem href="/dashboard/learning" icon={<BookOpen className="w-5 h-5" />} label="Learning Path" active={pathname?.startsWith('/dashboard/learning')} />
          <NavItem href="/dashboard/chat" icon={<MessageSquare className="w-5 h-5" />} label="Cognitive Chat" active={pathname?.startsWith('/dashboard/chat')} />
        </nav>

        <div className="p-4 border-t border-slate-800/50 relative z-10 bg-slate-950/50 mt-auto">
          <NavItem href="/dashboard/profile" icon={<Settings className="w-5 h-5" />} label="Settings" active={pathname === '/dashboard/profile'} />
          <button 
            onClick={async () => {
              const supabase = createClient();
              await supabase.auth.signOut();
              window.location.href = '/';
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative bg-[#020617]">
        {children}
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, active, exact = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean, exact?: boolean }) {
  return (
    <Link 
      href={href}
      className={`group w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/5 text-indigo-300 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.05)]' 
          : 'text-slate-500 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
      }`}
    >
      <span className={`transition-transform duration-300 ${active ? 'scale-110 text-indigo-400' : 'group-hover:scale-110 group-hover:text-slate-300'}`}>
        {icon}
      </span>
      {label}
      {active && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
      )}
    </Link>
  );
}
