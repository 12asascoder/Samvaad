import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ADVOCACY_SCENARIOS, suggestTemplates, fillTemplate } from '@/lib/ai/advocacy-templates';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let templates = Object.values(ADVOCACY_SCENARIOS);

    if (category) {
      templates = templates.filter(t => t.category === category);
    }

    if (search) {
      templates = suggestTemplates(search);
    }

    return NextResponse.json({ templates });
  } catch (error) {
    console.error('Templates API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { templateId, values } = body;

    const template = ADVOCACY_SCENARIOS[templateId];
    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    const filledContent = fillTemplate(template, values);

    return NextResponse.json({
      template: template.title,
      content: filledContent,
      tips: template.tips
    });
  } catch (error) {
    console.error('Template fill API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
