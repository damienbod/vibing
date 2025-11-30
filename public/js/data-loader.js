// Data loader module with security features

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
export function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Validate URL to ensure it uses safe protocols
 * @param {string} url - URL to validate
 * @returns {string} - Safe URL or '#' if invalid
 */
function validateUrl(url) {
  if (!url) return '#';
  try {
    const parsed = new URL(url, window.location.origin);
    // Only allow http, https, and relative URLs
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return url;
    }
  } catch (e) {
    // If URL parsing fails, it might be a relative URL
    // Check if it doesn't start with javascript:, data:, or other dangerous protocols
    if (!url.match(/^(javascript|data|vbscript|file):/i)) {
      return url;
    }
  }
  return '#';
}

/**
 * Safely parse JSON with error handling
 * @param {string} jsonString - JSON string to parse
 * @returns {Object|null} - Parsed object or null on error
 */
function safeJsonParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON parse error:', error);
    return null;
  }
}

/**
 * Load JSON data from a file
 * @param {string} url - URL to fetch data from
 * @returns {Promise<Object|null>} - Parsed JSON data or null on error
 */
export async function loadJsonData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    return safeJsonParse(text);
  } catch (error) {
    console.error('Failed to load data:', error);
    return null;
  }
}

/**
 * Load and display projects
 * @param {string} containerId - ID of the container element
 */
export async function loadProjects(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container ${containerId} not found`);
    return;
  }

  const data = await loadJsonData('/vibing/data/projects.json');
  if (!data || !data.projects) {
    container.innerHTML = '<p>Failed to load projects.</p>';
    return;
  }

  container.innerHTML = data.projects.map(project => `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${escapeHtml(project.name)}</h3>
      </div>
      <div class="card-body">
        <p>${escapeHtml(project.description)}</p>
        ${project.stars ? `<p class="text-muted">⭐ ${escapeHtml(project.stars)} stars</p>` : ''}
        ${project.topics ? `<div class="mt-2 mb-2">
          ${project.topics.map(topic => `<span class="badge">${escapeHtml(topic)}</span>`).join(' ')}
        </div>` : ''}
      </div>
      <div class="card-footer">
        <a href="${validateUrl(project.url)}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">View Project</a>
      </div>
    </div>
  `).join('');
}

/**
 * Load and display news
 * @param {string} containerId - ID of the container element
 */
export async function loadNews(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container ${containerId} not found`);
    return;
  }

  const data = await loadJsonData('/vibing/data/news.json');
  if (!data || !data.articles) {
    container.innerHTML = '<p>Failed to load news.</p>';
    return;
  }

  container.innerHTML = data.articles.map(article => `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${escapeHtml(article.title)}</h3>
        <p class="text-muted">${escapeHtml(article.date)}</p>
      </div>
      <div class="card-body">
        <p>${escapeHtml(article.summary)}</p>
      </div>
      <div class="card-footer">
        ${article.link ? `<a href="${validateUrl(article.link)}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">Read More</a>` : ''}
      </div>
    </div>
  `).join('');
}
