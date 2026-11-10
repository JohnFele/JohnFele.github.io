(() => {
  const scene = document.querySelector('.portrait-scene');
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion:reduce)');
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const updateScrollButton = () => {
      const shouldHide = window.scrollY < 500;
      if (backToTop.hidden !== shouldHide) backToTop.hidden = shouldHide;
    };
    window.addEventListener('scroll', updateScrollButton, { passive: true });
    window.addEventListener('pageshow', updateScrollButton);
    updateScrollButton();
    backToTop.addEventListener('click', () => {
      document.querySelector('.site-header .brand')?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    });
  }
  if (scene) {
    const frame = scene.querySelector('.portrait-frame');
    scene.addEventListener('pointermove', event => {
      if (!finePointer.matches || reducedMotion.matches) return;
      const box = scene.getBoundingClientRect();
      frame.style.setProperty('--tilt-x', ((.5 - (event.clientY - box.top) / box.height) * 5).toFixed(2) + 'deg');
      frame.style.setProperty('--tilt-y', (((event.clientX - box.left) / box.width - .5) * 6).toFixed(2) + 'deg');
    });
    const reset = () => { frame.style.removeProperty('--tilt-x'); frame.style.removeProperty('--tilt-y'); };
    scene.addEventListener('pointerleave', reset);
    reducedMotion.addEventListener('change', reset);
  }
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('open-sidebar');
  const overlay = document.querySelector('.nav-overlay');
  if (!nav || !toggle || !overlay) return;
  function setOpen(open, returnFocus = false) {
    nav.classList.toggle('show-sidebar', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    overlay.hidden = !open;
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  overlay.addEventListener('click', () => setOpen(false, true));
  nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', event => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') { setOpen(false, true); return; }
    if (event.key === 'Tab') {
      const last = nav.querySelector('a:last-child');
      if (event.shiftKey && document.activeElement === toggle) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); toggle.focus(); }
    }
  });
  window.matchMedia('(min-width:851px)').addEventListener('change', event => { if (event.matches) setOpen(false); });
  if (!document.body.classList.contains('work-page') && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const link = nav.querySelector('a[href="#' + entry.target.id + '"]');
        nav.querySelectorAll('[aria-current]').forEach(item => item.removeAttribute('aria-current'));
        if (link) link.setAttribute('aria-current', 'location');
      }
    }, {rootMargin: '-15% 0px -60% 0px'});
    document.querySelectorAll('main>section[id]').forEach(section => observer.observe(section));
  }
})();
