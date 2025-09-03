// Elementer
var addBtn      = document.getElementById('add-to-cart');
var cartIcon    = document.getElementById('cart-icon');
var cartCounter = document.getElementById('cart-counter');
var drawer      = document.getElementById('cart-drawer');
var closeBtn    = document.querySelector('.cart-close');
var backdrop    = document.querySelector('.cart-backdrop');
var subtotalEl  = document.getElementById('cart-subtotal');
var emptyEl     = document.getElementById('cart-empty');
var itemsEl     = document.getElementById('cart-items');

// Tilstand: enkel ordbog fra id -> { navn, pris, antal }
var cart = {};

// Hjælpere
function money(n){ return 'kr ' + (+n).toFixed(2); }
function openDrawer(){ drawer.classList.add('is-open'); }
function closeDrawer(){ drawer.classList.remove('is-open'); }

// Vis liste: kun navn, pris og antal
function render(){
  var qty = 0;
  var subtotal = 0;
  var html = '';

  for (var id in cart) {
    var it = cart[id];
    qty += it.qty;
    subtotal += it.price * it.qty;
    html += ''
      + '<div class="cart-item">'
      +   '<div class="cart-item__title">' + it.name + '</div>'
      +   '<div class="cart-item__meta">Pris: ' + money(it.price) + ' · Antal: ' + it.qty + '</div>'
      + '</div>';
  }

  cartCounter.textContent = qty;
  cartCounter.style.display = qty ? 'inline-block' : 'none';
  subtotalEl.textContent = money(subtotal);
  itemsEl.innerHTML = html;
  emptyEl.style.display = qty ? 'none' : 'block';
}

// Læg i kurv (læser fra data-* på knappen)
if (addBtn) addBtn.onclick = function(){
  var id    = addBtn.dataset.id;
  var name  = addBtn.dataset.name;
  var price = parseFloat(addBtn.dataset.price) || 0;

  if (!cart[id]) cart[id] = { name: name, price: price, qty: 0 };
  cart[id].qty += 1;

  render();
  openDrawer();
};

// Åbn/luk kurv-skuffen
if (cartIcon) cartIcon.onclick = openDrawer;
if (closeBtn) closeBtn.onclick = closeDrawer;
if (backdrop) backdrop.onclick = closeDrawer;

// Første visning
render();
