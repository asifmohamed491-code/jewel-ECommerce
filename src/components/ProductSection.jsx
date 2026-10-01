import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import ProductCard from './ProductCard';
import { featuredProducts } from '../data/products';
import { necklacesData } from '../data/necklaces';
import './ProductSection.css';

export default function ProductSection({ 
  onAddToCart, 
  onToggleWishlist, 
  wishlistedIds = [],
  selectedCategory = null,
  onResetCategory,
}) {
  const isNecklaces = selectedCategory === 'necklaces';
  const displayProducts = isNecklaces ? necklacesData : featuredProducts;

  return (
    <section className="product-section" id="shop">
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
        <div className="section-title-wrap">
          <span className="title-line"></span>
          <h2 className="section-title">
            {isNecklaces ? 'NECKLACES' : 'FEATURED PRODUCTS'}
          </h2>
          <span className="title-line"></span>
        </div>

        {/* Subtitle when in Necklaces category */}
        {isNecklaces && (
          <p className="category-subtitle">
            Elegant pieces designed for everyday luxury.
          </p>
        )}

        {/* Product Cards Grid */}
        <div className="products-grid">
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

