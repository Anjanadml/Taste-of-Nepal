document.addEventListener('DOMContentLoaded',()=>{
  const path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.navbar-links a').forEach(a=>{
    const href=(a.getAttribute('href')||'').split('/').pop();
    if(href&&path===href)a.classList.add('active');
  });
  updateCartBadge();
  initScrollAnimations();
});
function showToast(msg,dur=2800){
  let t=document.getElementById('toast');
  if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t);}
  t.textContent=msg;t.classList.add('show');
  clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),dur);
}
function updateCartBadge(){
  const b=document.getElementById('cart-badge');if(!b)return;
  const c=DB.cartCount();b.textContent=c;b.style.display=c>0?'inline':'none';
}
function handleAddToCart(id){DB.addToCart(id);updateCartBadge();showToast('Added to cart ✓');}
function initScrollAnimations(){
  const els=document.querySelectorAll('[data-anim]');
  if(!els.length)return;
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('anim-in');obs.unobserve(e.target);}});
  },{threshold:0.12});
  els.forEach(el=>obs.observe(el));
}
