import React from 'react';
import './MainResult.css';

export default function MainResultFooterMobile({
  userData,
  icons,
  selectedIcon,
  selectedContent,
  editablePrompt,
  setEditablePrompt,
  onIconClick,
  onGenerate,
  onLogoUpload,
  onAestheticUpload,
  onNeedUpload,
  hoveredIcon,
  setHoveredIcon
}) {
  return (
    <div className="result-footer mobile">
      <div className="footer-left">
        {/* Logo */}
        <div className="footer-item-large" onClick={onLogoUpload}>
          <div className="footer-thumbnail-container">
            {userData.logo ? (
              <img
                src={typeof userData.logo === 'string' ? userData.logo : URL.createObjectURL(userData.logo)}
                alt="Logo"
                className="footer-thumbnail"
              />
            ) : (
              <div className="footer-placeholder">LOGO</div>
            )}
          </div>
          <span className="footer-label">LOGO</span>
        </div>

        {/* AESTHETIC */}
        <div className="footer-item-large" onClick={onAestheticUpload}>
          <div className="footer-thumbnails-row">
            {userData.aestheticImages && userData.aestheticImages.length > 0 ? (
              userData.aestheticImages.slice(0, 3).map((img, idx) => (
                <img
                  key={idx}
                  src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                  alt={`Aesthetic ${idx}`}
                  className="footer-thumbnail-small"
                  style={{ transform: `rotate(${idx * 5}deg)` }}
                />
              ))
            ) : (
              <div className="footer-placeholder">AESTHETIC</div>
            )}
          </div>
          <span className="footer-label">AESTHETIC</span>
        </div>

        {/* NEED */}
        <div className="footer-item-large" onClick={onNeedUpload}>
          <div className="footer-thumbnails-row">
            {userData.referenceImages && userData.referenceImages.length > 0 ? (
              userData.referenceImages.slice(0, 2).map((img, idx) => (
                <img
                  key={idx}
                  src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                  alt={`Reference ${idx}`}
                  className="footer-thumbnail-small"
                  style={{ transform: `rotate(${idx * -5}deg)` }}
                />
              ))
            ) : (
              <div className="footer-placeholder">NEED</div>
            )}
          </div>
          <span className="footer-label">NEED</span>
        </div>
      </div>

      {/* Middle: Selected content */}
      <div className="footer-middle">
        {selectedContent && selectedContent.id === 'search' ? (
          <div className="footer-info">
            <span className="footer-info-label">{selectedContent.label}</span>
            <input
              type="text"
              value={editablePrompt}
              onChange={(e) => setEditablePrompt(e.target.value)}
              className="prompt-input"
            />
          </div>
        ) : selectedContent && selectedContent.id === 'color' && userData.colors && userData.colors.length > 0 ? (
          <div className="footer-info">
            <span className="footer-info-label">{selectedContent.label}</span>
            <div className="color-dots">
              {userData.colors.map((color, idx) => (
                <span key={idx} className="dot" style={{ background: color }}></span>
              ))}
            </div>
          </div>
        ) : selectedContent ? (
          <div className="footer-info">
            <span className="footer-info-label">{selectedContent.label}</span>
            <span className="footer-info-value">{selectedContent.value}</span>
          </div>
        ) : null}
      </div>

      {/* Right: Icons and Generate button */}
      <div className="footer-right">
        <div className="footer-icons-container">
          {icons.map((icon, index) => (
            <div
              key={icon.id}
              className={`footer-icon-wrapper ${selectedIcon === index ? 'active' : ''}`}
              onMouseEnter={() => setHoveredIcon(index)}
              onMouseLeave={() => setHoveredIcon(null)}
              onClick={() => onIconClick(icon)}
            >
              <img
                src={icon.icon}
                alt={icon.tooltip}
                className="footer-icon-img"
              />
              {selectedIcon === index && (
                <div className="icon-dot"></div>
              )}
              {hoveredIcon === index && (
                <div className="icon-tooltip">{icon.tooltip}</div>
              )}
            </div>
          ))}
        </div>
        <button className="footer-generate-btn" onClick={onGenerate}>
          Generate
        </button>
      </div>
    </div>
  );
}

