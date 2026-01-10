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
  const [turnstileWidgetKey, setTurnstileWidgetKey] = useState(0);
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
        wantsReply: formData.wantsReply,
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
      setTurnstileToken(null);

      setTurnstileWidgetKey((k) => k + 1); // ✅ forces user to re-verify next time

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
              aria-hidden="true"
              aria-label="Leave this field blank"
            />

            <div className="form-group">
              <label htmlFor="name">Name <span className="required">*</span></label>
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
              <label htmlFor="email">Email <span className="required">*</span></label>
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
              <label htmlFor="message">Message <span className="required">*</span></label>
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
                key={turnstileWidgetKey} // forces a fresh widget instance
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken(null)}
                onError={() => setTurnstileToken(null)}
                options={{ theme: "dark", appearance: "always", size: "normal", }}
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
            <a href="https://github.com/Kelony11" target="_blank" rel="noopener noreferrer" className="social-link">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            </a>
            <a href="https://www.linkedin.com/in/kelvin-ihezue" target="_blank" rel="noopener noreferrer" className="social-link">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
            </a>
            <a href="https://leetcode.com/u/Kelony11" target="_blank" rel="noopener noreferrer" className="social-link">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
            </svg>
            </a>
        </div>
        </div>
    </div>
  );
};

export default ContactContent;
