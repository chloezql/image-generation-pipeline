import React from 'react';
import './NotFound.css';

const NotFound = ({ onBack }) => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">No Results Found</h2>
        <p className="not-found-description">
          We couldn't find any results matching your search.
        </p>
        <button className="not-found-button" onClick={onBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;

