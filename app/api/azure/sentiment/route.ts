import { NextRequest, NextResponse } from 'next/server';
import { AzureCognitiveServices } from '@/lib/azure/cognitive-services';

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

    const cognitiveServices = new AzureCognitiveServices();
    const result = await cognitiveServices.analyzeSentiment({ text });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Sentiment analysis error:', error);
    return NextResponse.json(
      { error: 'Sentiment analysis failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
