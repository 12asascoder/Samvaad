import { createBrowserClient } from '@supabase/ssr'
import { type Database } from '@/database.types';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Validate credentials are present
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase credentials are missing. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
    throw new Error('Supabase credentials not configured')
  }

  // Validate URL format
  if (!supabaseUrl.startsWith('https://') || supabaseUrl.includes('placeholder') || supabaseUrl.includes('your_supabase')) {
    console.error('Invalid Supabase URL:', supabaseUrl)
    throw new Error('Invalid Supabase URL configuration')
  }

  try {
    return createBrowserClient<Database>(
      supabaseUrl,
      supabaseKey
    )
  } catch (error) {
    console.error('Failed to create Supabase client:', error)
    throw error
  }
}
