// Variabler i globalt scope
const burger = document.querySelector('.burger');
const nav = document.getElementById('mobile-nav');

// Åbn menu
function openMenu() {
  burger.setAttribute('aria-expanded', 'true');
  nav.classList.add('open');
}

// Luk menu
function closeMenu() {
  burger.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}

// Toggle
function toggleMenu() {
  const isOpen = burger.getAttribute('aria-expanded') === 'true';
  isOpen ? closeMenu() : openMenu();
}

// Klik på burger
burger.addEventListener('click', toggleMenu);

// Luk når der klikkes på et link i menuen (mobil-venligt)
nav.addEventListener('click', (e) => {
  if (e.target.matches('a')) closeMenu();
});

// Luk automatisk hvis man går over mobil-breakpoint (så den ikke “hænger” åben)
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMenu();
});