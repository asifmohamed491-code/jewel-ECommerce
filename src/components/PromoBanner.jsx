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
             <svg
  viewBox="20 0 115 52"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="doodle-svg"
  preserveAspectRatio="none"
>
  <path
    d="M20 52
       C32 47, 42 40.5, 53 40.5
       C62 40.5, 65 43, 71 43
       C80 43, 86 36, 88 31.5
       C91 26, 93.5 21, 93 17
       C92.5 12, 89 10.5, 87.5 10.8
       C84.5 11, 82.5 15, 82 19
       C80 16, 77 15, 75 15.5
       C72 16.5, 71 21, 74 25
       C77 29, 83 32, 89 31.5
       C98 31, 105 25, 111 17
       C117 9, 125 0, 135 0"
    stroke="#e29db1"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
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