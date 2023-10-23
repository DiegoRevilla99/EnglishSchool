import React from 'react';
import { Link } from 'react-router-dom';

export const HeroBadge = ({ text = 'Lorem Impusm', to = '#', date = '00-00-0000' }) => {
  return (
    <div className="hero-badge">
      <div className="badge-content">
        <div className="script">{text}</div>
        <div>{date}</div>
        <Link to={to} className="link-mask"></Link>
      </div>
    </div>
  );
};
