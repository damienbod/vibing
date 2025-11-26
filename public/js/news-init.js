// News page initialization
import { loadNews } from '/vibing/js/data-loader.js';

// Initialize news page
function initNewsPage() {
  loadNews('news-container');
}

// Initialize on DOM content loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNewsPage);
} else {
  initNewsPage();
}
