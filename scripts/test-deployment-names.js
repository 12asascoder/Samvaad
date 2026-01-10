/**
 * Test Multiple Deployment Names
 * Tries common variations to find the correct one
 */

require('dotenv').config({ path: '.env.local' });

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview';

const deploymentNames = [
  'gpt-4o-mini',
  'GPT-40-Mini',
  'gpt-40-mini',
  'GPT-4o-Mini',
  'gpt4o-mini',
  'GPT40Mini',
  'gpt-4o',
];

async function testDeployment(name) {
  const cleanEndpoint = endpoint.replace(/\/$/, '');
  const url = `${cleanEndpoint}/openai/deployments/${name}/chat/completions?api-version=${apiVersion}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 10,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, name, message: '✅ Found!' };
    } else {
      const error = await response.json();
      return { success: false, name, status: response.status, error: error.error?.message || response.statusText };
    }
  } catch (error) {
    return { success: false, name, error: error.message };
  }
}

async function testAll() {
  console.log('🔍 Testing deployment names...\n');
  console.log(`Endpoint: ${endpoint}\n`);

  for (const name of deploymentNames) {
    process.stdout.write(`Testing "${name}"... `);
    const result = await testDeployment(name);
    
    if (result.success) {
      console.log(`✅ SUCCESS! Deployment name is: ${name}`);
      console.log(`\n✨ Update .env.local with:`);
      console.log(`   AZURE_OPENAI_DEPLOYMENT=${name}`);
      process.exit(0);
    } else {
      console.log(`❌ (${result.status || 'error'})`);
    }
    
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n❌ None of the common deployment names worked.');
  console.log('\n💡 Next steps:');
  console.log('1. Check Azure Portal → Deployments section');
  console.log('2. Copy the exact deployment name (case-sensitive)');
  console.log('3. Update AZURE_OPENAI_DEPLOYMENT in .env.local');
}

testAll();
