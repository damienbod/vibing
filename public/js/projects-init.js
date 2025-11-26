// Projects page initialization
import { loadProjects } from '/vibing/js/data-loader.js';

// Initialize projects page
function initProjectsPage() {
  loadProjects('projects-container');
}

// Initialize on DOM content loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjectsPage);
} else {
  initProjectsPage();
}
