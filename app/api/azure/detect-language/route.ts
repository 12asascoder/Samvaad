import { NextRequest, NextResponse } from 'next/server';
import { AzureTranslatorService } from '@/lib/azure/translator';

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

    const translator = new AzureTranslatorService();
    const result = await translator.detectLanguage(text);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Language detection error:', error);
    return NextResponse.json(
      { error: 'Language detection failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
