// GALLERI – altid brug de thumbnails, der findes lige nu (så farveskift virker)
document.addEventListener('DOMContentLoaded', () => {
  const gallery    = document.querySelector('.gallery');
  const mainImg    = document.querySelector('#mainImage');
  const thumbsWrap = document.querySelector('.thumbs');
  if (!gallery || !mainImg || !thumbsWrap) return;

  // Hent "live" thumbs hver gang (ikke kun ved load)
  const getThumbs = () => Array.from(thumbsWrap.querySelectorAll('.thumb'));
  // Lav et item-objekt pr. thumb. Fald tilbage til <img src>, hvis data-img mangler/ikke er opdateret.
  const getItems  = () =>
    getThumbs().map(btn => ({
      src: btn.dataset.img || btn.querySelector('img')?.src || '',
      alt: btn.querySelector('img')?.alt || ''
    }));

  let index = 0;

  function show(i) {
    const items = getItems();
    if (!items.length) return;
    // loop sikkert rundt
    index = ((i % items.length) + items.length) % items.length;

    const it = items[index];
    if (it.src) {
      mainImg.src = it.src;
      mainImg.alt = it.alt;
    }
    // aktiv thumb
    getThumbs().forEach((btn, j) => btn.classList.toggle('is-active', j === index));
  }

  // Delegér klik på thumbs (virker også hvis de bliver udskiftet ved farveskift)
  thumbsWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.thumb');
    if (!btn) return;
    const thumbs = getThumbs();
    const i = thumbs.indexOf(btn);
    show(i >= 0 ? i : 0);
  });

  // Opret pile (samme som før)
  const prev = document.createElement('button');
  prev.className = 'gallery__arrow gallery__arrow--prev';
  prev.setAttribute('aria-label', 'Forrige billede');
  prev.textContent = '❮';

  const next = document.createElement('button');
  next.className = 'gallery__arrow gallery__arrow--next';
  next.setAttribute('aria-label', 'Næste billede');
  next.textContent = '❯';

  gallery.append(prev, next);

  prev.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));

  // Tastatur
  gallery.tabIndex = 0;
  gallery.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Hvis thumbnails bliver udskiftet (fx ved farveskift), så vælg første nye billede
  const mo = new MutationObserver(() => {
    index = 0;
    show(0);
  });
  mo.observe(thumbsWrap, { childList: true, subtree: true });

  // Init – prøv at matche det aktuelle mainImage, ellers start på 0
  const startIdx = Math.max(0, getItems().findIndex(it => it.src === mainImg.src));
  index = startIdx;
  show(index);
});
