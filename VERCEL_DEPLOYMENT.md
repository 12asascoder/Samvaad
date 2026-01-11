# 🚀 Vercel Deployment Guide for Samvaad

This guide will walk you through deploying Samvaad to Vercel.

## Prerequisites

Before deploying, ensure you have:

1. ✅ **GitHub Account** - Your code should be in a GitHub repository
2. ✅ **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (free)
3. ✅ **Supabase Project** - Database setup (see [ENV_SETUP_INSTRUCTIONS.md](./ENV_SETUP_INSTRUCTIONS.md))
4. ✅ **Azure Resources** - Azure OpenAI and optional services configured
5. ✅ **Environment Variables** - All keys and credentials ready

---

## Step 1: Prepare Your Repository

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Verify .gitignore**
   - Ensure `.env.local` and other sensitive files are ignored
   - The `.env.example` file should be committed (it's safe, no secrets)

---

## Step 2: Import Project to Vercel

1. **Go to Vercel Dashboard**
   - Visit [https://vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Select your GitHub repository (samvaad)
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (root)
   - **Build Command**: `pnpm build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `pnpm install` (auto-detected)

---

## Step 3: Configure Environment Variables

**⚠️ CRITICAL: Do this before your first deployment!**

1. In the Vercel project setup page, scroll to **"Environment Variables"**

2. Add each variable from `.env.example`:

   ### Required Variables:

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   
   # Azure OpenAI
   AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
   AZURE_OPENAI_API_KEY=your-api-key-here
   AZURE_OPENAI_DEPLOYMENT=gpt-4
   AZURE_OPENAI_API_VERSION=2024-02-15-preview
   ```

   ### Optional Variables (add if using these services):

   ```env
   # Azure Speech Services
   NEXT_PUBLIC_AZURE_SPEECH_KEY=your-key-here
   NEXT_PUBLIC_AZURE_SPEECH_REGION=eastus
   
   # Azure Translator
   NEXT_PUBLIC_AZURE_TRANSLATOR_KEY=your-key-here
   NEXT_PUBLIC_AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com
   NEXT_PUBLIC_AZURE_TRANSLATOR_REGION=eastus
   
   # Azure Cognitive Services
   NEXT_PUBLIC_AZURE_COGNITIVE_ENDPOINT=https://your-resource.cognitiveservices.azure.com
   NEXT_PUBLIC_AZURE_COGNITIVE_KEY=your-key-here
   ```

3. **Set Environment for Each Variable**
   - Select: **Production**, **Preview**, and **Development**
   - This ensures variables work in all environments

4. **Click "Add"** for each variable

---

## Step 4: Deploy

1. **Click "Deploy"**
   - Vercel will start building your project
   - This takes 2-5 minutes

2. **Monitor the Build**
   - Watch the build logs in real-time
   - Fix any errors if they appear (see Troubleshooting below)

3. **Wait for Success**
   - When build completes, you'll get a deployment URL
   - Example: `https://samvaad-xyz.vercel.app`

---

## Step 5: Verify Deployment

1. **Test Your Application**
   - Visit your deployment URL
   - Check that the landing page loads
   - Try logging in/signing up
   - Test the chat functionality

2. **Check Environment Variables**
   - Go to **Settings** → **Environment Variables**
   - Verify all variables are set correctly

3. **View Logs**
   - Go to **Deployments** → Click on your deployment → **Functions** tab
   - Check for any runtime errors

---

## Step 6: Configure Custom Domain (Optional)

1. **Go to Settings** → **Domains**
2. **Add Your Domain**
   - Enter your domain name (e.g., `samvaad.com`)
3. **Configure DNS**
   - Follow Vercel's DNS configuration instructions
4. **SSL Certificate**
   - Vercel automatically provisions SSL certificates (HTTPS)

---

## Continuous Deployment

Vercel automatically deploys when you push to your repository:

- **Production**: Deploys from `main` branch (or your default branch)
- **Preview**: Deploys from pull requests and other branches

**No manual deployment needed!** Every git push triggers a new deployment.

---

## Environment Variables Management

### Adding New Variables

1. Go to **Settings** → **Environment Variables**
2. Click **Add New**
3. Enter key and value
4. Select environments (Production, Preview, Development)
5. Click **Save**

### Updating Existing Variables

1. Go to **Settings** → **Environment Variables**
2. Find the variable
3. Click **Edit**
4. Update the value
5. **Redeploy** your application (Vercel will show a banner)

### Removing Variables

1. Go to **Settings** → **Environment Variables**
2. Find the variable
3. Click **Delete**
4. Confirm deletion
5. Redeploy

---

## Troubleshooting

### Build Fails

**Error: "Module not found"**
- Check that all dependencies are in `package.json`
- Ensure `pnpm install` runs successfully locally
- Verify Node.js version (should be 18+)

**Error: "Environment variable not found"**
- Add the missing variable in Vercel dashboard
- Ensure variable names match exactly (case-sensitive)
- Redeploy after adding variables

**Error: "Build timeout"**
- Vercel free tier has a 45-minute build limit
- Optimize your build (remove unused dependencies)
- Check for infinite loops in build scripts

### Runtime Errors

**Error: "Invalid API key"**
- Verify environment variables are set correctly
- Check for extra spaces or quotes in variable values
- Ensure variables are set for the correct environment (Production/Preview)

**Error: "Supabase connection failed"**
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check Supabase project is active (not paused)
- Ensure Row Level Security (RLS) policies are configured

**Error: "Azure OpenAI error"**
- Verify `AZURE_OPENAI_ENDPOINT` format (should end with `/`)
- Check `AZURE_OPENAI_API_KEY` is correct
- Ensure deployment name matches `AZURE_OPENAI_DEPLOYMENT`
- Verify the deployment is active in Azure Portal

### Performance Issues

**Slow API responses**
- Check Vercel function logs for timeout errors
- Optimize database queries
- Consider upgrading Vercel plan (Pro has better limits)

**Cold starts**
- Edge runtime functions have faster cold starts
- Consider using Edge Runtime for API routes (already configured)

---

## Vercel Limits (Free Tier)

| Resource | Limit |
|----------|-------|
| **Bandwidth** | 100 GB/month |
| **Build Time** | 45 minutes/month |
| **Function Execution** | 100 GB-hours/month |
| **Serverless Functions** | 10 seconds timeout (Hobby) |
| **Edge Functions** | 25 seconds timeout |
| **Concurrent Builds** | 1 |

**Note**: For production apps with high traffic, consider upgrading to Pro ($20/month).

---

## Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore` ✅
2. **Use Vercel Environment Variables** - Never hardcode secrets ✅
3. **Rotate API keys regularly** - Update in Vercel dashboard
4. **Enable Vercel Password Protection** - For staging/preview deployments
5. **Review Vercel Access Logs** - Monitor for suspicious activity
6. **Use Vercel Analytics** - Track performance and errors

---

## Monitoring & Analytics

### Vercel Analytics (Recommended)

1. Go to **Analytics** tab in your Vercel project
2. Enable **Web Analytics** (free tier available)
3. View:
   - Page views
   - Performance metrics
   - Real-time users
   - Top pages

### Function Logs

1. Go to **Deployments** → Select deployment → **Functions** tab
2. View real-time logs
3. Debug API route errors
4. Monitor execution time

---

## Rollback Deployment

If a deployment has issues:

1. Go to **Deployments**
2. Find the previous working deployment
3. Click **⋯** (three dots) → **Promote to Production**
4. Your previous version is now live

---

## Next Steps After Deployment

1. ✅ Test all features thoroughly
2. ✅ Set up custom domain (if needed)
3. ✅ Configure monitoring and alerts
4. ✅ Update documentation with production URL
5. ✅ Share your deployment URL with team/users

---

## Support & Resources

- **Vercel Docs**: [https://vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [https://nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel Status**: [https://vercel-status.com](https://vercel-status.com)

---

## Checklist

Before deploying, verify:

- [ ] Code pushed to GitHub
- [ ] `.env.example` file committed
- [ ] All environment variables documented
- [ ] Supabase database migrated
- [ ] Azure resources configured
- [ ] Build works locally (`pnpm build`)
- [ ] No sensitive data in code
- [ ] `.gitignore` properly configured

---

**Happy Deploying! 🚀**

If you encounter any issues, check the logs in Vercel dashboard or refer to the troubleshooting section above.
