/* main.js - shared utilities */
document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').replace('../pages/','').replace('.html','');
    if (href && path.includes(href)) a.classList.add('active');
  });
  updateCartBadge();
});

function showToast(msg, duration=2800) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id='toast'; t.className='toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), duration);
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const count = DB.cartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? 'inline-block' : 'none';
}

function handleAddToCart(itemId) {
  DB.addToCart(itemId);
  updateCartBadge();
  showToast('Added to your order ✓');
}
