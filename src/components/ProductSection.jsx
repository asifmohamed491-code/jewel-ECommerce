import React from 'react';
import ProductCard from './ProductCard';
import { featuredProducts } from '../data/products';
import './ProductSection.css';

export default function ProductSection({ onAddToCart, onToggleWishlist, wishlistedIds = [] }) {
  return (
    <section className="product-section" id="shop">
      <div className="container">
        {/* Section Heading with flanking decorative lines */}
        <div className="section-title-wrap">
          <span className="title-line"></span>
          <h2 className="section-title">FEATURED PRODUCTS</h2>
          <span className="title-line"></span>
        </div>

        {/* Product Cards Grid */}
        <div className="products-grid">
          {featuredProducts.map((product) => (
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
