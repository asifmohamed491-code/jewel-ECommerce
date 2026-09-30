import React from 'react';
import './AnnouncementBar.css';

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="announcement-content">
        <span className="heart-icon">♥</span>
        <span className="announcement-text">
          Shine Every Day <span className="separator">|</span> Anti Tarnish <span className="separator">|</span> Long Lasting Beauty
        </span>
        <span className="heart-icon">♥</span>
      </div>
    </div>
  );
}
