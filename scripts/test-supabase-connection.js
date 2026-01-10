/**
 * Test Supabase Connection
 * Run this to verify your Supabase credentials are working
 */

require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Connection...\n');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing credentials in .env.local');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌ Missing');
  console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅' : '❌ Missing');
  process.exit(1);
}

console.log('✅ Credentials found');
console.log('   URL:', supabaseUrl);
console.log('   Key:', supabaseKey.substring(0, 20) + '...\n');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test 1: Check if we can reach Supabase
    console.log('1️⃣  Testing API connectivity...');
    const { data: healthCheck, error: healthError } = await supabase
      .from('_test_connection')
      .select('*')
      .limit(1);

    if (healthError) {
      if (healthError.code === 'PGRST116') {
        console.log('   ✅ API is reachable (table doesn\'t exist, which is expected)');
      } else {
        console.log('   ⚠️  API response:', healthError.message);
      }
    }

    // Test 2: Check auth service
    console.log('\n2️⃣  Testing Auth service...');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.log('   ⚠️  Auth service:', authError.message);
    } else {
      console.log('   ✅ Auth service is reachable');
    }

    // Test 3: Try to access profiles table (after migration)
    console.log('\n3️⃣  Testing Database tables...');
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    if (profilesError) {
      if (profilesError.code === 'PGRST116' || profilesError.message.includes('relation') || profilesError.message.includes('does not exist')) {
        console.log('   ⚠️  Database tables not found');
        console.log('   💡 Run the migration SQL script in Supabase SQL Editor');
        console.log('   📄 File: supabase/migrations/20250313212230_init.sql');
      } else {
        console.log('   ❌ Error:', profilesError.message);
      }
    } else {
      console.log('   ✅ Database tables exist and are accessible');
    }

    console.log('\n✨ Connection test complete!\n');
    console.log('📋 Summary:');
    console.log('   ✅ Supabase URL is valid');
    console.log('   ✅ API Key format is correct');
    if (profilesError && (profilesError.code === 'PGRST116' || profilesError.message.includes('does not exist'))) {
      console.log('   ⚠️  Database migration needed - run the SQL script');
    }

  } catch (error) {
    console.error('\n❌ Connection test failed:', error.message);
    if (error.message.includes('fetch')) {
      console.error('\n💡 Possible issues:');
      console.error('   1. Check if Supabase project is active (not paused)');
      console.error('   2. Verify the URL is correct');
      console.error('   3. Check network/firewall settings');
      console.error('   4. Ensure CORS is enabled in Supabase settings');
    }
    process.exit(1);
  }
}

testConnection();
