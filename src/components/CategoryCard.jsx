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
    } else if (category.id === 'bracelets') {
      e.preventDefault();
      if (onSelectCategory) {
        onSelectCategory('/shop/bracelets');
      }
    } else if (category.id === 'kada') {
      e.preventDefault();
      if (onSelectCategory) {
        onSelectCategory('/shop/kada');
      }
    } else if (category.id === 'rings') {
      e.preventDefault();
      if (onSelectCategory) {
        onSelectCategory('/shop/finger-rings');
      }
    } else if (category.id === 'anklets') {
      e.preventDefault();
      if (onSelectCategory) {
        onSelectCategory('/shop/anklets');
      }
    } else if (category.id === 'watches') {
      e.preventDefault();
      if (onSelectCategory) {
        onSelectCategory('/shop/watches');
      }
    } else if (category.id === 'saree-pins') {
      e.preventDefault();
      if (onSelectCategory) {
        onSelectCategory('/shop/saree-pins');
      }
    } else if (category.id === 'hair-accessories') {
      e.preventDefault();
      if (onSelectCategory) {
        onSelectCategory('/shop/hair-accessories');
      }
    }
  };

  const getHref = () => {
    if (category.id === 'necklaces') return '/shop/necklaces';
    if (category.id === 'earrings') return '/shop/earrings';
    if (category.id === 'second-studs') return '/shop/second-studs';
    if (category.id === 'bracelets') return '/shop/bracelets';
    if (category.id === 'kada') return '/shop/kada';
    if (category.id === 'rings') return '/shop/finger-rings';
    if (category.id === 'anklets') return '/shop/anklets';
    if (category.id === 'watches') return '/shop/watches';
    if (category.id === 'saree-pins') return '/shop/saree-pins';
    if (category.id === 'hair-accessories') return '/shop/hair-accessories';
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

