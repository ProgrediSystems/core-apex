/**
 * Test JIRA API connection
 * Run with: JIRA_BASE_URL=https://your-site.atlassian.net JIRA_EMAIL=your@email.com JIRA_API_TOKEN=your-token npx ts-node scripts/test-jira-connection.ts
 */

async function testConnection() {
  const baseUrl = process.env.JIRA_BASE_URL;
  const email = process.env.JIRA_EMAIL;
  const apiToken = process.env.JIRA_API_TOKEN;

  if (!baseUrl || !email || !apiToken) {
    console.error('❌ Missing configuration. Please set:');
    console.error('   JIRA_BASE_URL - Your Atlassian site URL (e.g., https://your-site.atlassian.net)');
    console.error('   JIRA_EMAIL - Your Atlassian account email');
    console.error('   JIRA_API_TOKEN - Your API token');
    process.exit(1);
  }

  console.log('🔍 Testing JIRA connection...');
  console.log(`   Base URL: ${baseUrl}`);
  console.log(`   Email: ${email}`);
  console.log(`   Token: ${apiToken.substring(0, 10)}...`);

  const auth = Buffer.from(`${email}:${apiToken}`).toString('base64');

  try {
    // Test 1: Get current user
    console.log('\n📋 Test 1: Getting current user...');
    const userResponse = await fetch(`${baseUrl}/rest/api/3/myself`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      }
    });

    if (!userResponse.ok) {
      const error = await userResponse.text();
      throw new Error(`Auth failed: ${userResponse.status} - ${error}`);
    }

    const user = await userResponse.json();
    console.log(`   ✅ Authenticated as: ${user.displayName} (${user.emailAddress})`);

    // Test 2: Get projects
    console.log('\n📋 Test 2: Getting projects...');
    const projectsResponse = await fetch(`${baseUrl}/rest/api/3/project`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      }
    });

    if (!projectsResponse.ok) {
      const error = await projectsResponse.text();
      throw new Error(`Projects failed: ${projectsResponse.status} - ${error}`);
    }

    const projects = await projectsResponse.json();
    console.log(`   ✅ Found ${projects.length} project(s):`);
    projects.forEach((p: any) => {
      console.log(`      - ${p.key}: ${p.name}`);
    });

    // Test 3: Get issue types
    console.log('\n📋 Test 3: Getting issue types...');
    const typesResponse = await fetch(`${baseUrl}/rest/api/3/issuetype`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      }
    });

    if (!typesResponse.ok) {
      const error = await typesResponse.text();
      throw new Error(`Issue types failed: ${typesResponse.status} - ${error}`);
    }

    const types = await typesResponse.json();
    console.log(`   ✅ Available issue types:`);
    types.forEach((t: any) => {
      console.log(`      - ${t.name} (${t.subtask ? 'subtask' : 'standard'})`);
    });

    console.log('\n✅ All tests passed! JIRA connection is working.');
    return true;

  } catch (error) {
    console.error('\n❌ Connection test failed:', error);
    return false;
  }
}

testConnection()
  .then((success) => process.exit(success ? 0 : 1))
  .catch(() => process.exit(1));
