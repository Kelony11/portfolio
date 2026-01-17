import { useState, type ChangeEvent, type FormEvent } from 'react';
import './FloatingFeedback.css';

const API_URL = import.meta.env.VITE_API_URL;

const FloatingFeedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    feedbackType: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    feedbackType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSubmitSuccess(false);
    setSubmitError(null);
    setFormData({ feedbackType: '', message: '' });
    setErrors({ feedbackType: '', message: '' });
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error as user types
    if (name in errors) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = { feedbackType: '', message: '' };
    let isValid = true;

    if (!formData.feedbackType) {
      newErrors.feedbackType = 'Please select a feedback type';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide your feedback';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {

      const payload = {
        ...formData,
      };
      
      // Replace with actual API call
      const res = await fetch(`${API_URL}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || 'Failed to send feedback');
      }

      setSubmitSuccess(true);
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        handleClose();
      }, 2000);
      
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setSubmitError(message);
    } finally {
        setIsSubmitting(false);
    }
  };

  const isFormValid = formData.feedbackType && formData.message.trim();

  return (
    <>
      <div 
        className="floating-feedback"
        onClick={handleOpen}
        role="button"
        aria-label="Send Feedback"
      >
        <div className="feedback-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </div>
        <div className="feedback-label">
          Feedback
        </div>
      </div>

      {isOpen && (
        <div className="feedback-modal">
          <div className="feedback-viewer">
            <div className="feedback-header">
              <h3>Send Feedback</h3>
              <button className="close-btn" onClick={handleClose} aria-label="Close feedback">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {submitSuccess ? (
              <div className="feedback-success">
                <div className="success-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <p>Thank you for your feedback!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="feedback-form">
                <div className="form-group">
                  <label htmlFor="feedbackType">Feedback Type</label>
                  <select
                    id="feedbackType"
                    name="feedbackType"
                    value={formData.feedbackType}
                    onChange={handleChange}
                    className={errors.feedbackType ? 'error' : ''}
                  >
                    <option value="" disabled hidden>Select feedback type</option>
                    <option value="bug">Report a Bug</option>
                    <option value="feature">Suggest a Feature</option>
                    <option value="general">Leave a Comment</option>
                  </select>
                  {errors.feedbackType && (
                    <span className="error-message">{errors.feedbackType}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Feedback</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Describe your feedback..."
                    className={errors.message ? 'error' : ''}
                  />
                  {errors.message && (
                    <span className="error-message">{errors.message}</span>
                  )}
                </div>

                {submitError && (
                  <p className="error-message">{submitError}</p>
                )}

                <button 
                  type="submit" 
                  className="submit-btn" 
                  disabled={isSubmitting || !isFormValid}
                >
                  {isSubmitting ? 'Sending...' : 'Send Feedback'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingFeedback;