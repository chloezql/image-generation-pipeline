import React, { useState, useEffect } from 'react';
import './MainResult.css';
import ImageZoomOverlay from './ImageZoomOverlay';

const MainResult = ({ images, onBack, userInputs, onRegenerate }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState(1); // font-icon is selected by default
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [zoomImageUrl, setZoomImageUrl] = useState(null);

  const categories = [
    { id: '001', name: 'Name Kura', active: true },
    { id: '002', name: '', active: false },
    { id: '003', name: '', active: false },
    { id: '004', name: '', active: false },
    { id: '005', name: '', active: false },
    { id: '006', name: '', active: false },
  ];

  // Get user inputs for the dock
  const userData = userInputs || {
    logo: null,
    referenceImages: [],
    aestheticImages: [],
    uploads: images?.length || 0,
    aesthetic: '',
    need: '',
    font: 'Roboto',
    colors: [],
    textPrompt: 'landing pages ideas'
  };

  const [selectedContent, setSelectedContent] = useState(null);
  const [editablePrompt, setEditablePrompt] = useState(userData.textPrompt || 'landing pages ideas');

  const icons = [
    { id: 'color', icon: '/color-icon.png', tooltip: 'Colors', label: 'COLORS', value: userData.colors ? userData.colors.join(', ') : '' },
    { id: 'font', icon: '/font-icon.png', tooltip: 'Font', label: 'FONT', value: userData.font || 'Roboto' },
    { id: 'search', icon: '/search-icon.png', tooltip: 'Prompt', label: 'PROMPT', value: editablePrompt },
  ];

  // Set default selected content on mount
  React.useEffect(() => {
    setSelectedContent(icons[1]); // Default to FONT
  }, []);

  // Trigger staggered image load animations
  useEffect(() => {
    setLoadedImages(new Set()); // Reset on new images
    if (images && images.length > 0) {
      images.forEach((_, index) => {
        setTimeout(() => {
          setLoadedImages(prev => new Set([...prev, index]));
        }, index * 50); // 50ms delay between each image
      });
    }
  }, [images]);


  // Generate mock image data with specific figma ratios to fill grid properly
  const displayImages = images && images.length > 0 ? images.map((img, index) => {
    // Use 3 specific aspect ratios from figma: 362x180, 357x301, 313x301
    // Rotate the ratios for each row so each column gets variety
    const rowIndex = Math.floor(index / 3); // Which row (0, 1, 2...)
    const colIndex = index % 3; // Position in row (0, 1, 2)
    // Shift the ratio based on row and column for variety
    const ratioType = (rowIndex + colIndex) % 3;

    let aspectRatio;

    switch (ratioType) {
      case 0:
        aspectRatio = '362/180'; // Wide landscape (2:1)
        break;
      case 1:
        aspectRatio = '357/301'; // Portrait (1.19:1)
        break;
      case 2:
        aspectRatio = '313/301'; // Almost square (1.04:1)
        break;
      default:
        aspectRatio = '4/3';
    }

    return {
      ...img,
      aspectRatio
    };
  }) : [];


  const handleLogoUpload = () => {
    // TODO: Implement logo upload
    console.log('Logo upload clicked');
  };

  const handleAestheticUpload = () => {
    // TODO: Implement aesthetic upload
    console.log('Aesthetic upload clicked');
  };

  const handleNeedUpload = () => {
    // TODO: Implement need upload
    console.log('Need upload clicked');
  };

  const handleIconClick = (icon) => {
    setSelectedIcon(icons.findIndex(i => i.id === icon.id));
    setSelectedContent(icon);
  };

  const handleGenerate = async () => {
    // Use editablePrompt if it's been changed, otherwise use the original
    const promptValue = editablePrompt;
    if (promptValue && onRegenerate) {
      // Call parent function to regenerate with the current or edited prompt
      await onRegenerate(promptValue);
      // Update userData with new prompt
      userData.textPrompt = promptValue;
    } else {
      // Fallback: reload page
      window.location.reload();
    }
  };

  return (
    <div className="main-result-container">
      {/* Logo */}
      <div className="result-logo">
        <img src="/KURA-logo.png" alt="KURA Logo" />
      </div>

      {/* Header Navigation */}
      <div className="result-header">
        <div className="header-nav">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`nav-item ${category.active ? 'active' : ''}`}
              onClick={() => setSelectedCategory(index)}
            >
              <span className="nav-number">{category.id}</span>
              {category.name && <span className="nav-name">{category.name}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid with Masonry Layout */}
      <div className="result-grid">
        {/* Create 3 columns for masonry effect */}
        {[0, 1, 2].map((colIndex) => (
          <div key={colIndex} className="result-grid-column">
            {displayImages.map((image, index) => {
              // Distribute images across columns in a row-by-row pattern
              // So each row has different sizes: index 0,1,2 go to columns 0,1,2
              // Then index 3,4,5 go to columns 0,1,2 again, etc.
              const columnToRender = index % 3;
              if (columnToRender === colIndex) {
                return (
                  <div
                    key={index}
                    className={`grid-card ${loadedImages.has(index) ? 'loaded' : ''}`}
                    style={{ aspectRatio: image.aspectRatio }}
                  >
                    <img
                      src={image.url}
                      alt={`Result ${index}`}
                      onClick={() => setZoomImageUrl(image.url)}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>

      {zoomImageUrl && (
        <ImageZoomOverlay imageUrl={zoomImageUrl} onClose={() => setZoomImageUrl(null)} />
      )}

      {/* Footer Dock */}
      <div className="result-footer">
        <div className="footer-left">
          {/* Logo */}
          <div className="footer-item-large" onClick={handleLogoUpload}>
            <div className="footer-thumbnail-container">
              {userData.logo ? (
                <img
                  src={URL.createObjectURL(userData.logo)}
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
          <div className="footer-item-large" onClick={handleAestheticUpload}>
            <div className="footer-thumbnails-row">
              {userData.aestheticImages && userData.aestheticImages.length > 0 ? (
                userData.aestheticImages.slice(0, 3).map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
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
          <div className="footer-item-large" onClick={handleNeedUpload}>
            <div className="footer-thumbnails-row">
              {userData.referenceImages && userData.referenceImages.length > 0 ? (
                userData.referenceImages.slice(0, 2).map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
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
                onClick={() => handleIconClick(icon)}
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
          <button className="footer-generate-btn" onClick={handleGenerate}>
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainResult;


