import { createBrowserClient } from '@supabase/ssr'
import { type Database } from '@/database.types';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Return null if credentials are not configured (client-side will handle gracefully)
  if (!supabaseUrl || !supabaseKey || 
      supabaseUrl.includes('your_supabase') || 
      supabaseUrl.includes('placeholder') ||
      supabaseKey.includes('your_') ||
      supabaseKey.includes('placeholder')) {
    // Return a client with dummy valid URL format to prevent errors
    // Actual operations will fail gracefully if not configured
    return createBrowserClient<Database>(
      'https://dummy-placeholder.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1bW15LXBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.dummy'
    )
  }

  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseKey
  )
}
