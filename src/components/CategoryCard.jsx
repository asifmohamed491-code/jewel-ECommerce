import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import './CategorySection.css';

export default function CategoryCard({ category, onSelectCategory, isDragging, hasMovedRef }) {
  const handleClick = (e) => {
    if (isDragging || hasMovedRef?.current) {
      e.preventDefault();
      return;
    }
    if (category.id === 'necklaces') {
      e.preventDefault();
      if (onSelectCategory) {
        onSelectCategory('/shop/necklaces');
      }
    } else if (category.id === 'earrings') {
      e.preventDefault();
      if (onSelectCategory) {
        onSelectCategory('/shop/earrings');
      }
    } else if (category.id === 'second-studs') {
      e.preventDefault();
      if (onSelectCategory) {
        onSelectCategory('/shop/second-studs');
      }
    }
  };

  const getHref = () => {
    if (category.id === 'necklaces') return '/shop/necklaces';
    if (category.id === 'earrings') return '/shop/earrings';
    if (category.id === 'second-studs') return '/shop/second-studs';
    return `#category-${category.id}`;
  };

  return (
    <a 
      href={getHref()} 
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

