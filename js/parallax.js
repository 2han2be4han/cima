document.addEventListener('DOMContentLoaded', () => {
  const parallaxElements = document.querySelectorAll('.parallax');

  if (parallaxElements.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    parallaxElements.forEach(el => {
      const speed = el.dataset.speed || 0.5;
      const offset = scrollY * speed;
      el.style.backgroundPositionY = `${offset}px`;
    });
  });
});
