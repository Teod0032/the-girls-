// Freja 

// Insiration hentet fra
// https://www.w3schools.com/js/tryit.asp?filename=tryjs_const_object
// Oprettelse af objekt "VariantData" med to farvevarianter sort og hvid
// Hver variant indholder navn, pris og en liste af billeder.
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

// Funktion til at skifte variant, når en farve vælges 
function showVariant(color){
    const variant = variantData[color]
    
    // Fejlfinding med if/else, hvis farven ikke findes.
    if(!variant){
      console.log("Ukendt farve valgt:", color);
      return; // Stopper funktionrn hvis farven ikke findes
    } else{
      console.log("Viser varianten:", variant.name);
    }

    // querySelector finder et specifikti element i dokumentet

    // Søger for, at der vises det rigtige produktnavn, når en variant vælges.
    document.querySelector(".subtitle").textContent = variant.name;

    // Finder elementerne til nuværende pris og tidligere pris, formatere tallene korrekt med to decimaler og komma.
   // Opdater prisen når det der er valgt det rigtigt produkt
    document.querySelector(".price__now").textContent = variant.priceNow.toFixed(2).replace(".", ",") + " kr.";
    document.querySelector(".price__before").textContent = variant.priceBefore.toFixed(2).replace(".", ",") + " kr.";
  
    // Skifter hovedbillede om til det valgte produkt 
    document.getElementById("mainImage").src = variant.images[0];

    // Rydder thumbnail-området, så det kan blive de rigtige billeder til produktet.
    const thumbs = document.querySelector(".thumbs");
    thumbs.innerHTML = ""; 

  // Inspiration henten fra W3
  // https://www.w3schools.com/js/tryit.asp?filename=tryjs_dom_form_elements
  // Loop over billeder i varianten og opret thumbnails
  for (let i = 0; i < variant.images.length; i++){
      let imgSrc = variant.images[i];
      let thumbBtn = createThumb (imgSrc, i === 0); // Første billede bliver aktivt
      thumbs.appendChild(thumbBtn);
  }

  // Den markere visuelt den knap, der er valgt, og fjerner markeringen fra de andre. 
  document.querySelectorAll(".color-option").forEach (opt => {
    opt.classList.toggle("is-active", opt.dataset.color === color);
  });
}

// Funktion til at lave en thumbnail-knap //
function createThumb(src, isActive) { 
  const btn = document.createElement("button"); // Laver knap-element
  btn.className = "thumb" + (isActive ? " is-active" : ""); // Giver "is-active" hvis det er hovedbilledet
  btn.dataset.img = src; // Gemmer billedestien i et data-attribut
  btn.innerHTML = `<img src="${src}" alt="Billede">`;

  // Event: når man klikker på thumbnail
  btn.addEventListener("click", () => {
    document.getElementById("mainImage").src = src; // Skifter hovedbillede

    // Fjern is-active fra alle thumbnails
    document.querySelectorAll(".thumb").forEach(t => t.classList.remove("is-active"));

    // Tilføj is-active til den valgte thumbnails
    btn.classList.add("is-active");

    // Fejlfinding
    console.log("Thumbnail valgt", src);
  });

  return btn; // Returnerer knappen til brug i showVariant()
}

// Klik på farveknapper
// Finder alle elementer på siden, som repræsentere farvevalg. Når man klikker på en af dem, aflæser den hvilken 
// farve der er knyttet til elementet og sender information videre, som så viser den valgte variant.
document.querySelectorAll(".color-option").forEach(btn => {
    btn.addEventListener("click", () => {  // Tilføjer en klik-hændelse til knappen
      const color = btn.dataset.color; // Aflæser hvilken farve knappen repræsenterer
      console.log("Farveknap klikket:", color); // Fejlfinding
      showVariant(color); // Viser den valgt variant
    });
  });

  // Når siden starter, kaldes funktionen direkte med "sort", så standardvisningen altid er den sorte trøje.
showVariant("sort");
