# Core APEX - Automated Performance & Evaluation eXpert

## AI-Powered Testing Automation for Navy Systems

Core APEX transforms manual testing with AI agents that generate, execute, and maintain test suites. Built specifically for PEO MLB, Core APEX significantly reduces test development time while working toward DoD compliance.

## Key Features

- **Significant Reduction** in test development time
- **AI-Powered** defect detection capabilities
- **Cost Savings** through automation
- **Security-First** architecture
- **Human-in-the-Loop** governance

## 🤖 Six Specialized AI Agents

1. **Requirements Agent** - Parses JIRA, DOORS, and documents into testable assertions
2. **Test Design Agent** - Generates comprehensive test scenarios and executable scripts
3. **Execution Agent** - Orchestrates parallel test execution with CI/CD integration
4. **Analysis Agent** - Predicts defects with AI-powered pattern recognition
5. **Maintenance Agent** - Automatically updates tests when code changes
6. **Compliance Agent** - Ensures Section 508 and DoD standards compliance

## Technology Stack

- **AI**: Claude Sonnet 4.0
- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Node.js, API Routes
- **Infrastructure**: AWS Amplify (MVP), designed for AWS GovCloud
- **Deployment**: AWS Amplify Hosting (production target: AWS GovCloud)

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Access the application at `http://localhost:3006`

## 📁 Project Structure

```
core-apex/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main dashboard
│   ├── presentation/      # Presentation mode
│   └── api/              # API endpoints
│       └── apex/         # APEX agent APIs
├── components/            # React components
│   └── APEXDemoWorkflow.tsx
├── lib/                   # Utility libraries
└── public/               # Static assets
```

## 🌐 Deployment

Core APEX is deployed using AWS Amplify:

1. Push to main branch triggers automatic deployment
2. Builds and deploys to AWS Amplify hosting
3. Accessible at: `https://coreapex.progrediai.com`

## Security & Compliance

- **Security-First** design principles
- **Section 508** accessibility compliance targets
- **DISA STIG** alignment goals
- **Human review** for all AI-generated outputs

## 🎯 Integration Points

- **JIRA** - Requirements import and defect creation
- **Azure DevOps** - CI/CD pipeline integration
- **DOORS** - Requirements management via ReqIF
- **Git** - Automatic test maintenance
- **Power BI** - Analytics and reporting

## 📊 Performance Metrics

- Parse 50+ requirements in seconds
- Generate 100+ test cases in under a minute
- Execute 500 tests in parallel
- 95% requirement coverage achieved automatically

## 🤝 Navy-AIAT Phase 2

This MVP demonstrates Core APEX capabilities for the Navy-AIAT Phase 2 presentation:

- Live demo workflow showing end-to-end automation
- ROI calculator with real metrics
- 12-month implementation roadmap
- Integration with existing Navy systems

## 📞 Contact

**Progredi AI**
- Website: https://progrediai.com
- Email: info@progrediai.com
- Demo: https://core.progrediai.com/apex

## 📄 License

Proprietary - Progredi Systems, LLC

---

*Transforming Navy testing with AI-powered automation*