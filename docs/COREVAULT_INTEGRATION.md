# Core Vault Integration Guide

This document describes how Core APEX integrates with Core Vault for storing and sharing test reports.

## Overview

Core APEX uploads generated test reports to Core Vault, Progredi AI's artifact storage and sharing platform. Reports are stored as HTML artifacts that can be viewed publicly or privately.

## API Endpoint

```
POST https://z2kapkfa1l.execute-api.us-east-1.amazonaws.com/dev/create-artifact
```

## Request Format

```typescript
{
  title: string;           // Artifact title
  content: string;         // HTML content
  isPublic: boolean;       // true for public access
  userId: string;          // Owner email (maps to 'owner' in DB)
  metadata: {
    type: 'HTML',          // Artifact type for UnifiedRenderer
    tags: string[],        // Searchable tags
    source: string,        // Source system (e.g., 'Core APEX')
    // Custom metadata fields...
    rendering: {           // UnifiedRenderer configuration
      type: 'HTML',
      dependencies: {},
      executionMode: 'html-wrapped',
      security: {
        allowScripts: true,
        allowStyles: true,
        allowIframes: false,
        sandboxPermissions: ['allow-scripts', 'allow-same-origin', 'allow-forms']
      },
      hints: {
        transpilationNeeded: false,
        moduleSystem: 'none',
        hasJSX: false,
        hasTypeScript: false
      }
    }
  }
}
```

## Important Notes

### Field Mapping
- Use `userId` (NOT `owner`) - the API maps this to the `owner` field in DynamoDB
- Use `type` inside `metadata` (NOT at root level) - root-level `type` is not stored

### UnifiedRenderer Metadata
The `metadata.rendering` object tells Core Vault's UnifiedRenderer how to display the artifact:
- `executionMode: 'html-wrapped'` - For complete HTML documents
- `executionMode: 'iframe-sandboxed'` - For React components
- `executionMode: 'standalone'` - For Markdown/SVG

### Response Format

```typescript
{
  success: true,
  artifact: {
    id: string,           // UUID for the artifact
    owner: string,        // Maps from userId
    title: string,
    content: string,
    metadata: object,
    isPublic: boolean,
    viewCount: number,
    shareCount: number,
    downloadCount: number,
    createdAt: string,
    updatedAt: string
  }
}
```

## Viewing Artifacts

- **Public View**: `https://corevault.progrediai.com/view/{artifactId}`
- **Fullscreen**: `https://corevault.progrediai.com/fullscreen/{artifactId}`

## Example Usage

See `scripts/upload-reports-to-vault.ts` for a complete implementation that:
1. Generates HTML test reports
2. Uploads to Core Vault with proper metadata
3. Returns view URLs for each artifact

## API Endpoints Reference

| Method | Path | Description |
|--------|------|-------------|
| POST | `/create-artifact` | Create new artifact |
| GET | `/get/{id}` | Get artifact by ID |
| GET | `/list-artifacts?userId=` | List user's artifacts |
| PUT | `/update-artifact` | Update existing artifact |
| DELETE | `/delete-artifact` | Delete artifact |

## Troubleshooting

### "Failed to load artifact" Error
- Verify `userId` is set (not `owner`)
- Check `isPublic: true` for public access
- Ensure `metadata.rendering` is properly configured

### Artifact displays raw code
- Add `metadata.rendering.executionMode: 'html-wrapped'` for HTML
- Ensure content starts with `<!DOCTYPE html>` for automatic detection

## Contact

For Core Vault API issues, contact the Core Vault team or check:
- Repository: `claude-artifact-share`
- Lambda: `amplify/backend/function/stripeAPI/src/index.js`
