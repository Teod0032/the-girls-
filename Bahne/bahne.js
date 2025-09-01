// ----- KONFIG: billeder pr. farve -----
const galleries = {
  sort: [
    "img/top-black-1.jpg",
    "img/top-black-2.jpg",
    "img/top-black-3.jpg",
    "img/top-black-4.jpg",
  ],
  hvid: [
    "img/top-white-1.jpg",
    "img/top-white-2.jpg",
    "img/top-white-3.jpg",
    "img/top-white-4.jpg",
  ],
};

// ----- ELEMENTER -----
const mainImage = document.getElementById("mainImage");
const thumbsWrap = document.querySelector(".thumbs");

// Re-render thumbnails + hovedbillede for valgt farve
function renderGallery(colorKey) {
  const imgs = galleries[colorKey] || [];
  if (!imgs.length) return;

  // hovedbillede
  mainImage.src = imgs[0];

  // thumbs
  thumbsWrap.innerHTML = imgs
    .map(
      (src, i) => `
      <button class="thumb ${i === 0 ? "is-active" : ""}" data-img="${src}">
        <img src="${src}" alt="Vinkel ${i + 1}" />
      </button>`
    )
    .join("");

  // click handlers til de nye thumbs
  const thumbBtns = thumbsWrap.querySelectorAll(".thumb");
  thumbBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      thumbBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      mainImage.src = btn.getAttribute("data-img");
    });
  });
}

// ----- STØRRELSE -----
let selectedSize = document.querySelector(".size.is-active")?.dataset.size || null;
const sizeButtons = document.querySelectorAll(".size");
sizeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    sizeButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    selectedSize = btn.dataset.size;
  });
});

// ----- FARVE (billeder + re-render) -----
const colorButtons = document.querySelectorAll(".color-option");
let selectedColor = document.querySelector(".color-option.is-active")?.dataset.color || "sort";

// render initialt galleri
renderGallery(selectedColor);

colorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    colorButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    selectedColor = btn.dataset.color;

    // skift galleri når farven skiftes
    renderGallery(selectedColor);
  });
});

// ----- TILFØJ TIL KURV -----
const addToCart = document.getElementById("addToCart");
const feedback = document.getElementById("feedback");

addToCart.addEventListener("click", () => {
  if (!selectedSize) {
    feedback.textContent = "Vælg venligst en størrelse.";
    feedback.style.color = "crimson";
    return;
  }
  feedback.style.color = "green";
  feedback.textContent = `Lagt i kurv: Limona Top • ${selectedColor.toUpperCase()} • Str. ${selectedSize}`;
});
