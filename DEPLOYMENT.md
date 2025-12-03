# Core APEX Deployment Guide

## Current Deployment

Core APEX is deployed on AWS Amplify and accessible at:
- **Amplify URL**: https://d14he23az4p7fo.amplifyapp.com
- **Custom Domain** (pending setup): https://coreapex.progrediai.com

## Deployment Architecture

Core APEX follows the same microservice architecture as other Core agents:
- Standalone Next.js application
- Deployed via AWS Amplify
- Integrated with Core platform via agent registry
- Independent scaling and updates

## AWS Amplify Configuration

- **App ID**: d14he23az4p7fo
- **Region**: us-east-1
- **Branch**: main
- **Build**: Automatic on push to main

## Custom Domain Setup

To set up the custom domain `coreapex.progrediai.com`:

1. Add domain in Amplify Console:
```bash
aws amplify create-domain-association \
  --app-id d14he23az4p7fo \
  --domain-name coreapex.progrediai.com
```

2. Configure DNS records in your domain provider
3. Wait for SSL certificate validation

## Environment Variables

Set these in Amplify Console:

```
OPENAI_API_KEY=<your-key>
NEXTAUTH_SECRET=<generated-secret>
NODE_ENV=production
```

## Deployment Process

1. **Development**:
```bash
npm run dev
# Access at http://localhost:3006
```

2. **Production**:
- Push to main branch
- Amplify automatically builds and deploys
- Monitor at: https://console.aws.amazon.com/amplify/

## Integration with Core Platform

Core APEX appears in the main Core platform agents page:
1. Card shows on https://core.progrediai.com/agents
2. Click directs to Core APEX application
3. No authentication required for MVP demo

## Monitoring

- **Build Status**: AWS Amplify Console
- **Logs**: CloudWatch Logs
- **Metrics**: CloudWatch Metrics
- **Alarms**: Set up for production

## Troubleshooting

### Build Failures
- Check Amplify build logs
- Verify Node.js version (>=18)
- Check package dependencies

### Runtime Issues
- Check CloudWatch logs
- Verify environment variables
- Check API endpoints

## Updates

To update Core APEX:
1. Make changes locally
2. Test thoroughly
3. Commit and push to main
4. Amplify auto-deploys

## Rollback

If issues occur:
1. Revert commit in Git
2. Push to trigger new deployment
3. Or use Amplify Console to redeploy previous version