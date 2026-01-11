'use client';

import { useState } from 'react';
import { 
  Settings2, 
  Volume2, 
  Mic, 
  Eye, 
  Type, 
  Zap,
  X,
  Moon,
  Sun,
  Headphones,
  Text,
  AlignLeft,
  Volume1,
  User,
  Monitor,
  Palette,
  Captions,
  Bell,
  Languages,
  Focus
} from 'lucide-react';

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

interface AccessibilityPanelProps {
  settings: AccessibilitySettings;
  onSettingsChange: (settings: AccessibilitySettings) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessibilityPanel({
  settings,
  onSettingsChange,
  isOpen,
  onClose
}: AccessibilityPanelProps) {
  if (!isOpen) return null;

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-indigo-400" />
            Accessibility Settings
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Text-to-Speech */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="font-medium text-white">Text-to-Speech</p>
                <p className="text-xs text-slate-400">Read messages aloud</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting('textToSpeech', !settings.textToSpeech)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.textToSpeech ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.textToSpeech ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* Speech-to-Text */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Mic className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-white">Speech-to-Text</p>
                <p className="text-xs text-slate-400">Voice input enabled</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting('speechToText', !settings.speechToText)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.speechToText ? 'bg-purple-600' : 'bg-slate-700'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.speechToText ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="font-medium text-white">High Contrast</p>
                <p className="text-xs text-slate-400">Enhanced visibility</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting('highContrast', !settings.highContrast)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.highContrast ? 'bg-amber-600' : 'bg-slate-700'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.highContrast ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="font-medium text-white">Reduced Motion</p>
                <p className="text-xs text-slate-400">Minimize animations</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.reducedMotion ? 'bg-cyan-600' : 'bg-slate-700'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.reducedMotion ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* Font Size */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <Type className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="font-medium text-white">Font Size</p>
                <p className="text-xs text-slate-400">Adjust text size</p>
              </div>
            </div>
            <div className="flex gap-2 ml-13">
              {(['small', 'medium', 'large', 'extra-large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => updateSetting('fontSize', size)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    settings.fontSize === size
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {size === 'extra-large' ? 'XL' : size.charAt(0).toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700">
          <p className="text-xs text-slate-500 text-center">
            These settings help make Samvaad accessible for everyone.
            Your preferences are saved automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
