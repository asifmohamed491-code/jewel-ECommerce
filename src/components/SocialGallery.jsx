import React from 'react';
import { FiInstagram } from 'react-icons/fi';
import img1 from '../assets/gallery/insta-1.png';
import img2 from '../assets/gallery/insta-2.png';
import img3 from '../assets/gallery/insta-3.png';
import img4 from '../assets/gallery/insta-4.png';
import img5 from '../assets/gallery/insta-5.png';
import img6 from '../assets/gallery/insta-6.png';
import './SocialGallery.css';

const galleryImages = [
  { id: 1, src: img1, alt: 'Abusha Heart Necklace Styling' },
  { id: 2, src: img2, alt: 'Abusha Crystal Hoops Daily Wear' },
  { id: 3, src: img3, alt: 'Abusha Floral Tennis Bracelet' },
  { id: 4, src: img4, alt: 'Abusha Solitaire Ring Stack' },
  { id: 5, src: img5, alt: 'Abusha Butterfly Layered Chain' },
  { id: 6, src: img6, alt: 'Abusha Anti-Tarnish Ring & Earring Set' },
];

export default function SocialGallery() {
  return (
    <section className="social-gallery-section">
      <div className="container">
        {/* Section Heading */}
        <div className="social-header">
          <div className="section-title-wrap">
            <span className="title-line"></span>
            <h2 className="section-title">FOLLOW THE SPARKLE</h2>
            <span className="title-line"></span>
          </div>
          <a 
            href="https://www.instagram.com/abusha_creation" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="instagram-handle-link"
          >
            <FiInstagram size={14} />
            <span>@ABUSHA.CREATION</span>
          </a>
        </div>

        {/* 6 Grid items */}
        <div className="social-grid">
          {galleryImages.map((item) => (
            <div key={item.id} className="social-image-wrap">
              <img src={item.src} alt={item.alt} className="social-img" />
              <div className="social-hover-overlay">
                <FiInstagram size={20} className="social-overlay-icon" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
