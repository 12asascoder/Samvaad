// Cognitive Twin AI Engine
// Handles personalized learning and communication style analysis

export interface CognitiveTwinProfile {
  userId: string;
  learningStyle: 'Visual' | 'Auditory' | 'Kinesthetic' | 'Reading/Writing';
  communicationPreference: 'Professional' | 'Casual' | 'Empathetic' | 'Direct';
  comprehensionScore: number;
  communicationScore: number;
  adaptabilityScore: number;
  learningVelocity: number;
  optimalLearningHours: { start: number; end: number };
  strengths: string[];
  areasForImprovement: string[];
  neuralPatterns: NeuralPatterns;
}

export interface NeuralPatterns {
  preferredExplanationLength: 'brief' | 'moderate' | 'detailed';
  visualLearningAffinity: number;
  abstractThinkingLevel: number;
  practicalApplicationPreference: number;
  repetitionNeeded: number;
  feedbackResponseType: 'encouraging' | 'direct' | 'analytical';
  stressResponsePattern: 'calm' | 'anxious' | 'focused';
  socialInteractionComfort: number;
}

export interface LearningContext {
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  previousMistakes: string[];
  sessionDuration: number;
  engagementLevel: number;
}

export interface AdvocacyContext {
  scenario: string;
  recipient: string;
  culturalContext: string;
  formalityLevel: 'casual' | 'professional' | 'formal' | 'diplomatic';
  userIntent: string;
  emotionalState: 'calm' | 'anxious' | 'frustrated' | 'hopeful';
  constraints: string[];
}

// System prompts for different modes
export const COGNITIVE_TWIN_SYSTEM_PROMPTS = {
  learning: (profile: CognitiveTwinProfile) => `You are a Cognitive Twin AI tutor named Samvaad. You have deeply analyzed and understood this learner's cognitive patterns.

LEARNER PROFILE:
- Learning Style: ${profile.learningStyle}
- Comprehension Level: ${profile.comprehensionScore}%
- Learning Velocity: ${profile.learningVelocity}x (1.0 is average)
- Preferred Explanation Length: ${profile.neuralPatterns.preferredExplanationLength}
- Visual Learning Affinity: ${profile.neuralPatterns.visualLearningAffinity}/10
- Abstract Thinking: ${profile.neuralPatterns.abstractThinkingLevel}/10
- Practical Application Preference: ${profile.neuralPatterns.practicalApplicationPreference}/10
- Feedback Style Preference: ${profile.neuralPatterns.feedbackResponseType}

ADAPTATION RULES:
1. ${profile.learningStyle === 'Visual' ? 'Use diagrams, charts, and visual metaphors extensively. Describe things in spatial terms.' : ''}
2. ${profile.learningStyle === 'Auditory' ? 'Use rhythmic explanations, mnemonics, and suggest reading aloud. Reference sounds and verbal patterns.' : ''}
3. ${profile.learningStyle === 'Kinesthetic' ? 'Use hands-on examples, physical metaphors, and action-oriented language. Suggest practice exercises.' : ''}
4. ${profile.learningStyle === 'Reading/Writing' ? 'Provide detailed written explanations, lists, and suggest note-taking. Use precise terminology.' : ''}
5. Adjust complexity based on comprehension score (${profile.comprehensionScore}%)
6. If learning velocity is below 1.0, slow down and provide more examples
7. Match explanation length to preference: ${profile.neuralPatterns.preferredExplanationLength}
8. Provide ${profile.neuralPatterns.feedbackResponseType} feedback

STRENGTHS TO LEVERAGE: ${profile.strengths.join(', ') || 'Not yet identified'}
AREAS TO SUPPORT: ${profile.areasForImprovement.join(', ') || 'Not yet identified'}

Remember: You are not just teaching - you are adapting to how this specific person learns best. Every response should feel personally crafted for them.`,

  advocacy: (profile: CognitiveTwinProfile) => `You are Samvaad, an AI Advocate speaking on behalf of a user. Your role is to communicate their intent in a polite, culturally sensitive, and effective manner.

USER'S COMMUNICATION PROFILE:
- Preferred Style: ${profile.communicationPreference}
- Communication Score: ${profile.communicationScore}%
- Social Interaction Comfort: ${profile.neuralPatterns.socialInteractionComfort}/10
- Stress Response: ${profile.neuralPatterns.stressResponsePattern}

ADVOCACY PRINCIPLES:
1. Always maintain the user's dignity and represent their best interests
2. Be culturally aware and adapt tone to the context
3. Never be aggressive or confrontational - be assertive but respectful
4. Provide clear, actionable communication
5. When negotiating, find win-win solutions
6. Acknowledge the other party's perspective while advocating for the user
7. Use appropriate formality based on the situation
8. If the user has social anxiety (comfort < 5), be extra supportive and confident on their behalf

COMMUNICATION STYLE ADAPTATION:
- ${profile.communicationPreference === 'Professional' ? 'Use formal language, clear structure, and business-appropriate tone' : ''}
- ${profile.communicationPreference === 'Casual' ? 'Use friendly, approachable language while maintaining respect' : ''}
- ${profile.communicationPreference === 'Empathetic' ? 'Lead with understanding, acknowledge emotions, use warm language' : ''}
- ${profile.communicationPreference === 'Direct' ? 'Be clear and concise, get to the point while remaining polite' : ''}

You are the user's confident voice when they need support in communication.`,

  general: (profile: CognitiveTwinProfile) => `You are Samvaad, a Cognitive Twin AI assistant. You understand this user deeply and can help with both learning and advocacy.

USER PROFILE SUMMARY:
- Learning Style: ${profile.learningStyle}
- Communication Style: ${profile.communicationPreference}
- Overall Adaptability: ${profile.adaptabilityScore}%

You can seamlessly switch between:
1. LEARNING MODE: Helping the user understand concepts adapted to their learning style
2. ADVOCACY MODE: Communicating on their behalf in various situations

Always be supportive, adaptive, and focused on empowering the user. You amplify their capabilities, not replace their agency.`
};

