document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add staggered delay if it's a list item
        if (entry.target.classList.contains('stagger-item')) {
          const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
        }
        
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const targets = document.querySelectorAll('.fade-in, .stagger-item, .reveal-up, .text-reveal');
  targets.forEach(target => observer.observe(target));

  // Header Sticky Logic
  const header = document.querySelector('.site-header');
  const scrollThreshold = 100;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('is-sticky');
    } else {
      header.classList.remove('is-sticky');
    }
  });

  // Spotlight Mouse Tracker
  const spotlights = document.querySelectorAll('.spotlight');
  spotlights.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--x', `${x}px`);
      el.style.setProperty('--y', `${y}px`);
    });
  });
});
