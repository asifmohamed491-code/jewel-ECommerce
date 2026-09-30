import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import gsap from 'gsap';
import logoEmblem from '../assets/logo/logo-abusha.png';
import hero1Img from '../assets/hero/hero-1.png';
import hero2Img from '../assets/hero/hero-2.png';
import hero3Img from '../assets/hero/hero-3.png';
import './Hero.css';

const slidesData = [
  {
    id: 1,
    tagline: 'ABUSHA CREATION',
    subtitle: 'ANTI TARNISH JEWELRY',
    scriptLine1: 'Timeless Shine',
    scriptLine2: 'For Every You',
    ctaText: 'SHOP NOW',
    ctaLink: '#shop',
    image: hero1Img,
  },
  {
    id: 2,
    tagline: 'EVERYDAY ELEGANCE',
    subtitle: 'ANTI TARNISH JEWELRY',
    scriptLine1: 'Jewellery Made',
    scriptLine2: 'For Every Moment',
    ctaText: 'SHOP COLLECTION',
    ctaLink: '#shop',
    image: hero2Img,
  },
  {
    id: 3,
    tagline: 'YOUR STYLE, YOUR SPARKLE',
    subtitle: 'ANTI TARNISH JEWELRY',
    scriptLine1: 'Discover Jewellery',
    scriptLine2: 'That Feels Like You',
    ctaText: 'EXPLORE NOW',
    ctaLink: '#shop',
    image: hero3Img,
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);
  const heroContentRef = useRef(null);

  // 5000ms auto-slide with clean timer reset
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
    }, 5000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [resetTimer]);

  // Subtle GSAP entrance animation for hero content when slide changes
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !heroContentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-logo-img',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.hero-heading-text',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.05 }
      );
      gsap.fromTo(
        '.hero-subtitle-text',
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'power2.out', delay: 0.1 }
      );
      gsap.fromTo(
        '.hero-script-line',
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.15, stagger: 0.06 }
      );
      gsap.fromTo(
        '.hero-divider-slot',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.22 }
      );
      gsap.fromTo(
        '.hero-fixed-btn',
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.26 }
      );
    }, heroContentRef);

    return () => ctx.revert();
  }, [currentSlide]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
    resetTimer();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
    resetTimer();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetTimer();
  };

  const slide = slidesData[currentSlide];

  return (
    <section className="hero-section" id="home">
      {/* 1. FULL HERO BACKGROUND IMAGES */}
      <div className="hero-bg-slider">
        {slidesData.map((s, idx) => (
          <div
            key={s.id}
            className={`hero-bg-slide ${idx === currentSlide ? 'active' : ''}`}
          >
            <img
              src={s.image}
              alt={s.tagline}
              className="hero-bg-img"
            />
          </div>
        ))}
      </div>

      {/* 2. SUBTLE READABILITY OVERLAY GRADIENT */}
      <div className="hero-bg-overlay" />

      {/* 3. CONTENT OVERLAY LAYER (Layered directly inside the single full-width hero slide) */}
      <div className="hero-overlay-content">
        <div className="hero-text-overlay" ref={heroContentRef}>
          {/* Brand Logo: Positioned ABOVE the text */}
          <div className="hero-slot hero-logo-slot">
            <img src={logoEmblem} alt="ABUSHA CREATION" className="hero-logo-img" />
          </div>

          {/* Heading Slot: Fixed height */}
          <div className="hero-slot hero-heading-slot">
            <h1 className="hero-heading-text">{slide.tagline}</h1>
          </div>

          {/* Subtitle Slot: Fixed height */}
          <div className="hero-slot hero-subtitle-slot">
            <span className="hero-subtitle-text">{slide.subtitle}</span>
          </div>

          {/* Script Tagline Slot: Fixed height */}
          <div className="hero-slot hero-script-slot">
            <span className="hero-script-line">{slide.scriptLine1}</span>
            <span className="hero-script-line">{slide.scriptLine2}</span>
          </div>

          {/* Decorative Divider: Fixed height */}
          <div className="hero-slot hero-divider-slot">
            <span className="hero-divider-line" />
            <span className="hero-divider-heart">♡</span>
            <span className="hero-divider-line" />
          </div>

          {/* CTA Button: Fixed width & height */}
          <div className="hero-slot hero-btn-slot">
            <a href={slide.ctaLink} className="hero-fixed-btn">
              {slide.ctaText}
            </a>
          </div>
        </div>
      </div>

      {/* Slide Navigation Arrows */}
      <button
        className="hero-arrow-btn arrow-prev"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <FiChevronLeft size={22} />
      </button>

      <button
        className="hero-arrow-btn arrow-next"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <FiChevronRight size={22} />
      </button>

      {/* Slide Indicator Dots */}
      <div className="hero-dots">
        {slidesData.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
