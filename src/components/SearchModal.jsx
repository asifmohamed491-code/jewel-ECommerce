import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { useScrollLock } from '../hooks/useScrollLock';
import { allProducts } from '../data/products';
import './SearchModal.css';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  const [query, setQuery] = useState('');

  // Lock background scroll when search modal is open
  useScrollLock(isOpen);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];


  const modalContent = (
    <div 
      className="search-modal-overlay" 
      onClick={onClose}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) e.preventDefault();
      }}
    >
      <div className="search-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-header">
          <FiSearch size={20} className="search-input-icon" />
          <input
            type="text"
            placeholder="Search anti-tarnish jewelry, necklaces, rings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="search-main-input"
          />
          <button className="search-modal-close" onClick={onClose} aria-label="Close search">
            <FiX size={20} />
          </button>
        </div>

        <div className="search-results-area">
          {query.trim() === '' ? (
            <div className="search-suggestions">
              <span className="suggestions-title">POPULAR SEARCHES:</span>
              <div className="suggestion-tags">
                {['Heart Necklace', 'Crystal Hoops', 'Floral Bracelet', 'Anti-Tarnish Rings', 'Anklets'].map((tag) => (
                  <button key={tag} className="tag-btn" onClick={() => setQuery(tag)}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <p className="no-results-msg">No jewellery found matching "{query}"</p>
          ) : (
            <div className="search-results-list">
              {filtered.map((item) => (
<div 
                  key={item.id} 
                  className="search-result-item" 
                  onClick={() => {
                    if (onSelectProduct) onSelectProduct(item);
                    onClose();
                  }}
                >
                  <img src={item.image} alt={item.name} className="result-thumb" />
                  <div className="result-meta">
                    <span className="result-name">{item.name}</span>
                    <span className="result-cat">{item.category}</span>
                  </div>
                  <span className="result-price">₹ {item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}
