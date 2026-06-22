import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { 
  COGNITIVE_TWIN_SYSTEM_PROMPTS, 
  DEFAULT_COGNITIVE_PROFILE,
  type CognitiveTwinProfile 
} from '@/lib/ai/cognitive-twin';
import { LearningAnalyticsEngine } from '@/lib/ai/learning-analytics';
import { AIProvider } from '@/lib/ai';

export const runtime = 'edge';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  mode: 'learning' | 'advocacy' | 'general';
  context?: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: ChatRequest = await request.json();
    const { messages, mode, context } = body;

    // Fetch user's cognitive profile
    let cognitiveProfile: CognitiveTwinProfile = { ...DEFAULT_COGNITIVE_PROFILE, userId: user.id };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profileData } = await (supabase as any)
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: twinData } = await (supabase as any)
      .from('cognitive_twins')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileData) {
      cognitiveProfile.learningStyle = profileData.learning_style as CognitiveTwinProfile['learningStyle'];
      cognitiveProfile.communicationPreference = profileData.communication_preference as CognitiveTwinProfile['communicationPreference'];
    }

    if (twinData) {
      cognitiveProfile.comprehensionScore = Number(twinData.comprehension_score) || 75;
      cognitiveProfile.communicationScore = Number(twinData.communication_score) || 75;
      cognitiveProfile.adaptabilityScore = Number(twinData.adaptability_score) || 80;
      cognitiveProfile.learningVelocity = Number(twinData.learning_velocity) || 1.0;
      
      if (twinData.neural_patterns && typeof twinData.neural_patterns === 'object') {
        cognitiveProfile.neuralPatterns = {
          ...DEFAULT_COGNITIVE_PROFILE.neuralPatterns,
          ...(twinData.neural_patterns as object)
        };
      }
    }

    // Get the appropriate system prompt
    let systemPrompt: string;
    switch (mode) {
      case 'learning':
        systemPrompt = COGNITIVE_TWIN_SYSTEM_PROMPTS.learning(cognitiveProfile);
        break;
      case 'advocacy':
        systemPrompt = COGNITIVE_TWIN_SYSTEM_PROMPTS.advocacy(cognitiveProfile);
        break;
      default:
        systemPrompt = COGNITIVE_TWIN_SYSTEM_PROMPTS.general(cognitiveProfile);
    }

    // Add context if provided
    if (context) {
      systemPrompt += `\n\nADDITIONAL CONTEXT:\n${JSON.stringify(context, null, 2)}`;
    }

    // Prepare messages for API call
    const apiMessages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    try {
      const { stream, provider } = await AIProvider.stream(
        apiMessages.map(m => ({ role: m.role, content: m.content })),
        { temperature: 0.7, maxTokens: 1000 }
      );

      const [clientStream, analyticsStream] = stream.tee();

      // Process analytics in the background
      (async () => {
        try {
          const reader = analyticsStream.getReader();
          const decoder = new TextDecoder();
          let fullText = '';
          let doneReading = false;
          
          while (!doneReading) {
            const { done, value } = await reader.read();
            if (done) {
              doneReading = true;
              break;
            }
            
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ') && line.trim() !== 'data: [DONE]') {
                try {
                  const parsed = JSON.parse(line.slice(6));
                  if (parsed.choices?.[0]?.delta?.content) {
                    fullText += parsed.choices[0].delta.content;
                  }
                } catch (e) {
                  // Ignore parsing errors for incomplete chunks
                }
              }
            }
          }

          // Track learning session data if in learning mode
          if (mode === 'learning' && user && fullText.trim().length > 0) {
            const analyticsEngine = new LearningAnalyticsEngine();
            const sessionData = {
              messages: [...messages, { role: 'assistant' as const, content: fullText }],
              duration: 0, // Would be calculated from session start
              topic: context?.topic as string || 'General Learning',
              difficulty: (context?.difficulty as 'beginner' | 'intermediate' | 'advanced') || 'intermediate',
              mistakes: context?.mistakes as string[] || [],
              corrections: context?.corrections as string[] || [],
              engagementMetrics: {
                responseTime: context?.responseTimes as number[] || [],
                questionFrequency: messages.filter(m => m.role === 'user' && m.content.includes('?')).length,
                clarificationRequests: messages.filter(m => m.role === 'user' && 
                  (m.content.toLowerCase().includes('what do you mean') || 
                   m.content.toLowerCase().includes('can you explain') ||
                   m.content.toLowerCase().includes('i don\\'t understand'))).length,
              },
            };

            const analysis = await analyticsEngine.analyzeLearningSession(sessionData, cognitiveProfile);
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (supabase as any)
              .from('cognitive_twins')
              .update({
                ...analysis.updatedProfile,
                last_sync_at: new Date().toISOString(),
              })
              .eq('user_id', user.id);

            if (analysis.insights.length > 0) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              await (supabase as any)
                .from('neural_insights')
                .insert(
                  analysis.insights.map(insight => ({
                    user_id: user.id,
                    insight_type: insight.type,
                    title: insight.title,
                    description: insight.description,
                    priority: insight.priority,
                    is_actionable: insight.actionable,
                    metadata: insight.metadata || {},
                  }))
                );
            }
          }
        } catch (error) {
          console.error('Learning analytics background error:', error);
        }
      })();

      // Append metadata to headers to allow client to know mode and profile
      const headers = new Headers({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Samvaad-Mode': mode,
        'X-Samvaad-Learning-Style': cognitiveProfile.learningStyle,
        'X-Samvaad-Comm-Pref': cognitiveProfile.communicationPreference,
        'X-AI-Provider': provider,
      });

      return new Response(clientStream, { headers });
    } catch (providerError) {
      console.warn('AIProvider failed or unavailable, using fallback:', providerError);
      
      // Fallback: Generate a contextual response without external API
      const fallbackResponse = generateFallbackResponse(messages, mode, cognitiveProfile);
      
      return NextResponse.json({
        message: fallbackResponse,
        mode,
        profile: {
          learningStyle: cognitiveProfile.learningStyle,
          communicationPreference: cognitiveProfile.communicationPreference,
        },
        note: 'Using fallback mode. No AI Provider was able to handle the request.'
      });
    }

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Fallback response generator when no AI API is configured
function generateFallbackResponse(
  messages: ChatMessage[], 
  mode: 'learning' | 'advocacy' | 'general',
  profile: CognitiveTwinProfile
): string {
  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';

  if (mode === 'learning') {
    if (lastMessage.includes('explain') || lastMessage.includes('what is') || lastMessage.includes('how')) {
      return `I'd love to help you understand this concept! Based on your ${profile.learningStyle.toLowerCase()} learning style, let me break this down for you:\n\n` +
        `Since you learn best through ${profile.learningStyle === 'Visual' ? 'visual representations' : profile.learningStyle === 'Auditory' ? 'verbal explanations' : profile.learningStyle === 'Kinesthetic' ? 'hands-on practice' : 'reading and writing'}, ` +
        `I'll adapt my explanation accordingly.\n\n` +
        `To provide you with the most helpful response, please configure the Azure OpenAI API keys in your environment. ` +
        `This will enable me to give you personalized, detailed explanations tailored to your unique cognitive patterns.`;
    }
    return `I'm your Cognitive Twin, ready to help you learn! Your profile shows you're a ${profile.learningStyle.toLowerCase()} learner with a comprehension score of ${profile.comprehensionScore}%. ` +
      `What would you like to explore today? I'll adapt my teaching style to match how you learn best.`;
  }

  if (mode === 'advocacy') {
    if (lastMessage.includes('help') || lastMessage.includes('negotiate') || lastMessage.includes('request')) {
      return `I understand you need help communicating something important. As your AI advocate, I'll help you craft a message that's:\n\n` +
        `• ${profile.communicationPreference} in tone\n` +
        `• Culturally sensitive and respectful\n` +
        `• Clear and effective\n\n` +
        `Please tell me more about the situation:\n` +
        `1. Who are you communicating with?\n` +
        `2. What outcome are you hoping for?\n` +
        `3. Any specific concerns or constraints?\n\n` +
        `With this information, I can help you draft the perfect message.`;
    }
    return `I'm here to advocate on your behalf. Whether you need help with a fee extension, salary negotiation, complaint resolution, or any other communication challenge, ` +
      `I'll help you express yourself confidently and effectively. What situation can I help you with today?`;
  }

  return `Hello! I'm Samvaad, your Cognitive Twin. I can help you in two ways:\n\n` +
    `**Learning Mode**: I'll teach you concepts adapted to your ${profile.learningStyle.toLowerCase()} learning style.\n\n` +
    `**Advocacy Mode**: I'll help you communicate effectively in challenging situations.\n\n` +
    `How can I assist you today?`;
}
