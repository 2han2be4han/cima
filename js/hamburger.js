document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  const body = document.body;

  // Mark current page in the nav menu
  if (menu) {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const currentFile = path === '' ? 'index.html' : path;
    menu.querySelectorAll('a').forEach(a => {
      const href = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
      if (href === currentFile) {
        a.classList.add('is-current');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isActive = toggle.classList.toggle('active');
    menu.classList.toggle('active');
    
    // クラスベースの制御に統一 (animations.css の is-locked)
    if (isActive) {
      body.classList.add('is-locked');
    } else {
      body.classList.remove('is-locked');
    }
  });

  // Close menu when clicking a link
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      body.classList.remove('is-locked');
    });
  });
});
