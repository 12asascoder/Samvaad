/**
 * Test Azure OpenAI Connection
 * Verifies Azure OpenAI credentials are working
 */

require('dotenv').config({ path: '.env.local' });

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4';
const apiVersion = process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview';

console.log('🔍 Testing Azure OpenAI Connection...\n');

if (!endpoint || !apiKey) {
  console.error('❌ Error: Missing Azure OpenAI credentials');
  console.error('   AZURE_OPENAI_ENDPOINT:', endpoint ? '✅' : '❌ Missing');
  console.error('   AZURE_OPENAI_API_KEY:', apiKey ? '✅' : '❌ Missing');
  process.exit(1);
}

console.log('✅ Credentials found');
console.log('   Endpoint:', endpoint);
console.log('   Deployment:', deployment);
console.log('   API Version:', apiVersion);
console.log('   Key:', apiKey.substring(0, 20) + '...\n');

async function testConnection() {
  try {
    // Remove trailing slash if present
    const cleanEndpoint = endpoint.replace(/\/$/, '');
    
    const url = `${cleanEndpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;
    
    console.log('1️⃣  Testing Azure OpenAI connection...');
    console.log('   URL:', url.substring(0, 80) + '...\n');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant. Respond with "Connection successful!" if you receive this message.'
          },
          {
            role: 'user',
            content: 'Hello, test connection'
          }
        ],
        temperature: 0.7,
        max_tokens: 100,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Connection failed:', response.status, response.statusText);
      console.error('   Error details:', errorText.substring(0, 200));
      
      if (response.status === 401) {
        console.error('\n💡 Possible issues:');
        console.error('   - Invalid API key');
        console.error('   - API key doesn\'t have access to this endpoint');
      } else if (response.status === 404) {
        console.error('\n💡 Possible issues:');
        console.error('   - Deployment name incorrect (currently:', deployment + ')');
        console.error('   - Check your Azure portal for the correct deployment name');
      } else if (response.status === 400) {
        console.error('\n💡 Possible issues:');
        console.error('   - Invalid endpoint URL');
        console.error('   - API version might not be supported');
      }
      process.exit(1);
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || 'No response';
    
    console.log('✅ Connection successful!');
    console.log('   Response:', message);
    console.log('\n✨ Azure OpenAI is configured correctly!');
    console.log('\n📋 Summary:');
    console.log('   ✅ Endpoint is valid');
    console.log('   ✅ API key is correct');
    console.log('   ✅ Deployment is accessible');
    console.log('   ✅ API version is supported');

  } catch (error) {
    console.error('\n❌ Connection test failed:', error.message);
    
    if (error.message.includes('fetch')) {
      console.error('\n💡 Possible issues:');
      console.error('   1. Network connectivity problem');
      console.error('   2. Endpoint URL is incorrect');
      console.error('   3. Firewall blocking connection');
      console.error('   4. Check if endpoint URL should have /openai path');
    }
    
    process.exit(1);
  }
}

testConnection();
