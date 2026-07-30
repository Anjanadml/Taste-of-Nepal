/* menu.js - menu page logic */
document.addEventListener('DOMContentLoaded', () => {
  let currentFilter = 'all';
  renderMenuCards(currentFilter);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderMenuCards(currentFilter);
    });
  });
});

function renderMenuCards(filter) {
  const items = DB.getMenu(filter);
  const grid = document.getElementById('menu-grid');
  if (!grid) return;
  grid.innerHTML = items.map(item => `
    <div class="card">
      <div class="card-img">${item.emoji}</div>
      <div class="card-body">
        <span class="badge badge-${item.type}">${item.type === 'veg' ? '● Veg' : '● Non-Veg'}</span>
        ${item.popular ? '<span class="badge" style="background:#fff8e1;color:#f57f17;border:1px solid #ffe082;margin-left:4px">Popular</span>' : ''}
        <div class="card-name">${item.name}</div>
        <div class="card-desc">${item.desc}</div>
      </div>
      <div class="card-footer">
        <span class="card-price">₹${item.price}</span>
        <button class="btn-add" onclick="handleAddToCart('${item.id}')">+ Add</button>
      </div>
    </div>
  `).join('');
}
