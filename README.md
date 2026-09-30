# 💎 ABUSHA CREATIONS — Jewellery E-Commerce

A modern, responsive and premium jewellery e-commerce frontend built for **ABUSHA CREATIONS**.

The project focuses on creating a luxury jewellery shopping experience with elegant UI, responsive layouts, smooth interactions and a clean product browsing experience.

---

## ✨ Features

### 🏠 Landing Page
- Premium luxury jewellery hero section
- Full-width hero image
- Automatic hero slider
- Multiple hero slides
- Responsive hero content
- Brand logo and CTA overlay
- Elegant jewellery-focused visual design

### 🧭 Navigation
- Responsive desktop navigation
- Mobile hamburger menu
- Sticky navigation
- Mobile navigation drawer
- Search interface
- Cart access
- Wishlist/Favorites access

### 🛍️ Product Experience
- Product grid
- Product cards
- Product images
- Product names and prices
- Add to Cart functionality
- Product hover interactions
- Responsive product layouts

### 🛒 Shopping Cart
- Add products to cart
- Cart item management
- Cart quantity handling
- Cart count in navbar
- Responsive cart interface
- Background scroll lock when cart is open

### ❤️ Wishlist / Favorites
- Add products to favorites
- Remove products from favorites
- Wishlist count badge
- Dedicated favorites/wishlist view
- Persistent favorites using localStorage
- Prevent duplicate wishlist items
- Add favorite products directly to cart

### 📱 Responsive Design
Optimized for:

- Mobile
- Tablet
- Laptop
- Desktop
- Large desktop screens

Tested across common responsive breakpoints.

### 🎬 Animations
- GSAP animations
- Hero content animations
- Scroll-triggered animations
- Product/card reveal animations
- Smooth hover interactions
- Infinite horizontal customer testimonial animation
- Pause/resume testimonial marquee on hover

### ⭐ Customer Testimonials
- Customer review cards
- Star ratings
- Continuous horizontal scrolling
- Smooth infinite loop
- Hover-to-pause interaction
- Responsive testimonial layout

### 🔒 UI / UX
- Mobile background scroll locking
- Cart background scroll locking
- Mobile menu scroll locking
- Sticky navbar
- Responsive navigation
- Accessible interactive elements
- Reduced-motion considerations

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React | Frontend UI |
| JavaScript | Application logic |
| CSS | Styling |
| GSAP | Animations |
| GSAP ScrollTrigger | Scroll animations |
| Vite | Development & build tool |
| LocalStorage | Client-side cart/wishlist persistence |

---

## 📂 Project Structure

```text
jewel-ECommerce/
│
├── public/
│   └── assets/
│
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── Product/
│   │   ├── Cart/
│   │   ├── Wishlist/
│   │   ├── Testimonials/
│   │   └── Footer/
│   │
│   ├── pages/
│   ├── hooks/
│   ├── data/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── package-lock.json
└── README.md
