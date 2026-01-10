# 🎯 Demo Setup Guide - Pitch Your Idea with Sample Data

## Quick Setup for Demo/Pitch

This guide helps you quickly set up Samvaad with sample data to demonstrate the platform.

## Step 1: Set Up Supabase (5 minutes)

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up (free)

2. **Create Project**
   - Click "New Project"
   - Name: `samvaad-demo`
   - Password: (save this!)
   - Region: Choose closest
   - Wait 2-3 minutes for setup

3. **Get Credentials**
   - Go to **Settings → API**
   - Copy **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - Copy **anon public key** (starts with `eyJ...`)

4. **Update .env.local**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_key_here
   ```

5. **Run Database Migration**
   - Go to **SQL Editor** in Supabase
   - Copy contents of `supabase/migrations/20250313212230_init.sql`
   - Paste and click **Run**

## Step 2: Seed Demo Data

### Option A: Using SQL Script (Recommended)

1. **Create Admin User via App**
   - Go to `http://localhost:3000/login`
   - Click "Create Account"
   - Email: `admin@samvaad.demo`
   - Password: `Admin@Samvaad2024!`
   - Confirm your email if required

2. **Get User ID**
   - In Supabase: **Authentication → Users**
   - Find `admin@samvaad.demo`
   - Copy the **UUID** (looks like `a1b2c3d4-...`)

3. **Run Seed Script**
   - Go to **SQL Editor** in Supabase
   - Open `supabase/seed-data.sql`
   - **Replace** all instances of `00000000-0000-0000-0000-000000000001` with your actual user UUID
   - Run the script

### Option B: Using Node Script

1. Install dependencies:
   ```bash
   npm install dotenv @supabase/supabase-js
   ```

2. Run the seed script:
   ```bash
   node scripts/seed-admin.js
   ```

## Step 3: Restart Server

```bash
# Stop server (Ctrl+C) and restart
pnpm dev
```

## Step 4: Log In and Explore

**Demo Credentials:**
- Email: `admin@samvaad.demo`
- Password: `Admin@Samvaad2024!`

**What You'll See:**
- ✅ Dashboard with cognitive twin visualization
- ✅ Learning goals with progress
- ✅ Learning session history
- ✅ Neural insights and recommendations
- ✅ Sample advocacy sessions

## 🎬 Demo Flow Suggestions

### 1. Landing Page (30 seconds)
- Show the problem statement
- Highlight key features
- Navigate to login

### 2. Dashboard (1 minute)
- Show cognitive twin visualization
- Point out learning scores (92% comprehension)
- Show learning goals progress
- Highlight neural insights

### 3. Learning Mode (1-2 minutes)
- Go to Chat → Learning Mode
- Ask: "Explain neural networks"
- Show how AI adapts to visual learning style
- Show personalized explanations

### 4. Advocacy Mode (1 minute)
- Switch to Advocacy Mode
- Show template selector
- Demonstrate salary negotiation template
- Show culturally sensitive messaging

### 5. Learning Analytics (30 seconds)
- Navigate to Learning Dashboard
- Show session history
- Show progress tracking
- Highlight adaptive insights

## 🎯 Key Talking Points

1. **Cognitive Twin**: "The AI continuously learns how this user thinks and learns"
2. **Personalization**: "Every explanation is adapted to their unique learning style"
3. **Advocacy**: "The AI speaks on their behalf with cultural sensitivity"
4. **Accessibility**: "Designed for users with disabilities, language barriers, and social anxiety"
5. **Azure AI**: "Built on Microsoft Azure AI services for enterprise-grade capabilities"

## 📊 Sample Data Included

- **1 Admin User** with complete profile
- **1 Cognitive Twin** with high scores
- **4 Learning Goals** in various categories
- **4 Learning Sessions** with different topics
- **2 Neural Insights** showing pattern detection
- **1 Advocacy Session** (salary negotiation)

## 🔄 Reset Demo Data

To reset and reseed:
```sql
-- In Supabase SQL Editor, run:
DELETE FROM neural_insights WHERE user_id = 'your-user-id';
DELETE FROM learning_sessions WHERE user_id = 'your-user-id';
DELETE FROM learning_goals WHERE user_id = 'your-user-id';
DELETE FROM advocacy_sessions WHERE user_id = 'your-user-id';
DELETE FROM cognitive_twins WHERE user_id = 'your-user-id';
DELETE FROM profiles WHERE id = 'your-user-id';
-- Then rerun seed-data.sql
```

## 🆘 Troubleshooting

**Can't log in?**
- Check email confirmation in Supabase Auth settings
- Verify credentials match seed script

**No data showing?**
- Verify seed script ran successfully
- Check user ID matches in all tables
- Refresh browser cache

**Database errors?**
- Ensure migration ran successfully
- Check Row Level Security policies
- Verify user has proper permissions

---

**Ready to pitch! 🚀**
