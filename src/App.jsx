import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureStrip from './components/FeatureStrip';
import CategorySection from './components/CategorySection';
import ProductSection from './components/ProductSection';
import PromoBanner from './components/PromoBanner';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import SocialGallery from './components/SocialGallery';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import SearchModal from './components/SearchModal';
import NecklacesPage from './components/NecklacesPage';
import EarringsPage from './components/EarringsPage';
import SecondStudsPage from './components/SecondStudsPage';
import BraceletsPage from './components/BraceletsPage';
import KadaPage from './components/KadaPage';
import FingerRingsPage from './components/FingerRingsPage';
import AnkletsPage from './components/AnkletsPage';
import WatchesPage from './components/WatchesPage';
import SareePinsPage from './components/SareePinsPage';
import HairAccessoriesPage from './components/HairAccessoriesPage';
import { allProducts } from './data/products';
import defaultCartImg from './assets/products/product-1.png';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const appRef = useRef(null);
  const [cartItems, setCartItems] = useState([
    // Start with 1 default item to demonstrate bag functionality immediately
    {
      id: 1,
      name: 'Heart Pendant Necklace',
      price: 499,
      quantity: 1,
      image: defaultCartImg,
    }
  ]);
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('abusha-favorites');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading favorites from localStorage:', e);
    }
    return [1];
  });
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/shop/necklaces' || path === '/shop/necklaces/' || window.location.hash === '#category-necklaces') {
        return '/shop/necklaces';
      }
      if (path === '/shop/earrings' || path === '/shop/earrings/' || window.location.hash === '#category-earrings') {
        return '/shop/earrings';
      }
      if (path === '/shop/second-studs' || path === '/shop/second-studs/' || window.location.hash === '#category-second-studs') {
        return '/shop/second-studs';
      }
      if (path === '/shop/bracelets' || path === '/shop/bracelets/' || window.location.hash === '#category-bracelets') {
        return '/shop/bracelets';
      }
      if (path === '/shop/kada' || path === '/shop/kada/' || window.location.hash === '#category-kada') {
        return '/shop/kada';
      }
      if (path === '/shop/finger-rings' || path === '/shop/finger-rings/' || window.location.hash === '#category-finger-rings') {
        return '/shop/finger-rings';
      }
      if (path === '/shop/anklets' || path === '/shop/anklets/' || window.location.hash === '#category-anklets') {
        return '/shop/anklets';
      }
      if (path === '/shop/watches' || path === '/shop/watches/' || window.location.hash === '#category-watches') {
        return '/shop/watches';
      }
      if (path === '/shop/saree-pins' || path === '/shop/saree-pins/' || window.location.hash === '#category-saree-pins') {
        return '/shop/saree-pins';
      }
      if (path === '/shop/hair-accessories' || path === '/shop/hair-accessories/' || window.location.hash === '#category-hair-accessories') {
        return '/shop/hair-accessories';
      }
      if (window.location.hash === '#category-rings') {
        return '/shop/finger-rings';
      }
    }
    return '/';
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Client-side navigate handler without full page reload
  const navigate = (path) => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
      }
      setCurrentRoute(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Browser back/forward navigation support
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/shop/necklaces' || path === '/shop/necklaces/') {
        setCurrentRoute('/shop/necklaces');
      } else if (path === '/shop/earrings' || path === '/shop/earrings/') {
        setCurrentRoute('/shop/earrings');
      } else if (path === '/shop/second-studs' || path === '/shop/second-studs/') {
        setCurrentRoute('/shop/second-studs');
      } else if (path === '/shop/bracelets' || path === '/shop/bracelets/') {
        setCurrentRoute('/shop/bracelets');
      } else if (path === '/shop/kada' || path === '/shop/kada/') {
        setCurrentRoute('/shop/kada');
      } else if (path === '/shop/finger-rings' || path === '/shop/finger-rings/') {
        setCurrentRoute('/shop/finger-rings');
      } else if (path === '/shop/anklets' || path === '/shop/anklets/') {
        setCurrentRoute('/shop/anklets');
      } else if (path === '/shop/watches' || path === '/shop/watches/') {
        setCurrentRoute('/shop/watches');
      } else if (path === '/shop/saree-pins' || path === '/shop/saree-pins/') {
        setCurrentRoute('/shop/saree-pins');
      } else if (path === '/shop/hair-accessories' || path === '/shop/hair-accessories/') {
        setCurrentRoute('/shop/hair-accessories');
      } else {
        setCurrentRoute('/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);


  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('abusha-favorites', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Error saving favorites to localStorage:', e);
    }
  }, [wishlistIds]);


  // Subtle GSAP ScrollTrigger storytelling reveals
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !appRef.current || currentRoute === '/shop/necklaces' || currentRoute === '/shop/earrings' || currentRoute === '/shop/second-studs') return;
    if (prefersReducedMotion || !appRef.current || currentRoute === '/shop/necklaces' || currentRoute === '/shop/earrings' || currentRoute === '/shop/second-studs' || currentRoute === '/shop/bracelets') return;
    if (
      prefersReducedMotion ||
      !appRef.current ||
      currentRoute === '/shop/necklaces' ||
      currentRoute === '/shop/earrings' ||
      currentRoute === '/shop/second-studs' ||
      currentRoute === '/shop/bracelets' ||
      currentRoute === '/shop/kada' ||
      currentRoute === '/shop/finger-rings' ||
      currentRoute === '/shop/anklets' ||
      currentRoute === '/shop/watches' ||
      currentRoute === '/shop/saree-pins' ||
      currentRoute === '/shop/hair-accessories'
    ) return;

    const isMobile = window.innerWidth < 768;
    const yOffset = isMobile ? 12 : 22;

    const ctx = gsap.context(() => {
      // 1. Feature Strip: subtle icon & text staggered entrance
      const featureItems = gsap.utils.toArray('.feature-item');
      if (featureItems.length > 0) {
        gsap.fromTo(
          featureItems,
          { opacity: 0, y: yOffset },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.feature-strip-wrap',
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      // 2. Shop By Category: Header reveal + cards stagger
      const categoryHeading = document.querySelector('.category-section .section-title-wrap');
      if (categoryHeading) {
        gsap.fromTo(
          categoryHeading,
          { opacity: 0, y: yOffset },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.category-section',
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      const categoryCards = gsap.utils.toArray('.category-card');
      if (categoryCards.length > 0) {
        gsap.fromTo(
          categoryCards,
          { opacity: 0, y: yOffset },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: isMobile ? 0.05 : 0.07,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.categories-grid',
              start: 'top 86%',
              once: true,
            },
          }
        );
      }

      // 3. Featured Products: Header reveal + product cards stagger (Home page)
      const productHeading = document.querySelector('.product-section .section-title-wrap');
      if (productHeading) {
        gsap.fromTo(
          productHeading,
          { opacity: 0, y: yOffset },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.product-section',
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      const productCards = gsap.utils.toArray('.product-card');
      if (productCards.length > 0) {
        gsap.fromTo(
          productCards,
          { opacity: 0, y: yOffset },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: isMobile ? 0.06 : 0.09,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.products-grid',
              start: 'top 86%',
              once: true,
            },
          }
        );
      }

      // 4. Promo Banner: Card entrance + progressive reveal
      const promoCard = document.querySelector('.promo-banner-card');
      if (promoCard) {
        gsap.fromTo(
          promoCard,
          { opacity: 0, y: yOffset },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.promo-banner-section',
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 5. Why Choose Us: Reason cards stagger
      const whyCards = gsap.utils.toArray('.reason-card');
      if (whyCards.length > 0) {
        gsap.fromTo(
          whyCards,
          { opacity: 0, y: yOffset },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.reasons-grid',
              start: 'top 86%',
              once: true,
            },
          }
        );
      }

      // 6. Testimonials: Section heading + cards stagger
      const testimonialHeading = document.querySelector('.testimonials-section .section-title-wrap');
      if (testimonialHeading) {
        gsap.fromTo(
          testimonialHeading,
          { opacity: 0, y: yOffset },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.testimonials-section',
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      const testimonialMarquee = document.querySelector('.testimonials-marquee-wrapper');
      if (testimonialMarquee) {
        gsap.fromTo(
          testimonialMarquee,
          { opacity: 0, y: yOffset },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.testimonials-marquee-wrapper',
              start: 'top 86%',
              once: true,
            },
          }
        );
      }

      // 7. Social Gallery: Header + 6 Instagram thumbnails progressive reveal
      const socialHeader = document.querySelector('.social-header');
      if (socialHeader) {
        gsap.fromTo(
          socialHeader,
          { opacity: 0, y: yOffset },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.social-gallery-section',
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      const socialImages = gsap.utils.toArray('.social-image-wrap');
      if (socialImages.length > 0) {
        gsap.fromTo(
          socialImages,
          { opacity: 0, scale: isMobile ? 0.98 : 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.social-grid',
              start: 'top 86%',
              once: true,
            },
          }
        );
      }

      // Refresh ScrollTrigger positions after fonts and layout settle
      ScrollTrigger.refresh();
    }, appRef.current);

    return () => ctx.revert();
  }, [currentRoute]);

  // Add to cart handler
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove from cart
  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Toggle wishlist
  const handleToggleWishlist = (productId) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isNecklacesPage = currentRoute === '/shop/necklaces';
  const isEarringsPage = currentRoute === '/shop/earrings';
  const isSecondStudsPage = currentRoute === '/shop/second-studs';
  const isBraceletsPage = currentRoute === '/shop/bracelets';
  const isKadaPage = currentRoute === '/shop/kada';
  const isFingerRingsPage = currentRoute === '/shop/finger-rings';
  const isAnkletsPage = currentRoute === '/shop/anklets';
  const isWatchesPage = currentRoute === '/shop/watches';
  const isSareePinsPage = currentRoute === '/shop/saree-pins';
  const isHairAccessoriesPage = currentRoute === '/shop/hair-accessories';
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistProducts = allProducts.filter((product) => wishlistIds.includes(product.id));

  return (
    <div className="abusha-app" ref={appRef}>
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Navigation Header */}
      <Header
        wishlistCount={wishlistIds.length}
        cartCount={totalCartCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onNavigate={navigate}
      />

      {isNecklacesPage ? (
        /* Dedicated Necklaces Page */
        <NecklacesPage
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistedIds={wishlistIds}
          onBack={() => navigate('/')}
        />
      ) : isEarringsPage ? (
        /* Dedicated Earrings Page */
        <EarringsPage
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistedIds={wishlistIds}
          onBack={() => navigate('/')}
        />
      ) : isSecondStudsPage ? (
        /* Dedicated Second Studs Page */
        <SecondStudsPage
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistedIds={wishlistIds}
          onBack={() => navigate('/')}
        />
      ) : isBraceletsPage ? (
        /* Dedicated Bracelets Page */
        <BraceletsPage
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistedIds={wishlistIds}
          onBack={() => navigate('/')}
        />
      ) : isKadaPage ? (
        /* Dedicated Kada Page */
        <KadaPage
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistedIds={wishlistIds}
          onBack={() => navigate('/')}
        />
      ) : isFingerRingsPage ? (
        /* Dedicated Finger Rings Page */
        <FingerRingsPage
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistedIds={wishlistIds}
          onBack={() => navigate('/')}
        />
      ) : isAnkletsPage ? (
        /* Dedicated Anklets Page */
        <AnkletsPage
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistedIds={wishlistIds}
          onBack={() => navigate('/')}
        />
      ) : isWatchesPage ? (
        /* Dedicated Watches Page */
        <WatchesPage
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistedIds={wishlistIds}
          onBack={() => navigate('/')}
        />
      ) : isSareePinsPage ? (
        /* Dedicated Saree Pins Page */
        <SareePinsPage
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistedIds={wishlistIds}
          onBack={() => navigate('/')}
        />
      ) : isHairAccessoriesPage ? (
        /* Dedicated Hair Accessories Page */
        <HairAccessoriesPage
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistedIds={wishlistIds}
          onBack={() => navigate('/')}
        />
      ) : (
        /* Home Page Sections */
        <>
          {/* 3. Hero Carousel Section */}
          <Hero />

          {/* 4. 5-Item Feature Strip */}
          <FeatureStrip />

          {/* 5. Shop By Category */}
          <CategorySection onSelectCategory={(route) => navigate(route || '/')} />

          {/* 6. Featured Products (Home Page only) */}
          <ProductSection
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistedIds={wishlistIds}
          />

          {/* 7. Promotional Banner */}
          <PromoBanner />

          {/* 8. Why Choose Us */}
          <WhyChooseUs />

          {/* 9. Testimonials */}
          <Testimonials />

          {/* 10. Social / Instagram Section */}
          <SocialGallery />
        </>
      )}

      {/* 11. Footer */}
      <Footer onNavigate={navigate} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Slide-out Favorites / Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => {
          handleAddToCart(product);
          setIsCartOpen(true);
        }}
      />
    </div>
  );
}
