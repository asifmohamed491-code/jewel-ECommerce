import React from 'react';
import CategoryCard from './CategoryCard';
import { categoriesData } from '../data/categories';
import './CategorySection.css';

export default function CategorySection() {
  return (
    <section className="category-section" id="categories">
      <div className="container">
        {/* Section Heading with decorative flanking lines */}
        <div className="section-title-wrap">
          <span className="title-line"></span>
          <h2 className="section-title">SHOP BY CATEGORY</h2>
          <span className="title-line"></span>
        </div>

        {/* 8 Categories Grid */}
        <div className="categories-grid">
          {categoriesData.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
