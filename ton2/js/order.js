document.addEventListener('DOMContentLoaded',()=>renderCartSummary());
function renderCartSummary(){
  const w=document.getElementById('cart-summary');if(!w)return;
  const cart=DB.getCart();
  if(!cart.length){w.innerHTML='<p style="font-size:0.88rem;color:var(--text2);text-align:center;padding:16px 0">Your cart is empty — <a href="menu.html" style="color:var(--accent)">browse menu</a></p>';return;}
  w.innerHTML=`<table style="width:100%;font-size:0.9rem;border-collapse:collapse">
    ${cart.map(i=>`<tr>
      <td style="padding:9px 0;color:var(--text)">${i.name}</td>
      <td style="text-align:center;width:96px">
        <button class="qty-btn" onclick="chQty('${i.id}',-1)">−</button>
        <span style="font-weight:600">${i.qty}</span>
        <button class="qty-btn" onclick="chQty('${i.id}',1)">+</button>
      </td>
      <td style="text-align:right;color:var(--accent);font-weight:600;font-family:var(--font-head)">₹${i.price*i.qty}</td>
    </tr>`).join('')}
    <tr><td colspan="3" style="border-top:1px solid var(--border);padding-top:12px"></td></tr>
    <tr><td colspan="2" style="font-size:0.82rem;color:var(--text2)">Total</td>
      <td style="text-align:right;font-weight:700;color:var(--text);font-family:var(--font-head);font-size:1.1rem">₹${DB.cartTotal()}</td></tr>
  </table>
  <button onclick="DB.clearCart();renderCartSummary();updateCartBadge();" style="margin-top:10px;background:none;border:none;font-size:12px;color:var(--text3);cursor:pointer;text-decoration:underline">Clear cart</button>`;
}
function chQty(id,d){
  const c=DB.getCart();const item=c.find(x=>x.id===id);if(!item)return;
  if(item.qty+d<1)DB.removeFromCart(id);else DB.updateQty(id,item.qty+d);
  renderCartSummary();updateCartBadge();
}
