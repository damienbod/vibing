#!/usr/bin/env node

/**
 * Update Projects Data Script
 * 
 * This script fetches the latest GitHub star counts for all projects listed in
 * public/data/projects.json and updates the file with accurate data.
 * 
 * For the angular-auth-oidc-client project, it also fetches the total npm downloads.
 * 
 * Usage: node scripts/update-projects-data.js
 */

import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const PROJECTS_FILE = join(process.cwd(), 'public/data/projects.json');

/**
 * Fetch GitHub repository stars count
 * @param {string} repoUrl - GitHub repository URL
 * @returns {Promise<number|null>} - Star count or null if failed
 */
async function fetchGitHubStars(repoUrl) {
  try {
    // Extract owner and repo name from URL
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      console.error(`Invalid GitHub URL: ${repoUrl}`);
      return null;
    }

    const [, owner, repo] = match;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
    
    console.log(`Fetching stars for ${owner}/${repo}...`);
    
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'vibing-project-updater'
    };
    
    // Use GitHub token if available (in GitHub Actions)
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    
    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      console.error(`Failed to fetch ${owner}/${repo}: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    console.log(`  ✓ ${owner}/${repo}: ${data.stargazers_count} stars`);
    return data.stargazers_count;
  } catch (error) {
    console.error(`Error fetching stars for ${repoUrl}:`, error.message);
    return null;
  }
}

/**
 * Fetch npm package total downloads
 * @param {string} packageName - NPM package name
 * @returns {Promise<number|null>} - Total downloads or null if failed
 */
async function fetchNpmDownloads(packageName) {
  try {
    console.log(`Fetching npm downloads for ${packageName}...`);
    
    // Fetch package info from npm registry to get creation date
    const registryUrl = `https://registry.npmjs.org/${packageName}`;
    const registryResponse = await fetch(registryUrl, {
      headers: {
        'User-Agent': 'vibing-project-updater'
      }
    });

    if (!registryResponse.ok) {
      console.error(`Failed to fetch package info for ${packageName}: ${registryResponse.status}`);
      return null;
    }

    const packageInfo = await registryResponse.json();
    const createdDate = packageInfo.time?.created || '2017-01-01';
    
    // Get downloads from creation date to now
    const endDate = new Date();
    const startDate = new Date(createdDate);
    
    const formattedEnd = endDate.toISOString().split('T')[0];
    const formattedStart = startDate.toISOString().split('T')[0];
    
    const apiUrl = `https://api.npmjs.org/downloads/point/${formattedStart}:${formattedEnd}/${packageName}`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'vibing-project-updater'
      }
    });

    if (!response.ok) {
      console.error(`Failed to fetch npm downloads for ${packageName}: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    console.log(`  ✓ ${packageName}: ${data.downloads.toLocaleString()} total downloads`);
    return data.downloads;
  } catch (error) {
    console.error(`Error fetching npm downloads for ${packageName}:`, error.message);
    return null;
  }
}

/**
 * Update projects data with latest GitHub stars and npm downloads
 */
async function updateProjectsData() {
  try {
    console.log('Reading projects.json...');
    const fileContent = await readFile(PROJECTS_FILE, 'utf-8');
    const data = JSON.parse(fileContent);

    if (!data.projects || !Array.isArray(data.projects)) {
      console.error('Invalid projects.json structure');
      process.exit(1);
    }

    console.log(`Found ${data.projects.length} projects to update\n`);

    // Update each project with fresh GitHub stars
    for (const project of data.projects) {
      if (project.url) {
        const stars = await fetchGitHubStars(project.url);
        if (stars !== null) {
          project.stars = stars.toString();
        }
        
        // For projects with npm packages, also fetch npm downloads
        if (project.npmPackage) {
          const downloads = await fetchNpmDownloads(project.npmPackage);
          if (downloads !== null) {
            project.npmDownloads = downloads;
          }
        }
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Write updated data back to file
    console.log('\nWriting updated data to projects.json...');
    await writeFile(PROJECTS_FILE, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    console.log('✓ Projects data updated successfully!');
    
    // Display summary
    console.log('\nSummary:');
    for (const project of data.projects) {
      console.log(`  ${project.name}: ${project.stars} stars${project.npmDownloads ? `, ${project.npmDownloads.toLocaleString()} npm downloads` : ''}`);
    }
  } catch (error) {
    console.error('Error updating projects data:', error);
    process.exit(1);
  }
}

// Run the update
updateProjectsData();
