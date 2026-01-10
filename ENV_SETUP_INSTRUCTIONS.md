# 🔧 Environment Variables Setup

## ⚠️ Quick Fix

The error you're seeing is because Supabase environment variables are not configured. Here's how to fix it:

## Option 1: Set Up Supabase (Recommended)

### Step 1: Create Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up (free)

### Step 2: Create a New Project
1. Click "New Project"
2. Choose an organization (or create one)
3. Fill in:
   - **Name**: `samvaad` (or your choice)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free (for development)
4. Click "Create new project"
5. Wait 2-3 minutes for setup to complete

### Step 3: Get Your Credentials
1. In your Supabase dashboard, go to **Settings** (gear icon) → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

### Step 4: Update .env.local
Open `.env.local` in the project root and replace:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (your actual key)
```

### Step 5: Set Up Database
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire contents of `supabase/migrations/20250313212230_init.sql`
4. Paste into the SQL editor
5. Click "Run" (or press Ctrl/Cmd + Enter)
6. You should see "Success. No rows returned"

### Step 6: Restart Server
Stop the server (Ctrl+C) and restart:
```bash
pnpm dev
```

## Option 2: Temporarily Bypass (Development Only)

If you just want to see the UI without Supabase for now, the middleware has been updated to handle missing env vars gracefully. However, authentication and database features won't work.

**Note**: You still need to create a `.env.local` file with placeholder values to avoid the error.

## 🔍 Verify Your Setup

After updating `.env.local`, the error should disappear. You'll know it's working when:
- ✅ No more runtime errors
- ✅ Landing page loads
- ✅ Login page loads (even if Supabase isn't fully configured yet)

## 📝 Full Environment Variables

See the complete list in `.env.local` or check `SETUP_GUIDE.md` for all optional Azure services.

## 🆘 Still Having Issues?

1. **Check file location**: `.env.local` must be in the project root (same folder as `package.json`)
2. **Check spelling**: Variable names must match exactly (case-sensitive)
3. **Restart server**: Always restart after changing `.env.local`
4. **Check Supabase project**: Make sure your project is active (not paused)

---

**After setup, your app will have:**
- ✅ User authentication (sign up/login)
- ✅ Database storage for cognitive profiles
- ✅ Learning sessions tracking
- ✅ All features working!
