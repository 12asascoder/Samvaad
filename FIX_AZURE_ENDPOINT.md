# 🔧 Fix Azure OpenAI Endpoint

## ⚠️ Issue Detected

All deployment tests are returning **401 PermissionDenied**. This usually means:

1. **Endpoint URL format is incorrect**, OR
2. **API Key is incorrect**, OR  
3. **Both**

## 🔍 How to Find Correct Endpoint

### Step 1: Go to Azure Portal

1. Visit: https://portal.azure.com
2. Navigate to your Azure OpenAI resource: `samvaad-openai`
3. Click on **"Keys and Endpoint"** in the left menu

### Step 2: Copy the Correct Values

You'll see several values. Copy:

1. **Endpoint** (should look like one of these):
   - ✅ `https://samvaad-openai.openai.azure.com/` (most common)
   - ✅ `https://samvaad-openai.cognitiveservices.azure.com/`
   - ❌ `https://samvaad-openai.services.ai.azure.com` (might be wrong)

2. **Key 1** or **Key 2** (either works)

3. **Deployment name**:
   - Go to **"Deployments"** or **"Model deployments"** section
   - Find your GPT-40 Mini deployment
   - Copy the **exact name** (case-sensitive!)

## 📝 Common Issues

### Issue 1: Wrong Endpoint Format

Your current endpoint: `https://samvaad-openai.services.ai.azure.com`

**Try this instead:**
```
https://samvaad-openai.openai.azure.com
```

The standard Azure OpenAI endpoint format is:
- `https://[resource-name].openai.azure.com`

### Issue 2: Missing /openai Path

Sometimes the endpoint should include `/openai`:
```
https://samvaad-openai.openai.azure.com/openai
```

### Issue 3: Wrong API Key

- Make sure you're using the **Key 1** or **Key 2** from Azure Portal
- Not the subscription key
- Not a different resource's key

## ✅ Quick Fix

Once you have the correct values from Azure Portal:

1. **Update `.env.local`:**
   ```env
   AZURE_OPENAI_ENDPOINT=https://samvaad-openai.openai.azure.com
   AZURE_OPENAI_API_KEY=your-key-from-portal
   AZURE_OPENAI_DEPLOYMENT=exact-deployment-name-from-portal
   ```

2. **Test connection:**
   ```bash
   node scripts/test-azure-openai.js
   ```

3. **Restart dev server:**
   ```bash
   # Stop (Ctrl+C)
   pnpm dev
   ```

## 🆘 Still Not Working?

If you can share:
1. The exact endpoint from Azure Portal
2. The exact deployment name
3. Confirm you're using Key 1 or Key 2

I can help you configure it correctly!
