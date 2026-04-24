'use client';

import React from 'react';

interface BentoGridProps {
  children: React.ReactNode;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children }) => {
  return (
    <div className="bento-grid">
      {children}
    </div>
  );
};

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  span?: number;
  style?: React.CSSProperties;
}

export const BentoItem: React.FC<BentoItemProps> = ({ children, className = '', span = 1, style = {} }) => {
  return (
    <div 
      className={`bento-item glass ${className}`}
      style={{ gridColumn: `span ${span}`, ...style }}
    >
      {children}
    </div>
  );
};

interface FlashCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
}

export const FlashCard: React.FC<FlashCardProps> = ({ front, back }) => {
  return (
    <div className="flash-card-container">
      <div className="flash-card">
        <div className="flash-card-front glass">
          {front}
        </div>
        <div className="flash-card-back glass">
          {back}
        </div>
      </div>
    </div>
  );
};
