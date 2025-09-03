// ==================== VARIABLER, DOM & OBJEKTER ====================
// [Krav: Variabler & typer, Variable scope (const/let), DOM, Objekter]
const burger  = document.querySelector('.burger');      // DOM-udvælgelse ⇒ DOM + Objekter
const nav     = document.getElementById('mobile-nav');  // DOM-udvælgelse ⇒ DOM + Objekter
const overlay = document.querySelector('.overlay');     // DOM-udvælgelse ⇒ DOM + Objekter
const closeBtn= document.querySelector('.nav-close');   // DOM-udvælgelse ⇒ DOM + Objekter

// [Krav: Variabler & typer, Variable scope (let), Scope demonstration]
let lastFocused = null;

// ==================== FUNKTIONER ====================
// [Krav: Funktioner, DOM, Objekter, Events (indirekte via addEventListener senere)]
function openMenu() {
  // [Krav: Variabler & scope] gemmer sidste fokuserede element
  lastFocused = document.activeElement;

  // [Krav: DOM + Objekter] attributter & classList manipulation
  burger.setAttribute('aria-expanded', 'true');
  nav.classList.add('open');
  nav.setAttribute('aria-hidden', 'false');

  // [Krav: DOM + Objekter] style-tilstand via class + skjul/vis
  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add('is-visible')); // [Krav: Funktioner (callback)]

  // [Krav: DOM] fokus-håndtering og selektor for fokusérbare elementer
  const first = nav.querySelector('input, a, button, [tabindex]:not([tabindex="-1"])');
  (first || nav).focus({ preventScroll: true }); // [Krav: Operatorer (||), Funktioner]

  // [Krav: Events] global keydown når menu er åben
  document.addEventListener('keydown', onKeydown);
}

// [Krav: Funktioner, DOM, Objekter]
function closeMenu() {
  burger.setAttribute('aria-expanded', 'false'); // [DOM + Objekter]
  nav.classList.remove('open');                  // [DOM + Objekter]
  nav.setAttribute('aria-hidden', 'true');       // [DOM + Objekter]

  overlay.classList.remove('is-visible');        // [DOM + Objekter]
  // [Krav: Funktioner + Debug timing] vent på CSS-transition
  setTimeout(() => { overlay.hidden = true; }, 220);

  // [Krav: Events] fjern keydown-lytter
  document.removeEventListener('keydown', onKeydown);

  // [Krav: Kontrolstruktur (if)] + DOM fokus
  if (lastFocused) burger.focus({ preventScroll: true });
}

// [Krav: Funktioner, Operatorer, DOM]
function toggleMenu() {
  // [Krav: Operatorer (===), DOM]
  const isOpen = burger.getAttribute('aria-expanded') === 'true';
  // [Krav: Operatorer (ternary ? :), Kontrolstruktur (if-else i udtryksform)]
  isOpen ? closeMenu() : openMenu();
}

// [Krav: Funktioner, Events, Kontrolstruktur (if)]
function onKeydown(e){
  // [Krav: Operatorer (===)] + [Krav: Kontrolstruktur (if)]
  if (e.key === 'Escape') {
    e.preventDefault();
    closeMenu();
  }
}

// ==================== INIT, PLACERING & DEBUGGING ====================
// [Krav: Placering af udførelse af JS] sikrer at DOM er klar før eventbinding
// [Krav: Fejlfinding (debugging)] console.log & console.warn
document.addEventListener('DOMContentLoaded', () => {
  console.log('[nav] init'); // Debug: startmarkør

  // [Krav: Kontrolstruktur (if-else)] + Debug: tjek nødvendig markup
  if (!burger || !nav || !overlay) {
    console.warn('[nav] Missing elements', { burger: !!burger, nav: !!nav, overlay: !!overlay });
    return; // [Krav: Kontrolstruktur] stop hvis kritisk DOM mangler
  }

  // ==================== EVENTS ====================
  // [Krav: Events] klik-hændelser
  burger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);
  // [Krav: Optional chaining (Operatorer) viser robusthed]
  closeBtn?.addEventListener('click', closeMenu);

  // ==================== ARRAYS & LOOPS ====================
  // [Krav: Arrays] NodeList → Array for iteration
  // [Krav: Loops] for..of over interaktive elementer
  const interactive = Array.from(nav.querySelectorAll('a, button')); // Arrays + DOM
  for (const el of interactive) { // Loops
    el.addEventListener('click', closeMenu); // Events
  }

  // ==================== EVENTS + KONTROLSTRUKTUR ====================
  // [Krav: Events] window resize
  // [Krav: Kontrolstruktur (if)] + [Operatorer (>)]
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });
});