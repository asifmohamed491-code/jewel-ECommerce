import React from 'react';
import { FiShield, FiHeart } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { IoWaterOutline, IoDiamondOutline } from 'react-icons/io5';
import './FeatureStrip.css';

const features = [
  {
    id: 1,
    icon: <FiShield className="feature-icon" />,
    title: 'ANTI-TARNISH',
    subtitle: 'Does not turn black',
  },
  {
    id: 2,
    icon: <HiOutlineSparkles className="feature-icon" />,
    title: 'LONG LASTING SHINE',
    subtitle: 'Looks new always',
  },
  {
    id: 3,
    icon: <IoWaterOutline className="feature-icon" />,
    title: 'WATER & SWEAT',
    subtitle: 'RESISTANT',
  },
  {
    id: 4,
    icon: <FiHeart className="feature-icon" />,
    title: 'EVERYDAY WEAR',
    subtitle: 'Jewellery',
  },
  {
    id: 5,
    icon: <IoDiamondOutline className="feature-icon" />,
    title: 'PREMIUM QUALITY',
    subtitle: 'You can trust',
  },
];

export default function FeatureStrip() {
  return (
    <div className="feature-strip-wrap">
      <div className="feature-strip-container">
        {features.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="feature-item">
              <div className="feature-icon-box">{item.icon}</div>
              <div className="feature-text">
                <span className="feature-title">{item.title}</span>
                <span className="feature-subtitle">{item.subtitle}</span>
              </div>
            </div>
            {index < features.length - 1 && <div className="feature-divider" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
