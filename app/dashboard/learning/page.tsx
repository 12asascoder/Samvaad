'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Clock, 
  Zap, 
  BookOpen,
  ChevronLeft,
  Plus,
  CheckCircle,
  Circle,
  Loader2,
  BarChart3,
  Calendar,
  Award
} from 'lucide-react';
import Link from 'next/link';

interface LearningGoal {
  id: string;
  title: string;
  description: string | null;
  progress: number;
  status: string;
  category: string | null;
  target_date: string | null;
}

interface LearningSession {
  id: string;
  topic: string;
  duration_minutes: number;
  comprehension_level: number | null;
  started_at: string;
}

interface CognitiveTwin {
  comprehension_score: number;
  communication_score: number;
  adaptability_score: number;
  learning_velocity: number;
  optimal_learning_hours: { start: number; end: number };
}

export default function LearningDashboard() {
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState<LearningGoal[]>([]);
  const [sessions, setSessions] = useState<LearningSession[]>([]);
  const [cognitiveTwin, setCognitiveTwin] = useState<CognitiveTwin | null>(null);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', description: '', category: 'general' });

  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch goals
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: goalsData } = await (supabase as any)
      .from('learning_goals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (goalsData) setGoals(goalsData);

    // Fetch recent sessions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: sessionsData } = await (supabase as any)
      .from('learning_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('started_at', { ascending: false })
      .limit(10);

    if (sessionsData) setSessions(sessionsData);

    // Fetch cognitive twin data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: twinData } = await (supabase as any)
      .from('cognitive_twins')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (twinData) {
      setCognitiveTwin({
        comprehension_score: Number(twinData.comprehension_score) || 75,
        communication_score: Number(twinData.communication_score) || 75,
        adaptability_score: Number(twinData.adaptability_score) || 80,
        learning_velocity: Number(twinData.learning_velocity) || 1.0,
        optimal_learning_hours: twinData.optimal_learning_hours || { start: 9, end: 11 }
      });
    }

    setLoading(false);
  };

  const addGoal = async () => {
    if (!newGoal.title.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('learning_goals')
      .insert({
        user_id: user.id,
        title: newGoal.title,
        description: newGoal.description,
        category: newGoal.category,
        progress: 0,
        status: 'active'
      });

    if (!error) {
      setNewGoal({ title: '', description: '', category: 'general' });
      setShowAddGoal(false);
      fetchData();
    }
  };

  const updateGoalProgress = async (goalId: string, progress: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from('learning_goals')
      .update({ 
        progress, 
        status: progress >= 100 ? 'completed' : 'active' 
      })
      .eq('id', goalId);

    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  const totalLearningTime = sessions.reduce((acc, s) => acc + s.duration_minutes, 0);
  const avgComprehension = sessions.length > 0 
    ? sessions.reduce((acc, s) => acc + (s.comprehension_level || 0), 0) / sessions.length 
    : 0;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      {/* Header */}
      <header className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 hover:bg-slate-900 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Learning Analytics</h1>
                <p className="text-xs text-slate-500">Track your cognitive growth</p>
              </div>
            </div>
          </div>
          <Link 
            href="/dashboard/chat"
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-500 transition-colors"
          >
            Start Learning Session
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={<Clock className="w-5 h-5 text-indigo-400" />}
            label="Total Learning Time"
            value={`${Math.floor(totalLearningTime / 60)}h ${totalLearningTime % 60}m`}
            color="indigo"
          />
          <StatCard 
            icon={<Target className="w-5 h-5 text-emerald-400" />}
            label="Goals Completed"
            value={`${goals.filter(g => g.status === 'completed').length}/${goals.length}`}
            color="emerald"
          />
          <StatCard 
            icon={<TrendingUp className="w-5 h-5 text-purple-400" />}
            label="Avg Comprehension"
            value={`${Math.round(avgComprehension)}%`}
            color="purple"
          />
          <StatCard 
            icon={<Zap className="w-5 h-5 text-amber-400" />}
            label="Learning Velocity"
            value={`${cognitiveTwin?.learning_velocity.toFixed(1)}x`}
            color="amber"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Goals */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/40 rounded-3xl border border-slate-800/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-400" />
                  Learning Goals
                </h2>
                <button
                  onClick={() => setShowAddGoal(true)}
                  className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium hover:bg-emerald-500/30 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Goal
                </button>
              </div>

              {showAddGoal && (
                <div className="mb-6 p-4 bg-slate-800/50 rounded-2xl border border-slate-700 space-y-4">
                  <input
                    type="text"
                    placeholder="Goal title..."
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 outline-none focus:border-emerald-500"
                  />
                  <textarea
                    placeholder="Description (optional)..."
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 outline-none focus:border-emerald-500 resize-none"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <select
                      value={newGoal.category}
                      onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                      className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none"
                    >
                      <option value="general">General</option>
                      <option value="technical">Technical</option>
                      <option value="communication">Communication</option>
                      <option value="creative">Creative</option>
                      <option value="professional">Professional</option>
                    </select>
                    <button
                      onClick={addGoal}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-500"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowAddGoal(false)}
                      className="px-6 py-3 bg-slate-700 text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {goals.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No learning goals yet. Add your first goal!</p>
                  </div>
                ) : (
                  goals.map((goal) => (
                    <div 
                      key={goal.id}
                      className="p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => updateGoalProgress(goal.id, goal.progress >= 100 ? 0 : 100)}
                          className="mt-1"
                        >
                          {goal.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-600" />
                          )}
                        </button>
                        <div className="flex-1">
                          <h3 className={`font-medium ${goal.status === 'completed' ? 'text-slate-500 line-through' : 'text-white'}`}>
                            {goal.title}
                          </h3>
                          {goal.description && (
                            <p className="text-xs text-slate-500 mt-1">{goal.description}</p>
                          )}
                          <div className="mt-3 flex items-center gap-4">
                            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
                                style={{ width: `${goal.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-400 font-medium">{goal.progress}%</span>
                          </div>
                        </div>
                        {goal.category && (
                          <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-lg">
                            {goal.category}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-slate-900/40 rounded-3xl border border-slate-800/50 p-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-indigo-400" />
                Recent Learning Sessions
              </h2>
              
              {sessions.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No learning sessions yet. Start your first session!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div 
                      key={session.id}
                      className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50"
                    >
                      <div>
                        <h4 className="font-medium text-white">{session.topic}</h4>
                        <p className="text-xs text-slate-500">
                          {new Date(session.started_at).toLocaleDateString()} • {session.duration_minutes} min
                        </p>
                      </div>
                      {session.comprehension_level && (
                        <div className="text-right">
                          <p className="text-sm font-bold text-emerald-400">{session.comprehension_level}%</p>
                          <p className="text-xs text-slate-500">Comprehension</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Cognitive Profile Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-900/40 rounded-3xl border border-slate-800/50 p-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                <Brain className="w-5 h-5 text-purple-400" />
                Cognitive Profile
              </h2>
              
              <div className="space-y-6">
                <ScoreBar label="Comprehension" score={cognitiveTwin?.comprehension_score || 0} color="indigo" />
                <ScoreBar label="Communication" score={cognitiveTwin?.communication_score || 0} color="purple" />
                <ScoreBar label="Adaptability" score={cognitiveTwin?.adaptability_score || 0} color="cyan" />
              </div>

              <div className="mt-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-medium text-indigo-300">Optimal Learning Time</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {cognitiveTwin?.optimal_learning_hours.start}:00 - {cognitiveTwin?.optimal_learning_hours.end}:00
                </p>
                <p className="text-xs text-slate-500 mt-1">Based on your performance patterns</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-6 text-white">
              <Award className="w-8 h-8 mb-4" />
              <h3 className="font-bold text-lg mb-2">Keep Growing!</h3>
              <p className="text-purple-200 text-sm leading-relaxed">
                Your cognitive twin is learning from every interaction. The more you practice, the better it adapts to your unique learning style.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const bgColors: Record<string, string> = {
    indigo: 'bg-indigo-500/10 border-indigo-500/20',
    emerald: 'bg-emerald-500/10 border-emerald-500/20',
    purple: 'bg-purple-500/10 border-purple-500/20',
    amber: 'bg-amber-500/10 border-amber-500/20'
  };

  return (
    <div className={`p-4 rounded-2xl border ${bgColors[color]}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-slate-400">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  const barColors: Record<string, string> = {
    indigo: 'from-indigo-500 to-indigo-400',
    purple: 'from-purple-500 to-purple-400',
    cyan: 'from-cyan-500 to-cyan-400'
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-400">{label}</span>
        <span className="font-bold text-white">{score}%</span>
      </div>
      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${barColors[color]} transition-all duration-1000`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
