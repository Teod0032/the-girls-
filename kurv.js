// kurv.js
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const addBtn      = document.getElementById('add-to-cart');
    const cartIcon    = document.getElementById('cart-icon');
    const cartCounter = document.getElementById('cart-counter');
  
    const drawer     = document.getElementById('cart-drawer');
    const itemsEl    = document.getElementById('cart-items');
    const emptyEl    = document.getElementById('cart-empty');
    const subtotalEl = document.getElementById('cart-subtotal');
  
    // State (no persistence)
    let cart = []; // [{id,name,price,image,size,color,qty}]
  
    // Helpers
    const money   = new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' });
    const parseDKK = (str) => Number((str || '0').replace(/[^\d,.-]/g,'').replace(/\./g,'').replace(',', '.')) || 0;
  
    const qtyTotal = () => cart.reduce((n,i)=>n+i.qty,0);
    const sumTotal = () => cart.reduce((s,i)=>s+i.price*i.qty,0);
    const setCounter = () => {
      const q = qtyTotal();
      cartCounter.textContent = String(q);
      cartCounter.style.display = q > 0 ? 'block' : 'none';
    };
  
    function getSelectedColorName() {
      const btn = document.querySelector('.color-option.is-active');
      return btn?.querySelector('span')?.textContent?.trim() || '';
    }
  
    function getSelectedSize() {
      // from str.js, a global var called valgtStr is maintained
      return typeof valgtStr !== 'undefined' ? valgtStr : null;
    }
  
    function getProductFromPage() {
      const title    = (document.querySelector('.title')?.textContent || '').trim();
      const subtitle = (document.querySelector('.subtitle')?.textContent || '').trim(); // skift.js updates this
      const price    = parseDKK(document.querySelector('.price__now')?.textContent || '');
      const image    = document.getElementById('mainImage')?.getAttribute('src') || '';
      const size     = getSelectedSize();
      const color    = getSelectedColorName();
      const name     = subtitle ? `${title} – ${subtitle}` : title;
      const id       = [name, color, size].filter(Boolean).join('|');
      return { id, name, price, image, size, color };
    }
  
    function renderCart() {
      setCounter();
      itemsEl.innerHTML = '';
  
      const has = cart.length > 0;
      emptyEl.style.display = has ? 'none' : 'block';
      subtotalEl.textContent = money.format(has ? sumTotal() : 0);
      if (!has) return;
  
      const frag = document.createDocumentFragment();
      cart.forEach(item => {
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.dataset.id = item.id;
        row.innerHTML = `
          <img class="cart-item__img" src="${item.image}" alt="">
          <div>
            <div class="cart-item__title">${item.name}</div>
            <div class="cart-item__meta">
              ${item.color ? `Farve: ${item.color}` : ''} ${item.size ? `· Str.: ${item.size}` : ''} · Antal: ${item.qty}
            </div>
          </div>
          <div class="cart-item__right">
            <button class="cart-remove" aria-label="Fjern vare">Fjern</button>
            <div class="cart-item__line">${money.format(item.price * item.qty)}</div>
          </div>
        `;
        frag.appendChild(row);
      });
      itemsEl.appendChild(frag);
    }
  
    function openDrawer() {
      drawer?.classList.add('is-open');
      drawer?.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      drawer?.classList.remove('is-open');
      drawer?.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    }
  
    // Wire up
    setCounter();
    renderCart();
  
    // Add-to-cart: rely on str.js to show feedback/validation; we only add if size is chosen
    addBtn?.addEventListener('click', () => {
      const p = getProductFromPage();
  
      // if no size selected, do nothing (str.js already shows the error message)
      if (!p.size) return;
  
      if (!p.name || !p.price) return;
  
      const existing = cart.find(i => i.id === p.id);
      if (existing) existing.qty += 1;
      else cart.push({ ...p, qty: 1 });
  
      renderCart();
      openDrawer();
    });
  
    // Open/close drawer
    cartIcon?.addEventListener('click', (e) => { e.preventDefault(); openDrawer(); });
    drawer?.addEventListener('click', (e) => {
      if (e.target.matches('.cart-backdrop, .cart-close, [data-dismiss]')) closeDrawer();
    });
  
    // Remove item (delegation)
    itemsEl?.addEventListener('click', (e) => {
      const btn = e.target.closest('.cart-remove');
      if (!btn) return;
      const row = btn.closest('.cart-item');
      const id  = row?.dataset.id;
      cart = cart.filter(i => i.id !== id);
      renderCart();
      if (cart.length === 0) closeDrawer();
    });
  });
  