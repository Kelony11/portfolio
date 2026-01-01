import { useState, type ChangeEvent, type FormEvent } from "react";
import "./SectionContent.css";
import { Turnstile } from "@marsidev/react-turnstile";

const API_URL = import.meta.env.VITE_API_URL;
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    phoneType: "",
    message: "",
    wantsReply: "yes",
    company: "", // honeypot trap for bots
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // ✅ Day 4: Turnstile token
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // ✅ Day 3/4 UX states (single source of truth)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear field error as user edits
    if (name in errors) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSubmitError(null);
    setSubmitSuccess(null);

    if (!validateForm()) return;

    // ✅ Day 4: require Turnstile before sending
    if (!turnstileToken) {
      setSubmitError("Please verify you're human before sending.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        // ✅ send boolean to backend
        wantsReply: formData.wantsReply === "yes",
        // ✅ include Turnstile token
        turnstileToken,
      };

      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // 7-day limit
        if (res.status === 429 && data?.error === "MESSAGE_LIMIT") {
          throw new Error(data.message || "You can only send one message every 7 days.");
        }
        // captcha errors from backend
        if (data?.error === "CAPTCHA_REQUIRED") {
          throw new Error("Captcha required. Please verify you're human.");
        }
        if (data?.error === "CAPTCHA_FAILED") {
          throw new Error("Captcha failed. Please try again.");
        }
        if (data?.error === "SPAM_DETECTED") {
          throw new Error("Spam detected.");
        }

        throw new Error(data?.message || "Failed to send message");
      }

      setSubmitSuccess("✅ Message sent!");
      setSubmitted(true);

      // reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        phoneType: "",
        message: "",
        wantsReply: "yes",
        company: "",
      });

      // force re-verify for a new submission
      setTurnstileToken(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section-content contact-content">
      <h2 className="section-title">Contact Me</h2>

      <p className="contact-intro">
        I'm always open to new opportunities and interesting projects. Feel free to reach out if
        you'd like to collaborate or just want to say hi!
      </p>

      <h3>
        <strong>Please note:</strong> You may send only one message every seven days
      </h3>
      <br />
      <br />

      <div className="contact-form-wrapper-centered">
        {submitted ? (
          <div className="success-message">
            <div className="success-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <p>Thank you for your message! I'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            {/* ✅ Honeypot field (bot trap) */}
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="form-group">
              <label htmlFor="name">Name (required)</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email (required)</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone (optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (234) 567-8901"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneType">Phone Type (optional)</label>
              <select id="phoneType" name="phoneType" value={formData.phoneType} onChange={handleChange}>
                <option value="" hidden>
                  Select phone type
                </option>
                <option value="mobile">Mobile</option>
                <option value="home">Home</option>
                <option value="work">Work</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message (required)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Ask me anything!"
                className={errors.message ? "error" : ""}
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <div className="form-group reply-preference">
              <label>Would you like a reply?</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="wantsReply"
                    value="yes"
                    checked={formData.wantsReply === "yes"}
                    onChange={handleChange}
                  />
                  <span>Yes, a reply would be nice.</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="wantsReply"
                    value="no"
                    checked={formData.wantsReply === "no"}
                    onChange={handleChange}
                  />
                  <span>No, thanks.</span>
                </label>
              </div>
            </div>

            {/* ✅ Turnstile widget (must be inside the form) */}
            <div style={{ marginTop: "1rem", marginBottom: "0.75rem" }}>
              <Turnstile
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken(null)}
                onError={() => setTurnstileToken(null)}
                options={{ theme: "dark" }}
              />
            </div>

            {/* ✅ Feedback messages */}
            {submitSuccess && <p className="success-message">{submitSuccess}</p>}
            {submitError && <p className="error-message">{submitError}</p>}

            <button type="submit" className="submit-btn" disabled={isSubmitting || !turnstileToken}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>

      <div className="social-links-bottom">
        <h3>Connect With Me</h3>
        <div className="social-icons">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-link">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="social-link">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-link">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            </a>
        </div>
        </div>
    </div>
  );
};

export default ContactContent;
