import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import './PromoBanner.css';

export default function PromoBanner() {
  const perks = ['Elegant Designs', 'Skin Friendly', 'Budget Friendly', 'Perfect Gift Choice'];

  return (
    <section className="promo-banner-section">
      <div className="container">
        <div className="promo-banner-card">
          {/* Left Text Block */}
          <div className="promo-text-column">
            <span className="promo-script-title">More Than Just Jewellery...</span>
            <h3 className="promo-main-heading">IT'S A LIFESTYLE</h3>
            
            <div className="promo-heart-decor">
              <span className="promo-heart">♡</span>
            </div>

            <div className="promo-perks-list">
              {perks.map((perk, i) => (
                <span key={i} className="promo-perk-item">
                  {perk}
                  {i < perks.length - 1 && <span className="perk-bullet">•</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="promo-middle-divider" />

          {/* Right Action Column */}
          <div className="promo-action-column">
            <a href="#shop" className="promo-cta-btn">
              SHOP NOW <FiArrowRight size={14} className="cta-arrow-icon" />
            </a>

            {/* Subtle decorative heart ribbon doodle */}
            <div className="promo-ribbon-doodle">
              <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="doodle-svg">
                <path 
                  d="M10 40 C 35 15, 60 45, 85 20 C 95 10, 110 15, 105 35 C 100 50, 85 45, 80 35 C 75 25, 90 10, 102 22" 
                  stroke="#e29db1" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
