'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Server,
  Zap,
  DollarSign,
  TrendingDown,
  BrainCircuit,
  Activity,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface AIUsageStats {
  provider: string;
  requests: number;
  tokens: number;
  avgLatency: number;
  cost: number;
  failures: number;
}

export default function CostDashboard() {
  const [stats, setStats] = useState<AIUsageStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    fetchUsageData();
  }, []);

  const fetchUsageData = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // In a real app, this would be an aggregation query or edge function
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase as any)
        .from('ai_usage_logs')
        .select('*')
        .eq('user_id', user.id);

      if (data) {
        // Aggregate data
        const aggregated: Record<string, AIUsageStats> = {};
        let totalAzureTokens = 0;

        data.forEach((log: any) => {
          if (!aggregated[log.provider]) {
            aggregated[log.provider] = {
              provider: log.provider,
              requests: 0,
              tokens: 0,
              avgLatency: 0,
              cost: 0,
              failures: 0,
            };
          }

          aggregated[log.provider].requests += log.requests;
          aggregated[log.provider].tokens += log.total_tokens;
          aggregated[log.provider].cost += Number(log.estimated_cost);
          aggregated[log.provider].failures += log.failures;
          // Simplified rolling average
          aggregated[log.provider].avgLatency = 
            (aggregated[log.provider].avgLatency + log.latency_ms) / 2;

          if (log.provider === 'azure') {
            totalAzureTokens += log.total_tokens;
          }
        });

        // Calculate hypothetical savings (if Ollama handled what Azure normally would)
        const ollamaTokens = aggregated['ollama']?.tokens || 0;
        // Assume Azure GPT-4 costs $0.03 per 1K tokens combined
        const savings = (ollamaTokens / 1000) * 0.03;
        setTotalSavings(savings);

        setStats(Object.values(aggregated));
      }
    } catch (error) {
      console.error('Failed to fetch usage data', error);
    } finally {
      setLoading(false);
    }
  };

  const totalCost = stats.reduce((sum, s) => sum + s.cost, 0);

  return (
    <div className="flex-1 overflow-y-auto p-8 relative min-h-screen bg-[#020617] text-slate-200">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-emerald-400" />
            AI Cost Optimization
          </h1>
          <p className="text-slate-400 mt-2">Monitor AI provider routing, latency, and token efficiency.</p>
        </header>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/40 rounded-3xl border border-slate-800/50 p-6 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <TrendingDown className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-slate-400 font-medium">Estimated Savings</h3>
            </div>
            <p className="text-4xl font-bold text-emerald-400">${totalSavings.toFixed(2)}</p>
            <p className="text-sm text-slate-500 mt-2">By utilizing local models (Ollama)</p>
          </div>

          <div className="bg-slate-900/40 rounded-3xl border border-slate-800/50 p-6 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-rose-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-rose-400" />
              </div>
              <h3 className="text-slate-400 font-medium">Monthly Cost</h3>
            </div>
            <p className="text-4xl font-bold text-rose-400">${totalCost.toFixed(2)}</p>
            <p className="text-sm text-slate-500 mt-2">From paid cloud providers</p>
          </div>

          <div className="bg-slate-900/40 rounded-3xl border border-slate-800/50 p-6 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <BrainCircuit className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-slate-400 font-medium">Total Local Tokens</h3>
            </div>
            <p className="text-4xl font-bold text-indigo-400">
              {(stats.find(s => s.provider === 'ollama')?.tokens || 0).toLocaleString()}
            </p>
            <p className="text-sm text-slate-500 mt-2">Processed for free</p>
          </div>
        </div>

        {/* Provider Breakdown */}
        <h2 className="text-xl font-bold text-white mb-4 mt-12 flex items-center gap-2">
          <Server className="w-5 h-5 text-slate-400" />
          Provider Breakdown
        </h2>
        
        <div className="bg-slate-900/40 rounded-3xl border border-slate-800/50 overflow-hidden shadow-xl backdrop-blur-sm">
          {loading ? (
            <div className="p-8 flex justify-center">
              <Activity className="w-6 h-6 text-indigo-500 animate-spin" />
            </div>
          ) : stats.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <p>No AI usage data available yet.</p>
              <p className="text-sm mt-2">Start chatting to generate logs.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/30 border-b border-slate-700/50">
                  <th className="p-4 font-semibold text-slate-300">Provider</th>
                  <th className="p-4 font-semibold text-slate-300">Requests</th>
                  <th className="p-4 font-semibold text-slate-300">Tokens Processed</th>
                  <th className="p-4 font-semibold text-slate-300">Avg Latency</th>
                  <th className="p-4 font-semibold text-slate-300">Cost</th>
                  <th className="p-4 font-semibold text-slate-300">Failures</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat, i) => (
                  <tr key={stat.provider} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${stat.provider === 'ollama' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span className="font-bold text-white capitalize">{stat.provider}</span>
                        {stat.provider === 'ollama' && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">FREE</span>}
                      </div>
                    </td>
                    <td className="p-4 text-slate-300">{stat.requests.toLocaleString()}</td>
                    <td className="p-4 text-slate-300 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-indigo-400" />
                      {stat.tokens.toLocaleString()}
                    </td>
                    <td className="p-4 text-slate-300 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {Math.round(stat.avgLatency)}ms
                    </td>
                    <td className="p-4 font-bold text-slate-300">${stat.cost.toFixed(4)}</td>
                    <td className="p-4">
                      <span className={`flex items-center gap-1 ${stat.failures > 0 ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                        {stat.failures > 0 && <AlertTriangle className="w-4 h-4" />}
                        {stat.failures}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
