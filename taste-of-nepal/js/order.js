/* order.js - order & reservation page logic */
document.addEventListener('DOMContentLoaded', () => {
  renderCartSummary();

  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', e => {
      e.preventDefault();
      if (DB.cartCount() === 0) { showToast('Please add items from the menu first.'); return; }
      const data = Object.fromEntries(new FormData(orderForm));
      const order = DB.placeOrder(data);
      if (order) {
        showToast('Order placed! ID: ' + order.id);
        renderCartSummary();
        orderForm.reset();
        // WhatsApp redirect
        const msg = encodeURIComponent(`New order ${order.id}\nName: ${data.name}\nPhone: ${data.phone}\nAddress: ${data.address}\nItems: ${order.items.map(i=>i.name+' x'+i.qty).join(', ')}\nTotal: ₹${order.total}\nNotes: ${data.notes||'—'}`);
        setTimeout(() => window.open('https://wa.me/919810369433?text='+msg,'_blank'), 800);
      }
    });
  }

  const resForm = document.getElementById('res-form');
  if (resForm) {
    resForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(resForm));
      const res = DB.makeReservation(data);
      showToast('Reservation confirmed! ID: ' + res.id);
      resForm.reset();
    });
  }
});

function renderCartSummary() {
  const wrap = document.getElementById('cart-summary');
  if (!wrap) return;
  const cart = DB.getCart();
  if (!cart.length) {
    wrap.innerHTML = '<p style="font-size:0.9rem;color:var(--text-muted);text-align:center;padding:16px 0">Your cart is empty — <a href="menu.html" style="color:var(--red)">browse menu</a></p>';
    return;
  }
  wrap.innerHTML = `
    <table style="width:100%;font-size:0.92rem;border-collapse:collapse">
      ${cart.map(i => `
        <tr>
          <td style="padding:8px 0;color:var(--text)">${i.name}</td>
          <td style="text-align:center;width:80px">
            <button onclick="changeQty('${i.id}',-1)" style="background:none;border:none;cursor:pointer;color:var(--red);font-size:1.1rem;padding:0 6px">−</button>
            <span>${i.qty}</span>
            <button onclick="changeQty('${i.id}',1)" style="background:none;border:none;cursor:pointer;color:var(--red);font-size:1.1rem;padding:0 6px">+</button>
          </td>
          <td style="text-align:right;color:var(--gold);font-family:var(--font-ui)">₹${i.price * i.qty}</td>
        </tr>
      `).join('')}
      <tr><td colspan="3" style="border-top:1px solid var(--border);padding-top:10px"></td></tr>
      <tr>
        <td colspan="2" style="font-family:var(--font-ui);font-size:0.85rem;color:var(--text-muted)">Total</td>
        <td style="text-align:right;font-weight:500;color:var(--red-dark);font-family:var(--font-ui)">₹${DB.cartTotal()}</td>
      </tr>
    </table>
    <button onclick="DB.clearCart();renderCartSummary();updateCartBadge();" style="margin-top:12px;background:none;border:none;font-size:12px;color:var(--text-muted);cursor:pointer;text-decoration:underline">Clear cart</button>
  `;
}

function changeQty(id, delta) {
  const cart = DB.getCart();
  const item = cart.find(c => c.id === id);
  if (!item) return;
  if (item.qty + delta < 1) DB.removeFromCart(id);
  else DB.updateQty(id, item.qty + delta);
  renderCartSummary();
  updateCartBadge();
}
