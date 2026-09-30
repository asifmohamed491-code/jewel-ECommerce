import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiTrash2, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useScrollLock } from '../hooks/useScrollLock';
import './WishlistDrawer.css';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems = [],
  onRemoveWishlist,
  onAddToCart,
}) {
  const [addedId, setAddedId] = useState(null);

  // Lock background scroll while drawer is open
  useScrollLock(isOpen);

  if (!isOpen) return null;

  const handleAdd = (product) => {
    if (onAddToCart) onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const drawerContent = (
    <div 
      className="wishlist-drawer-overlay" 
      onClick={onClose}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) e.preventDefault();
      }}
    >
      <div 
        className="wishlist-drawer" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="wishlist-drawer-header">
          <div className="wishlist-title-wrap">
            <FiHeart size={20} className="wishlist-header-icon" />
            <h3 className="wishlist-drawer-title">
              MY WISHLIST ({wishlistItems.length})
            </h3>
          </div>
          <button 
            className="wishlist-close-btn" 
            onClick={onClose} 
            aria-label="Close wishlist"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="wishlist-items-body">
          {wishlistItems.length === 0 ? (
            <div className="wishlist-empty-state">
              <span className="empty-heart-icon">♡</span>
              <p className="empty-title">Your wishlist is empty</p>
              <p className="empty-subtitle">
                Explore our anti-tarnish everyday collection and save your favorites!
              </p>
              <button className="continue-shopping-btn" onClick={onClose}>
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            <div className="wishlist-items-list">
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-item-card">
                  <div className="wishlist-item-img-box">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="wishlist-item-details">
                    <h4 className="wishlist-item-name">{item.name}</h4>
                    <div className="wishlist-item-pricing">
                      <span className="wishlist-item-price">₹ {item.price}</span>
                      {item.oldPrice && (
                        <span className="wishlist-item-old-price">₹ {item.oldPrice}</span>
                      )}
                    </div>

                    <div className="wishlist-item-actions">
                      <button 
                        className={`wishlist-add-btn ${addedId === item.id ? 'added' : ''}`}
                        onClick={() => handleAdd(item)}
                      >
                        <FiShoppingBag size={13} />
                        {addedId === item.id ? 'ADDED TO BAG ✓' : 'MOVE TO BAG'}
                      </button>

                      <button 
                        className="wishlist-remove-btn" 
                        onClick={() => onRemoveWishlist && onRemoveWishlist(item.id)}
                        aria-label="Remove from wishlist"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="wishlist-drawer-footer">
            <p className="wishlist-guarantee-note">
              Anti-Tarnish • 100% Waterproof • Lifetime Polish Guarantee ♥
            </p>
            <button className="wishlist-continue-shopping-btn" onClick={onClose}>
              CONTINUE BROWSING
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(drawerContent, document.body)
    : drawerContent;
}
