'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Square } from 'lucide-react';

interface VoiceInteractionProps {
  onTranscript: (text: string) => void;
  isProcessing?: boolean;
}

export function VoiceInteraction({ onTranscript, isProcessing = false }: VoiceInteractionProps) {
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Fallback to Web Speech API
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let currentInterim = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            currentInterim += event.results[i][0].transcript;
          }
        }

        setInterimText(currentInterim);
        if (finalTranscript) {
          onTranscript(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: Event) => {
        console.error('Speech recognition error', event);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        // Auto-restart if still supposed to be listening
        if (isListening) {
          try {
            recognitionRef.current?.start();
          } catch (e) {
            setIsListening(false);
          }
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening, onTranscript]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      recognitionRef.current?.stop();
      setInterimText('');
    } else {
      setIsListening(true);
      setInterimText('');
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.error('Could not start recognition', e);
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggleListening}
        disabled={isProcessing}
        className={`p-3 rounded-full transition-all duration-300 ${
          isProcessing
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : isListening
            ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg animate-pulse'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg'
        }`}
        aria-label={isListening ? 'Stop recording' : 'Start recording'}
      >
        {isProcessing ? (
          <Square className="w-5 h-5 animate-spin rounded-sm" />
        ) : isListening ? (
          <Square className="w-5 h-5 fill-current" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </button>

      {interimText && (
        <div className="text-sm text-gray-500 italic truncate max-w-[200px] animate-fade-in">
          "{interimText}..."
        </div>
      )}

      {isListening && !interimText && (
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      )}
    </div>
  );
}
