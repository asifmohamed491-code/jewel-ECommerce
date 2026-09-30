import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import './CategorySection.css';

export default function CategoryCard({ category }) {
  return (
    <a href={`#category-${category.id}`} className="category-card">
      <div className="category-circle-wrapper">
        <div className="category-circle">
          <img src={category.image} alt={category.name} className="category-img" />
        </div>
      </div>
      <h3 className="category-name">{category.name}</h3>
      <span className="category-arrow">
        <FiArrowRight size={13} />
      </span>
    </a>
  );
}
