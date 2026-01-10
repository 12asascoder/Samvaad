# 🔧 Troubleshooting "Failed to fetch" Error

## ✅ Good News!

Your Supabase connection test passed:
- ✅ Supabase URL is valid and reachable
- ✅ API Key is correct
- ✅ Auth service is working
- ✅ Database tables exist

## 🔍 Why "Failed to fetch" Still Appears?

The error usually means the browser client can't reach Supabase. Common causes:

### Solution 1: Restart Dev Server

The server might not have picked up the new environment variables.

1. **Stop the server** (Press Ctrl+C in terminal)
2. **Restart it:**
   ```bash
   pnpm dev
   ```
3. **Clear browser cache:**
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
   - Or clear browser cache and reload

### Solution 2: Check Supabase CORS Settings

1. Go to Supabase Dashboard → **Settings → API**
2. Check **Allowed Origins** section
3. Make sure `http://localhost:3000` is in the allowed list
4. If not, add it and save

### Solution 3: Verify Environment Variables in Browser

1. Open browser DevTools (F12)
2. Go to Console
3. Type: `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)`
4. Should show your Supabase URL
5. If it shows `undefined`, the server needs a restart

### Solution 4: Check Supabase Project Status

1. Go to Supabase Dashboard
2. Make sure your project is **Active** (not paused)
3. Free tier projects pause after inactivity

### Solution 5: Verify API Key Type

Your key starts with `sb_publishable_` which is correct for Supabase.

Make sure you're using the **anon/public** key, not the service_role key.

### Solution 6: Network/Firewall

- Check if corporate firewall is blocking connections
- Try on a different network
- Check browser console for specific CORS errors

## 🧪 Test Connection Manually

Run this command to test connection:
```bash
node scripts/test-supabase-connection.js
```

If this works but browser doesn't, it's likely a CORS or environment variable issue.

## ✅ After Fixing

1. Restart dev server
2. Hard refresh browser
3. Try login/signup again
4. Check browser console for any remaining errors

## 🆘 Still Having Issues?

1. **Check browser console** for detailed error messages
2. **Check network tab** in DevTools to see the actual request/response
3. **Verify Supabase project** is active and not paused
4. **Check Supabase logs** in dashboard for errors

---

**Most Common Fix**: Restart the dev server! 🔄
