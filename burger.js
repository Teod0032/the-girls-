// Rebecca
//inspiration  https://www.w3schools.com/howto/howto_js_mobile_navbar.asp 


// Henter elementer fra DOM'en
const burger  = document.querySelector('.burger');
const nav     = document.getElementById('mobile-nav');
const overlay = document.querySelector('.overlay');
const navCloseBtn = document.querySelector('.nav-close');

// Gemmer sidste element med fokus
let lastFocused = null;


// Åbn menuen
function openMenu() {
  lastFocused = document.activeElement; // husk hvilket element der havde fokus

  burger.setAttribute('aria-expanded', 'true');
  nav.classList.add('open');
  nav.setAttribute('aria-hidden', 'false');

  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add('is-visible')); // vis overlay med animation

  // Sæt fokus på første element i menuen
  const first = nav.querySelector('input, a, button, [tabindex]:not([tabindex="-1"])');
  (first || nav).focus({ preventScroll: true });

  // Luk med Escape-tasten
  document.addEventListener('keydown', onKeydown);
}

// Luk menuen
function closeMenu() {
  burger.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  nav.setAttribute('aria-hidden', 'true');

  overlay.classList.remove('is-visible');
  setTimeout(() => { overlay.hidden = true; }, 220); // vent på animation

  document.removeEventListener('keydown', onKeydown);

  // Giv fokus tilbage til burger-knappen
  if (lastFocused) burger.focus({ preventScroll: true });
}

// Skift mellem åben/lukket menu
function toggleMenu() {
  const isOpen = burger.getAttribute('aria-expanded') === 'true';
  isOpen ? closeMenu() : openMenu();
}

// Luk menu med Escape-tasten
function onKeydown(e){
  if (e.key === 'Escape') {
    e.preventDefault();
    closeMenu();
  }
}


// Kør først når DOM er indlæst
document.addEventListener('DOMContentLoaded', () => {
  console.log('[nav] init'); // viser at scriptet er startet

  // Stop hvis vigtige elementer mangler
  if (!burger || !nav || !overlay) {
    console.warn('[nav] Missing elements', { burger: !!burger, nav: !!nav, overlay: !!overlay });
    return;
  }

  // Klik-hændelser
  burger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);
  navCloseBtn?.addEventListener('click', closeMenu);

  // Luk når man klikker på links/knapper i menuen
  const interactive = Array.from(nav.querySelectorAll('a, button'));
  for (const el of interactive) {
    el.addEventListener('click', closeMenu);
  }

  // Luk menuen automatisk ved desktop-størrelse
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });
});