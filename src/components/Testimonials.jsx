import React, { useEffect, useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import gsap from 'gsap';
import { testimonialsData } from '../data/testimonials';
import './Testimonials.css';

// Duplicate array items to provide full coverage across any viewport
const cardsList = [
  ...testimonialsData,
  ...testimonialsData,
];

export default function Testimonials() {
  const marqueeRef = useRef(null);
  const trackRef = useRef(null);
  const groupRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !trackRef.current || !groupRef.current) return;

    const ctx = gsap.context(() => {
      // Calculate duration dynamically to maintain consistent luxury speed (~28px/second)
      const groupWidth = groupRef.current.offsetWidth || 2100;
      const speed = 28; // pixels per second
      const duration = groupWidth / speed;

      // Animate track from -50% to 0% continuously to move cards LEFT -> RIGHT
      tweenRef.current = gsap.fromTo(
        trackRef.current,
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: duration,
          ease: 'none',
          repeat: -1,
        }
      );
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      tweenRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      tweenRef.current.resume();
    }
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        {/* Section Heading with flanking decorative lines */}
        <div className="section-title-wrap">
          <span className="title-line"></span>
          <h2 className="section-title">WHAT OUR CUSTOMERS SAY</h2>
          <span className="title-line"></span>
        </div>
      </div>

      {/* Full-width continuous horizontal GSAP marquee */}
      <div
        className="testimonials-marquee-wrapper"
        ref={marqueeRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
        role="region"
        aria-label="Customer Testimonials Marquee"
      >
        <div className="testimonials-marquee-track" ref={trackRef}>
          {/* Primary Group */}
          <div className="testimonials-marquee-group" ref={groupRef}>
            {cardsList.map((item, idx) => (
              <div key={`t1-${item.id}-${idx}`} className="testimonial-card">
                <div className="star-rating">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>

                <p className="testimonial-text">“{item.review}”</p>

                <div className="testimonial-author">
                  <span className="author-name">{item.name}</span>
                  <span className="author-location">{item.city} • Verified Buyer</span>
                </div>

                <div className="testimonial-badge">
                  <span>Verified: {item.purchasedItem}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Secondary Group (Seamless loop twin) */}
          <div className="testimonials-marquee-group" aria-hidden="true">
            {cardsList.map((item, idx) => (
              <div key={`t2-${item.id}-${idx}`} className="testimonial-card">
                <div className="star-rating">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>

                <p className="testimonial-text">“{item.review}”</p>

                <div className="testimonial-author">
                  <span className="author-name">{item.name}</span>
                  <span className="author-location">{item.city} • Verified Buyer</span>
                </div>

                <div className="testimonial-badge">
                  <span>Verified: {item.purchasedItem}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
