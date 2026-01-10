-- Samvaad Database Schema
-- Human-Centered AI Platform for Learning and Advocacy

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table for user cognitive twin settings
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  learning_style TEXT DEFAULT 'Visual' CHECK (learning_style IN ('Visual', 'Auditory', 'Kinesthetic', 'Reading/Writing')),
  communication_preference TEXT DEFAULT 'Professional' CHECK (communication_preference IN ('Professional', 'Casual', 'Empathetic', 'Direct')),
  preferred_language TEXT DEFAULT 'en',
  timezone TEXT DEFAULT 'UTC',
  accessibility_settings JSONB DEFAULT '{"high_contrast": false, "text_to_speech": false, "speech_to_text": false, "reduced_motion": false, "font_size": "medium"}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cognitive Twin data - stores learning patterns and preferences
CREATE TABLE IF NOT EXISTS cognitive_twins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  comprehension_score DECIMAL(5,2) DEFAULT 0,
  communication_score DECIMAL(5,2) DEFAULT 0,
  adaptability_score DECIMAL(5,2) DEFAULT 0,
  learning_velocity DECIMAL(5,2) DEFAULT 1.0,
  optimal_learning_hours JSONB DEFAULT '{"start": 8, "end": 10}'::jsonb,
  strengths JSONB DEFAULT '[]'::jsonb,
  areas_for_improvement JSONB DEFAULT '[]'::jsonb,
  neural_patterns JSONB DEFAULT '{}'::jsonb,
  last_sync_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Learning sessions tracking
CREATE TABLE IF NOT EXISTS learning_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  topic TEXT NOT NULL,
  duration_minutes INTEGER DEFAULT 0,
  comprehension_level DECIMAL(5,2),
  engagement_score DECIMAL(5,2),
  mistakes_count INTEGER DEFAULT 0,
  corrections_made INTEGER DEFAULT 0,
  learning_style_used TEXT,
  session_notes TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Learning goals
CREATE TABLE IF NOT EXISTS learning_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_date DATE,
  progress DECIMAL(5,2) DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'abandoned')),
  category TEXT,
  milestones JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversations (both learning and advocacy)
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  mode TEXT NOT NULL CHECK (mode IN ('learning', 'advocacy', 'general')),
  context JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages within conversations
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'voice', 'template', 'action')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Advocacy templates for common scenarios
CREATE TABLE IF NOT EXISTS advocacy_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  template_content TEXT NOT NULL,
  variables JSONB DEFAULT '[]'::jsonb,
  cultural_context TEXT,
  formality_level TEXT DEFAULT 'professional' CHECK (formality_level IN ('casual', 'professional', 'formal', 'diplomatic')),
  success_rate DECIMAL(5,2),
  usage_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT true,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User's advocacy history
CREATE TABLE IF NOT EXISTS advocacy_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  template_id UUID REFERENCES advocacy_templates(id) ON DELETE SET NULL,
  scenario_type TEXT NOT NULL,
  context JSONB NOT NULL,
  generated_message TEXT,
  outcome TEXT CHECK (outcome IN ('pending', 'successful', 'partially_successful', 'unsuccessful', 'cancelled')),
  feedback TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Neural insights generated by the cognitive twin
