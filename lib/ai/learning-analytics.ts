// Advanced Learning Analytics Engine
// Analyzes learning patterns, comprehension, and generates insights

import type { CognitiveTwinProfile, LearningContext } from './cognitive-twin';
import { AzureCognitiveServices } from '../azure/cognitive-services';

export interface LearningSessionData {
  messages: Array<{ role: string; content: string }>;
  duration: number;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  mistakes: string[];
  corrections: string[];
  engagementMetrics: {
    responseTime: number[];
    questionFrequency: number;
    clarificationRequests: number;
  };
}

export interface LearningInsight {
  type: 'pattern' | 'recommendation' | 'achievement' | 'warning';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  actionable: boolean;
  metadata?: Record<string, unknown>;
}

export class LearningAnalyticsEngine {
  private cognitiveServices?: AzureCognitiveServices;

  constructor() {
    // Initialize Azure Cognitive Services if available
    if (typeof window !== 'undefined') {
      try {
        this.cognitiveServices = new AzureCognitiveServices();
      } catch (error) {
        console.warn('Azure Cognitive Services not available:', error);
      }
    }
  }

  /**
   * Analyze a learning session and extract insights
   */
  async analyzeLearningSession(
    sessionData: LearningSessionData,
    currentProfile: CognitiveTwinProfile
  ): Promise<{
    updatedProfile: Partial<CognitiveTwinProfile>;
    insights: LearningInsight[];
    comprehensionScore: number;
    engagementScore: number;
  }> {
    const insights: LearningInsight[] = [];
    const profileUpdates: Partial<CognitiveTwinProfile> = {};

    // Calculate engagement score
    const engagementScore = this.calculateEngagementScore(sessionData.engagementMetrics);
    
    // Analyze comprehension through question patterns
    const comprehensionScore = this.calculateComprehensionScore(
      sessionData,
      currentProfile.comprehensionScore
    );

    // Detect learning patterns
    const patterns = this.detectLearningPatterns(sessionData, currentProfile);
    
    // Generate insights
    insights.push(...this.generateLearningInsights(patterns, sessionData, currentProfile));

    // Update learning velocity based on session performance
    const velocityAdjustment = this.calculateVelocityAdjustment(
      sessionData,
      engagementScore,
      comprehensionScore
    );
    if (velocityAdjustment !== 0) {
      profileUpdates.learningVelocity = Math.max(0.5, Math.min(2.0, 
        currentProfile.learningVelocity + velocityAdjustment
      ));
    }

    // Update optimal learning hours if pattern detected
    const optimalHours = this.detectOptimalLearningHours(sessionData);
    if (optimalHours) {
      profileUpdates.optimalLearningHours = optimalHours;
      insights.push({
        type: 'pattern',
        title: 'Optimal Learning Time Detected',
        description: `Your cognitive twin noticed you perform best between ${optimalHours.start}:00 and ${optimalHours.end}:00. Consider scheduling important learning sessions during this window.`,
        priority: 'medium',
        actionable: true,
        metadata: { optimalHours },
      });
    }

    // Analyze mistakes and create improvement areas
    if (sessionData.mistakes.length > 0) {
      const mistakePatterns = this.analyzeMistakePatterns(sessionData.mistakes);
      profileUpdates.areasForImprovement = [
        ...(currentProfile.areasForImprovement || []),
        ...mistakePatterns.filter(
          pattern => !currentProfile.areasForImprovement?.includes(pattern)
        ),
      ];
    }

    // Detect strengths
    const strengths = this.detectStrengths(sessionData, currentProfile);
    if (strengths.length > 0) {
      profileUpdates.strengths = [
        ...(currentProfile.strengths || []),
        ...strengths.filter(s => !currentProfile.strengths?.includes(s)),
      ];
    }

    // Update comprehension score
    profileUpdates.comprehensionScore = comprehensionScore;

    // Update neural patterns based on interaction style
    if (!profileUpdates.neuralPatterns) {
      profileUpdates.neuralPatterns = { ...currentProfile.neuralPatterns };
    }

    // Analyze preferred explanation length
    const avgMessageLength = this.calculateAverageMessageLength(sessionData.messages);
    if (avgMessageLength < 50) {
      profileUpdates.neuralPatterns.preferredExplanationLength = 'brief';
    } else if (avgMessageLength < 200) {
      profileUpdates.neuralPatterns.preferredExplanationLength = 'moderate';
    } else {
      profileUpdates.neuralPatterns.preferredExplanationLength = 'detailed';
    }

    return {
      updatedProfile: profileUpdates,
      insights,
      comprehensionScore,
      engagementScore,
    };
  }

  private calculateEngagementScore(metrics: LearningSessionData['engagementMetrics']): number {
    let score = 50; // Base score

    // Response time: faster = more engaged
    if (metrics.responseTime.length > 0) {
      const avgResponseTime = metrics.responseTime.reduce((a, b) => a + b, 0) / metrics.responseTime.length;
      score += Math.max(0, 30 - avgResponseTime / 1000); // Reward faster responses
    }

    // Questions indicate engagement
    score += Math.min(30, metrics.questionFrequency * 5);

    // Clarifications show active learning
    score += Math.min(20, metrics.clarificationRequests * 3);

    return Math.min(100, Math.max(0, score));
  }

