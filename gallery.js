// Vi venter med at køre koden, til hele HTML'en er klar.
// (Så er alle elementer sikkert til stede i DOM'en.)
document.addEventListener('DOMContentLoaded', () => {

  // === 1) Find de ting vi skal bruge i HTML'en ===
  const gallery   = document.querySelector('.gallery');        // Hele galleriet (wrappen)
  const mainImg   = document.querySelector('#mainImage');      // Det store billede øverst
  // querySelectorAll finder ALLE thumbnails; Array.from laver dem om til et "rigtigt" array
  const thumbBtns = Array.from(document.querySelectorAll('.thumbs .thumb'));

  // Hvis noget mangler, stopper vi bare stille og roligt (ellers får vi fejl).
  if (!gallery || !mainImg || thumbBtns.length === 0) return;

  // === 2) Lav en liste over billederne, vi kan bladre i ===
  // Hver thumb-knap har en data-img med sti til det "store" billede
  // Vi gemmer også alt-teksten (beskrivelse), som vi tager fra selve thumbnail-billedet.
  const items = thumbBtns.map((btn) => {
    return {
      src: btn.dataset.img,                    // Hvor ligger billedet (fx "img/top-black-1.jpg")
      alt: btn.querySelector('img')?.alt || '' // Tekst der beskriver billedet (godt for skærmlæsere)
    };
  });

  // === 3) Hvor i listen starter vi? ===
  // Vi tjekker hvilket billede der allerede vises i det store billede,
  // og finder dets position (index) i vores liste.
  let index = Math.max(
    0,
    items.findIndex((it) => it.src === mainImg.getAttribute('src'))
  );

  // === 4) Funktion der skifter billede ===
  function show(i) {
    // "Modulo-tricket" gør at vi kan køre rundt i en ring:
    // går vi forbi sidste, hopper vi til første; går vi før første, hopper vi til sidste.
    index = (i + items.length) % items.length;

    const it = items[index];
    mainImg.src = it.src; // Skift billedet i <img id="mainImage">
    mainImg.alt = it.alt; // Opdater beskrivelsen

    // Opdater hvilke thumbnails der ser "aktive" ud (kun den valgte får klassen .is-active)
    thumbBtns.forEach((btn, j) => {
      btn.classList.toggle('is-active', j === index);
    });
  }

  // === 5) Når man klikker på en lille thumbnail, vis det tilsvarende billede ===
  thumbBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => show(i));
  });

  // === 6) Lav venstre/højre pile med JavaScript (så du ikke skal ændre i HTML'en) ===
  const prev = document.createElement('button');                 // Lav en ny <button>
  prev.className = 'gallery__arrow gallery__arrow--prev';        // Giv den klasser til styling
  prev.setAttribute('aria-label', 'Forrige billede');            // Hjælp til skærmlæsere
  prev.textContent = '❮';                                        // Selve pil-symbolet

  const next = document.createElement('button');
  next.className = 'gallery__arrow gallery__arrow--next';
  next.setAttribute('aria-label', 'Næste billede');
  next.textContent = '❯';

  // Sæt pilene ind i galleriet (CSS'en gør, at de ligger ovenpå billedet)
  gallery.append(prev, next);

  // === 7) Klik på pilene skifter ét billede ad gangen ===
  prev.addEventListener('click', () => show(index - 1)); // Ét tilbage
  next.addEventListener('click', () => show(index + 1)); // Ét frem

  // === 8) Gør det muligt at bruge tastaturet (venstre/højre piletast) ===
  gallery.tabIndex = 0; // Gør galleriet fokusérbart (ellers får vi ikke keydown-events)
  gallery.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  show(index - 1); // Venstre pil
    if (e.key === 'ArrowRight') show(index + 1); // Højre pil
  });

  // === 9) Start med at vise det rigtige billede og markér den aktive thumbnail ===
  show(index);
});
