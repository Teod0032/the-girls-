var addBtn = document.getElementById('add-to-cart');
var cartIcon = document.getElementById('cart-icon');
var cartCounter = document.getElementById('cart-counter');
var drawer = document.getElementById('cart-drawer');
var closeBtn = document.querySelector('.cart-close');
var backdrop = document.querySelector('.cart-backdrop');
var subtotalEl = document.getElementById('cart-subtotal');
var emptyEl = document.getElementById('cart-empty');
var itemsEl = document.getElementById('cart-items');

var cart = [];

function money(n){
  let amount = (+n).toFixed(2);
  return 'kr ' + amount;
}

function openDrawer(){ drawer.classList.add('is-open'); }
function closeDrawer(){ drawer.classList.remove('is-open'); }

function render(){
  var qty = 0, subtotal = 0, html = '';
  for (var i = 0; i < cart.length; i++) {
    var it = cart[i];
    qty += it.qty;
    subtotal += it.price * it.qty;
    html += '<div class="cart-item">'
          +   '<div class="cart-item__title">'+ it.name +'</div>'
          +   '<div class="cart-item__meta">Pris: '+ money(it.price) +' · Antal: '+ it.qty +'</div>'
          + '</div>';
  }
  cartCounter.textContent = qty;
  cartCounter.style.display = qty ? 'inline-block' : 'none';
  subtotalEl.textContent = money(subtotal);
  itemsEl.innerHTML = html;
  emptyEl.style.display = qty ? 'none' : 'block';
  console.log('render()', { qty: qty, subtotal: subtotal, cart: cart });
}

if (addBtn) addBtn.onclick = function(){
  var id = addBtn.dataset.id;
  var name = addBtn.dataset.name;
  var price = parseFloat(addBtn.dataset.price) || 0;
  var found = -1;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) { found = i; break; }
  }
  if (found > -1) { cart[found].qty += 1; }
  else { cart.push({ id: id, name: name, price: price, qty: 1 }); }
  console.log('added', { id: id, name: name, price: price });
  render();
  openDrawer();
};

if (cartIcon) cartIcon.onclick = openDrawer;
if (closeBtn) closeBtn.onclick = closeDrawer;
if (backdrop) backdrop.onclick = closeDrawer;

render();

if (window.jQuery) {
  $('#cart-icon').on('click', openDrawer);
}
