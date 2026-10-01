import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiMenu, FiX, FiSearch, FiUser, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useScrollLock } from '../hooks/useScrollLock';
import logoImg from '../assets/logo/logo-abusha.png';
import './Header.css';

export default function Header({ 
  wishlistCount = 0, 
  cartCount = 0, 
  onOpenSearch, 
  onOpenCart,
  onOpenWishlist,
  onNavigate,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('HOME');

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Lock background scroll when mobile menu is open using shared hook
  useScrollLock(mobileMenuOpen);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (href, tabName) => {
    if (tabName) setActiveTab(tabName);
    setMobileMenuOpen(false);

    if (onNavigate && window.location.pathname !== '/') {
      onNavigate('/');
      setTimeout(() => {
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
      return;
    }

    if (href && href.startsWith('#')) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }
  };

  const handleLogoClick = (e) => {
    if (onNavigate && window.location.pathname !== '/') {
      e.preventDefault();
      onNavigate('/');
    }
  };

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'SHOP', href: '#shop' },
    { name: 'ABOUT US', href: '#about' },
  ];

  return (
    <header className={`site-header ${mobileMenuOpen ? 'mobile-menu-active' : ''}`}>
      <div className="header-container">
        {/* Left: Hamburger & Navigation Links */}
        <div className="header-left">
          <button 
            className="hamburger-btn" 
            onClick={toggleMobileMenu} 
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`nav-link ${activeTab === link.name ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href, link.name);
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Center: Brand Logo & Typography */}
        <div className="header-center">
          <a href="/" className="brand-logo-link" onClick={handleLogoClick}>
            <div className="brand-emblem-wrap">
              <img src={logoImg} alt="Abusha Creation" className="brand-emblem-img" />
            </div>
            <div className="brand-text-block">
              <span className="brand-name">ABUSHA</span>
              <span className="brand-tagline">ANTI TARNISH JEWELRY</span>
            </div>
          </a>
        </div>

        {/* Right: Utility Icons */}
        <div className="header-right">
          <button className="icon-btn search-btn" aria-label="Search" onClick={onOpenSearch}>
            <FiSearch size={19} />
          </button>
          
          <button className="icon-btn user-btn" aria-label="Account">
            <FiUser size={19} />
          </button>

          <button 
            className="icon-btn wishlist-btn" 
            aria-label="Wishlist" 
            onClick={onOpenWishlist}
          >
            <FiHeart size={19} />
            {wishlistCount > 0 && <span className="icon-badge">{wishlistCount}</span>}
          </button>

          <button className="icon-btn bag-btn" aria-label="Shopping Bag" onClick={onOpenCart}>
            <FiShoppingBag size={19} />
            {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu - Portaled to document.body to cover full viewport from top:0 */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="mobile-menu-overlay" 
          onClick={toggleMobileMenu}
          onTouchMove={(e) => {
            if (e.target === e.currentTarget) {
              e.preventDefault();
            }
          }}
        >
          <div 
            className="mobile-menu-drawer" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-header">
              <div 
                className="mobile-drawer-brand"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigate && window.location.pathname !== '/') {
                    onNavigate('/');
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <img src={logoImg} alt="Abusha" className="mobile-drawer-logo" />
                <span>ABUSHA CREATION</span>
              </div>
              <button className="close-drawer-btn" onClick={toggleMobileMenu} aria-label="Close Menu">
                <FiX size={22} />
              </button>
            </div>

            <nav className="mobile-nav-links">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`mobile-link ${activeTab === link.name ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href, link.name);
                  }}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#categories" 
                className="mobile-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#categories', 'CATEGORIES');
                }}
              >
                CATEGORIES
              </a>
              <a 
                href="#about" 
                className="mobile-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#about', 'ABOUT US');
                }}
              >
                WHY CHOOSE US
              </a>
              <a 
                href="#wishlist" 
                className="mobile-link"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  if (onOpenWishlist) onOpenWishlist();
                }}
              >
                FAVORITES / WISHLIST {wishlistCount > 0 ? `(${wishlistCount})` : ''}
              </a>
              <a 
                href="#contact" 
                className="mobile-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact', 'CONTACT');
                }}
              >
                CONTACT US
              </a>
            </nav>

            <div className="mobile-menu-footer">
              <div className="mobile-search-bar">
                <FiSearch size={16} />
                <input 
                  type="text" 
                  placeholder="Search necklaces, rings..." 
                  onFocus={() => {
                    setMobileMenuOpen(false);
                    if (onOpenSearch) onOpenSearch();
                  }}
                />
              </div>
              <div className="mobile-menu-contact">
                <p>♥ Shine Every Day with Anti-Tarnish Jewelry</p>
                <p className="contact-tel">+91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
