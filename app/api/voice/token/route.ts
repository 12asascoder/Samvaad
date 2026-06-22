import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const subscriptionKey = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;

  if (!subscriptionKey || !region) {
    return NextResponse.json(
      { error: 'Speech service is not fully configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch token: ${response.statusText}`);
    }

    const token = await response.text();

    return NextResponse.json({ token, region });
  } catch (error) {
    console.error('Error fetching speech token:', error);
    return NextResponse.json(
      { error: 'Failed to generate speech token' },
      { status: 500 }
    );
  }
}
