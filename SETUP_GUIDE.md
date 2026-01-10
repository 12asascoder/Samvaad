# Samvaad - Complete Setup Guide

## Quick Start (5 Minutes)

### Step 1: Prerequisites

Ensure you have:
- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **pnpm** installed (`npm install -g pnpm`)
- **Git** installed
- **Azure Account** with credits ([Free Account](https://azure.microsoft.com/free))
- **Supabase Account** ([Free Account](https://supabase.com))

### Step 2: Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/samvaad.git
cd samvaad

# Install dependencies
pnpm install
```

### Step 3: Azure Resources Setup

#### 3.1 Create Azure OpenAI Resource

1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource"
3. Search for "Azure OpenAI"
4. Create a new resource:
   - **Name**: `samvaad-openai` (or your choice)
   - **Subscription**: Your subscription
   - **Resource Group**: Create new or use existing
   - **Region**: Choose closest to you (e.g., `eastus`, `westus2`)
   - **Pricing Tier**: Standard S0 (for production) or use free tier if available

5. Once created, go to "Deployments" → "Manage deployments"
6. Create a new deployment:
   - **Model**: `gpt-4` or `gpt-35-turbo`
   - **Deployment name**: `gpt-4` (note this name)
   - Wait for deployment to complete

7. Copy the endpoint URL from "Keys and Endpoint" page:
   - It looks like: `https://samvaad-openai.openai.azure.com/`

8. Copy one of the API keys (KEY 1 or KEY 2)

#### 3.2 Create Azure Speech Services (Optional but Recommended)

1. In Azure Portal, create a new "Speech" resource
2. Name it `samvaad-speech`
3. Choose the same region as your OpenAI resource
4. Copy the API key and region

#### 3.3 Create Azure Translator (Optional but Recommended)

1. Create a "Translator" resource
2. Name it `samvaad-translator`
3. Choose the same region
4. Copy the API key
5. The endpoint is: `https://api.cognitive.microsofttranslator.com`

#### 3.4 Create Azure Cognitive Services - Text Analytics (Optional)

1. Create a "Cognitive Services" resource
2. Enable "Text Analytics API"
3. Copy the endpoint and API key

### Step 4: Supabase Setup

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project
3. Wait for database to be ready (2-3 minutes)
4. Go to "SQL Editor"
5. Copy the contents of `supabase/migrations/20250313212230_init.sql`
6. Paste and run it in the SQL Editor
7. Go to "Settings" → "API"
8. Copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### Step 5: Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Azure OpenAI (Required)
AZURE_OPENAI_ENDPOINT=https://samvaad-openai.openai.azure.com
AZURE_OPENAI_API_KEY=your_key_here
AZURE_OPENAI_DEPLOYMENT=gpt-4
AZURE_OPENAI_API_VERSION=2024-02-15-preview

# Azure Speech Services (Optional)
NEXT_PUBLIC_AZURE_SPEECH_KEY=your_key_here
NEXT_PUBLIC_AZURE_SPEECH_REGION=eastus

# Azure Translator (Optional)
NEXT_PUBLIC_AZURE_TRANSLATOR_KEY=your_key_here
NEXT_PUBLIC_AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com
NEXT_PUBLIC_AZURE_TRANSLATOR_REGION=eastus

# Azure Cognitive Services (Optional)
NEXT_PUBLIC_AZURE_COGNITIVE_ENDPOINT=https://samvaad-cognitive.cognitiveservices.azure.com
NEXT_PUBLIC_AZURE_COGNITIVE_KEY=your_key_here
```

### Step 6: Run the Application

```bash
# Start development server
pnpm dev

# Open browser
# Navigate to http://localhost:3000
```

### Step 7: Create Your First Account

1. Click "Get Started" on the landing page
2. Sign up with email or OAuth provider
3. Complete your profile
4. Start using Samvaad!

## Troubleshooting

### Azure OpenAI Not Working

- **Error**: "API key is invalid"
  - Solution: Double-check your API key in `.env.local`
  - Make sure there are no extra spaces

- **Error**: "Deployment not found"
  - Solution: Check your deployment name matches `AZURE_OPENAI_DEPLOYMENT`
  - Verify the deployment is active in Azure Portal

- **Error**: "Rate limit exceeded"
  - Solution: Check your Azure quotas
  - Consider using `gpt-35-turbo` for development (cheaper)

### Supabase Connection Issues

- **Error**: "Invalid API key"
  - Solution: Use the `anon` key, not the `service_role` key
  - Verify the URL is correct (should end with `.supabase.co`)

- **Error**: "Table does not exist"
  - Solution: Run the migration SQL script again
  - Check the SQL Editor for any errors

### Speech Services Not Working

- The app will fallback to Web Speech API if Azure Speech is not configured
- Check browser console for specific errors
- Verify microphone permissions are granted

### Translation Not Working

- The app works without Azure Translator
- Translation features will be disabled if not configured
- Check API key and endpoint are correct

## Production Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables
4. Deploy!

### Deploy to Azure App Service

1. Install Azure CLI
2. Run:
```bash
az webapp up --name samvaad-app --runtime "NODE:18-lts"
```
3. Configure environment variables in Azure Portal
4. Deploy!

## Cost Estimates

### Azure Services (Monthly)

- **Azure OpenAI GPT-4**: ~$0.03 per 1K tokens
  - Estimated: $10-50/month for moderate usage

- **Azure Speech Services**: 
  - Free tier: 5 hours/month
  - Standard: ~$1 per hour

- **Azure Translator**: 
  - Free tier: 2M characters/month
  - Standard: $10 per 1M characters

- **Text Analytics**: 
  - Free tier: 5K transactions/month
  - Standard: $1 per 1K transactions

**Total Estimated Cost**: $20-100/month for moderate usage

### Supabase

- **Free tier**: 500MB database, 2GB bandwidth
- **Pro tier**: $25/month (if needed)

## Security Best Practices

1. **Never commit `.env.local`** to Git
2. Use **environment variables** in production
3. Enable **Row Level Security** in Supabase (already configured)
4. Rotate API keys regularly
5. Monitor Azure costs and set up alerts
6. Use **Azure Key Vault** for production secrets

## Support

For issues or questions:
- Check the [README.md](./README.md)
- Review [IMAGINE_CUP.md](./IMAGINE_CUP.md) for project details
- Open an issue on GitHub

---

**Happy Learning and Advocating with Samvaad! 🚀**
