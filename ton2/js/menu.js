document.addEventListener('DOMContentLoaded',()=>{
  renderMenu('all');
  document.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.dataset.filter);
    });
  });
});
function renderMenu(filter){
  const items=DB.getMenu(filter);
  const grid=document.getElementById('menu-grid');
  if(!grid)return;
  grid.innerHTML=items.map((item,i)=>`
    <div class="card" style="animation:fadeUp 0.4s ${i*0.07}s both">
      <div class="card-img">
        <span style="font-size:3.5rem;animation:float 3s ${i*0.3}s ease-in-out infinite">${item.emoji}</span>
      </div>
      <div class="card-body">
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:4px">
          <span class="card-badge badge-${item.type}">${item.type==='veg'?'● veg':'● non-veg'}</span>
          ${item.popular?'<span class="card-badge badge-hot">★ trending</span>':''}
        </div>
        <div class="card-name">${item.name}</div>
        <div class="card-desc">${item.desc}</div>
      </div>
      <div class="card-footer">
        <span class="card-price">₹${item.price}</span>
        <button class="btn-add" onclick="handleAddToCart('${item.id}')">+ Add</button>
      </div>
    </div>`).join('');
}
