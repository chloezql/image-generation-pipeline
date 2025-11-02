import React, { useState, useEffect } from 'react';
import './App.css';
import ResultsGrid from './components/ResultsGrid';
import StatusIndicator from './components/StatusIndicator';
import HeyOpening from './components/HeyOpening';
import KuraOpening from './components/KuraOpening';
import InitialPrompt from './components/InitialPrompt';
import MainResult from './components/MainResult';
import NotFound from './components/NotFound';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function App() {
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const [showMainResult, setShowMainResult] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [mainResultImages, setMainResultImages] = useState([]);
  const [userInputs, setUserInputs] = useState(null);
  const [showHeyOpening, setShowHeyOpening] = useState(true);
  const [showKuraOpening, setShowKuraOpening] = useState(false);
  const [showInitialPrompt, setShowInitialPrompt] = useState(false);

  // Handle scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      setScrollPosition(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Start KuraOpening slightly before hey-ending completes for seamless transition
  useEffect(() => {
    if (showHeyOpening) {
      const timer = setTimeout(() => {
        setShowKuraOpening(true); // Show KURA while hey is still animating out
      }, 1700); // Start KURA 0.5s before hey finishes (1.7s into 2.2s hey animation)

      return () => clearTimeout(timer);
    }
  }, [showHeyOpening]);

  // Poll for status updates
  const pollStatus = async (jobId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/status/${jobId}`);
      const jobStatus = response.data;

      setStatus(jobStatus);

      if (jobStatus.results) {
        setResults(jobStatus.results);
      }

      // Continue polling if not completed or failed
      if (jobStatus.status === 'searching' ||
        jobStatus.status === 'generating' ||
        jobStatus.status === 'constructing_prompts' ||
        jobStatus.status === 'initializing' ||
        jobStatus.status === 'processing') {
        setTimeout(() => pollStatus(jobId), 2000); // Poll every 2 seconds
      }
    } catch (error) {
      console.error('Error polling status:', error);
      setError('Failed to fetch job status');
    }
  };


  const handlePromptComplete = async (data) => {
    setShowLoading(true);
    setError(null);
    setResults([]);
    setStatus({
      status: 'searching',
      progress: 0,
      completedSteps: 0,
      totalSteps: 30
    });
    setShowNotFound(false);

    try {
      const textPrompt = data.textPrompt || '';

      console.log('Text prompt:', textPrompt);

      // Always proceed - let backend decide if it can handle the prompt

      const formDataToSend = new FormData();
      formDataToSend.append('textPrompt', textPrompt);

      // Add colors
      if (data.colors && data.colors.length > 0) {
        formDataToSend.append('colors', data.colors.join(', '));
      }

      // Add fonts
      if (data.font) {
        formDataToSend.append('fonts', data.font);
      }

      // Add logo if uploaded
      if (data.logo) {
        formDataToSend.append('logo', data.logo);
      }

      // Add reference images if uploaded
      if (data.referenceImages && data.referenceImages.length > 0) {
        data.referenceImages.forEach((img, idx) => {
          formDataToSend.append(`reference${idx}`, img);
        });
      }

      // Add aesthetic images if uploaded
      if (data.aestheticImages && data.aestheticImages.length > 0) {
        data.aestheticImages.forEach((img, idx) => {
          formDataToSend.append(`aesthetic${idx}`, img);
        });
      }

      const response = await axios.post(`${API_BASE_URL}/api/generate`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const newJobId = response.data.jobId;
      setJobId(newJobId);

      // Poll for status and show main result when complete
      const checkComplete = setInterval(async () => {
        try {
          const statusResponse = await axios.get(`${API_BASE_URL}/api/status/${newJobId}`);
          const jobStatus = statusResponse.data;

          // Update status for UI
          setStatus(jobStatus);

          if (jobStatus.status === 'completed') {
            clearInterval(checkComplete);

            console.log('Job completed, status:', jobStatus.status);
            console.log('Results count:', jobStatus.results?.length || 0);
            console.log('First few results:', jobStatus.results?.slice(0, 2));

            if (jobStatus.results && jobStatus.results.length > 0) {
              console.log('Mapping results to images...');
              // Map results to images, fixing URL encoding
              const images = jobStatus.results.map(img => {
                // Get the URL from the result
                let url = img.generated_image_url || img.url;

                // If it's a Training Images path, ensure proper URL encoding
                if (url && url.includes('Training Images')) {
                  // URL should be: /Training Images/Landing Page/filename
                  // We only need to encode the filename, not the folder names
                  const parts = url.split('/');
                  const filename = parts.pop(); // Get filename
                  const folderPath = parts.join('/'); // Get folder path

                  // Encode only the filename
                  const encodedFilename = encodeURIComponent(filename);
                  url = `${folderPath}/${encodedFilename}`;
                }

                return {
                  url: url,
                  aspectRatio: '4/3'
                };
              });

              console.log('Showing main result with', images.length, 'images');
              console.log('First image URL:', images[0]?.url);
              setMainResultImages(images);
              setUserInputs(data); // Store user inputs for dock display
              setShowLoading(false);
              setShowMainResult(true);
            } else {
              // No results found
              console.log('No results found, showing 404');
              setShowLoading(false);
              setShowNotFound(true);
            }
          } else if (jobStatus.status === 'failed') {
            clearInterval(checkComplete);
            setShowLoading(false);
            setShowNotFound(true);
          }
        } catch (error) {
          console.error('Error checking status:', error);
          clearInterval(checkComplete);
          setShowLoading(false);
          setShowNotFound(true);
        }
      }, 1000);

    } catch (error) {
      console.error('Error starting generation:', error);
      setShowLoading(false);
      setShowNotFound(true);
    }
  };

  const handleBackToForm = () => {
    setShowNotFound(false);
    setShowMainResult(false);
    setShowLoading(false);
  };

  const handleRegenerate = async (newPrompt) => {
    setShowLoading(true);
    setError(null);
    setResults([]);
    setStatus(null);
    setShowNotFound(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('textPrompt', newPrompt);

      if (userInputs.colors && userInputs.colors.length > 0) {
        formDataToSend.append('colors', userInputs.colors.join(', '));
      }

      if (userInputs.font) {
        formDataToSend.append('fonts', userInputs.font);
      }

      if (userInputs.logo) {
        formDataToSend.append('logo', userInputs.logo);
      }

      if (userInputs.referenceImages && userInputs.referenceImages.length > 0) {
        userInputs.referenceImages.forEach((img, idx) => {
          formDataToSend.append(`reference${idx}`, img);
        });
      }

      if (userInputs.aestheticImages && userInputs.aestheticImages.length > 0) {
        userInputs.aestheticImages.forEach((img, idx) => {
          formDataToSend.append(`aesthetic${idx}`, img);
        });
      }

      const response = await axios.post(`${API_BASE_URL}/api/generate`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const newJobId = response.data.jobId;
      setJobId(newJobId);

      // Poll for status and update results
      const checkComplete = setInterval(async () => {
        try {
          const statusResponse = await axios.get(`${API_BASE_URL}/api/status/${newJobId}`);
          const jobStatus = statusResponse.data;

          setStatus(jobStatus);

          if (jobStatus.status === 'completed') {
            clearInterval(checkComplete);

            console.log('Job completed, status:', jobStatus.status);
            console.log('Results count:', jobStatus.results?.length || 0);
            console.log('First few results:', jobStatus.results?.slice(0, 2));

            if (jobStatus.results && jobStatus.results.length > 0) {
              console.log('Mapping results to images...');
              // Map results to images, fixing URL encoding
              const images = jobStatus.results.map(img => {
                // Get the URL from the result
                let url = img.generated_image_url || img.url;

                // If it's a Training Images path, ensure proper URL encoding
                if (url && url.includes('Training Images')) {
                  // URL should be: /Training Images/Landing Page/filename
                  // We only need to encode the filename, not the folder names
                  const parts = url.split('/');
                  const filename = parts.pop(); // Get filename
                  const folderPath = parts.join('/'); // Get folder path

                  // Encode only the filename
                  const encodedFilename = encodeURIComponent(filename);
                  url = `${folderPath}/${encodedFilename}`;
                }

                return {
                  url: url,
                  aspectRatio: '4/3'
                };
              });

              console.log('Showing main result with', images.length, 'images');
              console.log('First image URL:', images[0]?.url);
              setMainResultImages(images);
              setShowLoading(false);
              setShowMainResult(true);
            } else {
              // No results found
              console.log('No results found, showing 404');
              setShowLoading(false);
              setShowNotFound(true);
            }
          } else if (jobStatus.status === 'failed') {
            clearInterval(checkComplete);
            setShowLoading(false);
            setShowNotFound(true);
          }
        } catch (error) {
          console.error('Error checking status:', error);
          clearInterval(checkComplete);
          setShowLoading(false);
          setShowNotFound(true);
        }
      }, 1000);

    } catch (error) {
      console.error('Error regenerating:', error);
      setShowLoading(false);
      setShowNotFound(true);
    }
  };


  const handleSubmit = async (formData) => {
    setError(null);
    setResults([]);
    setStatus(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('textPrompt', formData.textPrompt);
      if (formData.colors) {
        formDataToSend.append('colors', formData.colors);
      }
      if (formData.fonts) {
        formDataToSend.append('fonts', formData.fonts);
      }

      const response = await axios.post(`${API_BASE_URL}/api/generate`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const newJobId = response.data.jobId;
      setJobId(newJobId);

      // Start polling for status
      pollStatus(newJobId);

    } catch (error) {
      console.error('Error submitting generation:', error);
      setError(error.response?.data?.error || 'Failed to start generation');
    }
  };

  // Calculate which animation phase we're in based on scroll
  // Phase 0: Hey Opening (scroll 0-200vh)
  // Phase 1: KURA Opening (scroll 200vh-400vh)  
  // Phase 2: Grid fade (scroll 400vh-500vh)
  // Phase 3: Form appears (scroll 500vh+)

  if (showMainResult) {
    return (
      <div className="App">
        <MainResult
          images={mainResultImages}
          userInputs={userInputs}
          onRegenerate={handleRegenerate}
        />
      </div>
    );
  }

  if (showLoading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <StatusIndicator status={status} />
        </div>
      </div>
    );
  }

  if (showNotFound) {
    return (
      <div className="App">
        <NotFound onBack={handleBackToForm} />
      </div>
    );
  }

  const handleHeyAnimationComplete = () => {
    setShowHeyOpening(false);
  };

  const handleKuraAnimationComplete = () => {
    setShowKuraOpening(false);
    setShowInitialPrompt(true);
  };

  if (showMainResult) {
    return (
      <div className="App">
        <MainResult
          images={mainResultImages}
          userInputs={userInputs}
          onRegenerate={handleRegenerate}
        />
      </div>
    );
  }

  if (showLoading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <StatusIndicator status={status} />
        </div>
      </div>
    );
  }

  if (showNotFound) {
    return (
      <div className="App">
        <NotFound onBack={handleBackToForm} />
      </div>
    );
  }

  return (
    <div className="App">
      {showHeyOpening && <HeyOpening onAnimationComplete={handleHeyAnimationComplete} />}
      {showKuraOpening && <KuraOpening onAnimationComplete={handleKuraAnimationComplete} />}

      {showInitialPrompt && (
        <InitialPrompt onComplete={handlePromptComplete} />
      )}
    </div>
  );
}

export default App;
