import React, { useEffect, useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from './ProductCard';
import { featuredProducts } from '../data/products';
import { necklacesData } from '../data/necklaces';
import './ProductSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProductSection({ 
  onAddToCart, 
  onToggleWishlist, 
  wishlistedIds = [],
  selectedCategory = null,
  onResetCategory,
}) {
  const isNecklaces = selectedCategory === 'necklaces';
  const displayProducts = isNecklaces ? necklacesData : featuredProducts;

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    // Only animate when viewing the Necklaces category
    if (!isNecklaces || !sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    const headingY = isMobile ? 14 : 20;
    const cardsY = isMobile ? 24 : 40;

    const ctx = gsap.context(() => {
      const cards = gridRef.current ? gridRef.current.querySelectorAll('.product-card') : [];
      const headingElements = [headingRef.current, subtitleRef.current].filter(Boolean);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      // 1. Heading & Subtitle subtle reveal
      if (headingElements.length > 0) {
        tl.fromTo(
          headingElements,
          { opacity: 0, y: headingY },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
          }
        );
      }

      // 2. 10 Necklace product cards staggered entrance
      if (cards.length > 0) {
        tl.fromTo(
          cards,
          {
            opacity: 0,
            y: cardsY,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: isMobile ? 0.75 : 0.85,
            stagger: isMobile ? 0.07 : 0.09,
            ease: 'power2.out',
          },
          headingElements.length > 0 ? '-=0.25' : 0
        );
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [isNecklaces]);

  return (
    <section className="product-section" id="shop" ref={sectionRef}>
      <div className="container">
        {/* Breadcrumbs navigation when viewing category */}
        {isNecklaces && (
          <div className="category-breadcrumb-bar">
            <button 
              type="button" 
              className="breadcrumb-back-btn" 
              onClick={onResetCategory}
              aria-label="Back to All Collections"
            >
              <FiArrowLeft size={14} />
              <span>Back to All Collections</span>
            </button>
            <span className="breadcrumb-badge">10 Handcrafted Pieces</span>
          </div>
        )}

        {/* Section Heading with flanking decorative lines */}
        <div className="section-title-wrap" ref={headingRef}>
          <span className="title-line"></span>
          <h2 className="section-title">
            {isNecklaces ? 'NECKLACES' : 'FEATURED PRODUCTS'}
          </h2>
          <span className="title-line"></span>
        </div>

        {/* Subtitle when in Necklaces category */}
        {isNecklaces && (
          <p className="category-subtitle" ref={subtitleRef}>
            Elegant pieces designed for everyday luxury.
          </p>
        )}

        {/* Product Cards Grid */}
        <div className="products-grid" ref={gridRef}>
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistedIds.includes(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


