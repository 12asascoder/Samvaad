-- Seed Data for Samvaad Demo
-- This creates sample data to showcase the platform

-- Note: This seed script assumes the database migration has been run
-- Run this in Supabase SQL Editor after setting up your project

-- ============================================
-- ADMIN USER DATA
-- ============================================

-- Create or update admin user profile
-- Note: You'll need to create the auth user first via the app signup
-- Then update this profile with the actual user ID
-- For demo purposes, this creates a sample profile structure

-- Example: After creating a user via signup with email "admin@samvaad.demo"
-- Update the profile:
INSERT INTO profiles (
  id,
  full_name,
  learning_style,
  communication_preference,
  preferred_language,
  accessibility_settings
) VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid, -- Replace with actual user ID
  'Demo Admin',
  'Visual',
  'Professional',
  'en',
  '{
    "high_contrast": false,
    "text_to_speech": true,
    "speech_to_text": true,
    "reduced_motion": false,
    "font_size": "medium"
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  learning_style = EXCLUDED.learning_style,
  communication_preference = EXCLUDED.communication_preference;

-- ============================================
-- COGNITIVE TWIN DATA
-- ============================================

INSERT INTO cognitive_twins (
  user_id,
  comprehension_score,
  communication_score,
  adaptability_score,
  learning_velocity,
  optimal_learning_hours,
  strengths,
  areas_for_improvement,
  neural_patterns
) VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid, -- Replace with actual user ID
  92.5,
  88.0,
  91.0,
  1.15,
  '{"start": 9, "end": 11}'::jsonb,
  '["Visual Learning", "Pattern Recognition", "Self-Correction"]'::jsonb,
  '["Advanced Mathematical Concepts", "Public Speaking"]'::jsonb,
  '{
    "preferredExplanationLength": "moderate",
    "visualLearningAffinity": 9,
    "abstractThinkingLevel": 7,
    "practicalApplicationPreference": 8,
    "repetitionNeeded": 2,
    "feedbackResponseType": "encouraging",
    "stressResponsePattern": "focused",
    "socialInteractionComfort": 7
  }'::jsonb
)
ON CONFLICT DO NOTHING;

-- ============================================
-- LEARNING GOALS
-- ============================================

INSERT INTO learning_goals (
  user_id,
  title,
  description,
  progress,
  status,
  category,
  target_date
) VALUES
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Master Machine Learning Fundamentals',
  'Understand core ML concepts including supervised and unsupervised learning, neural networks, and model evaluation',
  65,
  'active',
  'technical',
  (CURRENT_DATE + INTERVAL '3 months')
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Improve Public Speaking Skills',
  'Build confidence in presenting ideas to large audiences',
  45,
  'active',
  'communication',
  (CURRENT_DATE + INTERVAL '2 months')
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Learn Spanish Fluently',
  'Achieve conversational fluency in Spanish for work opportunities',
  80,
  'active',
  'language',
  (CURRENT_DATE + INTERVAL '6 months')
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Financial Literacy Mastery',
  'Understand personal finance, investments, and budgeting',
  90,
  'active',
  'professional',
  (CURRENT_DATE + INTERVAL '1 month')
);

-- ============================================
-- LEARNING SESSIONS (Sample History)
-- ============================================

INSERT INTO learning_sessions (
  user_id,
  topic,
  duration_minutes,
  comprehension_level,
  engagement_score,
  mistakes_count,
  corrections_made,
  learning_style_used,
  session_notes,
  started_at
) VALUES
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Introduction to Neural Networks',
  45,
  88,
  85,
  2,
  2,
  'Visual',
  'Great session! Visual diagrams helped understand the concepts better.',
  (NOW() - INTERVAL '2 days')
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Spanish Verb Conjugations',
  30,
  75,
  80,
  4,
  3,
  'Auditory',
  'Practice with audio pronunciation was very helpful.',
  (NOW() - INTERVAL '5 days')
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Investment Strategies',
  60,
  95,
  90,
  0,
  0,
  'Visual',
  'Excellent comprehension. Ready to move to advanced topics.',
  (NOW() - INTERVAL '1 week')
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Presentation Techniques',
  40,
  70,
  75,
  3,
  2,
  'Kinesthetic',
  'Hands-on practice with mock presentations improved confidence.',
  (NOW() - INTERVAL '3 days')
);

-- ============================================
-- NEURAL INSIGHTS
-- ============================================

INSERT INTO neural_insights (
  user_id,
  insight_type,
  title,
  description,
  priority,
  is_actionable,
  metadata
) VALUES
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'pattern',
  'Optimal Learning Time Detected',
  'Your cognitive twin noticed you perform best between 9:00 AM and 11:00 AM. Consider scheduling important learning sessions during this window.',
  'medium',
  true,
  '{"optimalHours": {"start": 9, "end": 11}}'::jsonb
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'achievement',
  'Visual Learning Efficiency Increased',
  'Your visual learning efficiency has increased by 15% in technical subjects. Keep using visual aids and diagrams!',
  'low',
  false,
  '{"improvement": 15, "category": "technical"}'::jsonb
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'recommendation',
  'Communication Style Adjustment',
  'Your cognitive twin suggests using "Professional-Empathetic" style for upcoming salary negotiation based on your patterns.',
  'high',
  true,
  '{"suggestedStyle": "Professional-Empathetic", "context": "salary_negotiation"}'::jsonb
);

-- ============================================
-- CONVERSATIONS (Sample Chat History)
-- ============================================

-- Create a learning conversation
INSERT INTO conversations (
  user_id,
  title,
  mode,
  context,
  is_active
) VALUES
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Neural Networks Learning Session',
  'learning',
  '{"topic": "Neural Networks", "difficulty": "intermediate"}'::jsonb,
  false
)
RETURNING id;

-- Note: The conversation ID above will be used for messages
-- In practice, you'd capture this ID and insert messages

-- ============================================
-- ADVOCACY SESSIONS (Sample)
-- ============================================

INSERT INTO advocacy_sessions (
  user_id,
  scenario_type,
  context,
  generated_message,
  outcome,
  feedback,
  rating
) VALUES
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'salary_negotiation',
  '{
    "position": "Senior Developer",
    "current_salary": 95000,
    "requested_salary": 110000,
    "achievements": ["Led team of 5 developers", "Increased product performance by 30%"]
  }'::jsonb,
  'Dear [Manager Name],

Thank you for the opportunity to discuss my compensation. Based on my contributions over the past year, including leading a team of 5 developers and increasing product performance by 30%, I would like to discuss a salary adjustment.

After researching market rates for Senior Developer positions in our area, I believe a salary of $110,000 would be appropriate given my experience and the value I bring to the team.

I am open to discussing this further at your convenience.

Best regards,
Demo Admin',
  'successful',
  'Received positive response and salary adjustment approved!',
  5
);

-- ============================================
-- INSTRUCTIONS FOR USE
-- ============================================

-- TO USE THIS SEED DATA:
-- 1. First, create a user account via the app signup (e.g., admin@samvaad.demo)
-- 2. In Supabase Dashboard → Authentication → Users, find the user you created
-- 3. Copy the user's UUID (ID)
-- 4. Replace all instances of '00000000-0000-0000-0000-000000000001' in this file with the actual UUID
-- 5. Run this script in Supabase SQL Editor
-- 6. Refresh your app and log in with the seeded account to see the demo data

-- ALTERNATIVE: Use this quick query after creating a user to get their ID:
-- SELECT id, email FROM auth.users WHERE email = 'admin@samvaad.demo';
