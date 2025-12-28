import { useState } from 'react';
import './FloatingResume.css';

const FloatingResume = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
    // Open resume in new tab (you'll need to add your actual resume PDF)
    window.open('/resume.pdf', '_blank');
    
    // Close the modal after a short delay
    setTimeout(() => setIsOpen(false), 300);
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
          📄
        </div>
        <div className="resume-label">
          Resume
        </div>
      </div>

      {isOpen && (
        <div className="resume-modal" onClick={() => setIsOpen(false)}>
          <div className="resume-content">
            <p>Opening resume...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingResume;