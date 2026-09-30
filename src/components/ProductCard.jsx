import React, { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import './ProductSection.css';

export default function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted }) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (onAddToCart) onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (onToggleWishlist) onToggleWishlist(product.id);
  };

  return (
    <div className="product-card">
      <div className="product-image-box">
        <img src={product.image} alt={product.name} className="product-img" />
        
        {/* Wishlist Heart Toggle */}
        <button 
          className={`wishlist-heart-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? <FaHeart className="heart-filled" /> : <FiHeart className="heart-outline" />}
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-pricing">
          <span className="current-price">₹ {product.price}</span>
          {product.oldPrice && (
            <span className="old-price">₹ {product.oldPrice}</span>
          )}
        </div>

        <button 
          className={`add-to-cart-btn ${added ? 'added' : ''}`}
          onClick={handleAdd}
        >
          {added ? 'ADDED ✓' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
}
