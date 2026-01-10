# ⚡ Quick Setup - Your Supabase is Ready!

## ✅ Credentials Configured

Your Supabase credentials have been added to `.env.local`:
- **Project URL**: `https://dlgooexgwtorixbpbtuu.supabase.co`
- **API Key**: Configured

## 🚀 Next Steps (2 minutes)

### Step 1: Run Database Migration

1. **Go to Supabase Dashboard**
   - Open: https://dlgooexgwtorixbpbtuu.supabase.co
   - Or go to: https://app.supabase.com → Your Project

2. **Open SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run Migration**
   - Open file: `supabase/migrations/20250313212230_init.sql`
   - Copy ALL contents (the entire SQL file)
   - Paste into SQL Editor
   - Click "Run" button (or press Cmd/Ctrl + Enter)
   - Wait for "Success" message

### Step 2: Verify Connection

Refresh your browser at `http://localhost:3000` - the app should now work!

### Step 3: (Optional) Create Demo Data

To add sample data for your pitch:

1. **Create Admin Account via App**
   - Go to `http://localhost:3000/login`
   - Click "Create Account"
   - Email: `admin@samvaad.demo`
   - Password: `Admin@Samvaad2024!`
   - Complete signup

2. **Get User ID**
   - In Supabase Dashboard → **Authentication → Users**
   - Find `admin@samvaad.demo`
   - Copy the **UUID** (the ID column)

3. **Seed Data**
   - Go to **SQL Editor** in Supabase
   - Open file: `supabase/seed-data.sql`
   - **Find and Replace** (Cmd/Ctrl + F):
     - Find: `00000000-0000-0000-0000-000000000001`
     - Replace: `[paste your actual user UUID here]`
   - Click "Run"

4. **Log In and Explore!**
   - Go back to app
   - Log in with `admin@samvaad.demo`
   - You'll see:
     - Dashboard with cognitive twin
     - Learning goals with progress
     - Learning session history
     - Neural insights
     - Sample advocacy data

## 🎯 What Works Now

- ✅ Authentication (sign up/login)
- ✅ User profiles
- ✅ Cognitive twin tracking
- ✅ Learning sessions
- ✅ Database storage

## ⚠️ What Needs Azure OpenAI

- ⚠️ AI Chat responses (will use fallback without Azure OpenAI)
- ⚠️ Full AI-powered features

To enable AI chat, add Azure OpenAI credentials to `.env.local`.

## 🆘 Troubleshooting

**Still seeing errors?**
- Make sure you ran the migration SQL script
- Check that all tables were created (Database → Tables)
- Restart the dev server if needed

**Can't create account?**
- Check Supabase Auth settings
- Verify email confirmation is enabled/disabled as needed

---

**You're all set! 🎉**
