import React, { useState } from 'react';
import './ResultsGrid.css';

const ResultsGrid = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const downloadImage = (imageUrl, filename) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="results-grid-container">
      <h2 className="results-title">
        Generated Images ({images.length})
      </h2>
      
      <div className="results-grid">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="grid-item"
            onClick={() => handleImageClick(image)}
          >
            <img 
              src={image.generated_image_url} 
              alt={`Generated ${index + 1}`}
              className="grid-image"
            />
            <div className="grid-overlay">
              <div className="grid-info">
                <p className="grid-index">#{index + 1}</p>
                {image.metadata?.style && (
                  <p className="grid-style">{image.metadata.style}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <img 
              src={selectedImage.generated_image_url} 
              alt="Generated image"
              className="modal-image"
            />
            <div className="modal-actions">
              <button 
                className="modal-download"
                onClick={() => downloadImage(
                  selectedImage.generated_image_url, 
                  `generated-${Date.now()}.jpg`
                )}
              >
                Download
              </button>
              {selectedImage.prompt && (
                <div className="modal-prompt">
                  <strong>Prompt:</strong> {selectedImage.prompt}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsGrid;