CREATE TABLE IF NOT EXISTS neural_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  insight_type TEXT NOT NULL CHECK (insight_type IN ('learning', 'communication', 'pattern', 'recommendation', 'warning')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  is_read BOOLEAN DEFAULT false,
  is_actionable BOOLEAN DEFAULT false,
  action_taken BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Voice profiles for accessibility
CREATE TABLE IF NOT EXISTS voice_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  voice_name TEXT NOT NULL,
  voice_settings JSONB DEFAULT '{"pitch": 1.0, "rate": 1.0, "volume": 1.0}'::jsonb,
  language TEXT DEFAULT 'en-US',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default advocacy templates
INSERT INTO advocacy_templates (title, category, description, template_content, variables, cultural_context, formality_level) VALUES
('Fee Extension Request', 'financial', 'Request for deadline extension on payments', 
'Dear {{recipient}},

I hope this message finds you well. I am writing to respectfully request an extension for {{payment_type}} that is currently due on {{due_date}}.

{{reason}}

I have maintained a consistent track record with {{organization}} and am committed to fulfilling my obligations. I would be grateful if you could consider extending the deadline to {{requested_date}}.

Thank you for your understanding and consideration.

Best regards,
{{sender_name}}',
'["recipient", "payment_type", "due_date", "reason", "organization", "requested_date", "sender_name"]'::jsonb,
'formal_western', 'formal'),

('Salary Negotiation', 'career', 'Professional salary negotiation message',
'Dear {{manager_name}},

Thank you for the opportunity to discuss my compensation. Based on my contributions over the past {{time_period}}, including {{achievements}}, I would like to discuss a salary adjustment.

After researching market rates for {{position}} in {{location}}, I believe a salary of {{requested_salary}} would be appropriate given my experience and the value I bring to the team.

I am open to discussing this further at your convenience.

Best regards,
{{sender_name}}',
'["manager_name", "time_period", "achievements", "position", "location", "requested_salary", "sender_name"]'::jsonb,
'professional_western', 'professional'),

('Service Booking Assistance', 'services', 'Help booking essential services',
'Hello,

I would like to book {{service_type}} for {{date_time}}. 

{{special_requirements}}

Please confirm availability and any preparation needed on my part.

Thank you,
{{sender_name}}
{{contact_info}}',
'["service_type", "date_time", "special_requirements", "sender_name", "contact_info"]'::jsonb,
'neutral', 'casual'),

('Complaint Resolution', 'customer_service', 'Professional complaint with resolution request',
'Dear Customer Service Team,

I am writing regarding {{issue_description}} that occurred on {{date}}.

{{details}}

I have been a loyal customer for {{duration}} and this experience has been disappointing. I would appreciate {{resolution_request}}.

Please respond at your earliest convenience.

Regards,
{{sender_name}}
Account/Order: {{reference_number}}',
'["issue_description", "date", "details", "duration", "resolution_request", "sender_name", "reference_number"]'::jsonb,
'assertive_professional', 'professional');

-- Row Level Security Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cognitive_twins ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE advocacy_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE advocacy_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE neural_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Cognitive twins policies
CREATE POLICY "Users can view own cognitive twin" ON cognitive_twins FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own cognitive twin" ON cognitive_twins FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cognitive twin" ON cognitive_twins FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Learning sessions policies
CREATE POLICY "Users can view own learning sessions" ON learning_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own learning sessions" ON learning_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own learning sessions" ON learning_sessions FOR UPDATE USING (auth.uid() = user_id);

-- Learning goals policies
CREATE POLICY "Users can manage own learning goals" ON learning_goals FOR ALL USING (auth.uid() = user_id);

-- Conversations policies
CREATE POLICY "Users can manage own conversations" ON conversations FOR ALL USING (auth.uid() = user_id);

-- Messages policies
CREATE POLICY "Users can view messages in own conversations" ON messages FOR SELECT 
  USING (EXISTS (SELECT 1 FROM conversations WHERE conversations.id = messages.conversation_id AND conversations.user_id = auth.uid()));
CREATE POLICY "Users can insert messages in own conversations" ON messages FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM conversations WHERE conversations.id = messages.conversation_id AND conversations.user_id = auth.uid()));

-- Advocacy templates policies (public templates viewable by all, own templates manageable)
CREATE POLICY "Anyone can view public templates" ON advocacy_templates FOR SELECT USING (is_public = true OR created_by = auth.uid());
CREATE POLICY "Users can create templates" ON advocacy_templates FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update own templates" ON advocacy_templates FOR UPDATE USING (auth.uid() = created_by);

-- Advocacy sessions policies
CREATE POLICY "Users can manage own advocacy sessions" ON advocacy_sessions FOR ALL USING (auth.uid() = user_id);

-- Neural insights policies
CREATE POLICY "Users can manage own insights" ON neural_insights FOR ALL USING (auth.uid() = user_id);

-- Voice profiles policies
CREATE POLICY "Users can manage own voice profiles" ON voice_profiles FOR ALL USING (auth.uid() = user_id);

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.cognitive_twins (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cognitive_twins_updated_at BEFORE UPDATE ON cognitive_twins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_learning_goals_updated_at BEFORE UPDATE ON learning_goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_advocacy_templates_updated_at BEFORE UPDATE ON advocacy_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_voice_profiles_updated_at BEFORE UPDATE ON voice_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
