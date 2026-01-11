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
  ShieldCheck,
  Award,
  Flame,
  BarChart3,
  Sparkles,
  Clock,
  TrendingDown
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface LearningGoal {
  id: string;
  title: string;
  category: string;
  progress: number;
  target_date: string;
}

interface NeuralInsight {
  id: string;
  title: string;
  description: string;
  priority: string;
  insight_type: string;
  created_at: string;
}

interface CognitiveTwin {
  comprehension_score: number;
  communication_score: number;
  adaptability_score: number;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [goals, setGoals] = useState<LearningGoal[]>([]);
  const [insights, setInsights] = useState<NeuralInsight[]>([]);
  const [cognitiveTwin, setCognitiveTwin] = useState<CognitiveTwin | null>(null);
  const [loading, setLoading] = useState(true);
  const [learningStreak, setLearningStreak] = useState(7);
  const [achievements, setAchievements] = useState([
    { id: 'first_goal', name: 'First Goal Set', icon: '🎯', unlocked: true },
    { id: 'streak_7', name: '7 Day Streak', icon: '🔥', unlocked: true },
    { id: 'master_learner', name: 'Master Learner', icon: '🧠', unlocked: false },
    { id: 'advocate_pro', name: 'Advocate Pro', icon: '💼', unlocked: false },
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch learning goals
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: goalsData } = await (supabase as any)
        .from('learning_goals')
        .select('id, title, category, progress, target_date')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (goalsData) setGoals(goalsData);

      // Fetch neural insights
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: insightsData } = await (supabase as any)
        .from('neural_insights')
        .select('id, title, description, priority, insight_type, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (insightsData) setInsights(insightsData);

      // Fetch cognitive twin
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: twinData } = await (supabase as any)
        .from('cognitive_twins')
        .select('comprehension_score, communication_score, adaptability_score')
        .eq('user_id', user.id)
        .single();

