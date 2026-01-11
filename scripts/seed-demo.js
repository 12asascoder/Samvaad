/**
 * Comprehensive Demo Account Seed Script
 * 
 * This script creates a demo account with ALL features and comprehensive sample data
 * 
 * Usage:
 * 1. Set up your Supabase project and get credentials
 * 2. Update the .env.local file with your Supabase credentials
 * 3. Run: node scripts/seed-demo.js
 * 
 * This will create:
 * - Demo user account (demo@samvaad.ai / Demo@Samvaad2024!)
 * - Complete profile with accessibility settings
 * - Cognitive twin with rich neural patterns
 * - Multiple learning goals across categories
 * - Learning sessions with varied topics
 * - Conversations with messages (learning & advocacy)
 * - Advocacy sessions with outcomes
 * - Neural insights with different priorities
 * - Voice profile for accessibility
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Supabase credentials not found in .env.local');
  console.error('Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

// Use service role key if available (bypasses RLS), otherwise use anon key
const supabase = createClient(supabaseUrl, supabaseServiceKey);
const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);

// Demo account credentials
const DEMO_EMAIL = 'demo@samvaad.ai';
const DEMO_PASSWORD = 'Demo@Samvaad2024!';
const DEMO_NAME = 'Samvaad Demo User';

async function seedDemoAccount() {
  console.log('🌱 Starting comprehensive demo seed process...\n');

  try {
    let userId;

    // Step 1: Create or get auth user (use anon client for auth)
    console.log('1️⃣  Creating demo user account...');
    const { data: authData, error: authError } = await supabaseAnon.auth.signUp({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      options: {
        data: {
          full_name: DEMO_NAME,
        }
      }
    });

    if (authError) {
      if (authError.message.includes('already registered') || authError.message.includes('already been registered')) {
        console.log('   ℹ️  User already exists, signing in...');
        const { data: signInData, error: signInError } = await supabaseAnon.auth.signInWithPassword({
          email: DEMO_EMAIL,
          password: DEMO_PASSWORD
        });
        if (signInError || !signInData?.user) {
          console.error('   ❌ Could not access existing user:', signInError?.message);
          return;
        }
        userId = signInData.user.id;
        console.log('   ✅ Signed in with existing user ID:', userId);
      } else {
        console.error('   ❌ Error creating user:', authError.message);
        return;
      }
    } else {
      userId = authData.user.id;
      console.log('   ✅ User created with ID:', userId);
    }

    // Step 2: Create comprehensive profile
    console.log('\n2️⃣  Creating user profile...');
    const profileData = {
      id: userId,
      full_name: DEMO_NAME,
      learning_style: 'Visual',
      communication_preference: 'Professional',
      preferred_language: 'en',
      timezone: 'America/New_York',
      accessibility_settings: {
        high_contrast: false,
        text_to_speech: true,
        speech_to_text: true,
        reduced_motion: false,
        font_size: 'medium'
      }
    };
    
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();
    
    let profileError;
    if (existingProfile) {
      // Update existing
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', userId);
      profileError = error;
    } else {
      // Insert new
      const { error } = await supabase
        .from('profiles')
        .insert(profileData);
      profileError = error;
    }

    if (profileError) {
      console.error('   ❌ Error creating profile:', profileError.message);
    } else {
      console.log('   ✅ Profile created/updated');
    }

    // Step 3: Create comprehensive cognitive twin
    console.log('\n3️⃣  Creating cognitive twin with neural patterns...');
    // First check if twin exists
    const { data: existingTwin } = await supabase
      .from('cognitive_twins')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    const twinData = {
      user_id: userId,
      comprehension_score: 94.5,
      communication_score: 88.0,
      adaptability_score: 91.5,
      learning_velocity: 1.25,
      optimal_learning_hours: { start: 9, end: 11 },
      strengths: [
        'Visual Learning',
        'Pattern Recognition',
        'Self-Correction',
        'Complex Problem Solving',
        'Technical Concepts'
      ],
      areas_for_improvement: [
        'Public Speaking',
        'Advanced Mathematical Concepts',
        'Social Negotiations'
      ],
      neural_patterns: {
        preferredExplanationLength: 'moderate',
        visualLearningAffinity: 9,
        abstractThinkingLevel: 8,
        practicalApplicationPreference: 9,
        repetitionNeeded: 2,
        feedbackResponseType: 'encouraging',
        stressResponsePattern: 'focused',
        socialInteractionComfort: 7,
        learningPacePreference: 'moderate',
        curiosityLevel: 9,
        retentionStyle: 'visual_notes'
      }
    };

    let twinError;
    if (existingTwin) {
      // Update existing
      const { error } = await supabase
        .from('cognitive_twins')
        .update(twinData)
        .eq('user_id', userId);
      twinError = error;
    } else {
      // Insert new
      const { error } = await supabase
        .from('cognitive_twins')
        .insert(twinData);
      twinError = error;
    }

    if (twinError) {
      console.error('   ❌ Error creating cognitive twin:', twinError.message);
    } else {
      console.log('   ✅ Cognitive twin created/updated');
    }

    // Step 4: Create learning goals
    console.log('\n4️⃣  Creating learning goals...');
    const goals = [
      {
        user_id: userId,
        title: 'Master Machine Learning Fundamentals',
        description: 'Understand core ML concepts including supervised and unsupervised learning, neural networks, and model evaluation',
        progress: 65,
        status: 'active',
        category: 'technical',
        target_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        milestones: [
          { title: 'Complete supervised learning basics', completed: true },
          { title: 'Understand neural networks', completed: true },
          { title: 'Build first ML model', completed: false },
          { title: 'Master model evaluation', completed: false }
        ]
      },
      {
        user_id: userId,
        title: 'Improve Public Speaking Skills',
        description: 'Build confidence in presenting ideas to large audiences and handling Q&A sessions',
        progress: 45,
        status: 'active',
        category: 'communication',
        target_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        milestones: [
          { title: 'Practice basic presentation structure', completed: true },
          { title: 'Deliver first practice presentation', completed: false },
          { title: 'Handle Q&A confidently', completed: false }
        ]
      },
      {
        user_id: userId,
        title: 'Learn Spanish Fluently',
        description: 'Achieve conversational fluency in Spanish for work opportunities and travel',
        progress: 80,
        status: 'active',
        category: 'language',
        target_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        milestones: [
          { title: 'Master basic greetings and introductions', completed: true },
          { title: 'Complete verb conjugations', completed: true },
          { title: 'Hold 15-minute conversation', completed: true },
          { title: 'Achieve business-level fluency', completed: false }
        ]
      },
      {
        user_id: userId,
        title: 'Financial Literacy Mastery',
        description: 'Understand personal finance, investments, budgeting, and retirement planning',
        progress: 90,
        status: 'active',
        category: 'professional',
        target_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        milestones: [
          { title: 'Create personal budget', completed: true },
          { title: 'Understand investment basics', completed: true },
          { title: 'Plan retirement strategy', completed: true },
          { title: 'Optimize tax strategy', completed: false }
        ]
      },
      {
        user_id: userId,
        title: 'Conflict Resolution Techniques',
        description: 'Master techniques for resolving conflicts in professional and personal settings',
        progress: 75,
        status: 'active',
        category: 'communication',
        target_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        milestones: [
          { title: 'Learn active listening', completed: true },
          { title: 'Practice de-escalation techniques', completed: true },
          { title: 'Apply in real scenarios', completed: false }
        ]
      }
    ];

    // Delete existing goals and insert new ones
    await supabase.from('learning_goals').delete().eq('user_id', userId);
    const { error: goalsError } = await supabase
      .from('learning_goals')
      .insert(goals);

    if (goalsError) {
      console.error('   ❌ Error creating goals:', goalsError.message);
    } else {
      console.log(`   ✅ Created ${goals.length} learning goals`);
    }

    // Step 5: Create learning sessions
    console.log('\n5️⃣  Creating learning sessions...');
    const sessions = [
      {
        user_id: userId,
        topic: 'Introduction to Neural Networks',
        duration_minutes: 45,
        comprehension_level: 88,
        engagement_score: 85,
        mistakes_count: 2,
        corrections_made: 2,
        learning_style_used: 'Visual',
        session_notes: 'Great session! Visual diagrams helped understand the concepts better. Ready to move to convolutional networks.',
        started_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        ended_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        topic: 'Spanish Verb Conjugations - Present Tense',
        duration_minutes: 30,
        comprehension_level: 75,
        engagement_score: 80,
        mistakes_count: 4,
        corrections_made: 3,
        learning_style_used: 'Auditory',
        session_notes: 'Practice with audio pronunciation was very helpful. Need more practice with irregular verbs.',
        started_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        ended_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        topic: 'Investment Strategies - Index Funds',
        duration_minutes: 60,
        comprehension_level: 95,
        engagement_score: 90,
        mistakes_count: 0,
        corrections_made: 0,
        learning_style_used: 'Visual',
        session_notes: 'Excellent comprehension. Ready to move to advanced topics like sector allocation.',
        started_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        ended_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        topic: 'Presentation Techniques - Storytelling',
        duration_minutes: 40,
        comprehension_level: 70,
        engagement_score: 75,
        mistakes_count: 3,
        corrections_made: 2,
        learning_style_used: 'Kinesthetic',
        session_notes: 'Hands-on practice with mock presentations improved confidence. Need to work on pacing.',
        started_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        ended_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 40 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        topic: 'Conflict Resolution - Active Listening',
        duration_minutes: 35,
        comprehension_level: 82,
        engagement_score: 78,
        mistakes_count: 2,
        corrections_made: 2,
        learning_style_used: 'Reading/Writing',
        session_notes: 'Reading case studies and writing responses helped internalize the techniques.',
        started_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        ended_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 35 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        topic: 'Machine Learning - Gradient Descent',
        duration_minutes: 50,
        comprehension_level: 85,
        engagement_score: 88,
        mistakes_count: 1,
        corrections_made: 1,
        learning_style_used: 'Visual',
        session_notes: 'Visualizing the gradient descent process made it much clearer. Great progress!',
        started_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        ended_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 50 * 60 * 1000).toISOString()
      }
    ];

    await supabase.from('learning_sessions').delete().eq('user_id', userId);
    const { error: sessionsError } = await supabase
      .from('learning_sessions')
      .insert(sessions);

    if (sessionsError) {
      console.error('   ❌ Error creating sessions:', sessionsError.message);
    } else {
      console.log(`   ✅ Created ${sessions.length} learning sessions`);
    }

    // Step 6: Create conversations with messages
    console.log('\n6️⃣  Creating conversations with messages...');
    
    // Learning conversation
    const { data: learningConv, error: learningConvError } = await supabase
      .from('conversations')
      .insert({
        user_id: userId,
        title: 'Neural Networks Learning Session',
        mode: 'learning',
        context: { topic: 'Neural Networks', difficulty: 'intermediate' },
        is_active: false
      })
      .select()
      .single();

    if (learningConvError) {
      console.error('   ❌ Error creating learning conversation:', learningConvError.message);
    } else {
      const learningMessages = [
        {
          conversation_id: learningConv.id,
          role: 'user',
          content: 'Can you explain how neural networks work?',
          message_type: 'text'
        },
        {
          conversation_id: learningConv.id,
          role: 'assistant',
          content: 'Absolutely! Neural networks are inspired by how our brains work. Think of them as interconnected nodes (neurons) organized in layers. Each connection has a "weight" that gets adjusted during training. Since you\'re a visual learner, imagine it like this: you have an input layer (the data you feed in), hidden layers (where processing happens), and an output layer (the result).',
          message_type: 'text'
        },
        {
          conversation_id: learningConv.id,
          role: 'user',
          content: 'How does the network learn?',
          message_type: 'text'
        },
        {
          conversation_id: learningConv.id,
          role: 'assistant',
          content: 'Great question! The network learns through a process called "backpropagation." When the network makes a prediction, it compares it to the correct answer. If there\'s a difference (error), it works backwards through the layers, adjusting the weights. Over many iterations, these weights get fine-tuned. It\'s like learning from mistakes - each adjustment makes the network better at future predictions.',
          message_type: 'text'
        }
      ];

      const { error: learningMsgError } = await supabase
        .from('messages')
        .insert(learningMessages);

      if (learningMsgError) {
        console.error('   ❌ Error creating learning messages:', learningMsgError.message);
      } else {
        console.log('   ✅ Created learning conversation with messages');
      }
    }

    // Advocacy conversation
    const { data: advocacyConv, error: advocacyConvError } = await supabase
      .from('conversations')
      .insert({
        user_id: userId,
        title: 'Salary Negotiation Discussion',
        mode: 'advocacy',
        context: { scenario: 'salary_negotiation', recipient: 'manager' },
        is_active: false
      })
      .select()
      .single();

    if (advocacyConvError) {
      console.error('   ❌ Error creating advocacy conversation:', advocacyConvError.message);
    } else {
      const advocacyMessages = [
        {
          conversation_id: advocacyConv.id,
          role: 'user',
          content: 'I need help writing a salary negotiation email to my manager',
          message_type: 'text'
        },
        {
          conversation_id: advocacyConv.id,
          role: 'assistant',
          content: 'I\'d be happy to help! Let me understand your situation better. What\'s your current position, how long have you been with the company, and what are some key achievements you\'d like to highlight?',
          message_type: 'text'
        },
        {
          conversation_id: advocacyConv.id,
          role: 'user',
          content: 'Senior Developer, 2 years, led a team of 5 and increased performance by 30%',
          message_type: 'text'
        },
        {
          conversation_id: advocacyConv.id,
          role: 'assistant',
          content: 'Perfect! Based on your profile, I\'ll craft a professional yet empathetic message that highlights your contributions. Here\'s a draft that aligns with your communication style...',
          message_type: 'text'
        }
      ];

      const { error: advocacyMsgError } = await supabase
        .from('messages')
        .insert(advocacyMessages);

      if (advocacyMsgError) {
        console.error('   ❌ Error creating advocacy messages:', advocacyMsgError.message);
      } else {
        console.log('   ✅ Created advocacy conversation with messages');
      }
    }

    // Step 7: Create advocacy sessions
    console.log('\n7️⃣  Creating advocacy sessions...');
    
    // Get a template ID for salary negotiation
    const { data: templates } = await supabase
      .from('advocacy_templates')
      .select('id')
      .eq('title', 'Salary Negotiation')
      .single();

    const advocacySessions = [
      {
        user_id: userId,
        conversation_id: advocacyConv?.id || null,
        template_id: templates?.id || null,
        scenario_type: 'salary_negotiation',
        context: {
          position: 'Senior Developer',
          current_salary: 95000,
          requested_salary: 110000,
          achievements: ['Led team of 5 developers', 'Increased product performance by 30%', 'Delivered 3 major features on time'],
          time_period: '2 years',
          location: 'San Francisco Bay Area'
        },
        generated_message: `Dear [Manager Name],

Thank you for the opportunity to discuss my compensation. Based on my contributions over the past 2 years, including leading a team of 5 developers and increasing product performance by 30%, I would like to discuss a salary adjustment.

After researching market rates for Senior Developer positions in the San Francisco Bay Area, I believe a salary of $110,000 would be appropriate given my experience and the value I bring to the team.

I am open to discussing this further at your convenience.

Best regards,
${DEMO_NAME}`,
        outcome: 'successful',
        feedback: 'Received positive response and salary adjustment approved!',
        rating: 5,
        completed_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        scenario_type: 'fee_extension',
        context: {
          recipient: 'Billing Department',
          payment_type: 'Tuition Fee',
          due_date: '2024-02-15',
          reason: 'Unexpected medical expenses',
          organization: 'University',
          requested_date: '2024-03-15'
        },
        generated_message: `Dear Billing Department,

I hope this message finds you well. I am writing to respectfully request an extension for Tuition Fee that is currently due on 2024-02-15.

I have encountered unexpected medical expenses that have temporarily affected my financial situation. I have maintained a consistent track record with University and am committed to fulfilling my obligations. I would be grateful if you could consider extending the deadline to 2024-03-15.

Thank you for your understanding and consideration.

Best regards,
${DEMO_NAME}`,
        outcome: 'successful',
        feedback: 'Extension granted with no late fees. Very understanding response.',
        rating: 5,
        completed_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    await supabase.from('advocacy_sessions').delete().eq('user_id', userId);
    const { error: advocacyError } = await supabase
      .from('advocacy_sessions')
      .insert(advocacySessions);

    if (advocacyError) {
      console.error('   ❌ Error creating advocacy sessions:', advocacyError.message);
    } else {
      console.log(`   ✅ Created ${advocacySessions.length} advocacy sessions`);
    }

    // Step 8: Create neural insights
    console.log('\n8️⃣  Creating neural insights...');
    const insights = [
      {
        user_id: userId,
        insight_type: 'pattern',
        title: 'Optimal Learning Time Detected',
        description: 'Your cognitive twin noticed you perform best between 9:00 AM and 11:00 AM. Consider scheduling important learning sessions during this window for maximum retention.',
        priority: 'medium',
        is_actionable: true,
        is_read: false,
        action_taken: false,
        metadata: { optimalHours: { start: 9, end: 11 }, category: 'learning_pattern' }
      },
      {
        user_id: userId,
        insight_type: 'learning',
        title: 'Visual Learning Efficiency Increased',
        description: 'Your visual learning efficiency has increased by 15% in technical subjects. Keep using visual aids and diagrams!',
        priority: 'low',
        is_actionable: false,
        is_read: false,
        metadata: { improvement: 15, category: 'technical' }
      },
      {
        user_id: userId,
        insight_type: 'recommendation',
        title: 'Communication Style Adjustment',
        description: 'Your cognitive twin suggests using "Professional-Empathetic" style for upcoming salary negotiation based on your patterns.',
        priority: 'high',
        is_actionable: true,
        is_read: false,
        action_taken: false,
        metadata: { suggestedStyle: 'Professional-Empathetic', context: 'salary_negotiation' }
      },
      {
        user_id: userId,
        insight_type: 'pattern',
        title: 'High Engagement with Hands-On Practice',
        description: 'Sessions using kinesthetic learning style show 12% higher engagement. Consider incorporating more practical exercises.',
        priority: 'medium',
        is_actionable: true,
        is_read: false,
        action_taken: false,
        metadata: { engagementIncrease: 12, learningStyle: 'Kinesthetic' }
      },
      {
        user_id: userId,
        insight_type: 'communication',
        title: 'Advocacy Success Rate: 100%',
        description: 'Your advocacy messages have a 100% success rate! Your professional yet empathetic communication style is highly effective.',
        priority: 'low',
        is_actionable: false,
        is_read: false,
        metadata: { successRate: 100, totalSessions: 2 }
      }
    ];

    await supabase.from('neural_insights').delete().eq('user_id', userId);
    const { error: insightsError } = await supabase
      .from('neural_insights')
      .insert(insights);

    if (insightsError) {
      console.error('   ❌ Error creating insights:', insightsError.message);
    } else {
      console.log(`   ✅ Created ${insights.length} neural insights`);
    }

    // Step 9: Create voice profile
    console.log('\n9️⃣  Creating voice profile...');
    await supabase.from('voice_profiles').delete().eq('user_id', userId);
    const { error: voiceError } = await supabase
      .from('voice_profiles')
      .insert({
        user_id: userId,
        voice_name: 'Neural',
        voice_settings: {
          pitch: 1.0,
          rate: 1.0,
          volume: 1.0
        },
        language: 'en-US',
        is_default: true
      });

    if (voiceError) {
      console.error('   ❌ Error creating voice profile:', voiceError.message);
    } else {
      console.log('   ✅ Voice profile created');
    }

    console.log('\n✨ Comprehensive seed process completed!\n');
    console.log('📋 Demo Account Credentials:');
    console.log(`   Email: ${DEMO_EMAIL}`);
    console.log(`   Password: ${DEMO_PASSWORD}`);
    console.log('\n📊 Seeded Data Summary:');
    console.log(`   ✅ 1 User Profile`);
    console.log(`   ✅ 1 Cognitive Twin`);
    console.log(`   ✅ ${goals.length} Learning Goals`);
    console.log(`   ✅ ${sessions.length} Learning Sessions`);
    console.log(`   ✅ 2 Conversations with Messages`);
    console.log(`   ✅ ${advocacySessions.length} Advocacy Sessions`);
    console.log(`   ✅ ${insights.length} Neural Insights`);
    console.log(`   ✅ 1 Voice Profile`);
    console.log('\n🚀 You can now log in and explore all features!');
    console.log('   Dashboard: /dashboard');
    console.log('   Learning Analytics: /dashboard/learning');
    console.log('   Chat: /dashboard/chat');
    console.log('   Profile: /dashboard/profile');

  } catch (error) {
    console.error('\n❌ Unexpected error:', error);
    console.error(error.stack);
  }
}

// Run the seed function
seedDemoAccount();
