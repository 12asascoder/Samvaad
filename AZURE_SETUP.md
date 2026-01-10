# 🔧 Azure OpenAI Setup

## ✅ Credentials Added

Your Azure OpenAI credentials have been configured:
- **Endpoint**: `https://samvaad-openai.services.ai.azure.com`
- **API Key**: Configured ✅

## ⚠️ Deployment Name Issue

The test shows that the deployment name `gpt-4` was not found. 

### How to Find Your Deployment Name

1. **Go to Azure Portal**
   - Visit: https://portal.azure.com
   - Navigate to your Azure OpenAI resource: `samvaad-openai`

2. **Check Deployments**
   - Click on **"Deployments"** or **"Model deployments"** in the left menu
   - You'll see a list of deployed models
   - The deployment name is in the first column

3. **Common Deployment Names:**
   - `gpt-4`
   - `gpt-35-turbo`
   - `gpt-4-turbo`
   - `gpt-4o`
   - Custom names you created

### Update .env.local

Once you find your deployment name, update the `.env.local` file:

```env
AZURE_OPENAI_DEPLOYMENT=your-actual-deployment-name
```

### Test Connection

After updating, test the connection:
```bash
node scripts/test-azure-openai.js
```

## 🚀 Quick Fix

If you know your deployment name, you can update it quickly:

**Option 1: Edit .env.local directly**
```env
AZURE_OPENAI_DEPLOYMENT=gpt-35-turbo  # or whatever your deployment is named
```

**Option 2: Use this command (replace DEPLOYMENT_NAME):**
```bash
sed -i '' 's/AZURE_OPENAI_DEPLOYMENT=gpt-4/AZURE_OPENAI_DEPLOYMENT=YOUR_DEPLOYMENT_NAME/' .env.local
```

## ✅ After Fixing

1. Restart your dev server
2. Test the connection
3. Try the chat feature in the app

---

**Most Common:** If you're using the free tier, it's usually `gpt-35-turbo`
