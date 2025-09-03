// Freja 

// Insiration hentet fra
// https://www.w3schools.com/js/tryit.asp?filename=tryjs_const_object
// Oprettelse af hvid og sort trøje, der gennemer informationer om navn, pris og billeder.
const variantData = {
    sort: {
      name: "Limona Top • sort",
      priceNow: 359.40,
      priceBefore: 599.00,
      images: ["img/top-black-1.jpg","img/top-black-2.jpg","img/top-black-3.jpg","img/top-black-4.jpg"]
    },
    hvid: {
      name: "Limona Top • hvid",
      priceNow: 359.40,
      priceBefore: 599.00,
      images: ["img/top-white-1.jpg","img/top-white-2.jpg","img/top-white-3.jpg","img/top-white-4.jpg"]
    }
  };

// Funktion til at skifte variant 
function showVariant(color){
    const variant = variantData[color]
    
    // Søger for, at der vises det rigtige produktnavn, når en variant vælges.
    document.querySelector(".subtitle").textContent = variant.name;

   // Opdater prisen når det der er valgt det rigtigt produkt
    document.querySelector(".price__now").textContent = variant.priceNow.toFixed(2).replace(".", ",") + " kr.";
    document.querySelector(".price__before").textContent = variant.priceBefore.toFixed(2).replace(".", ",") + " kr.";
  
    // Skifter hovedbillede om til det valgte produkt 
    document.getElementById("mainImage").src = variant.images[0];

    // Rydder thumbnail-området, og bliver genopfyldt med de rigtige billeder til produktet.
    const thumbs = document.querySelector(".thumbs");
    thumbs.innerHTML = ""; 

  // Inspiration henten fra W3
  // https://www.w3schools.com/js/tryit.asp?filename=tryjs_dom_form_elements
  // Loop over billeder 
  for (let i = 0; i < variant.images.length; i++){
      let imgSrc = variant.images[i];
      let thumbBtn = createThumb (imgSrc, i === 0);
      thumbs.appendChild(thumbBtn);
  }

  // Den markere visuelt den knap, der er valgt, og fjerner markeringen fra de andre. 
  document.querySelectorAll(".color-option").forEach (opt => {
    opt.classList.toggle("is-active", opt.dataset.color === color);
  });
}

// Funktion til at lave en thumbnail-knap //
function createThumb(src, isActive) {
  const btn = document.createElement("button");
  btn.className = "thumb" + (isActive ? " is-active" : "");
  btn.dataset.img = src;
  btn.innerHTML = `<img src="${src}" alt="Billede">`;

  // Event: når man klikker på thumbnail
  btn.addEventListener("click", () => {
    document.getElementById("mainImage").src = src;

    // fjern is-active fra alle thumbnails
    document.querySelectorAll(".thumb").forEach(t => t.classList.remove("is-active"));

    // tilføj is-active til den vi klikkede på
    btn.classList.add("is-active");
  });

  return btn;
}

// Klik på farveknapper
// Finder alle elementer på siden, som repræsentere farvevalg. Når man klikker på en af dem, aflæser den hvilken 
// farve der er knyttet til elementet og sender information videre, som så viser den valgte variant.
document.querySelectorAll(".color-option").forEach(btn => {
    btn.addEventListener("click", () => {  // Tilføjer en klik-hændelse til knappen
      const color = btn.dataset.color; 
      showVariant(color); // Kalder en funktion, der viser en bestemt "variant" baseret på farven.
    });
  });

  // Når siden starter, kaldes funktionen direkte med "sort", så standardvisningen altid er den sorte trøje.
showVariant("sort");
