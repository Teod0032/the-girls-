// Variabler i globalt scope
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

// Funktion der åbner menuen
function openMenu() {
  burger.setAttribute('aria-expanded', true);
  nav.classList.add('open');
}

// Funktion der lukker menuen
function closeMenu() {
  burger.setAttribute('aria-expanded', false);
  nav.classList.remove('open');
}

// Funktion der toggler mellem open/close
function toggleMenu() {
  // 'let' viser block scope (kun gyldig inden for denne funktion)
  let expanded = burger.getAttribute('aria-expanded') === 'true';
  
  if (expanded) {
    closeMenu();
  } else {
    openMenu();
  }
}

// Event listener → kalder en funktion (ikke bare anonym arrow)
burger.addEventListener('click', toggleMenu);