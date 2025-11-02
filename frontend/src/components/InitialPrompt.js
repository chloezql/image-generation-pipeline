import React, { useState, useEffect } from 'react';
import './InitialPrompt.css';

const InitialPrompt = ({ onComplete }) => {
  const [activeLine, setActiveLine] = useState(1);
  
  // State for each input
  const [referenceImages, setReferenceImages] = useState([]);
  const [logo, setLogo] = useState(null);
  const [selectedFont, setSelectedFont] = useState('');
  const [colors, setColors] = useState([]);
  const [aestheticImages, setAestheticImages] = useState([]);
  const [textPrompt, setTextPrompt] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [showFontDropdown, setShowFontDropdown] = useState(false);

  const fonts = ['Roboto', 'Montserrat', 'Open Sans', 'Inter', 'Lato', 'Poppins', 'Playfair Display', 'Source Sans Pro'];

  const handleImageUpload = (e, type) => {
    const files = Array.from(e.target.files);
    if (type === 'reference') {
      setReferenceImages([...referenceImages, ...files]);
    } else if (type === 'aesthetic') {
      setAestheticImages([...aestheticImages, ...files]);
    } else if (type === 'logo') {
      setLogo(files[0]);
    }
    // Auto-advance to next line
    setActiveLine(Math.min(activeLine + 1, 6));
  };

  const handleFontSelect = (font) => {
    setSelectedFont(font);
    setShowFontDropdown(false);
    // Auto-advance to next line
    setActiveLine(Math.min(activeLine + 1, 6));
  };

  const handleColorAdd = (color) => {
    setColors([...colors, color]);
    setShowColorPicker(false);
    // Don't auto-advance for colors (user might want to add multiple)
  };

  const handleColorRemove = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleTextPromptChange = (e) => {
    setTextPrompt(e.target.value);
  };

  const handleLineClick = (lineNumber) => {
    setActiveLine(lineNumber);
  };

  const handleNextLine = () => {
    setActiveLine(Math.min(activeLine + 1, 6));
  };

  const handleComplete = () => {
    if (textPrompt.trim()) {
      const data = {
        referenceImages,
        logo,
        font: selectedFont,
        colors,
        aestheticImages,
        textPrompt
      };
      onComplete(data);
    }
  };

  return (
    <div className="initial-prompt-container">
      <div className="initial-prompt-header">
        <img src="/KURA-logo.png" alt="KURA Logo" className="kura-logo" />
      </div>

      <div className="prompt-lines-wrapper">
        <div className="prompt-lines">
        {/* Line 1: Reference Images */}
        <div 
          className={`prompt-line ${activeLine === 1 ? 'active' : 'inactive'}`}
          onClick={() => handleLineClick(1)}
        >
          <div className="prompt-text">
            We have / like 
            <input
              type="file"
              id="file-input-ref"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'reference')}
              className="file-input"
            />
            <label htmlFor="file-input-ref">
              <span className="clickable-text">[those visuals]</span>
            </label>
            {referenceImages.length > 0 && (
              <div className="image-previews">
                {referenceImages.map((img, idx) => (
                  <div key={idx} className="image-preview">
                    <img src={URL.createObjectURL(img)} alt={`Reference ${idx + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Line 2: Logo Upload */}
        <div 
          className={`prompt-line ${activeLine === 2 ? 'active' : 'inactive'}`}
          onClick={() => handleLineClick(2)}
        >
          <div className="prompt-text">
            and logo 
            <input
              type="file"
              id="file-input-logo"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'logo')}
              className="file-input"
            />
            <label htmlFor="file-input-logo">
              <span className="clickable-text">[landing pages ideas]</span>
            </label>
            {logo && (
              <div className="image-preview">
                <img src={URL.createObjectURL(logo)} alt="Logo" />
              </div>
            )}
          </div>
        </div>

        {/* Line 3: Font Selection */}
        <div 
          className={`prompt-line ${activeLine === 3 ? 'active' : 'inactive'}`}
          onClick={() => handleLineClick(3)}
        >
          <div className="prompt-text">
            with typography style <span className="clickable-text">[{selectedFont || 'A A A'}]</span>
          </div>
          {activeLine === 3 && (
            <div style={{ position: 'absolute', right: '0', top: '100%', zIndex: 10 }}>
              {showFontDropdown && (
                <div className="dropdown-menu">
                  {fonts.map((font) => (
                    <div
                      key={font}
                      className="dropdown-item"
                      onClick={() => handleFontSelect(font)}
                    >
                      {font}
                    </div>
                  ))}
                </div>
              )}
              <div className="dropdown-trigger" onClick={(e) => {
                e.stopPropagation();
                setShowFontDropdown(!showFontDropdown);
              }}>
                {selectedFont || 'A A A'}
              </div>
            </div>
          )}
        </div>

        {/* Line 4: Colors */}
        <div 
          className={`prompt-line ${activeLine === 4 ? 'active' : 'inactive'}`}
          onClick={() => handleLineClick(4)}
        >
          <div className="prompt-text">
            and colors
            {activeLine === 4 && (
              <>
                <input
                  type="color"
                  id="color-input-hidden"
                  onChange={(e) => {
                    handleColorAdd(e.target.value);
                    // Reset the input
                    e.target.value = '#000000';
                  }}
                  className="color-input-hidden"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  className="add-color-btn-trigger"
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById('color-input-hidden').click();
                  }}
                >
                  +
                </button>
              </>
            )}
            <div className="color-picker-container">
              {colors.map((color, idx) => (
                <div key={idx} className="color-swatch">
                  <div
                    className="color-circle"
                    style={{ backgroundColor: color }}
                  />
                  <button
                    className="remove-color"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleColorRemove(idx);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line 5: Aesthetic Images */}
        <div 
          className={`prompt-line ${activeLine === 5 ? 'active' : 'inactive'}`}
          onClick={() => handleLineClick(5)}
        >
          <div className="prompt-text">
            the aesthetic we prefer is
            <input
              type="file"
              id="file-input-aes"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'aesthetic')}
              className="file-input"
            />
            <label htmlFor="file-input-aes">
              <span className="clickable-text">[clean and modern]</span>
            </label>
            {aestheticImages.length > 0 && (
              <div className="image-previews">
                {aestheticImages.map((img, idx) => (
                  <div key={idx} className="image-preview">
                    <img src={URL.createObjectURL(img)} alt={`Aesthetic ${idx + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Line 6: Text Prompt */}
        <div 
          className={`prompt-line ${activeLine === 6 ? 'active' : 'inactive'}`}
          onClick={() => handleLineClick(6)}
        >
          <div className="prompt-text">
            We need <span className="clickable-text">[landing pages ideas]</span>
            {activeLine === 6 && (
              <input
                type="text"
                value={textPrompt}
                onChange={handleTextPromptChange}
                placeholder="landing pages ideas"
                className="text-input"
              />
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Next/Generate Button */}
      <div className="prompt-footer">
        {activeLine === 6 ? (
          <button 
            className="generate-button"
            onClick={handleComplete}
            disabled={!textPrompt.trim()}
          >
            Generate
          </button>
        ) : (
          <button 
            className="next-button"
            onClick={handleNextLine}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default InitialPrompt;
