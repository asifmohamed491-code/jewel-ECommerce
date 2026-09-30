import React from 'react';
import { FiShield, FiHeart, FiSmile, FiFeather, FiAward } from 'react-icons/fi';
import './WhyChooseUs.css';

const reasons = [
  {
    icon: <FiShield size={26} />,
    title: 'Anti-Tarnish Jewellery',
    desc: 'Advanced physical vapour deposition coating ensures your jewellery never turns black or oxidizes.',
  },
  {
    icon: <FiAward size={26} />,
    title: 'Premium Finish',
    desc: 'Crafted with 18k gold plating standards delivering mirror-like luxury reflections.',
  },
  {
    icon: <FiHeart size={26} />,
    title: 'Skin Friendly',
    desc: '100% hypoallergenic, nickel-free, and lead-free safe for sensitive skin.',
  },
  {
    icon: <FiFeather size={26} />,
    title: 'Everyday Comfort',
    desc: 'Ultra lightweight ergonomic shapes crafted for effortless 24/7 all-day wear.',
  },
  {
    icon: <FiSmile size={26} />,
    title: 'Elegant Designs',
    desc: 'Contemporary minimalist silhouettes inspired by modern Parisian and Italian trends.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-choose-section" id="about">
      <div className="container">
        {/* Section Heading with flanking decorative lines */}
        <div className="section-title-wrap">
          <span className="title-line"></span>
          <h2 className="section-title">WHY YOU'LL LOVE ABUSHA</h2>
          <span className="title-line"></span>
        </div>

        <div className="reasons-grid">
          {reasons.map((item, index) => (
            <div key={index} className="reason-card">
              <div className="reason-icon-wrap">
                {item.icon}
              </div>
              <h3 className="reason-title">{item.title}</h3>
              <p className="reason-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
