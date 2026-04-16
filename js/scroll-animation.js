document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Animation only once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const targets = document.querySelectorAll('.fade-in, .stagger-item');
  targets.forEach(target => observer.observe(target));
});
