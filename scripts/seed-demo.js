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
 * - Demo user account (demo.samvaad@gmail.com / Demo@Samvaad2024!)
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
// Using Gmail format for better Supabase compatibility
const DEMO_EMAIL = 'demo.samvaad@gmail.com';
const DEMO_PASSWORD = 'Demo@Samvaad2024!';
const DEMO_NAME = 'Samvaad Demo User';

async function seedDemoAccount() {
  console.log('🌱 Starting comprehensive demo seed process...\n');

  try {
    let userId;

    // Step 1: Create or get auth user
    console.log('1️⃣  Creating demo user account...');
    console.log(`   Email: ${DEMO_EMAIL}`);
    
    // First, try to sign in (in case user already exists)
    const { data: signInData, error: signInError } = await supabaseAnon.auth.signInWithPassword({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD
    });
    
    if (signInData?.user && !signInError) {
      userId = signInData.user.id;
      console.log('   ✅ User already exists, signed in with ID:', userId);
    } else {
      // User doesn't exist, try to create with service role (bypasses email validation)
      if (supabaseServiceKey && supabaseServiceKey !== supabaseAnonKey) {
        console.log('   ℹ️  Using service role to create user (bypasses email validation)...');
        try {
          const { data: adminData, error: adminError } = await supabase.auth.admin.createUser({
            email: DEMO_EMAIL,
            password: DEMO_PASSWORD,
            email_confirm: true, // Auto-confirm email
            user_metadata: {
              full_name: DEMO_NAME,
            }
          });
          
          if (adminError) {
            if (adminError.message.includes('already registered') || adminError.message.includes('already been registered') || adminError.message.includes('User already registered')) {
              console.log('   ℹ️  User exists, trying sign in...');
              const { data: retrySignIn, error: retryError } = await supabaseAnon.auth.signInWithPassword({
                email: DEMO_EMAIL,
                password: DEMO_PASSWORD
              });
              if (retryError || !retrySignIn?.user) {
                console.error('   ❌ Could not access existing user:', retryError?.message);
                console.error('   💡 Tip: Try deleting the user from Supabase Auth dashboard and run again');
                return;
              }
              userId = retrySignIn.user.id;
              console.log('   ✅ Signed in with existing user ID:', userId);
            } else {
              console.error('   ❌ Error creating user with admin:', adminError.message);
              // Fallback to regular signup
              console.log('   ℹ️  Falling back to regular signup...');
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
                console.error('   ❌ Error creating user:', authError.message);
                console.error('   💡 Possible solutions:');
                console.error('      1. Check Supabase Auth settings → Email Auth → Disable email confirmation');
                console.error('      2. Use a real email address you can verify');
                console.error('      3. Check if email domain is blocked in Supabase settings');
                return;
              }
              
              if (authData?.user) {
                userId = authData.user.id;
                console.log('   ✅ User created with ID:', userId);
              } else {
                console.error('   ❌ User creation failed: No user data returned');
                return;
              }
            }
          } else if (adminData?.user) {
            userId = adminData.user.id;
            console.log('   ✅ User created with admin API, ID:', userId);
          }
        } catch (adminErr) {
          console.error('   ❌ Admin API error:', adminErr.message);
          console.log('   ℹ️  Falling back to regular signup...');
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
            console.error('   ❌ Error creating user:', authError.message);
            return;
          }
          
          if (authData?.user) {
            userId = authData.user.id;
            console.log('   ✅ User created with ID:', userId);
          } else {
            console.error('   ❌ User creation failed: No user data returned');
            return;
          }
        }
      } else {
        // No service role key, use regular signup
        console.log('   ℹ️  Using regular signup (service role key not available)...');
        console.log('   💡 Tip: Add SUPABASE_SERVICE_ROLE_KEY to .env.local for better user creation');
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
            const { data: retrySignIn, error: retryError } = await supabaseAnon.auth.signInWithPassword({
              email: DEMO_EMAIL,
              password: DEMO_PASSWORD
            });
            if (retryError || !retrySignIn?.user) {
              console.error('   ❌ Could not access existing user:', retryError?.message);
              return;
            }
            userId = retrySignIn.user.id;
            console.log('   ✅ Signed in with existing user ID:', userId);
          } else {
            console.error('   ❌ Error creating user:', authError.message);
            console.error('   💡 Tip: Add SUPABASE_SERVICE_ROLE_KEY to .env.local to bypass email validation');
            return;
          }
        } else if (authData?.user) {
          userId = authData.user.id;
          console.log('   ✅ User created with ID:', userId);
        } else {
          console.error('   ❌ User creation failed: No user data returned');
          return;
        }
      }
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
        font_size: 'medium',
        font_style: 'default',
        line_spacing: 'normal',
        speech_rate: 1.0,
        voice_type: 'neutral',
        audio_volume: 1.0,
        screen_reader_support: false,
        large_text_mode: false,
        color_blind_mode: false,
        live_captions: false,
        visual_alerts: false,
        simplified_language: false,
        focus_mode: false,
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
      const { error } = await supabase.from('cognitive_twins').update(twinData).eq('user_id', userId);
      twinError = error;
    } else {
      const { error } = await supabase.from('cognitive_twins').insert(twinData);
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
        category: 'Technical',
        description: 'Learn core ML concepts, algorithms, and practical applications',
        target_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 65,
        milestones: [
          { title: 'Complete Linear Regression', completed: true },
          { title: 'Learn Neural Networks', completed: true },
          { title: 'Build First ML Model', completed: false },
          { title: 'Deploy Model to Production', completed: false }
        ]
      },
      {
        user_id: userId,
        title: 'Improve Public Speaking Skills',
        category: 'Communication',
        description: 'Build confidence and clarity in public presentations',
        target_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 45,
        milestones: [
          { title: 'Complete Speech Writing Course', completed: true },
          { title: 'Practice with Small Groups', completed: false },
          { title: 'Deliver First Public Talk', completed: false }
        ]
      },
      {
        user_id: userId,
        title: 'Learn Spanish Fluently',
        category: 'Language',
        description: 'Achieve conversational fluency in Spanish',
        target_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 80,
        milestones: [
          { title: 'Complete Beginner Course', completed: true },
          { title: 'Master Verb Conjugations', completed: true },
          { title: 'Practice with Native Speakers', completed: true },
          { title: 'Pass B2 Certification', completed: false }
        ]
      },
      {
        user_id: userId,
        title: 'Financial Literacy Mastery',
        category: 'Professional',
        description: 'Understand personal finance, investing, and wealth building',
        target_date: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 90,
        milestones: [
          { title: 'Learn Budgeting Basics', completed: true },
          { title: 'Understand Investment Options', completed: true },
          { title: 'Create Investment Portfolio', completed: true },
          { title: 'Plan Retirement Strategy', completed: false }
        ]
      },
      {
        user_id: userId,
        title: 'Conflict Resolution Techniques',
        category: 'Communication',
        description: 'Master negotiation and conflict resolution skills',
        target_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        progress: 75,
        milestones: [
          { title: 'Learn Active Listening', completed: true },
          { title: 'Practice Mediation Techniques', completed: true },
          { title: 'Apply in Real Scenarios', completed: false }
        ]
      }
    ];

    const { error: goalsError } = await supabase.from('learning_goals').upsert(goals, { onConflict: 'id' });
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
        learning_style_used: 'Visual',
        session_notes: 'Excellent grasp of basic concepts. Visual learning style very effective.'
      },
      {
        user_id: userId,
        topic: 'Spanish Verb Conjugations',
        duration_minutes: 30,
        comprehension_level: 75,
        learning_style_used: 'Auditory',
        session_notes: 'Struggling with irregular verbs. Needs more repetition.'
      },
      {
        user_id: userId,
        topic: 'Investment Portfolio Diversification',
        duration_minutes: 60,
        comprehension_level: 92,
        learning_style_used: 'Reading/Writing',
        session_notes: 'Strong understanding of risk management principles.'
      },
      {
        user_id: userId,
        topic: 'Public Speaking: Body Language',
        duration_minutes: 25,
        comprehension_level: 70,
        learning_style_used: 'Kinesthetic',
        session_notes: 'Needs more practice with gestures and eye contact.'
      },
      {
        user_id: userId,
        topic: 'Conflict Resolution: Active Listening',
        duration_minutes: 40,
        comprehension_level: 85,
        learning_style_used: 'Auditory',
        session_notes: 'Good progress on empathy and understanding perspectives.'
      },
      {
        user_id: userId,
        topic: 'Machine Learning: Gradient Descent',
        duration_minutes: 50,
        comprehension_level: 90,
        learning_style_used: 'Visual',
        session_notes: 'Excellent visualization helped understand the concept quickly.'
      }
    ];

    const { error: sessionsError } = await supabase.from('learning_sessions').insert(sessions);
    if (sessionsError) {
      console.error('   ❌ Error creating sessions:', sessionsError.message);
    } else {
      console.log(`   ✅ Created ${sessions.length} learning sessions`);
    }

    // Step 6: Create conversations and messages
    console.log('\n6️⃣  Creating conversations and messages...');
    
    // Learning conversation
    const { data: learningConv, error: conv1Error } = await supabase
      .from('conversations')
      .insert({
        user_id: userId,
        mode: 'learning',
        title: 'Understanding Neural Networks',
        context: { topic: 'machine_learning', difficulty: 'intermediate' }
      })
      .select()
      .single();

    if (conv1Error) {
      console.error('   ❌ Error creating learning conversation:', conv1Error.message);
    } else {
      const learningMessages = [
        {
          conversation_id: learningConv.id,
          role: 'user',
          content: 'Can you explain neural networks in a simple way?',
          metadata: { learning_style: 'visual' }
        },
        {
          conversation_id: learningConv.id,
          role: 'assistant',
          content: 'Absolutely! Think of a neural network like a simplified version of how your brain works. Imagine you have layers of interconnected "neurons" (nodes) that process information. Each connection has a "weight" that determines how much influence it has. When you feed data in, it flows through these layers, getting transformed at each step, until you get an output - like recognizing a cat in a photo or predicting tomorrow\'s weather. The network "learns" by adjusting these weights based on examples, getting better over time!',
          metadata: { explanation_style: 'analogy', visual_aids: true }
        },
        {
          conversation_id: learningConv.id,
          role: 'user',
          content: 'That makes sense! How does it actually learn?',
          metadata: { follow_up: true }
        },
        {
          conversation_id: learningConv.id,
          role: 'assistant',
          content: 'Great question! The learning process uses something called "backpropagation." Here\'s the simple version: 1) The network makes a prediction, 2) We compare it to the correct answer and calculate the error, 3) We work backwards through the network, adjusting the weights to reduce that error. It\'s like practicing a skill - you try, see how close you were, adjust, and try again. Over many examples, the network gets really good at the task!',
          metadata: { explanation_style: 'step_by_step', complexity: 'simplified' }
        }
      ];

      const { error: msg1Error } = await supabase.from('messages').insert(learningMessages);
      if (msg1Error) {
        console.error('   ❌ Error creating learning messages:', msg1Error.message);
      } else {
        console.log('   ✅ Created learning conversation with messages');
      }
    }

    // Advocacy conversation
    const { data: advocacyConv, error: conv2Error } = await supabase
      .from('conversations')
      .insert({
        user_id: userId,
        mode: 'advocacy',
        title: 'Salary Negotiation Email',
        context: { template: 'salary_negotiation', outcome: 'pending' }
      })
      .select()
      .single();

    if (conv2Error) {
      console.error('   ❌ Error creating advocacy conversation:', conv2Error.message);
    } else {
      const advocacyMessages = [
        {
          conversation_id: advocacyConv.id,
          role: 'user',
          content: 'I need help writing a professional email to negotiate my salary.',
          metadata: { context: 'career_advancement' }
        },
        {
          conversation_id: advocacyConv.id,
          role: 'assistant',
          content: 'I\'d be happy to help you craft a professional salary negotiation email. Here\'s a template that balances assertiveness with respect:\n\nSubject: Discussion Regarding Compensation\n\nDear [Manager\'s Name],\n\nI hope this message finds you well. I wanted to take a moment to discuss my compensation, as I believe my contributions and growth in the role warrant a review.\n\nSince joining the team, I have [specific achievements]. I am committed to continuing to deliver value and would appreciate the opportunity to discuss aligning my compensation with my contributions.\n\nI would be happy to schedule a time to discuss this further at your convenience.\n\nThank you for your consideration.\n\nBest regards,\n[Your Name]',
          metadata: { template_used: 'salary_negotiation', tone: 'professional' }
        }
      ];

      const { error: msg2Error } = await supabase.from('messages').insert(advocacyMessages);
      if (msg2Error) {
        console.error('   ❌ Error creating advocacy messages:', msg2Error.message);
      } else {
        console.log('   ✅ Created advocacy conversation with messages');
      }
    }

    // Step 7: Create advocacy sessions
    console.log('\n7️⃣  Creating advocacy sessions...');
    const advocacySessions = [
      {
        user_id: userId,
        scenario_type: 'salary_negotiation',
        template_used: 'salary_negotiation',
        message_content: 'Professional salary negotiation email sent to manager',
        outcome: 'pending',
        context: { cultural_context: 'professional', recipient: 'manager', urgency: 'medium' }
      },
      {
        user_id: userId,
        scenario_type: 'service_booking',
        template_used: 'service_booking',
        message_content: 'Requested appointment for medical consultation',
        outcome: 'confirmed',
        context: { cultural_context: 'neutral', service_type: 'medical', date_requested: new Date().toISOString() }
      }
    ];

    const { error: advocacyError } = await supabase.from('advocacy_sessions').insert(advocacySessions);
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
        description: 'Your cognitive twin noticed you perform best between 9:00 AM and 11:00 AM. Consider scheduling important learning sessions during this window.',
        priority: 'medium',
        is_actionable: true,
        metadata: { optimalHours: { start: 9, end: 11 }, confidence: 0.87 }
      },
      {
        user_id: userId,
        insight_type: 'learning',
        title: 'Visual Learning Efficiency Increased',
        description: 'Your visual learning efficiency has increased by 15% in technical subjects. Keep using visual aids and diagrams!',
        priority: 'low',
        is_actionable: false,
        metadata: { improvement: 15, category: 'technical', trend: 'positive' }
      },
      {
        user_id: userId,
        insight_type: 'recommendation',
        title: 'Focus on Public Speaking Practice',
        description: 'Based on your learning patterns, you might benefit from more structured practice sessions for public speaking. Consider joining a local Toastmasters group.',
        priority: 'high',
        is_actionable: true,
        metadata: { category: 'communication', suggestedAction: 'join_group' }
      }
    ];

    const { error: insightsError } = await supabase.from('neural_insights').insert(insights);
    if (insightsError) {
      console.error('   ❌ Error creating insights:', insightsError.message);
    } else {
      console.log(`   ✅ Created ${insights.length} neural insights`);
    }

    // Step 9: Create voice profile
    console.log('\n9️⃣  Creating voice profile...');
    const { error: voiceError } = await supabase.from('voice_profiles').upsert({
      user_id: userId,
      voice_name: 'en-US-AriaNeural',
      voice_settings: { pitch: 1.0, rate: 1.0, volume: 1.0 },
      language: 'en-US',
      is_default: true
    }, { onConflict: 'user_id' });

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
