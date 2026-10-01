import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import './CategorySection.css';

export default function CategoryCard({ category, onSelectCategory, isDragging }) {
  const handleClick = (e) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }
    if (category.id === 'necklaces') {
      e.preventDefault();
      if (onSelectCategory) {
        onSelectCategory('/shop/necklaces');
      }
    }
  };

  return (
    <a 
      href={category.id === 'necklaces' ? '/shop/necklaces' : `#category-${category.id}`} 
      className="category-card"
      onClick={handleClick}
      draggable={false}
    >
      <div className="category-circle-wrapper">
        <div className="category-circle">
          <img src={category.image} alt={category.name} className="category-img" draggable={false} />
        </div>
      </div>
      <h3 className="category-name">{category.name}</h3>
      <span className="category-arrow">
        <FiArrowRight size={13} />
      </span>
    </a>
  );
}

