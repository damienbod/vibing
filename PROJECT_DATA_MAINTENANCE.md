# Project Data Maintenance

This document explains how the project data (GitHub stars and npm downloads) is maintained in the vibing website.

## Overview

The project information displayed on the [Projects page](https://damienbod.github.io/vibing/projects.html) is automatically updated when the site is deployed to GitHub Pages.

## Data Source

Project information is stored in `/public/data/projects.json`. This file contains:
- Project name and description
- GitHub repository URL
- Star count (updated automatically)
- npm package name (if applicable)
- npm download count (updated automatically for packages with `npmPackage` field)
- Topics/tags

## Automatic Updates

The GitHub Actions workflow (`.github/workflows/static.yml`) runs a Node.js script before each deployment that:

1. **Fetches GitHub stars**: Retrieves the current star count for each project from the GitHub API
2. **Fetches npm downloads**: For projects with an `npmPackage` field, retrieves total download counts from the npm API
3. **Updates the JSON file**: Writes the updated data to `public/data/projects.json`
4. **Deploys to GitHub Pages**: The updated data is then deployed as part of the static site

## Manual Updates

To manually update the project data:

```bash
# Install dependencies (if not already installed)
npm install

# Run the update script
npm run update-data
```

This will:
- Fetch current GitHub star counts for all projects
- Fetch npm download counts for projects with npm packages
- Update `public/data/projects.json` with the latest data

## Adding a New Project

To add a new project to the list:

1. Edit `/public/data/projects.json`
2. Add a new project object with the following structure:

```json
{
  "name": "Project Name",
  "description": "Project description",
  "url": "https://github.com/owner/repo",
  "stars": "0",
  "npmPackage": "package-name",  // Optional: only if the project has an npm package
  "topics": ["tag1", "tag2", "tag3"]
}
```

3. The star count and npm downloads will be automatically updated on the next deployment

## Adding npm Downloads to a Project

To display npm download counts for a project:

1. Add the `npmPackage` field to the project in `/public/data/projects.json`
2. The download count will be automatically fetched and displayed on the next deployment

Example:
```json
{
  "name": "angular-auth-oidc-client",
  "npmPackage": "angular-auth-oidc-client",
  ...
}
```

## How It Works

1. **GitHub Actions Trigger**: When code is pushed to the `main` branch or manually triggered
2. **Node.js Setup**: The workflow sets up Node.js 20
3. **Run Update Script**: Executes `npm run update-data` which runs `/scripts/update-projects-data.js`
4. **API Calls**:
   - GitHub API: Fetches repository metadata including star counts
   - npm API: Fetches package download statistics
5. **File Update**: Updates `/public/data/projects.json` with fresh data
6. **Deployment**: The updated files are deployed to GitHub Pages

## API Rate Limits

- **GitHub API**: The workflow uses the `GITHUB_TOKEN` which has higher rate limits (5,000 requests/hour)
- **npm API**: No authentication required, generous rate limits for download statistics

## Troubleshooting

If the data isn't updating:

1. Check the GitHub Actions logs for errors
2. Ensure the `GITHUB_TOKEN` is available in the workflow
3. Verify that the repository URLs in `projects.json` are correct
4. Check that npm package names (in `npmPackage` field) are correct

## Last Updated

The project data is updated automatically with each deployment. Check the GitHub Actions workflow runs to see the last update time.
