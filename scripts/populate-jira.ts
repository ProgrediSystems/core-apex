/**
 * Script to populate JIRA with Amazon.com Phase 2 requirements
 * Run with: npx ts-node scripts/populate-jira.ts
 */

// Amazon.com Phase 2 Requirements - All 77 functional requirements
const amazonRequirements = {
  'UC1': {
    name: 'Add to Cart',
    epic: {
      summary: 'UC1: Add to Cart',
      description: 'Add items to a shopping cart for later purchase on www.amazon.com'
    },
    stories: [
      {
        id: 'FR1',
        summary: 'Product Selection: Allow user to select product for cart',
        priority: 'Critical',
        subtasks: [
          { id: 'FR1.1', summary: 'Enable product selection from product listing pages', priority: 'High' },
          { id: 'FR1.2', summary: 'Enable product selection from product detail pages', priority: 'High' },
          { id: 'FR1.3', summary: 'Enable product selection from search results pages', priority: 'High' }
        ]
      },
      {
        id: 'FR2',
        summary: 'Quantity Specification: Allow user to specify quantity',
        priority: 'Critical',
        subtasks: [
          { id: 'FR2.1', summary: 'Provide quantity input field (text box or dropdown)', priority: 'High' },
          { id: 'FR2.2', summary: 'Allow increment/decrement quantity using buttons', priority: 'Medium' },
          { id: 'FR2.3', summary: 'Validate quantity is valid positive integer', priority: 'High' }
        ]
      },
      {
        id: 'FR4',
        summary: 'Add to Cart Action: Provide clear Add to Cart button',
        priority: 'Critical',
        subtasks: [
          { id: 'FR4.1', summary: 'Display Add to Cart button on product detail page', priority: 'High' },
          { id: 'FR4.2', summary: 'Allow adding product by clicking Add to Cart button', priority: 'High' }
        ]
      },
      {
        id: 'FR5',
        summary: 'Cart Update: Update cart upon Add to Cart click',
        priority: 'Critical',
        subtasks: [
          { id: 'FR5.1', summary: 'Add selected product with quantity to cart', priority: 'High' },
          { id: 'FR5.2', summary: 'Update quantity if product already in cart', priority: 'High' },
          { id: 'FR5.3', summary: 'Persist shopping cart data in database/session', priority: 'Critical' }
        ]
      }
    ]
  },
  'UC2': {
    name: 'Wishlist',
    epic: {
      summary: 'UC2: Save to Wish List',
      description: 'Save desired products to a wish list for future reference or purchase'
    },
    stories: [
      {
        id: 'FR1',
        summary: 'Add to Wish List Action: Provide clear button',
        priority: 'High',
        subtasks: [
          { id: 'FR1.1', summary: 'Display Add to Wish List on product detail page', priority: 'High' },
          { id: 'FR1.3', summary: 'Display Add to Wish List in search results', priority: 'Medium' },
          { id: 'FR1.4', summary: 'Prompt login if user not authenticated', priority: 'Critical' }
        ]
      },
      {
        id: 'FR2',
        summary: 'Wish List Association: Associate with user account',
        priority: 'Critical',
        subtasks: [
          { id: 'FR2.1', summary: 'Each user has unique wish list', priority: 'Critical' },
          { id: 'FR2.2', summary: 'Store wish list data persistently', priority: 'Critical' }
        ]
      },
      {
        id: 'FR3',
        summary: 'Product Info Saved: Save essential product info',
        priority: 'High',
        subtasks: [
          { id: 'FR3.1', summary: 'Save product name to wish list', priority: 'High' },
          { id: 'FR3.2', summary: 'Save product image to wish list', priority: 'Medium' },
          { id: 'FR3.3', summary: 'Save current product price to wish list', priority: 'High' },
          { id: 'FR3.4', summary: 'Save product URL to wish list', priority: 'Medium' }
        ]
      },
      {
        id: 'FR4',
        summary: 'Confirmation: Provide immediate feedback',
        priority: 'High',
        subtasks: [
          { id: 'FR4.1', summary: 'Display success message Added to Wish List', priority: 'High' },
          { id: 'FR4.2', summary: 'Provide link to view wish list', priority: 'Medium' }
        ]
      },
      {
        id: 'FR5',
        summary: 'Wish List Management: Allow user to manage list',
        priority: 'High',
        subtasks: [
          { id: 'FR5.1', summary: 'Provide dedicated Wish List page', priority: 'High' },
          { id: 'FR5.2', summary: 'Display all items in wish list', priority: 'High' },
          { id: 'FR5.3', summary: 'Allow removing items from wish list', priority: 'High' },
          { id: 'FR5.4', summary: 'Allow moving items to shopping cart', priority: 'High' },
          { id: 'FR5.5', summary: 'Allow changing quantity of wished items', priority: 'Medium' }
        ]
      }
    ]
  },
  'UC3': {
    name: 'Search Filters',
    epic: {
      summary: 'UC3: Use Search Filters',
      description: 'Refine search results based on price, brand, customer ratings, etc.'
    },
    stories: [
      {
        id: 'FR1',
        summary: 'Filter Display: Display available search filters',
        priority: 'High',
        subtasks: [
          { id: 'FR1.1', summary: 'Display filters relevant to search query/category', priority: 'High' },
          { id: 'FR1.2', summary: 'Group related filters together', priority: 'Medium' },
          { id: 'FR1.3', summary: 'Present filters in clear organized manner', priority: 'Medium' },
          { id: 'FR1.4', summary: 'Indicate product count for each filter option', priority: 'Medium' }
        ]
      },
      {
        id: 'FR2',
        summary: 'Filter Selection: Allow selecting filter options',
        priority: 'High',
        subtasks: [
          { id: 'FR2.1', summary: 'Support single-select filters', priority: 'High' },
          { id: 'FR2.2', summary: 'Support multi-select filters', priority: 'High' },
          { id: 'FR2.3', summary: 'Support range-based filters (price range)', priority: 'High' },
          { id: 'FR2.4', summary: 'Visual indication of selected filters', priority: 'Medium' }
        ]
      },
      {
        id: 'FR3',
        summary: 'Filter Application: Apply filters to results',
        priority: 'Critical',
        subtasks: [
          { id: 'FR3.1', summary: 'Dynamically update products based on filters', priority: 'Critical' },
          { id: 'FR3.2', summary: 'Apply filters in real-time without page reload', priority: 'High' },
          { id: 'FR3.3', summary: 'Display matching product count', priority: 'Medium' }
        ]
      },
      {
        id: 'FR4',
        summary: 'Filter Persistence: Persist filters during navigation',
        priority: 'High',
        subtasks: [
          { id: 'FR4.1', summary: 'Maintain filters when viewing product details', priority: 'High' },
          { id: 'FR4.2', summary: 'Maintain filters across category pages', priority: 'Medium' }
        ]
      },
      {
        id: 'FR5',
        summary: 'Filter Reset: Allow clearing filters',
        priority: 'High',
        subtasks: [
          { id: 'FR5.1', summary: 'Provide Clear All Filters button', priority: 'High' },
          { id: 'FR5.2', summary: 'Allow deselecting individual filters', priority: 'High' },
          { id: 'FR5.3', summary: 'Display unfiltered results when cleared', priority: 'High' }
        ]
      },
      {
        id: 'FR6',
        summary: 'Filter Relevance: Ensure relevant filters shown',
        priority: 'Medium',
        subtasks: [
          { id: 'FR6.1', summary: 'Hide/disable non-applicable filters', priority: 'Medium' },
          { id: 'FR6.2', summary: 'Adjust filter options dynamically', priority: 'Medium' }
        ]
      }
    ]
  },
  'UC4': {
    name: 'Login/Logout',
    epic: {
      summary: 'UC4: Login/Logout',
      description: 'Users access and exit their Amazon accounts'
    },
    stories: [
      {
        id: 'FR1',
        summary: 'Login Form Display: Display login form',
        priority: 'Critical',
        subtasks: [
          { id: 'FR1.1', summary: 'Display username/email and password fields', priority: 'Critical' },
          { id: 'FR1.2', summary: 'Provide Login button to submit form', priority: 'Critical' },
          { id: 'FR1.3', summary: 'Provide Forgot Password link', priority: 'High' },
          { id: 'FR1.4', summary: 'Provide Create Account link', priority: 'High' }
        ]
      },
      {
        id: 'FR2',
        summary: 'Credential Validation: Validate against database',
        priority: 'Critical',
        subtasks: [
          { id: 'FR2.1', summary: 'Verify username/email exists in database', priority: 'Critical' },
          { id: 'FR2.2', summary: 'Verify password matches stored password', priority: 'Critical' }
        ]
      },
      {
        id: 'FR3',
        summary: 'Successful Auth: Handle successful login',
        priority: 'Critical',
        subtasks: [
          { id: 'FR3.1', summary: 'Establish secure session for user', priority: 'Critical' },
          { id: 'FR3.2', summary: 'Redirect to appropriate page', priority: 'High' },
          { id: 'FR3.3', summary: 'Display authenticated status', priority: 'High' },
          { id: 'FR3.4', summary: 'Hide login form and show Logout button', priority: 'High' }
        ]
      },
      {
        id: 'FR4',
        summary: 'Failed Auth: Handle failed login',
        priority: 'High',
        subtasks: [
          { id: 'FR4.1', summary: 'Display user-friendly error message', priority: 'High' },
          { id: 'FR4.2', summary: 'Allow user to retry login', priority: 'High' },
          { id: 'FR4.3', summary: 'Provide password recovery guidance', priority: 'Medium' }
        ]
      },
      {
        id: 'FR5',
        summary: 'Logout Functionality: Provide logout option',
        priority: 'Critical',
        subtasks: [
          { id: 'FR5.1', summary: 'Display Logout in prominent location', priority: 'High' },
          { id: 'FR5.2', summary: 'Terminate user session on logout', priority: 'Critical' },
          { id: 'FR5.3', summary: 'Redirect to login or homepage', priority: 'High' }
        ]
      }
    ]
  },
  'UC5': {
    name: 'Profile Management',
    epic: {
      summary: 'UC5: Manage Profile Information',
      description: 'Update name, email address, phone number, and addresses'
    },
    stories: [
      {
        id: 'FR1',
        summary: 'Profile Access: Provide link to profile page',
        priority: 'High',
        subtasks: [
          { id: 'FR1.1', summary: 'Display Your Account link in header/menu', priority: 'High' },
          { id: 'FR1.2', summary: 'Require login to access profile', priority: 'Critical' },
          { id: 'FR1.3', summary: 'Redirect to login if not authenticated', priority: 'High' }
        ]
      },
      {
        id: 'FR2',
        summary: 'Display Profile: Show current profile info',
        priority: 'High',
        subtasks: [
          { id: 'FR2.1', summary: 'Display user name (first and last)', priority: 'High' },
          { id: 'FR2.2', summary: 'Display user email address', priority: 'High' },
          { id: 'FR2.3', summary: 'Display user phone number', priority: 'Medium' },
          { id: 'FR2.4', summary: 'Display default shipping address', priority: 'High' },
          { id: 'FR2.5', summary: 'Display communication preferences', priority: 'Medium' }
        ]
      },
      {
        id: 'FR3',
        summary: 'Edit Name: Allow editing name',
        priority: 'High',
        subtasks: [
          { id: 'FR3.1', summary: 'Provide first/last name input fields', priority: 'High' },
          { id: 'FR3.2', summary: 'Save updated name to profile', priority: 'High' }
        ]
      },
      {
        id: 'FR4',
        summary: 'Edit Email: Allow editing email',
        priority: 'Critical',
        subtasks: [
          { id: 'FR4.1', summary: 'Provide email input field', priority: 'High' },
          { id: 'FR4.2', summary: 'Validate email format', priority: 'High' },
          { id: 'FR4.3', summary: 'Send verification email to new address', priority: 'Critical' },
          { id: 'FR4.4', summary: 'Require verification link confirmation', priority: 'Critical' },
          { id: 'FR4.5', summary: 'Update email only after verification', priority: 'Critical' }
        ]
      },
      {
        id: 'FR5',
        summary: 'Edit Phone: Allow editing phone number',
        priority: 'High',
        subtasks: [
          { id: 'FR5.1', summary: 'Provide phone number input field', priority: 'High' },
          { id: 'FR5.2', summary: 'Validate phone number format', priority: 'High' },
          { id: 'FR5.3', summary: 'Save updated phone to profile', priority: 'High' }
        ]
      },
      {
        id: 'FR6',
        summary: 'Manage Addresses: Allow address management',
        priority: 'High',
        subtasks: [
          { id: 'FR6.1', summary: 'Allow adding new addresses', priority: 'High' },
          { id: 'FR6.2', summary: 'Allow editing existing addresses', priority: 'High' },
          { id: 'FR6.3', summary: 'Allow deleting addresses', priority: 'High' },
          { id: 'FR6.4', summary: 'Allow setting default shipping address', priority: 'High' },
          { id: 'FR6.5', summary: 'Validate address format', priority: 'High' }
        ]
      }
    ]
  }
};

