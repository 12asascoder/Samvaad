import { NextRequest, NextResponse } from 'next/server';
import { AIProvider } from '@/lib/ai';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Missing required parameter: text' },
        { status: 400 }
      );
    }

    const { text: resultJson } = await AIProvider.generate(
      [{
        role: 'system',
        content: `Analyze the sentiment of the text and return ONLY JSON in this format: {"sentiment": "positive|neutral|negative", "confidence": 0.0-1.0}`
      }, {
        role: 'user',
        content: text
      }],
      { temperature: 0.1, jsonMode: true }
    );
    
    let result = { sentiment: 'neutral', confidence: 0.5 };
    try {
      result = JSON.parse(resultJson);
    } catch {
      // fallback
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Sentiment analysis error:', error);
    return NextResponse.json(
      { error: 'Sentiment analysis failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
