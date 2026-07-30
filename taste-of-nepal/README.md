# Taste of Nepal — Website

## File Structure
```
taste-of-nepal/
├── index.html          ← Home page
├── pages/
│   ├── menu.html       ← Full menu with filters
│   ├── order.html      ← Online ordering + reservations
│   └── contact.html    ← Contact info + message form
├── css/
│   └── style.css       ← All styles (single shared file)
├── js/
│   ├── db.js           ← Database (localStorage-based, swap for real API)
│   ├── main.js         ← Shared: navbar, toast, cart badge
│   ├── menu.js         ← Menu filtering & card rendering
│   └── order.js        ← Cart, order form, reservation form
└── images/
    └── hero-bg.jpg     ← ADD YOUR PHOTO HERE (see images/README.txt)
```

## Setup
1. Add a hero background photo as `images/hero-bg.jpg`
2. Open `index.html` in a browser — all pages are linked

## Upgrading to a real backend
`js/db.js` uses localStorage. To connect a real server:
- Replace `save()/load()` functions with `fetch('/api/...')` calls
- All function signatures stay the same — no other file changes needed

## Contact info embedded
- Phone: +91 98103 69433
- Instagram: @TasteOfNepal01
- Location: Bijwasan, New Delhi
