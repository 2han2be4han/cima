/**
 * Shared layout partials — single source of truth for header/footer/floating CTA.
 * Any page can include these by adding <div data-partial="header"></div> etc.
 *
 * Works over file:// protocol (no fetch). Inject as the first script in <head>
 * with the `defer` attribute (before hamburger.js / scroll-animation.js).
 */
(() => {
  const PARTIALS = {
    header: `
      <header class="site-header">
        <a href="index.html" class="logo">
          <svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" stroke-width="1.2"/>
            <path d="M27 13.5a9 9 0 1 0 0 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            <circle cx="20" cy="20" r="1.4" fill="var(--accent)"/>
          </svg>
          <span class="logo-text">株式会社CIMA</span>
        </a>
        <div class="nav-toggle" id="navToggle">
          <span></span><span></span><span></span>
        </div>
        <nav class="nav-menu" id="navMenu">
          <ul>
            <li><a href="index.html">TOP</a></li>
            <li><a href="service.html">SERVICE</a></li>
            <li><a href="contact.html">CONTACT</a></li>
            <li><a href="greeting.html">GREETING</a></li>
            <li><a href="about.html">ABOUT</a></li>
            <li><a href="wedding-venues.html">LOCATIONS</a></li>
            <li><a href="works.html">WORKS</a></li>
            <li><a href="voice.html">VOICE</a></li>
            <li><a href="news.html">NEWS</a></li>
          </ul>
          <div class="nav-footer">
            <a href="https://www.instagram.com/egashiratakashi_shinojima" target="_blank" rel="noopener" class="sns-link">Instagram</a>
            <a href="contact.html" class="btn btn-primary">お問い合わせ</a>
          </div>
        </nav>
      </header>
    `,
    footer: `
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-logo">株式会社CIMA</div>
          <div class="footer-info">
            <p>〒470-3505 愛知県知多郡南知多町篠島浦磯1-1</p>
            <p>TEL: 00-0000-0000</p>
          </div>
          <nav class="footer-nav">
            <ul>
              <li><a href="index.html">TOP</a></li>
              <li><a href="service.html">SERVICE</a></li>
              <li><a href="contact.html">CONTACT</a></li>
              <li><a href="greeting.html">GREETING</a></li>
              <li><a href="about.html">ABOUT</a></li>
              <li><a href="wedding-venues.html">LOCATIONS</a></li>
              <li><a href="works.html">WORKS</a></li>
              <li><a href="voice.html">VOICE</a></li>
              <li><a href="news.html">NEWS</a></li>
              <li><a href="privacy.html">PRIVACY</a></li>
              <li><a href="terms.html">TERMS</a></li>
            </ul>
          </nav>
          <div class="footer-sns">
            <a href="https://www.instagram.com/egashiratakashi_shinojima" target="_blank" rel="noopener" class="sns-link">INSTAGRAM</a>
          </div>
        </div>
        <div class="footer-copyright">
          <p>© 2026 株式会社CIMAALL RIGHT</p>
        </div>
      </footer>
    `,
    floating: `
      <div class="floating-cta">
        <a href="contact.html" class="btn btn-floating">お問い合わせ</a>
      </div>
    `
  };

  function injectPartials() {
    document.querySelectorAll('[data-partial]').forEach(el => {
      const name = el.dataset.partial;
      if (PARTIALS[name]) {
        el.outerHTML = PARTIALS[name];
      }
    });
  }

  // Inject immediately if DOM is already parsed, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectPartials);
  } else {
    injectPartials();
  }
})();
