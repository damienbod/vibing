// Mobile navigation toggle
export function initNavToggle() {
  const navToggle = document.getElementById('nav-toggle');
  const navbarNav = document.getElementById('navbar-nav');
  
  if (navToggle && navbarNav) {
    navToggle.addEventListener('click', () => {
      navbarNav.classList.toggle('active');
    });
  }
}

// Initialize on DOM content loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavToggle);
} else {
  initNavToggle();
}
