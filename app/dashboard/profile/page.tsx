'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User, Brain, MessageSquare, Save, Loader2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import type { Database } from '@/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    learning_style: 'Visual',
    communication_preference: 'Professional',
  });

  const supabase = createClient();

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data) {
          const profileData = data as Profile;
          setProfile({
            full_name: profileData.full_name || '',
            learning_style: profileData.learning_style || 'Visual',
            communication_preference: profileData.communication_preference || 'Professional',
          });
        }
      }
      setLoading(false);
    }
    getProfile();
  }, []);

  const handleUpdate = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.full_name,
          learning_style: profile.learning_style,
          communication_preference: profile.communication_preference,
        });
      
      if (error) alert(error.message);
      else alert('Profile updated!');
    }
    setSaving(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-8 font-medium">
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Your Profile</h1>
              <p className="text-slate-500">Manage your cognitive twin's base settings</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
              <input 
                type="text" 
                value={profile.full_name}
                onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-2xl text-sm transition-all outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-600" /> Learning Style
                </label>
                <select 
                  value={profile.learning_style}
                  onChange={(e) => setProfile({...profile, learning_style: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-2xl text-sm transition-all outline-none appearance-none"
                >
                  <option>Visual</option>
                  <option>Auditory</option>
                  <option>Kinesthetic</option>
                  <option>Reading/Writing</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" /> Communication
                </label>
                <select 
                  value={profile.communication_preference}
                  onChange={(e) => setProfile({...profile, communication_preference: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-2xl text-sm transition-all outline-none appearance-none"
                >
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Empathetic</option>
                  <option>Direct</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleUpdate}
              disabled={saving}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Save Changes</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
