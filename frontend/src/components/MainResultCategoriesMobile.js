import React from 'react';
import './MainResult.css';

export default function MainResultCategoriesMobile({ categories, selectedCategory, onCategorySelect }) {
  return (
    <div className="result-header mobile">
      <div className="header-nav mobile">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`nav-item ${category.active ? 'active' : ''} mobile`}
            onClick={() => onCategorySelect(index)}
          >
            {/* <span className="nav-number">{category.id}</span> */}
            {category.name && <span className="nav-name">{category.name}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

