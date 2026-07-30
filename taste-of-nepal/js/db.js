/**
 * db.js — Taste of Nepal client-side database
 * Stores menu, orders, reservations in localStorage.
 * Replace the storage calls with fetch('/api/...') to plug in a real backend.
 */

const DB = (() => {

  /* ---- MENU (static seed data) ---- */
  const MENU = [
    {
      id: 'm1', category: 'momo', type: 'veg',
      name: 'Steamed Veg Momo',
      desc: 'Hand-folded dumplings filled with spiced paneer, cabbage & herbs. Served with tomato sesame achar.',
      price: 100, emoji: '🥟', popular: true
    },
    {
      id: 'm2', category: 'momo', type: 'nonveg',
      name: 'Steamed Chicken Momo',
      desc: 'Juicy minced chicken with ginger, garlic & Nepali spices. Served with fiery tomato chutney.',
      price: 130, emoji: '🥟', popular: true
    },
    {
      id: 'm3', category: 'momo', type: 'veg',
      name: 'Fried Veg Momo',
      desc: 'Same great filling, pan-fried to a golden crisp. Comes with two chutneys.',
      price: 110, emoji: '🥟'
    },
    {
      id: 'm4', category: 'momo', type: 'nonveg',
      name: 'Fried Chicken Momo',
      desc: 'Crispy outside, tender chicken inside. A Delhi favourite. Served with mint & achar.',
      price: 140, emoji: '🥟'
    },
    {
      id: 'm5', category: 'thukpa', type: 'nonveg',
      name: 'Non-Veg Thukpa',
      desc: 'Hearty Tibetan noodle soup with chicken, seasonal veg, Himalayan herbs & warming spices.',
      price: 160, emoji: '🍜', popular: true
    }
  ];

  /* ---- HELPERS ---- */
  function save(key, data) {
    try { localStorage.setItem('ton_' + key, JSON.stringify(data)); } catch(e) {}
  }
  function load(key, fallback = []) {
    try {
      const raw = localStorage.getItem('ton_' + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch(e) { return fallback; }
  }
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  /* ---- MENU API ---- */
  function getMenu(filter = 'all') {
    if (filter === 'all') return MENU;
    if (filter === 'veg' || filter === 'nonveg') return MENU.filter(i => i.type === filter);
    return MENU.filter(i => i.category === filter);
  }

  /* ---- CART API ---- */
  function getCart() { return load('cart', []); }
  function addToCart(itemId) {
    const item = MENU.find(i => i.id === itemId);
    if (!item) return null;
    const cart = getCart();
    const existing = cart.find(c => c.id === itemId);
    if (existing) { existing.qty += 1; }
    else { cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 }); }
    save('cart', cart);
    return cart;
  }
  function removeFromCart(itemId) {
    const cart = getCart().filter(c => c.id !== itemId);
    save('cart', cart);
    return cart;
  }
  function updateQty(itemId, qty) {
    const cart = getCart();
    const item = cart.find(c => c.id === itemId);
    if (item) { item.qty = Math.max(1, qty); }
    save('cart', cart);
    return cart;
  }
  function clearCart() { save('cart', []); }
  function cartTotal() {
    return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
  }
  function cartCount() {
    return getCart().reduce((sum, i) => sum + i.qty, 0);
  }

  /* ---- ORDERS API ---- */
  function placeOrder(customerData) {
    const cart = getCart();
    if (!cart.length) return null;
    const order = {
      id: 'ORD-' + uid().toUpperCase(),
      date: new Date().toISOString(),
      customer: customerData,
      items: cart,
      total: cartTotal(),
      status: 'received'
    };
    const orders = load('orders');
    orders.push(order);
    save('orders', orders);
    clearCart();
    return order;
  }
  function getOrders() { return load('orders'); }

  /* ---- RESERVATIONS API ---- */
  function makeReservation(data) {
    const res = {
      id: 'RES-' + uid().toUpperCase(),
      date: new Date().toISOString(),
      ...data,
      status: 'pending'
    };
    const list = load('reservations');
    list.push(res);
    save('reservations', list);
    return res;
  }
  function getReservations() { return load('reservations'); }

  return { getMenu, getCart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount, placeOrder, getOrders, makeReservation, getReservations };
})();
