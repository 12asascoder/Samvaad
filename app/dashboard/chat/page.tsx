'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Brain, 
  Send, 
  Mic, 
  MicOff,
  Volume2,
  VolumeX,
  FileText,
  Settings2,
  User, 
  Bot, 
  Sparkles,
  ChevronLeft,
  ShieldCheck,
  MessageSquare,
  Zap,
  Loader2,
  Copy,
  Check,
  Globe
} from "lucide-react";
import Link from 'next/link';
import AccessibilityPanel from '@/components/ui/AccessibilityPanel';
import AdvocacyTemplateSelector from '@/components/ui/AdvocacyTemplateSelector';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'learning' | 'advocacy' | 'general';
};

interface AccessibilitySettings {
  highContrast: boolean;
  textToSpeech: boolean;
  speechToText: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  fontStyle: 'default' | 'opendyslexic' | 'monospace' | 'serif';
  lineSpacing: 'compact' | 'normal' | 'relaxed' | 'loose';
  speechRate: number;
  voiceType: 'neutral' | 'warm' | 'confident' | 'gentle';
  audioVolume: number;
  screenReader: boolean;
  largeText: boolean;
  colorBlindMode: boolean;
  liveCaptions: boolean;
  visualAlerts: boolean;
  simplifiedLanguage: boolean;
  focusMode: boolean;
}

