// Variabler i globalt scope
const burger  = document.querySelector('.burger');
const nav     = document.getElementById('mobile-nav');
const overlay = document.querySelector('.overlay');
const closeBtn= document.querySelector('.nav-close');

let lastFocused = null;

// Åbn menu
function openMenu() {
  lastFocused = document.activeElement;
  burger.setAttribute('aria-expanded', 'true');
  nav.classList.add('open');
  nav.setAttribute('aria-hidden', 'false');

  // Overlay
  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add('is-visible'));

  // Fokus til første fokusérbare i panelet
  const first = nav.querySelector('input, a, button, [tabindex]:not([tabindex="-1"])');
  (first || nav).focus({ preventScroll: true });

  document.addEventListener('keydown', onKeydown);
}

// Luk menu
function closeMenu() {
  burger.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  nav.setAttribute('aria-hidden', 'true');

  overlay.classList.remove('is-visible');
  // Vent på transition før vi skjuler for skærmlæsere
  setTimeout(() => { overlay.hidden = true; }, 220);

  document.removeEventListener('keydown', onKeydown);
  if (lastFocused) burger.focus({ preventScroll: true });
}

// Toggle
function toggleMenu() {
  const isOpen = burger.getAttribute('aria-expanded') === 'true';
  isOpen ? closeMenu() : openMenu();
}

// Esc for at lukke
function onKeydown(e){
  if (e.key === 'Escape') {
    e.preventDefault();
    closeMenu();
  }
}

// Hændelser
burger?.addEventListener('click', toggleMenu);
overlay?.addEventListener('click', closeMenu);
closeBtn?.addEventListener('click', closeMenu);

// Luk når man klikker på link i menuen (mobil)
nav?.addEventListener('click', (e) => {
  if (e.target.matches('a')) closeMenu();
});

// Luk automatisk ved resize til desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMenu();
});