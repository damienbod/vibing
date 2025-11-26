// Carousel component with keyboard navigation support

export class Carousel {
  constructor(element) {
    this.carousel = element;
    this.track = element.querySelector('.carousel-track');
    this.items = Array.from(element.querySelectorAll('.carousel-item'));
    this.prevButton = element.querySelector('.carousel-control-prev');
    this.nextButton = element.querySelector('.carousel-control-next');
    this.indicators = Array.from(element.querySelectorAll('.carousel-indicator'));
    
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.autoplayDelay = 5000;
    
    this.init();
  }
  
  init() {
    if (this.items.length === 0) return;
    
    // Set up event listeners
    this.prevButton?.addEventListener('click', () => this.prev());
    this.nextButton?.addEventListener('click', () => this.next());
    
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goTo(index));
    });
    
    // Keyboard navigation
    this.carousel.addEventListener('keydown', (e) => this.handleKeyboard(e));
    
    // Pause autoplay on hover
    this.carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
    this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
    
    // Pause autoplay when focused
    this.carousel.addEventListener('focusin', () => this.pauseAutoplay());
    this.carousel.addEventListener('focusout', () => this.startAutoplay());
    
    // Start autoplay
    this.startAutoplay();
    
    // Update display
    this.updateDisplay();
  }
  
  handleKeyboard(e) {
    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.prev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.next();
        break;
      case 'Home':
        e.preventDefault();
        this.goTo(0);
        break;
      case 'End':
        e.preventDefault();
        this.goTo(this.items.length - 1);
        break;
    }
  }
  
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.updateDisplay();
  }
  
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateDisplay();
  }
  
  goTo(index) {
    if (index >= 0 && index < this.items.length) {
      this.currentIndex = index;
      this.updateDisplay();
    }
  }
  
  updateDisplay() {
    // Update track position
    const offset = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${offset}%)`;
    
    // Update indicators
    this.indicators.forEach((indicator, index) => {
      if (index === this.currentIndex) {
        indicator.classList.add('active');
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.classList.remove('active');
        indicator.removeAttribute('aria-current');
      }
    });
    
    // Update ARIA attributes
    this.items.forEach((item, index) => {
      if (index === this.currentIndex) {
        item.setAttribute('aria-hidden', 'false');
      } else {
        item.setAttribute('aria-hidden', 'true');
      }
    });
  }
  
  startAutoplay() {
    this.pauseAutoplay();
    this.autoplayInterval = setInterval(() => this.next(), this.autoplayDelay);
  }
  
  pauseAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
}

/**
 * Initialize all carousels on the page
 */
export function initCarousels() {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(element => new Carousel(element));
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarousels);
} else {
  initCarousels();
}
