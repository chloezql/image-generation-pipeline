import React from 'react';
import './StatusIndicator.css';

const StatusIndicator = ({ status }) => {
  if (!status || !status.status) {
    return (
      <div className="status-indicator">
        <div className="status-header">
          <span className="status-icon">⏳</span>
          <h3 className="status-title">Processing...</h3>
        </div>
      </div>
    );
  }

  const getStatusIcon = () => {
    switch (status.status) {
      case 'searching':
        return '🔍';
      case 'constructing_prompts':
        return '✍️';
      case 'generating':
        return '🎨';
      case 'completed':
        return '✅';
      case 'failed':
        return '❌';
      default:
        return '⏳';
    }
  };

  const getStatusMessage = () => {
    switch (status.status) {
      case 'searching':
        return 'Searching for reference images...';
      case 'constructing_prompts':
        return 'Constructing AI prompts from brand assets...';
      case 'generating':
        return `Generating images (${status.completedSteps || 0}/${status.totalSteps || 30})...`;
      case 'completed':
        return `Completed! Generated ${status.completedSteps || 0} images`;
      case 'failed':
        return 'Generation failed';
      default:
        return 'Processing...';
    }
  };

  const getProgressPercentage = () => {
    return status.progress || 0;
  };

  return (
    <div className="status-indicator">
      <div className="status-header">
        <span className="status-icon">{getStatusIcon()}</span>
        <h3 className="status-title">{getStatusMessage()}</h3>
      </div>
      
      {status.status !== 'completed' && status.status !== 'failed' && (
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      )}
      
      {status.errors && status.errors.length > 0 && (
        <div className="status-errors">
          {status.errors.map((error, index) => (
            <div key={index} className="error-item">
              ⚠️ {error}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;
