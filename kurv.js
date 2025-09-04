// --- KURV ---

//General inspiration og hjælp er fra Chatpgt (mange beskedder frem og tilbage inklusiv spørgsmål og efterspørgsler på kodegeneration i form af eksempler, alternativer, tests mm. (Én promt er derfor ikke aktuel ))

// Her henter jeg de elementer, jeg skal bruge fra siden
var addBtn      = document.getElementById('add-to-cart');   // knappen “Læg i kurv”
var cartIcon    = document.getElementById('cart-icon');     // kurv-ikonet i topbaren
var cartCounter = document.getElementById('cart-counter');  // det lille tal ved ikonet
var drawer      = document.getElementById('cart-drawer');   // selve skuffen der glider ind
var closeBtn    = document.querySelector('.cart-close');    // krydset til at lukke skuffen
var backdrop    = document.querySelector('.cart-backdrop'); // mørkt lag bag skuffen
var subtotalEl  = document.getElementById('cart-subtotal'); // feltet hvor subtotal vises
var emptyEl     = document.getElementById('cart-empty');    // “Din kurv er tom”
var itemsEl     = document.getElementById('cart-items');    // her lægger jeg varelinjerne ind

// Her gemmer jeg kurven som en liste af linjer (tom array)
// Hver linje har id, navn, pris og antal
var cart = [];

// Jeg laver en lille hjælper til at vise kroner pænt
function money(n){
  let amount = (n * 1).toFixed(2);     // jeg sørger for 2 decimaler
  return 'kr ' + amount;
}

// To små funktioner til at åbne/lukke skuffen
function openDrawer(){ drawer.classList.add('is-open'); }
function closeDrawer(){ drawer.classList.remove('is-open'); }

// Her opdaterer jeg hele kurven på skærmen
function render(){
  var qty = 0;            // samlet antal
  var subtotal = 0;       // samlet pris
  var html = '';          // den tekst jeg lægger ind i items-området

  // Jeg går igennem alle linjerne i kurven
  for (var i = 0; i < cart.length; i++) {
    var it = cart[i];
    qty = qty + it.qty;
    subtotal = subtotal + it.price * it.qty;

    // Jeg viser kun navn, pris pr. stk og antal (helt simpelt)
    html = html
      + '<div class="cart-item">'
      +   '<div class="cart-item__title">' + it.name + '</div>'
      +   '<div class="cart-item__meta">Pris: ' + money(it.price) + ' · Antal: ' + it.qty + '</div>'
      + '</div>';
  }

 

  // Subtotalen nederst i skuffen
  subtotalEl.textContent = money(subtotal);

  // Selve linjerne i skuffen
  itemsEl.innerHTML = html;

  // “Tom kurv”-teksten viser jeg kun, når qty er 0
  emptyEl.style.display = qty ? 'none' : 'block';

  // Jeg kigger i konsollen, når jeg vil se hvad der sker
  console.log('render', qty, subtotal, cart);
}

// Når jeg klikker “Læg i kurv”, lægger jeg 1 stk af den vare i kurven
if (addBtn) addBtn.onclick = function(){
  var id    = addBtn.dataset.id;        // jeg bruger id til at slå linjer sammen
  var name  = addBtn.dataset.name;      // dette er navnet jeg viser
  var price = addBtn.dataset.price * 1; // her laver jeg værdien til et tal

  // Jeg tjekker om varen allerede ligger i kurven
  var found = -1;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) { found = i; break; }
  }

  // Hvis den findes, lægger jeg 1 til antal. Ellers opretter jeg en ny linje.
  if (found > -1) {
    cart[found].qty = cart[found].qty + 1;
  } else {
    cart.push({ id: id, name: name, price: price, qty: 1 });
  }

  // Jeg tjekker i konsollen hvad jeg lige lagde i
  console.log('added', id, name, price);

  // Så opdaterer jeg visningen og åbner skuffen
  render();
  openDrawer();
};

// Jeg kan også åbne skuffen ved at klikke på ikonet
if (cartIcon) cartIcon.onclick = openDrawer;

// Og jeg kan lukke skuffen på krydset eller på baggrunden
if (closeBtn) closeBtn.onclick = closeDrawer;
if (backdrop) backdrop.onclick = closeDrawer;

// Første gang siden loader, tegner jeg den tomme kurv
render();

// Hvis jQuery er til stede på siden, bruger jeg også den til at åbne skuffen på ikon-klik
if (window.jQuery) {
  $('#cart-icon').on('click', function(){ openDrawer(); });
}
