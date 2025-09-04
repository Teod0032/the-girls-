//Maria
// --- GALLERI (min egen forklaring) ---
// General inspiration og hjælp er fra ChatGPT (mange beskeder frem og tilbage).
// Kommentarerne forklarer kort hvad der sker linje for linje – uden at ændre på koden.

// Når hele HTML’en er klar, kører jeg mit galleri-script
document.addEventListener('DOMContentLoaded', () => {
  // Jeg finder de elementer, jeg skal bruge i galleriet
  const gallery    = document.querySelector('.gallery');   // hele galleri-området
  const mainImg    = document.querySelector('#mainImage'); // det store billede
  const thumbsWrap = document.querySelector('.thumbs');    // boksen med alle thumbnails
  if (!gallery || !mainImg || !thumbsWrap) return;         // hvis noget mangler, stopper jeg

  // Jeg henter “live” thumbnails hver gang (så farveskift/udskiftning virker)
  const getThumbs = () => Array.from(thumbsWrap.querySelectorAll('.thumb'));

  // Jeg laver et lille objekt for hver thumb (kilde + alternativ tekst)
  // Fald tilbage til <img src>, hvis data-img ikke er sat/ikke opdateret
  const getItems  = () =>
    getThumbs().map(btn => ({
      src: btn.dataset.img || btn.querySelector('img')?.src || '', // billedets sti
      alt: btn.querySelector('img')?.alt || ''                     // billedets alt-tekst
    }));

  // Her holder jeg styr på hvilket billede der vises
  let index = 0;

  // --- VIS ET BESTEMT BILLEDE (efter index) ---
  function show(i) {
    const items = getItems();          // jeg henter den aktuelle liste af items
    if (!items.length) return;         // hvis der ikke er thumbnails, gør jeg ingenting

    // Jeg sørger for at index altid er indenfor 0..items.length-1 (med wrap rundt)
    index = ((i % items.length) + items.length) % items.length;

    // Jeg henter det valgte item
    const it = items[index];

    // Hvis der er en gyldig kilde, opdaterer jeg main-billedet
    if (it.src) {
      mainImg.src = it.src;            // sæt nyt billede
      mainImg.alt = it.alt;            // sæt alt-tekst
    }

    // Jeg markerer den aktive thumb (til styling)
    getThumbs().forEach((btn, j) => btn.classList.toggle('is-active', j === index));
  }

  // --- KLIK PÅ THUMBNAILS (event delegation) ---
  // Jeg lytter på hele wrapperen, så det også virker når thumbs udskiftes dynamisk
  thumbsWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.thumb'); // find den thumb der blev klikket
    if (!btn) return;                        // hvis klik ikke var på en thumb, gør intet
    const thumbs = getThumbs();              // hent den aktuelle liste af thumbs
    const i = thumbs.indexOf(btn);           // find index for den klikkede thumb
    show(i >= 0 ? i : 0);                    // vis det billede (ellers fallback til 0)
  });

  // --- PILE-KNAPPER (forrige/næste) ---
  // Jeg laver en venstre-pil
  const prev = document.createElement('button');                  // lav knappen
  prev.className = 'gallery__arrow gallery__arrow--prev';         // giv klasser
  prev.setAttribute('aria-label', 'Forrige billede');             // til skærmlæsere
  prev.textContent = '❮';                                         // pil-tegn

  // Jeg laver en højre-pil
  const next = document.createElement('button');                  // lav knappen
  next.className = 'gallery__arrow gallery__arrow--next';         // giv klasser
  next.setAttribute('aria-label', 'Næste billede');               // til skærmlæsere
  next.textContent = '❯';                                         // pil-tegn

  // Jeg sætter pilene ind i galleriet
  gallery.append(prev, next);

  // Når jeg klikker på venstre pil, går jeg ét tilbage
  prev.addEventListener('click', () => show(index - 1));
  // Når jeg klikker på højre pil, går jeg ét frem
  next.addEventListener('click', () => show(index + 1));

  // --- TASTATURSTYRING ---
  // Jeg gør galleriet fokuserbart, så det kan lytte efter piletaster
  gallery.tabIndex = 0;
  // Jeg lytter efter venstre/højre pil på tastaturet
  gallery.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  show(index - 1); // venstre pil = forrige
    if (e.key === 'ArrowRight') show(index + 1); // højre pil = næste
  });


  // Hvis thumbs bliver udskiftet (fx ved farveskift), nulstiller jeg til første
  const mo = new MutationObserver(() => {
    index = 0;      // start fra begyndelsen igen
    show(0);        // vis første billede i de nye thumbs
  });
  // Jeg observerer ændringer i childlist (og undernoder) i thumbsWrap
  mo.observe(thumbsWrap, { childList: true, subtree: true });

  // --- STARTVISNING ---
  // Jeg prøver at finde en thumb der matcher det nuværende mainImage
  const startIdx = Math.max(0, getItems().findIndex(it => it.src === mainImg.src));
  index = startIdx;  // hvis fundet, starter jeg der – ellers bliver det 0
  show(index);       // vis startbilledet
});