const DEFAULT_ACCESSIBILITY: AccessibilitySettings = {
  highContrast: false,
  textToSpeech: false,
  speechToText: false,
  reducedMotion: false,
  fontSize: 'medium',
  fontStyle: 'default',
  lineSpacing: 'normal',
  speechRate: 1.0,
  voiceType: 'neutral',
  audioVolume: 1.0,
  screenReader: false,
  largeText: false,
  colorBlindMode: false,
  liveCaptions: false,
  visualAlerts: false,
  simplifiedLanguage: false,
  focusMode: false
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your Cognitive Twin, Samvaad. I've been learning your patterns to help you better. Would you like to:\n\n• **Learn something new** - I'll adapt to your learning style\n• **Get advocacy help** - I'll communicate on your behalf\n\nJust tell me what you need, and I'll be your voice and guide.",
      timestamp: new Date(),
      type: 'general'
    }
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'learning' | 'advocacy'>('learning');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>(DEFAULT_ACCESSIBILITY);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: accessibilitySettings.reducedMotion ? "auto" : "smooth" });
  }, [accessibilitySettings.reducedMotion]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Initialize speech services
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthesisRef.current = window.speechSynthesis;
      
      const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionConstructor) {
        const recognition = new SpeechRecognitionConstructor();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = selectedLanguage;
        recognitionRef.current = recognition;
      }
    }
  }, [selectedLanguage]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          mode,
          context: {}
        })
      });

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || data.error || "I apologize, but I couldn't process that request.",
        timestamp: new Date(),
        type: mode
      };
      
      setMessages(prev => [...prev, aiMessage]);

      // Auto-speak if text-to-speech is enabled
      if (accessibilitySettings.textToSpeech && synthesisRef.current) {
        speakText(aiMessage.content);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
        type: 'general'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (text: string) => {
    if (!synthesisRef.current) return;
    
    synthesisRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage;
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synthesisRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    if (!recognitionRef.current) return;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognitionRef.current.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      if (result.isFinal) {
        setInput(prev => prev + result[0].transcript + ' ');
      }
    };
    
    recognitionRef.current.onerror = () => {
      setIsListening(false);
    };
    
    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
    
    recognitionRef.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTemplateSelect = (template: { id: string; title: string }, values: Record<string, string>) => {
    const filledMessage = `Please help me with a ${template.title.toLowerCase()}. Here are the details:\n\n${
      Object.entries(values).map(([key, value]) => `${key.replace(/_/g, ' ')}: ${value}`).join('\n')
    }`;
    setInput(filledMessage);
    setMode('advocacy');
  };

  const getFontSizeClass = () => {
    switch (accessibilitySettings.fontSize) {
      case 'small': return 'text-xs';
      case 'large': return 'text-base';
      case 'extra-large': return 'text-lg';
      default: return 'text-sm';
    }
  };

  return (
    <div className={`flex flex-col h-screen bg-[#020617] text-slate-200 ${accessibilitySettings.highContrast ? 'contrast-125' : ''}`}>
      {/* Accessibility Panel */}
      <AccessibilityPanel
        settings={accessibilitySettings}
        onSettingsChange={setAccessibilitySettings}
        isOpen={showAccessibility}
        onClose={() => setShowAccessibility(false)}
      />

      {/* Template Selector */}
      <AdvocacyTemplateSelector
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelectTemplate={handleTemplateSelect}
      />

      {/* Chat Header */}
      <header className="h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 hover:bg-slate-900 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Brain className="text-white w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <h2 className="text-sm font-bold text-white">Cognitive Twin</h2>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 bg-cyan-500 rounded-full ${accessibilitySettings.reducedMotion ? '' : 'animate-pulse'} shadow-lg shadow-cyan-500/50`} />
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Neural Link Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-xl border border-slate-800/50">
          <button 
            onClick={() => setMode('learning')}
            className={`px-3 md:px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 md:gap-2 ${
              mode === 'learning' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Learning</span>
          </button>
          <button 
            onClick={() => setMode('advocacy')}
            className={`px-3 md:px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 md:gap-2 ${
              mode === 'advocacy' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Advocacy</span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="appearance-none bg-slate-800/50 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-300 pr-6 cursor-pointer"
            >
              <option value="en-US">🇺🇸 English</option>
              <option value="es-ES">🇪🇸 Español</option>
              <option value="fr-FR">🇫🇷 Français</option>
              <option value="de-DE">🇩🇪 Deutsch</option>
              <option value="hi-IN">🇮🇳 हिन्दी</option>
              <option value="zh-CN">🇨🇳 中文</option>
              <option value="ja-JP">🇯🇵 日本語</option>
              <option value="ar-SA">🇸🇦 العربية</option>
              <option value="pt-BR">🇧🇷 Português</option>
              <option value="ru-RU">🇷🇺 Русский</option>
              <option value="ko-KR">🇰🇷 한국어</option>
              <option value="it-IT">🇮🇹 Italiano</option>
            </select>
            <Globe className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
          
          <button 
            onClick={() => setShowAccessibility(true)}
            className="p-2 text-slate-400 hover:text-indigo-400 transition-colors"
            aria-label="Accessibility settings"
          >
            <Settings2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group`}>
              <div className={`flex gap-3 max-w-[90%] md:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-slate-800' : 'bg-indigo-900/30 border border-indigo-500/20'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-slate-400" /> : <Bot className="w-5 h-5 text-indigo-400" />}
                </div>
                <div className={`space-y-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-4 rounded-2xl ${getFontSizeClass()} leading-relaxed shadow-xl backdrop-blur-md ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-slate-900/80 text-slate-200 border border-slate-800/50 rounded-tl-none'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-[10px] text-slate-400">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {msg.type && msg.type !== 'general' && (
                        <span className="ml-2 font-bold uppercase text-indigo-400">· {msg.type}</span>
                      )}
                    </span>
                    {msg.role === 'assistant' && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        <button
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="p-1 hover:bg-slate-800 rounded transition-colors"
                          aria-label="Copy message"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3 text-slate-500" />
                          )}
                        </button>
                        {accessibilitySettings.textToSpeech && (
                          <button
                            onClick={() => isSpeaking ? stopSpeaking() : speakText(msg.content)}
                            className="p-1 hover:bg-slate-800 rounded transition-colors"
                            aria-label={isSpeaking ? "Stop speaking" : "Read aloud"}
                          >
                            {isSpeaking ? (
                              <VolumeX className="w-3 h-3 text-slate-500" />
                            ) : (
                              <Volume2 className="w-3 h-3 text-slate-500" />
                            )}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-900/30 border border-indigo-500/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/50 rounded-tl-none">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                    <span className="text-sm text-slate-400">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto">
          {/* Quick Actions for Advocacy Mode */}
          {mode === 'advocacy' && (
            <div className="mb-3 flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setShowTemplates(true)}
                className="flex-shrink-0 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" /> Templates
              </button>
              <button
                onClick={() => setInput("Help me negotiate a salary increase")}
                className="flex-shrink-0 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-slate-300 transition-colors"
              >
                Salary Talk
              </button>
              <button
                onClick={() => setInput("I need to request a deadline extension")}
                className="flex-shrink-0 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-slate-300 transition-colors"
              >
                Deadline Extension
              </button>
              <button
                onClick={() => setInput("Help me file a complaint professionally")}
                className="flex-shrink-0 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-slate-300 transition-colors"
              >
                Complaint
              </button>
            </div>
          )}

          <div className="relative flex items-end gap-2 bg-slate-900/50 border border-slate-800/50 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
            {accessibilitySettings.speechToText && (
              <button 
                onClick={isListening ? stopListening : startListening}
                className={`p-2 transition-colors rounded-lg ${
                  isListening 
                    ? 'bg-red-500/20 text-red-400 animate-pulse' 
                    : 'text-slate-400 hover:text-indigo-400 hover:bg-slate-800'
                }`}
                aria-label={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}
            <textarea 
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={mode === 'learning' ? "Ask me to explain something..." : "What should I advocate for?"}
              className={`flex-1 bg-transparent border-none focus:ring-0 ${getFontSizeClass()} py-2 resize-none max-h-32 text-slate-200 placeholder:text-slate-500 outline-none`}
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20"
              aria-label="Send message"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          <div className="mt-3 flex items-center justify-center gap-4 flex-wrap">
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Powered by Azure AI
            </p>
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> Multilingual Support
            </p>
            {accessibilitySettings.textToSpeech && (
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <Volume2 className="w-3 h-3" /> TTS Active
              </p>
            )}
            {accessibilitySettings.speechToText && (
              <p className="text-[10px] text-purple-400 flex items-center gap-1">
                <Mic className="w-3 h-3" /> Voice Input Active
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
