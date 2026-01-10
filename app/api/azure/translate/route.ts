import { NextRequest, NextResponse } from 'next/server';
import { AzureTranslatorService } from '@/lib/azure/translator';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { text, from, to } = await request.json();

    if (!text || !to) {
      return NextResponse.json(
        { error: 'Missing required parameters: text and to' },
        { status: 400 }
      );
    }

    const translator = new AzureTranslatorService();
    const result = await translator.translate({ text, from, to });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
