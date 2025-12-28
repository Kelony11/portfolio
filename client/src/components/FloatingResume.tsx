import { useState } from 'react';
import './FloatingResume.css';

const FloatingResume = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div 
        className="floating-resume"
        onClick={handleClick}
        role="button"
        aria-label="View Resume"
      >
        <div className="resume-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
        <div className="resume-label">
          Resume
        </div>
      </div>

      {isOpen && (
        <div className="resume-modal" onClick={handleClose}>
          <div className="resume-viewer" onClick={(e) => e.stopPropagation()}>
            <div className="resume-header">
              <h3>My Resume</h3>
              <button className="close-btn" onClick={handleClose} aria-label="Close resume">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            <div className="pdf-container">
              <embed
                src="/Resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
                type="application/pdf"
                className="pdf-embed"
              />
            </div>
            
            <a 
              href="/Resume.pdf" 
              download 
              className="download-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingResume;