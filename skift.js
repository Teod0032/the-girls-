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

// Funktion til at skifte variant //
function showVariant(color){
    const variant = variantData[color]

    if(!variant){
        console.log("Ukendt variant:" + color);
        return;
    }
    // DOM Opdater teskt og priser
  document.querySelector(".subtitle").textContent = variant.name;
  document.querySelector(".price__now").textContent = variant.priceNow + " kr.";
  document.querySelector(".price__before").textContent = variant.priceBefore + " kr.";

  // DOM opdater hovedbillede //
  document.getElementById("mainImage").src = variant.images[0];

  // DOM: Opdater thumbnails //
  const thumbs = document.querySelector(".thumbs");
  thumbs.innerHTML = ""; 

  // Loop over billeder
  for (let i = 0; i < variant.images.length; i++){
      let imgSrc = variant.images[i];
      let thumbBtn = createThumb (imgSrc, i === 0);
      thumbs.appendChild(thumbBtn);
  }

  // Opdater farveknapper //
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
document.querySelectorAll(".color-option").forEach(btn => {
    btn.addEventListener("click", () => {
      const color = btn.dataset.color; 
      showVariant(color);
    });
  });

// Startvisning af sort
showVariant("sort");
