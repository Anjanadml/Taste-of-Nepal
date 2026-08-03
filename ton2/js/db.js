const DB = (() => {
  const MENU = [
    {id:'m1',cat:'momo',type:'veg',name:'Steamed Veg Momo',desc:'Hand-folded dumplings with spiced paneer, cabbage & herbs. Served with sesame tomato achar.',price:100,emoji:'🥟',popular:true,img:'images/steamed-veg.jpg'},
    {id:'m2',cat:'momo',type:'nonveg',name:'Steamed Chicken Momo',desc:'Juicy minced chicken with ginger, garlic & authentic Nepali spices. Served with fiery chutney.',price:130,emoji:'🥟',popular:true,img:'images/steamed-chicken.jpg'},
    {id:'m3',cat:'momo',type:'veg',name:'Fried Veg Momo',desc:'Same great paneer-cabbage filling pan-fried to golden crisp. Two chutneys included.',price:110,emoji:'🥟',img:'images/fried-veg.jpg'},
    {id:'m4',cat:'momo',type:'nonveg',name:'Fried Chicken Momo',desc:'Crispy outside, juicy chicken inside. A Bijwasan crowd favourite. With mint & achar.',price:140,emoji:'🥟',popular:true,img:'images/fried-chicken.jpg'},
    {id:'m5',cat:'thukpa',type:'nonveg',name:'Non-Veg Thukpa',desc:'Hearty Tibetan noodle soup with chicken, seasonal veg & Himalayan herbs. Soul-warming.',price:160,emoji:'🍜',popular:true,img:'images/thukpa.jpg'}
  ];
  const save=(k,v)=>{try{localStorage.setItem('ton_'+k,JSON.stringify(v))}catch(e){}};
  const load=(k,d=[])=>{try{const r=localStorage.getItem('ton_'+k);return r?JSON.parse(r):d}catch(e){return d}};
  const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,5);
  const getMenu=(f='all')=>f==='all'?MENU:f==='veg'||f==='nonveg'?MENU.filter(i=>i.type===f):MENU.filter(i=>i.cat===f);
  const getCart=()=>load('cart',[]);
  const addToCart=id=>{const item=MENU.find(i=>i.id===id);if(!item)return;const c=getCart();const ex=c.find(x=>x.id===id);ex?ex.qty++:c.push({id:item.id,name:item.name,price:item.price,qty:1});save('cart',c);return c};
  const removeFromCart=id=>{const c=getCart().filter(x=>x.id!==id);save('cart',c);return c};
  const updateQty=(id,q)=>{const c=getCart();const i=c.find(x=>x.id===id);if(i)i.qty=Math.max(1,q);save('cart',c);return c};
  const clearCart=()=>save('cart',[]);
  const cartTotal=()=>getCart().reduce((s,i)=>s+i.price*i.qty,0);
  const cartCount=()=>getCart().reduce((s,i)=>s+i.qty,0);
  const placeOrder=d=>{const c=getCart();if(!c.length)return null;const o={id:'ORD-'+uid().toUpperCase(),date:new Date().toISOString(),customer:d,items:c,total:cartTotal(),status:'received'};const orders=load('orders');orders.push(o);save('orders',orders);clearCart();return o};
  const makeReservation=d=>{const r={id:'RES-'+uid().toUpperCase(),date:new Date().toISOString(),...d};const l=load('reservations');l.push(r);save('reservations',l);return r};
  return{getMenu,getCart,addToCart,removeFromCart,updateQty,clearCart,cartTotal,cartCount,placeOrder,makeReservation};
})();