interface JiraConfig {
  baseUrl: string;
  email: string;
  apiToken: string;
  projectKey: string;
}

async function createJiraIssue(
  config: JiraConfig,
  issueType: string,
  summary: string,
  description?: string,
  parentKey?: string,
  labels?: string[],
  priority?: string
): Promise<{ key: string; id: string }> {
  const auth = Buffer.from(`${config.email}:${config.apiToken}`).toString('base64');

  const fields: any = {
    project: { key: config.projectKey },
    issuetype: { name: issueType },
    summary,
    labels: labels || []
  };

  if (description) {
    fields.description = {
      type: 'doc',
      version: 1,
      content: [{
        type: 'paragraph',
        content: [{ type: 'text', text: description }]
      }]
    };
  }

  if (priority) {
    fields.priority = { name: priority };
  }

  if (parentKey && (issueType === 'Sub-task' || issueType === 'Subtask')) {
    fields.parent = { key: parentKey };
  }

  const response = await fetch(`${config.baseUrl}/rest/api/3/issue`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fields })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create issue: ${response.status} - ${error}`);
  }

  return response.json();
}

async function populateJira(config: JiraConfig) {
  console.log('🚀 Starting JIRA population with Amazon.com Phase 2 requirements...\n');

  let totalCreated = 0;
  const createdIssues: { key: string; summary: string; type: string }[] = [];

  for (const [ucKey, uc] of Object.entries(amazonRequirements)) {
    console.log(`\n📦 Creating ${ucKey}: ${uc.name}`);

    // Create Epic
    try {
      const epic = await createJiraIssue(
        config,
        'Epic',
        uc.epic.summary,
        uc.epic.description,
        undefined,
        [ucKey, 'Phase2', 'Amazon']
      );
      console.log(`  ✅ Created Epic: ${epic.key}`);
      createdIssues.push({ key: epic.key, summary: uc.epic.summary, type: 'Epic' });
      totalCreated++;

      // Create Stories under the Epic
      for (const story of uc.stories) {
        try {
          const storyIssue = await createJiraIssue(
            config,
            'Task',  // Using Task since Story is not available in this project
            `${ucKey}-${story.id}: ${story.summary}`,
            `Functional Requirement ${story.id} for ${uc.name}`,
            undefined, // Tasks aren't children of Epics in JIRA Cloud - they use Epic Link
            [ucKey, `FR${story.id}`, 'Phase2'],
            story.priority
          );
          console.log(`    ✅ Story: ${storyIssue.key} - ${story.summary}`);
          createdIssues.push({ key: storyIssue.key, summary: story.summary, type: 'Story' });
          totalCreated++;

          // Create Sub-tasks under the Story
          for (const subtask of story.subtasks) {
            try {
              const subtaskIssue = await createJiraIssue(
                config,
                'Subtask',  // Using Subtask (not Sub-task) as shown in project types
                `${ucKey}-${subtask.id}: ${subtask.summary}`,
                `Sub-requirement ${subtask.id} for ${story.id}`,
                storyIssue.key,
                [ucKey, `FR${subtask.id}`, 'Phase2'],
                subtask.priority
              );
              console.log(`      ✅ Sub-task: ${subtaskIssue.key}`);
              createdIssues.push({ key: subtaskIssue.key, summary: subtask.summary, type: 'Sub-task' });
              totalCreated++;
            } catch (error) {
              console.error(`      ❌ Failed to create sub-task ${subtask.id}:`, error);
            }
          }
        } catch (error) {
          console.error(`    ❌ Failed to create story ${story.id}:`, error);
        }
      }
    } catch (error) {
      console.error(`  ❌ Failed to create epic for ${ucKey}:`, error);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`🎉 JIRA Population Complete!`);
  console.log(`   Total Issues Created: ${totalCreated}`);
  console.log(`   - Epics: ${createdIssues.filter(i => i.type === 'Epic').length}`);
  console.log(`   - Stories: ${createdIssues.filter(i => i.type === 'Story').length}`);
  console.log(`   - Sub-tasks: ${createdIssues.filter(i => i.type === 'Sub-task').length}`);
  console.log('='.repeat(60));

  return createdIssues;
}

// Main execution
const config: JiraConfig = {
  baseUrl: process.env.JIRA_BASE_URL || '',
  email: process.env.JIRA_EMAIL || '',
  apiToken: process.env.JIRA_API_TOKEN || '',
  projectKey: process.env.JIRA_PROJECT_KEY || 'APEX'
};

if (!config.baseUrl || !config.email || !config.apiToken) {
  console.error('❌ Missing JIRA configuration. Set environment variables:');
  console.error('   JIRA_BASE_URL=https://your-domain.atlassian.net');
  console.error('   JIRA_EMAIL=your-email@example.com');
  console.error('   JIRA_API_TOKEN=your-api-token');
  console.error('   JIRA_PROJECT_KEY=APEX');
  process.exit(1);
}

populateJira(config)
  .then(() => {
    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