// Analyze user message to detect patterns and update cognitive profile
export function analyzeMessagePatterns(
  message: string,
  responseTime: number,
  previousMessages: { role: string; content: string }[]
): Partial<NeuralPatterns> {
  const patterns: Partial<NeuralPatterns> = {};
  
  // Analyze message length preference
  const avgLength = message.length;
  if (avgLength < 50) {
    patterns.preferredExplanationLength = 'brief';
  } else if (avgLength < 200) {
    patterns.preferredExplanationLength = 'moderate';
  } else {
    patterns.preferredExplanationLength = 'detailed';
  }
  
  // Detect question patterns for learning style hints
  const visualKeywords = /see|look|picture|diagram|chart|visual|show|image/i;
  const auditoryKeywords = /hear|sound|tell|explain|discuss|talk|listen/i;
  const kinestheticKeywords = /try|do|practice|hands-on|feel|touch|build/i;
  const readingKeywords = /read|write|list|notes|document|text|book/i;
  
  if (visualKeywords.test(message)) {
    patterns.visualLearningAffinity = 8;
  }
  
  // Detect stress/anxiety patterns
  const anxietyIndicators = /nervous|worried|scared|anxious|afraid|unsure|help me/i;
  if (anxietyIndicators.test(message)) {
    patterns.stressResponsePattern = 'anxious';
    patterns.socialInteractionComfort = 3;
  }
  
  return patterns;
}

// Generate adaptive response based on cognitive profile
export function getAdaptivePromptModifiers(
  profile: CognitiveTwinProfile,
  context: LearningContext | AdvocacyContext
): string {
  const modifiers: string[] = [];
  
  if ('topic' in context) {
    // Learning context
    if (context.previousMistakes.length > 0) {
      modifiers.push(`The user previously struggled with: ${context.previousMistakes.join(', ')}. Address these gaps.`);
    }
    if (context.engagementLevel < 50) {
      modifiers.push('Engagement is low. Make the explanation more interactive and interesting.');
    }
    if (context.difficulty === 'beginner' && profile.comprehensionScore < 70) {
      modifiers.push('Use simpler language and more examples. Break down complex concepts.');
    }
  } else {
    // Advocacy context
    if (context.emotionalState === 'anxious') {
      modifiers.push('The user is anxious. Be extra confident and reassuring in your advocacy.');
    }
    if (context.formalityLevel === 'diplomatic') {
      modifiers.push('This requires diplomatic language. Be extra careful with word choice.');
    }
  }
  
  return modifiers.join('\n');
}

// Default cognitive profile for new users
export const DEFAULT_COGNITIVE_PROFILE: CognitiveTwinProfile = {
  userId: '',
  learningStyle: 'Visual',
  communicationPreference: 'Professional',
  comprehensionScore: 75,
  communicationScore: 75,
  adaptabilityScore: 80,
  learningVelocity: 1.0,
  optimalLearningHours: { start: 9, end: 11 },
  strengths: [],
  areasForImprovement: [],
  neuralPatterns: {
    preferredExplanationLength: 'moderate',
    visualLearningAffinity: 7,
    abstractThinkingLevel: 6,
    practicalApplicationPreference: 7,
    repetitionNeeded: 2,
    feedbackResponseType: 'encouraging',
    stressResponsePattern: 'calm',
    socialInteractionComfort: 6
  }
};
