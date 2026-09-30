import React, { useState } from 'react';
import { FiInstagram, FiFacebook } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import logoImg from '../assets/logo/logo-abusha.png';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="site-footer" id="contact">
      {/* Upper Main Footer Grid */}
      <div className="footer-top-wrap">
        <div className="container">
          <div className="footer-grid">
            {/* Col 1: Brand Info */}
            <div className="footer-col brand-col">
              <div className="footer-brand">
                <div className="footer-logo-wrap">
                  <img src={logoImg} alt="Abusha Logo" className="footer-logo-img" />
                </div>
                <div className="footer-brand-title">
                  <span className="footer-brand-name">ABUSHA</span>
                  <span className="footer-brand-tag">ANTI TARNISH JEWELRY</span>
                </div>
              </div>
              <p className="footer-about-text">
                Crafting luxury anti-tarnish everyday jewelry designed to never fade, turn black, or lose its golden luster.
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div className="footer-col">
              <h4 className="footer-heading">QUICK LINKS</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#shop">Shop</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            {/* Col 3: Customer Care */}
            <div className="footer-col">
              <h4 className="footer-heading">CUSTOMER CARE</h4>
              <ul className="footer-links">
                <li><a href="#shipping">Shipping & Delivery</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* Col 4: Newsletter */}
            <div className="footer-col newsletter-col">
              <h4 className="footer-heading">NEWSLETTER</h4>
              <p className="newsletter-desc">Get updates on new arrivals & offers</p>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address for newsletter"
                  required
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  {subscribed ? 'JOINED ✓' : 'SUBSCRIBE'}
                </button>
              </form>
              {subscribed && <p className="newsletter-success">Thank you for joining our sparkle family!</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Lower Footer Strip */}
      <div className="footer-bottom-strip">
        <div className="container footer-strip-container">
          {/* Social Media Links */}
          <div className="strip-social-area">
            <span className="strip-social-label">CONNECT WITH US</span>
            <div className="strip-social-links">
              <a href="https://www.instagram.com/abusha_creation" target="_blank" rel="noopener noreferrer" className="strip-social-link" aria-label="Instagram">
                <FiInstagram size={17} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="strip-social-link" aria-label="Facebook">
                <FiFacebook size={17} />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="strip-social-link" aria-label="WhatsApp">
                <FaWhatsapp size={17} />
              </a>
            </div>
          </div>

          <div className="strip-divider" />

          {/* Signature Thank-You Note */}
          <div className="strip-thankyou-area">
            <span className="thankyou-script">Thank you</span>
            <span className="thankyou-caps">FOR SUPPORTING ABUSHA CREATION</span>
            <span className="thankyou-heart">♡</span>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="footer-copyright-bar">
        <p>© {new Date().getFullYear()} ABUSHA CREATION. All Rights Reserved. Crafted with love for anti-tarnish elegance.</p>
      </div>
    </footer>
  );
}
