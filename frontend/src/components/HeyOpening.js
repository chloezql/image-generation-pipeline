import React, { useEffect, useState } from 'react';
import './HeyOpening.css';

const HeyOpening = ({ onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Animation sequence: fade in, hold, fade out
    const timer1 = setTimeout(() => {
      setIsAnimating(false); // Start fade out
    }, 1500); // Show for 1.5 seconds (faster transition)

    const timer2 = setTimeout(() => {
      setIsVisible(false); // Remove from DOM
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 2200); // Complete by 2.2 seconds (faster for seamless transition)

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onAnimationComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`hey-opening-overlay ${isAnimating ? 'animate-in' : 'animate-out'}`}>
      <div className="hey-opening-content">
        <img 
          src="/hey-opening.png" 
          alt="Hey" 
          className="hey-opening-image" 
        />
      </div>
    </div>
  );
};

export default HeyOpening;
