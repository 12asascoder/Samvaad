'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { BrainCircuit, Target, CheckCircle2, Calendar, Activity, ArrowRight, Sunrise } from 'lucide-react';
import Link from 'next/link';

export default function MorningBriefPage() {
  const [userName, setUserName] = useState<string>('');
  const [streak, setStreak] = useState(0);
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBriefData() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
          setUserName(profile?.full_name || 'Friend');

          const { data: goalsData } = await supabase
            .from('learning_goals')
            .select('*')
            .eq('user_id', user.id)
            .eq('status', 'active')
            .limit(3);
          
          if (goalsData) setGoals(goalsData);

          // Simulated streak fetch as we just added the table
          const { data: streakData } = await supabase
            .from('user_streaks')
            .select('current_streak')
            .eq('user_id', user.id)
            .single();
            
          setStreak(streakData?.current_streak || 1);
        }
      } catch (error) {
        console.error('Error loading morning brief:', error);
      } finally {
        setLoading(false);
      }
    }

    loadBriefData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-indigo-600">
          <BrainCircuit className="h-12 w-12 animate-pulse" />
          <p className="text-lg font-medium">Preparing your morning brief...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sunrise className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Good Morning, {userName.split(' ')[0]}
          </h1>
          <p className="text-lg text-indigo-100">
            Your Cognitive Twin has analyzed your recent patterns. You learn best in the morning. Let's make today count.
          </p>
          
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-medium">
              <Activity className="w-5 h-5 text-green-300" />
              <span>{streak} Day Streak</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-medium">
              <BrainCircuit className="w-5 h-5 text-blue-300" />
              <span>Ready to Learn</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Active Goals */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-900">
              <Target className="w-6 h-6 text-indigo-600" />
              Today's Focus
            </h2>
            <Link href="/dashboard/learning" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid gap-4">
            {goals.length > 0 ? goals.map((goal) => (
              <div key={goal.id} className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 rounded-l-2xl"></div>
                <h3 className="font-medium text-lg text-gray-900">{goal.title}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{goal.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: \`\${goal.progress}%\` }} />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{goal.progress}%</span>
                </div>
              </div>
            )) : (
              <div className="rounded-2xl bg-white p-8 text-center shadow-sm border border-gray-100">
                <p className="text-gray-500 mb-4">You have no active goals.</p>
                <Link href="/dashboard/learning" className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
                  Set a New Goal
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Daily Reflection & Quick Actions */}
        <section className="space-y-6">
          <div className="rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 p-6 border border-orange-100">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-amber-900 mb-4">
              <Calendar className="w-5 h-5" />
              Daily Reflection
            </h2>
            <p className="text-amber-800 mb-6">How are you feeling about your communication skills today?</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <button key={score} className="flex-1 py-3 rounded-xl bg-white text-amber-600 font-medium hover:bg-amber-100 transition-colors shadow-sm border border-amber-200">
                  {score}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Recommended Actions</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/dashboard/chat" className="group flex items-center justify-between rounded-xl p-3 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                      <BrainCircuit className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Start Learning Session</p>
                      <p className="text-xs text-gray-500">Continue Machine Learning Fundamentals</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transform group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard/chat?mode=advocacy" className="group flex items-center justify-between rounded-xl p-3 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Rehearse Conversation</p>
                      <p className="text-xs text-gray-500">Practice your salary negotiation</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transform group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