      if (twinData) setCognitiveTwin(twinData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <Link href="/dashboard">
            <NavItem icon={<TrendingUp className="w-5 h-5" />} label="Overview" active={activeTab === 'overview'} />
          </Link>
          <Link href="/dashboard">
            <NavItem icon={<Brain className="w-5 h-5" />} label="Cognitive Twin" active={activeTab === 'twin'} />
          </Link>
          <Link href="/dashboard/learning">
            <NavItem icon={<BookOpen className="w-5 h-5" />} label="Learning Path" active={activeTab === 'learning'} />
          </Link>
          <Link href="/dashboard/chat">
            <NavItem icon={<MessageSquare className="w-5 h-5" />} label="Advocacy Chat" active={activeTab === 'advocacy'} />
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800/50">
          <Link href="/dashboard/profile">
            <NavItem icon={<Settings className="w-5 h-5" />} label="Settings" />
          </Link>
          <NavItem 
            icon={<LogOut className="w-5 h-5" />} 
            label="Logout"
            onClick={async () => {
              const supabase = createClient();
              await supabase.auth.signOut();
              window.location.href = '/';
            }}
          />
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
              <p className="text-slate-500">Your cognitive twin is synchronized with {insights.length} new patterns.</p>
            </header>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <QuickStatCard 
                icon={<Flame className="w-5 h-5 text-orange-400" />}
                label="Learning Streak"
                value={`${learningStreak} days`}
                color="orange"
                trend="up"
              />
              <QuickStatCard 
                icon={<Award className="w-5 h-5 text-yellow-400" />}
                label="Achievements"
                value={`${achievements.filter(a => a.unlocked).length}/${achievements.length}`}
                color="yellow"
              />
              <QuickStatCard 
                icon={<Target className="w-5 h-5 text-rose-400" />}
                label="Active Goals"
                value={goals.length.toString()}
                color="rose"
              />
              <QuickStatCard 
                icon={<Sparkles className="w-5 h-5 text-purple-400" />}
                label="Insights"
                value={insights.length.toString()}
                color="purple"
              />
            </div>

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
                    <StatBox 
                      label="Comprehension" 
                      value={cognitiveTwin ? `${Math.round(cognitiveTwin.comprehension_score || 0)}%` : "94%"} 
                      color="text-indigo-400" 
                    />
                    <StatBox 
                      label="Communication" 
                      value={cognitiveTwin ? `${Math.round(cognitiveTwin.communication_score || 0)}%` : "88%"} 
                      color="text-purple-400" 
                    />
                    <StatBox 
                      label="Adaptability" 
                      value={cognitiveTwin ? `${Math.round(cognitiveTwin.adaptability_score || 0)}%` : "91%"} 
                      color="text-cyan-400" 
                    />
                    <StatBox label="Neural Ready" value="Yes" color="text-emerald-400" />
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-800/50">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    Recent Neural Insights
                  </h3>
                  <div className="space-y-3">
                    {insights.length > 0 ? (
                      insights.slice(0, 2).map((insight) => (
                        <InsightItem 
                          key={insight.id}
                          icon={<Zap className="w-4 h-4 text-amber-500" />}
                          text={insight.description}
                        />
                      ))
                    ) : (
                      <>
                        <InsightItem 
                          icon={<Zap className="w-4 h-4 text-amber-500" />}
                          text="Visual learning efficiency increased by 15% in technical subjects."
                        />
                        <InsightItem 
                          icon={<ShieldCheck className="w-4 h-4 text-emerald-500" />}
                          text="Communication style adjusted to 'Professional-Empathetic' for upcoming salary negotiation."
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Learning Progress Sidebar */}
              <div className="space-y-8">
                {/* Learning Streak Card */}
                <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-3xl border border-orange-500/20 p-6 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-400" />
                      <h3 className="font-bold text-white">Learning Streak</h3>
                    </div>
                    <span className="text-2xl font-bold text-orange-400">{learningStreak}</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">Keep your streak alive! Learn something new today.</p>
                  <div className="flex gap-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div 
                        key={i}
                        className={`flex-1 h-2 rounded-full ${i < learningStreak ? 'bg-orange-500' : 'bg-slate-700'}`}
                      />
                    ))}
                  </div>
                  {learningStreak >= 7 && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-orange-400">
                      <Award className="w-4 h-4" />
                      <span>🔥 7-Day Streak Achievement Unlocked!</span>
                    </div>
                  )}
                </div>

                {/* Achievements Card */}
                <div className="bg-slate-900/40 rounded-3xl border border-slate-800/50 p-6 shadow-xl backdrop-blur-sm">
                  <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    Achievements
                  </h2>
                  <div className="space-y-3">
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                          achievement.unlocked 
                            ? 'bg-yellow-500/10 border-yellow-500/30' 
                            : 'bg-slate-800/50 border-slate-700/50 opacity-50'
                        }`}
                      >
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${achievement.unlocked ? 'text-white' : 'text-slate-400'}`}>
                            {achievement.name}
                          </p>
                          {achievement.unlocked && (
                            <p className="text-xs text-yellow-400">Unlocked!</p>
                          )}
                        </div>
                        {achievement.unlocked && (
                          <Award className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                    ))}
                  </div>
                  <Link href="/dashboard/learning">
                    <button className="w-full mt-6 py-3 text-sm font-bold text-indigo-400 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/20 transition-colors border border-indigo-500/20">
                      View All Achievements
                    </button>
                  </Link>
                </div>

                {/* Learning Goals Card */}
                <div className="bg-slate-900/40 rounded-3xl border border-slate-800/50 p-6 shadow-xl backdrop-blur-sm">
                  <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-rose-500" />
                    Learning Goals
                  </h2>
                  <div className="space-y-6">
                    {goals.length > 0 ? (
                      goals.slice(0, 3).map((goal) => (
                        <ProgressCircle 
                          key={goal.id}
                          label={goal.title} 
                          progress={goal.progress || 0} 
                          color="bg-indigo-600" 
                        />
                      ))
                    ) : (
                      <>
                        <ProgressCircle label="Public Speaking" progress={75} color="bg-indigo-600" />
                        <ProgressCircle label="Financial Literacy" progress={42} color="bg-emerald-500" />
                        <ProgressCircle label="Conflict Resolution" progress={90} color="bg-amber-500" />
                      </>
                    )}
                  </div>
                  <Link href="/dashboard/learning">
                    <button className="w-full mt-6 py-3 text-sm font-bold text-indigo-400 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/20 transition-colors border border-indigo-500/20">
                      View All Goals
                    </button>
                  </Link>
                </div>

                {/* Neural Tip Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/20">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Neural Tip
                  </h3>
                  <p className="text-indigo-200 text-sm leading-relaxed mb-4">
                    Your twin noticed you learn best between 8 AM and 10 AM. Schedule your complex tasks then!
                  </p>
                  <button className="text-xs font-bold underline hover:text-white transition-colors">
                    Adjust Schedule
                  </button>
                </div>
              </div>
            </div>

            {/* Activity Feed Section */}
            <div className="mt-8 bg-slate-900/40 rounded-3xl border border-slate-800/50 p-8 shadow-xl backdrop-blur-sm">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                Recent Activity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ActivityCard 
                  icon={<BookOpen className="w-5 h-5 text-emerald-400" />}
                  title="Learning Session"
                  description="Completed 'Introduction to Neural Networks'"
                  time="2 hours ago"
                  color="emerald"
                />
                <ActivityCard 
                  icon={<Brain className="w-5 h-5 text-purple-400" />}
                  title="Neural Insight"
                  description="New pattern detected: Visual learning efficiency increased"
                  time="5 hours ago"
                  color="purple"
                />
                <ActivityCard 
                  icon={<MessageSquare className="w-5 h-5 text-indigo-400" />}
                  title="Advocacy Chat"
                  description="Completed salary negotiation template"
                  time="1 day ago"
                  color="indigo"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  const Component = onClick ? 'button' : 'div';
  return (
    <Component 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
        active 
          ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
          : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-200'
      }`}
    >
      {icon}
      {label}
    </Component>
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

function QuickStatCard({ icon, label, value, color, trend }: { 
  icon: React.ReactNode, 
  label: string, 
  value: string, 
  color: 'orange' | 'yellow' | 'rose' | 'purple',
  trend?: 'up' | 'down'
}) {
  const colorClasses = {
    orange: 'bg-orange-500/20 text-orange-400',
    yellow: 'bg-yellow-500/20 text-yellow-400',
    rose: 'bg-rose-500/20 text-rose-400',
    purple: 'bg-purple-500/20 text-purple-400',
  };
  
  return (
    <div className="bg-slate-900/40 rounded-2xl border border-slate-800/50 p-4 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-10 h-10 ${colorClasses[color].split(' ')[0]} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>12%</span>
          </div>
        )}
      </div>
      <p className="text-xs font-medium text-slate-400 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${colorClasses[color].split(' ')[1]}`}>{value}</p>
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

function ActivityCard({ icon, title, description, time, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  color: 'emerald' | 'purple' | 'indigo';
}) {
  const colorClasses = {
    emerald: 'bg-emerald-500/20',
    purple: 'bg-purple-500/20',
    indigo: 'bg-indigo-500/20',
  };
  
  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4 backdrop-blur-sm hover:bg-slate-800/70 transition-colors">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 ${colorClasses[color]} rounded-xl flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
          <p className="text-xs text-slate-400 mb-2 overflow-hidden text-ellipsis line-clamp-2">{description}</p>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
