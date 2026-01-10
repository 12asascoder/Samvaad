import Link from "next/link";
import { ArrowRight, Brain, MessageSquare, Shield, Zap, Globe, Users, CheckCircle, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Neural Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#020617]/80 backdrop-blur-xl z-50 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Brain className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Samvaad</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How it Works</a>
            <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors">Log in</Link>
            <Link href="/login" className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-sm font-medium mb-8 animate-fade-in backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            Neural Intelligence Reimagined
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.1]">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">Cognitive Twin</span> in the Digital Cosmos
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Samvaad bridges the gap between human intent and digital action through a secure, personalized neural twin that learns your voice and advocates for your future.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 group">
              Initialize Twin <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto bg-slate-900/50 text-slate-300 border border-slate-800 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-slate-800 transition-all backdrop-blur-md">
              Explore Neural Path
            </button>
          </div>
          
          {/* Hero Image/Graphic Placeholder */}
          <div className="mt-20 relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10" />
            <div className="bg-slate-900/40 rounded-3xl border border-slate-800/50 p-4 shadow-2xl backdrop-blur-sm">
              <div className="bg-[#020617]/60 rounded-2xl border border-slate-800/50 aspect-[16/9] flex items-center justify-center overflow-hidden relative">
                {/* Neural Network Visual Placeholder */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px]" />
                </div>
                <div className="grid grid-cols-3 gap-8 p-12 w-full h-full relative z-20">
                  <div className="col-span-2 bg-slate-900/50 rounded-xl border border-slate-800/50 p-6 flex flex-col gap-4 backdrop-blur-md">
                    <div className="h-8 w-1/3 bg-indigo-500/20 rounded-md animate-pulse" />
                    <div className="h-4 w-full bg-slate-800 rounded-md" />
                    <div className="h-4 w-5/6 bg-slate-800 rounded-md" />
                    <div className="mt-auto h-32 w-full bg-indigo-900/20 rounded-xl border border-indigo-500/20 flex items-center justify-center">
                      <Brain className="w-12 h-12 text-indigo-400/50" />
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl border border-slate-800/50 p-6 flex flex-col gap-4 backdrop-blur-md">
                    <div className="h-8 w-1/2 bg-purple-500/20 rounded-md" />
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-3 w-full bg-slate-800 rounded-md" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#030712] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Neural Capabilities</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Harness the power of a digital twin that evolves with you, navigating the complexities of the modern world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Brain className="w-6 h-6 text-indigo-400" />}
              title="Cognitive Learning"
              description="Analyzes your neural patterns and comprehension style to adapt knowledge delivery in real-time."
            />
            <FeatureCard 
              icon={<MessageSquare className="w-6 h-6 text-purple-400" />}
              title="Cosmos Advocacy"
              description="A culturally sensitive AI advocate that negotiates and communicates across digital frontiers."
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6 text-cyan-400" />}
              title="Quantum Privacy"
              description="Your cognitive data is encrypted and owned by you. Built on a foundation of absolute transparency."
            />
            <FeatureCard 
              icon={<Globe className="w-6 h-6 text-blue-400" />}
              title="Multilingual Support"
              description="Overcome language barriers with an AI that understands and communicates in multiple languages fluently."
            />
            <FeatureCard 
              icon={<Users className="w-6 h-6 text-purple-400" />}
              title="Inclusive Design"
              description="Empowering individuals with speech or hearing impairments and social anxiety with a confident digital voice."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-rose-400" />}
              title="Azure Powered"
              description="Leveraging advanced reasoning models and speech technologies from Microsoft Azure AI."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border border-indigo-500/20 backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-400 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400 rounded-full blur-3xl" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
            Ready to amplify your voice?
          </h2>
          <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto relative z-10">
            Join thousands of users who are transforming how they learn and communicate with their own cognitive twin.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20">
              Get Started for Free
            </button>
            <button className="bg-slate-900/50 text-slate-300 border border-slate-700 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-slate-800 transition-all backdrop-blur-sm">
              Contact Sales
            </button>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm font-medium relative z-10">
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> No credit card required</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> 14-day free trial</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Secure & Private</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded flex items-center justify-center">
              <Brain className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Samvaad</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Cookie Policy</a>
          </div>
          <p className="text-sm text-slate-600">
            © 2024 Samvaad AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800/50 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10 transition-all group backdrop-blur-sm">
      <div className="w-12 h-12 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
