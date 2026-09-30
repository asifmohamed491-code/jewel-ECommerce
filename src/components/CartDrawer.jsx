import React from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import { useScrollLock } from '../hooks/useScrollLock';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  // Lock background scroll when cart drawer is open
  useScrollLock(isOpen);

  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const drawerContent = (
    <div 
      className="cart-drawer-overlay" 
      onClick={onClose}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) e.preventDefault();
      }}
    >
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <div className="cart-title-wrap">
            <FiShoppingBag size={20} />
            <h3 className="cart-drawer-title">YOUR BAG ({cartItems.reduce((a, b) => a + b.quantity, 0)})</h3>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            <FiX size={22} />
          </button>
        </div>

        <div className="cart-items-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <span className="empty-icon">♡</span>
              <p className="empty-title">Your shopping bag is empty</p>
              <p className="empty-subtitle">Discover our anti-tarnish everyday collection</p>
              <button className="continue-shopping-btn" onClick={onClose}>
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-img-box">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <span className="cart-item-price">₹ {item.price}</span>
                    <div className="cart-item-qty-row">
                      <div className="qty-controls">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="qty-btn"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="qty-count">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="qty-btn"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.id)} 
                        className="remove-item-btn"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal-row">
              <span className="subtotal-label">SUBTOTAL:</span>
              <span className="subtotal-amount">₹ {total}</span>
            </div>
            <p className="cart-shipping-note">Free Shipping on all Anti-Tarnish orders across India ♥</p>
            <button className="cart-checkout-btn" onClick={() => alert('Proceeding with order! (Checkout UI preview)')}>
              CHECKOUT • ₹ {total}
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
