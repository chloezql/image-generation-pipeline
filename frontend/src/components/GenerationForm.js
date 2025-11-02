import React, { useState } from 'react';
import './GenerationForm.css';

const GenerationForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    textPrompt: '',
    colors: '',
    fonts: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.textPrompt.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="generation-form-container">
      <form onSubmit={handleSubmit} className="generation-form">
        <div className="form-group">
          <label htmlFor="textPrompt">
            Text Prompt <span className="required">*</span>
          </label>
          <input
            type="text"
            id="textPrompt"
            name="textPrompt"
            value={formData.textPrompt}
            onChange={handleChange}
            placeholder="e.g., landing page for SaaS startup"
            required
            disabled={loading}
            className="form-input"
          />
          <small className="form-hint">
            Describe the design you want to generate
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="colors">Colors</label>
          <input
            type="text"
            id="colors"
            name="colors"
            value={formData.colors}
            onChange={handleChange}
            placeholder="e.g., #667eea, #764ba2, #f093fb"
            disabled={loading}
            className="form-input"
          />
          <small className="form-hint">
            Comma-separated color palette (hex codes or color names)
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="fonts">Fonts</label>
          <input
            type="text"
            id="fonts"
            name="fonts"
            value={formData.fonts}
            onChange={handleChange}
            placeholder="e.g., Montserrat, Roboto"
            disabled={loading}
            className="form-input"
          />
          <small className="form-hint">
            Comma-separated font names
          </small>
        </div>

        <button
          type="submit"
          disabled={loading || !formData.textPrompt.trim()}
          className="submit-button"
        >
          {loading ? 'Processing...' : 'Generate Images'}
        </button>
      </form>
    </div>
  );
};

export default GenerationForm;
