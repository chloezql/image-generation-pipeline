import React, { useEffect, useState } from 'react';
import './KuraOpening.css';

const KuraOpening = ({ onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const [startLetters, setStartLetters] = useState(false);

  useEffect(() => {
    // Start letters animation immediately for seamless transition
    const timer1 = setTimeout(() => {
      setStartLetters(true);
    }, 100); // Start very quickly

    // Hide after animation completes: last letter starts at 0.6s, animation takes 1.2s
    // Total: 0.6s + 1.2s = 1.8s, then wait 0.5s before transitioning
    const timer2 = setTimeout(() => {
      setIsAnimating(false); // Start fade out
    }, 2300); // Start fade out at 2.3s (1.8s animation + 0.5s hold)

    const timer3 = setTimeout(() => {
      setIsVisible(false);
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 2800); // Complete by 2.8 seconds (1.8s animation + 0.5s hold + 0.5s fade out)

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onAnimationComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`kura-opening-overlay animate-in ${!isAnimating ? 'animate-out' : ''}`}>
      <div className="kura-grid"></div>
      <div className="kura-letters">
        <img 
          src="/K.png" 
          alt="K" 
          className={`kura-letter ${startLetters ? 'animate-letter' : ''}`}
          style={{ '--delay': '0s', '--index': 0 }}
        />
        <img 
          src="/U.png" 
          alt="U" 
          className={`kura-letter ${startLetters ? 'animate-letter' : ''}`}
          style={{ '--delay': '0.2s', '--index': 1 }}
        />
        <img 
          src="/R.png" 
          alt="R" 
          className={`kura-letter ${startLetters ? 'animate-letter' : ''}`}
          style={{ '--delay': '0.4s', '--index': 2 }}
        />
        <img 
          src="/A.png" 
          alt="A" 
          className={`kura-letter ${startLetters ? 'animate-letter' : ''}`}
          style={{ '--delay': '0.6s', '--index': 3 }}
        />
      </div>
    </div>
  );
};

export default KuraOpening;
