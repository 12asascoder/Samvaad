/**
 * Seed Admin User Script
 * 
 * This script creates a demo admin user with sample data for pitching Samvaad
 * 
 * Usage:
 * 1. Set up your Supabase project and get credentials
 * 2. Update the .env.local file with your Supabase credentials
 * 3. Run: node scripts/seed-admin.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // You'll need to add this
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Supabase credentials not found in .env.local');
  console.error('Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

// Use anon key for client-side operations
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedAdminUser() {
  console.log('🌱 Starting seed process...\n');

  try {
    // Step 1: Create auth user
    console.log('1️⃣  Creating admin user...');
    const adminEmail = 'admin@samvaad.demo';
    const adminPassword = 'Admin@Samvaad2024!';
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
      options: {
        data: {
          full_name: 'Demo Admin',
          role: 'admin'
        }
      }
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('   ℹ️  User already exists, continuing...');
        // Try to sign in to get the user ID
        const { data: signInData } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: adminPassword
        });
        if (!signInData?.user) {
          console.error('   ❌ Could not access existing user');
          return;
        }
        var userId = signInData.user.id;
      } else {
        console.error('   ❌ Error creating user:', authError.message);
        return;
      }
    } else {
      userId = authData.user.id;
      console.log('   ✅ User created with ID:', userId);
    }

    // Step 2: Create profile
    console.log('\n2️⃣  Creating user profile...');
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        full_name: 'Demo Admin',
        learning_style: 'Visual',
        communication_preference: 'Professional',
        preferred_language: 'en',
        accessibility_settings: {
          high_contrast: false,
          text_to_speech: true,
          speech_to_text: true,
          reduced_motion: false,
          font_size: 'medium'
        }
      });

    if (profileError) {
      console.error('   ❌ Error creating profile:', profileError.message);
    } else {
      console.log('   ✅ Profile created');
    }

    // Step 3: Create cognitive twin
    console.log('\n3️⃣  Creating cognitive twin...');
    const { error: twinError } = await supabase
      .from('cognitive_twins')
      .upsert({
        user_id: userId,
        comprehension_score: 92.5,
        communication_score: 88.0,
        adaptability_score: 91.0,
        learning_velocity: 1.15,
        optimal_learning_hours: { start: 9, end: 11 },
        strengths: ['Visual Learning', 'Pattern Recognition', 'Self-Correction'],
        areas_for_improvement: ['Advanced Mathematical Concepts', 'Public Speaking'],
        neural_patterns: {
          preferredExplanationLength: 'moderate',
          visualLearningAffinity: 9,
          abstractThinkingLevel: 7,
          practicalApplicationPreference: 8,
          repetitionNeeded: 2,
          feedbackResponseType: 'encouraging',
          stressResponsePattern: 'focused',
          socialInteractionComfort: 7
        }
      });

    if (twinError) {
      console.error('   ❌ Error creating cognitive twin:', twinError.message);
    } else {
      console.log('   ✅ Cognitive twin created');
    }

    // Step 4: Create learning goals
    console.log('\n4️⃣  Creating learning goals...');
    const goals = [
      {
        user_id: userId,
        title: 'Master Machine Learning Fundamentals',
        description: 'Understand core ML concepts including supervised and unsupervised learning',
        progress: 65,
        status: 'active',
        category: 'technical',
        target_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      {
        user_id: userId,
        title: 'Improve Public Speaking Skills',
        description: 'Build confidence in presenting ideas to large audiences',
        progress: 45,
        status: 'active',
        category: 'communication',
        target_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      {
        user_id: userId,
        title: 'Learn Spanish Fluently',
        description: 'Achieve conversational fluency in Spanish for work opportunities',
        progress: 80,
        status: 'active',
        category: 'language',
        target_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }
    ];

    const { error: goalsError } = await supabase
      .from('learning_goals')
      .upsert(goals);

    if (goalsError) {
      console.error('   ❌ Error creating goals:', goalsError.message);
    } else {
      console.log('   ✅ Learning goals created');
    }

    // Step 5: Create learning sessions
    console.log('\n5️⃣  Creating sample learning sessions...');
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
        session_notes: 'Great session! Visual diagrams helped understand the concepts better.',
        started_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        topic: 'Spanish Verb Conjugations',
        duration_minutes: 30,
        comprehension_level: 75,
        engagement_score: 80,
        mistakes_count: 4,
        corrections_made: 3,
        learning_style_used: 'Auditory',
        session_notes: 'Practice with audio pronunciation was very helpful.',
        started_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    const { error: sessionsError } = await supabase
      .from('learning_sessions')
      .insert(sessions);

    if (sessionsError) {
      console.error('   ❌ Error creating sessions:', sessionsError.message);
    } else {
      console.log('   ✅ Learning sessions created');
    }

    // Step 6: Create neural insights
    console.log('\n6️⃣  Creating neural insights...');
    const insights = [
      {
        user_id: userId,
        insight_type: 'pattern',
        title: 'Optimal Learning Time Detected',
        description: 'Your cognitive twin noticed you perform best between 9:00 AM and 11:00 AM.',
        priority: 'medium',
        is_actionable: true,
        metadata: { optimalHours: { start: 9, end: 11 } }
      },
      {
        user_id: userId,
        insight_type: 'achievement',
        title: 'Visual Learning Efficiency Increased',
        description: 'Your visual learning efficiency has increased by 15% in technical subjects.',
        priority: 'low',
        is_actionable: false,
        metadata: { improvement: 15, category: 'technical' }
      }
    ];

    const { error: insightsError } = await supabase
      .from('neural_insights')
      .insert(insights);

    if (insightsError) {
      console.error('   ❌ Error creating insights:', insightsError.message);
    } else {
      console.log('   ✅ Neural insights created');
    }

    console.log('\n✨ Seed process completed!\n');
    console.log('📋 Demo Credentials:');
    console.log('   Email: admin@samvaad.demo');
    console.log('   Password: Admin@Samvaad2024!');
    console.log('\n🚀 You can now log in and see the demo data!');

  } catch (error) {
    console.error('\n❌ Unexpected error:', error);
  }
}

// Run the seed function
seedAdminUser();
