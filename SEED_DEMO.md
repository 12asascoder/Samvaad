# 🌱 Demo Account Seed Guide

This guide explains how to seed a comprehensive demo account with all features and sample data.

## Quick Start

1. **Set up environment variables**
   - Ensure `.env.local` has your Supabase credentials:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     ```

2. **Run the seed script**
   ```bash
   npm run seed:demo
   # or
   node scripts/seed-demo.js
   ```

3. **Log in with demo credentials**
   - Email: `demo@example.com`
   - Password: `Demo@Samvaad2024!`

## What Gets Seeded

The seed script creates a comprehensive demo account with:

### 👤 User Profile
- Full name and preferences
- Learning style: Visual
- Communication preference: Professional
- Accessibility settings enabled

### 🧠 Cognitive Twin
- **Comprehension Score**: 94.5%
- **Communication Score**: 88.0%
- **Adaptability Score**: 91.5%
- **Learning Velocity**: 1.25x
- **Optimal Learning Hours**: 9:00 AM - 11:00 AM
- **Strengths**: Visual Learning, Pattern Recognition, Self-Correction, Complex Problem Solving, Technical Concepts
- **Areas for Improvement**: Public Speaking, Advanced Mathematical Concepts, Social Negotiations
- **Neural Patterns**: Comprehensive pattern data including learning preferences, feedback responses, and social interaction comfort

### 🎯 Learning Goals (5 goals)
1. **Master Machine Learning Fundamentals** (65% complete)
   - Category: Technical
   - 4 milestones with progress tracking

2. **Improve Public Speaking Skills** (45% complete)
   - Category: Communication
   - 3 milestones

3. **Learn Spanish Fluently** (80% complete)
   - Category: Language
   - 4 milestones

4. **Financial Literacy Mastery** (90% complete)
   - Category: Professional
   - 4 milestones

5. **Conflict Resolution Techniques** (75% complete)
   - Category: Communication
   - 3 milestones

### 📚 Learning Sessions (6 sessions)
1. Introduction to Neural Networks (45 min, 88% comprehension)
2. Spanish Verb Conjugations (30 min, 75% comprehension)
3. Investment Strategies (60 min, 95% comprehension)
4. Presentation Techniques (40 min, 70% comprehension)
5. Conflict Resolution (35 min, 82% comprehension)
6. Machine Learning - Gradient Descent (50 min, 85% comprehension)

### 💬 Conversations with Messages
- **Learning Conversation**: "Neural Networks Learning Session"
  - 4 messages demonstrating learning mode interaction
  
- **Advocacy Conversation**: "Salary Negotiation Discussion"
  - 4 messages demonstrating advocacy mode interaction

### 🛡️ Advocacy Sessions (2 sessions)
1. **Salary Negotiation** - Successful outcome (5 stars)
   - Position: Senior Developer
   - Requested: $110,000 (from $95,000)
   - Result: Approved

2. **Fee Extension Request** - Successful outcome (5 stars)
   - Payment type: Tuition Fee
   - Extension granted

### 💡 Neural Insights (5 insights)
1. **Optimal Learning Time Detected** (Medium priority, Actionable)
2. **Visual Learning Efficiency Increased** (Low priority)
3. **Communication Style Adjustment** (High priority, Actionable)
4. **High Engagement with Hands-On Practice** (Medium priority, Actionable)
5. **Advocacy Success Rate: 100%** (Low priority)

### 🔊 Voice Profile
- Default voice settings for accessibility
- Language: en-US
- Pitch, rate, and volume configured

## Features Demonstrated

All seeded data showcases:

- ✅ **Cognitive Twin Engine**: Rich neural patterns and learning analytics
- ✅ **Learning Analytics**: Multiple goals, sessions, and progress tracking
- ✅ **Conversations**: Both learning and advocacy modes with full message history
- ✅ **Advocacy System**: Real-world scenarios with outcomes and ratings
- ✅ **Neural Insights**: Pattern detection, recommendations, and actionable insights
- ✅ **Accessibility**: Voice profile and accessibility settings
- ✅ **Progress Tracking**: Goals with milestones, sessions with metrics

## Exploring the Demo

### Dashboard (`/dashboard`)
- View cognitive twin visualization
- See learning goals progress
- Check neural insights
- View recent activity

### Learning Analytics (`/dashboard/learning`)
- View all learning goals with progress
- See learning session history
- Check cognitive profile scores
- View optimal learning time recommendations

### Chat (`/dashboard/chat`)
- Switch between Learning and Advocacy modes
- See conversation history
- Use advocacy templates
- Experience personalized AI responses

### Profile (`/dashboard/profile`)
- View and edit profile settings
- Adjust learning style preferences
- Configure accessibility options

## Resetting Demo Data

To reset and reseed the demo account:

1. **Delete existing data** (optional - script will upsert/overwrite):
   ```sql
   -- In Supabase SQL Editor
   DELETE FROM neural_insights WHERE user_id = 'your-user-id';
   DELETE FROM advocacy_sessions WHERE user_id = 'your-user-id';
   DELETE FROM messages WHERE conversation_id IN (
     SELECT id FROM conversations WHERE user_id = 'your-user-id'
   );
   DELETE FROM conversations WHERE user_id = 'your-user-id';
   DELETE FROM learning_sessions WHERE user_id = 'your-user-id';
   DELETE FROM learning_goals WHERE user_id = 'your-user-id';
   DELETE FROM cognitive_twins WHERE user_id = 'your-user-id';
   DELETE FROM voice_profiles WHERE user_id = 'your-user-id';
   ```

2. **Run the seed script again**:
   ```bash
   npm run seed:demo
   ```

## Troubleshooting

### User Already Exists
The script handles existing users automatically. It will sign in and update/create data.

### Missing Environment Variables
Ensure `.env.local` has:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Database Errors
- Ensure migrations have been run: `supabase/migrations/20250313212230_init.sql`
- Check that Row Level Security (RLS) policies are active
- Verify you're using the anon key (not service role key) for this script

### Data Not Appearing
- Log out and log back in to refresh session
- Clear browser cache
- Check browser console for errors
- Verify data in Supabase dashboard

## Next Steps

After seeding:
1. ✅ Log in with demo credentials
2. ✅ Explore the dashboard
3. ✅ Try the chat interface
4. ✅ View learning analytics
5. ✅ Check neural insights
6. ✅ Review advocacy sessions

## Support

For issues or questions:
- Check the main [README.md](./README.md)
- Review [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- Check Supabase logs in dashboard
- Verify environment variables

---

**Happy Exploring! 🚀**
