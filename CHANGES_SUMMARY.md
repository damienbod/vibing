# Changes Summary: Update Project Stars and NPM Downloads

## Overview
This update ensures the project page displays accurate, automatically-updated information about GitHub stars and npm downloads.

## Changes Made

### 1. Updated GitHub Star Counts (public/data/projects.json)
The following projects had their star counts updated to reflect current GitHub data:

| Project | Old Stars | New Stars | Change |
|---------|-----------|-----------|--------|
| AspNetCoreCertificates | 250 | 249 | -1 |
| angular-auth-oidc-client | 1215 | 1217 | +2 |
| AspNetCoreOpeniddict | 382 | 383 | +1 |
| AspNetCoreHybridFlowWithApi | 375 | 376 | +1 |
| EndToEndSecurityWeb | 10 | 13 | +3 |
| AzureDurableFunctions | 17 | 16 | -1 |
| McpSecurity | 14 | 15 | +1 |

### 2. Added NPM Package Tracking
- Added `npmPackage` field to `angular-auth-oidc-client` project
- This enables automatic tracking of npm download statistics for this package

### 3. Enhanced Data Display (public/js/data-loader.js)
- Added support for displaying npm download counts when available
- Downloads are formatted with locale-specific number formatting (e.g., "1,234,567 npm downloads")
- Icon: 📦 for npm downloads, ⭐ for GitHub stars

### 4. Automated Updates (scripts/update-projects-data.js)
Created a Node.js script that:
- Fetches current GitHub star counts from the GitHub API
- Fetches npm download statistics for packages with `npmPackage` field
- Updates `public/data/projects.json` automatically
- Uses GitHub token authentication when available (in CI/CD)
- Implements rate limiting protection with 1-second delays between API calls

### 5. GitHub Actions Integration (.github/workflows/static.yml)
Modified the deployment workflow to:
- Set up Node.js 20 environment
- Run the update script before deployment
- Pass GitHub token for API authentication
- Ensure data is always fresh on each deployment

### 6. Documentation (PROJECT_DATA_MAINTENANCE.md)
Created comprehensive documentation explaining:
- How the automatic update system works
- How to manually update data
- How to add new projects
- How to add npm package tracking to existing projects
- Troubleshooting information

### 7. Package Configuration (package.json)
Added package.json with:
- Update script: `npm run update-data`
- ES modules support
- Basic project metadata

## Testing

### Data Verification
All projects now show accurate star counts as of December 30, 2025:
- ✅ 13 projects with updated GitHub stars
- ✅ 1 project configured for npm downloads tracking
- ✅ Data structure validated and confirmed

### Workflow Integration
The GitHub Actions workflow will:
1. Checkout code
2. Setup Node.js
3. Run update script with GitHub token
4. Deploy updated data to GitHub Pages

## Benefits

1. **Accuracy**: Star counts and download statistics are automatically fetched from APIs
2. **Freshness**: Data updates on every deployment
3. **Maintainability**: No manual editing required for statistics
4. **Extensibility**: Easy to add npm package tracking to other projects
5. **Documentation**: Clear instructions for future maintenance

## Next Steps

When this PR is merged and deployed:
1. The workflow will run automatically
2. GitHub stars will be fetched for all projects
3. npm downloads will be fetched for angular-auth-oidc-client
4. Updated data will be deployed to GitHub Pages
5. Visitors will see current, accurate statistics

## Files Modified

- `.github/workflows/static.yml` - Added data update step
- `public/data/projects.json` - Updated star counts and added npmPackage field
- `public/js/data-loader.js` - Added npm downloads display

## Files Created

- `package.json` - Node.js project configuration
- `scripts/update-projects-data.js` - Automated update script
- `PROJECT_DATA_MAINTENANCE.md` - Maintenance documentation