  private calculateComprehensionScore(
    sessionData: LearningSessionData,
    currentScore: number
  ): number {
    let score = currentScore;

    // Mistakes reduce comprehension score
    const mistakePenalty = Math.min(10, sessionData.mistakes.length * 2);
    score -= mistakePenalty;

    // Corrections improve it
    const correctionBonus = Math.min(5, sessionData.corrections.length);
    score += correctionBonus;

    // Question frequency can indicate both confusion (bad) and active learning (good)
    // We'll consider it positive if followed by understanding (fewer subsequent mistakes)
    if (sessionData.engagementMetrics.questionFrequency > 0) {
      const questionsPerMistake = sessionData.engagementMetrics.questionFrequency / 
        Math.max(1, sessionData.mistakes.length);
      if (questionsPerMistake > 2) {
        score += 3; // Questions leading to understanding
      }
    }

    return Math.min(100, Math.max(0, score));
  }

  private detectLearningPatterns(
    sessionData: LearningSessionData,
    profile: CognitiveTwinProfile
  ): Record<string, unknown> {
    const patterns: Record<string, unknown> = {};

    // Detect visual learning indicators
    const visualKeywords = /see|look|picture|diagram|chart|visual|show|image|color|shape/i;
    const visualMentions = sessionData.messages.filter(m => 
      visualKeywords.test(m.content)
    ).length;
    if (visualMentions > sessionData.messages.length * 0.3) {
      patterns.visualPreference = true;
      patterns.visualLearningAffinity = Math.min(10, 
        (profile.neuralPatterns.visualLearningAffinity || 5) + 0.5
      );
    }

    // Detect practical application preference
    const practicalKeywords = /example|practice|try|do|use|apply|real|actual/i;
    const practicalMentions = sessionData.messages.filter(m =>
      practicalKeywords.test(m.content)
    ).length;
    if (practicalMentions > sessionData.messages.length * 0.3) {
      patterns.practicalPreference = true;
      patterns.practicalApplicationPreference = Math.min(10,
        (profile.neuralPatterns.practicalApplicationPreference || 5) + 0.5
      );
    }

    return patterns;
  }

  private generateLearningInsights(
    patterns: Record<string, unknown>,
    sessionData: LearningSessionData,
    profile: CognitiveTwinProfile
  ): LearningInsight[] {
    const insights: LearningInsight[] = [];

    // Achievement insight for completing session
    if (sessionData.duration > 10) {
      insights.push({
        type: 'achievement',
        title: 'Great Learning Session!',
        description: `You completed a ${sessionData.duration}-minute learning session on "${sessionData.topic}". Your cognitive twin is learning from your patterns.`,
        priority: 'low',
        actionable: false,
      });
    }

    // Pattern insight for learning style
    if (patterns.visualPreference && profile.learningStyle !== 'Visual') {
      insights.push({
        type: 'pattern',
        title: 'Visual Learning Detected',
        description: 'Your interactions suggest you may benefit from more visual explanations. Consider switching to Visual learning style in your profile.',
        priority: 'medium',
        actionable: true,
        metadata: { suggestedStyle: 'Visual' },
      });
    }

    // Warning for high mistake rate
    if (sessionData.mistakes.length > sessionData.messages.length * 0.2) {
      insights.push({
        type: 'warning',
        title: 'High Error Rate',
        description: `You encountered ${sessionData.mistakes.length} mistakes in this session. Consider reviewing the fundamentals or slowing down the pace.`,
        priority: 'high',
        actionable: true,
        metadata: { mistakeCount: sessionData.mistakes.length },
      });
    }

    // Recommendation for improvement
    if (sessionData.corrections.length > 0 && sessionData.mistakes.length === 0) {
      insights.push({
        type: 'achievement',
        title: 'Perfect Understanding!',
        description: 'You corrected all mistakes and showed complete comprehension. Keep up the excellent work!',
        priority: 'low',
        actionable: false,
      });
    }

    return insights;
  }

  private calculateVelocityAdjustment(
    sessionData: LearningSessionData,
    engagementScore: number,
    comprehensionScore: number
  ): number {
    // If high engagement and comprehension, can learn faster
    // If low engagement or comprehension, should slow down
    const performanceScore = (engagementScore + comprehensionScore) / 2;
    
    if (performanceScore > 80) {
      return 0.05; // Increase velocity slightly
    } else if (performanceScore < 60) {
      return -0.05; // Decrease velocity
    }
    
    return 0;
  }

  private detectOptimalLearningHours(sessionData: LearningSessionData): 
    { start: number; end: number } | null {
    // In a real implementation, this would analyze session start times
    // and correlate with performance metrics
    // For now, return null (would need timestamp data)
    return null;
  }

  private analyzeMistakePatterns(mistakes: string[]): string[] {
    const patterns: string[] = [];
    
    // Simple pattern detection - in production, use NLP
    const mistakeText = mistakes.join(' ').toLowerCase();
    
    if (mistakeText.includes('calculation') || mistakeText.includes('math')) {
      patterns.push('Numerical accuracy');
    }
    if (mistakeText.includes('grammar') || mistakeText.includes('syntax')) {
      patterns.push('Language precision');
    }
    if (mistakeText.includes('concept') || mistakeText.includes('understand')) {
      patterns.push('Conceptual understanding');
    }

    return patterns;
  }

  private detectStrengths(
    sessionData: LearningSessionData,
    profile: CognitiveTwinProfile
  ): string[] {
    const strengths: string[] = [];

    if (sessionData.corrections.length > sessionData.mistakes.length) {
      strengths.push('Self-correction ability');
    }

    if (sessionData.engagementMetrics.questionFrequency > 5) {
      strengths.push('Curiosity and inquiry');
    }

    if (sessionData.mistakes.length === 0 && sessionData.messages.length > 5) {
      strengths.push('Accuracy and attention to detail');
    }

    return strengths;
  }

  private calculateAverageMessageLength(messages: Array<{ content: string }>): number {
    if (messages.length === 0) return 0;
    const totalLength = messages.reduce((sum, m) => sum + m.content.length, 0);
    return totalLength / messages.length;
  }
}
