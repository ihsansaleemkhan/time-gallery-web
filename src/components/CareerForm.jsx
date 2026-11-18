import { useState } from 'react';
import './CareerForm.css';

const W3F_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const W3F_ENDPOINT = 'https://api.web3forms.com/submit';


const HOW_DID_YOU_FIND_US_OPTIONS = [
  { value: '', label: 'How did you find us ?', disabled: true },
  { value: 'Google search', label: 'Google search' },
  { value: 'Social media', label: 'Social media' },
  { value: 'Friend or family', label: 'Friend or family' },
  { value: 'Walk-in', label: 'Walk-in' },
  { value: 'Other', label: 'Other' },
];

const AVAILABLE_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const SUCCESS_MESSAGE = "Thanks for applying to volunteer with us! We'll get back to you soon.";

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  source: '',
  days: [],
  aboutYou: '',
};

export default function CareerForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid e-mail address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s+\-()]{6,}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleDayToggle = (day) => {
    setFormData((prev) => {
      const exists = prev.days.includes(day);
      const newDays = exists ? prev.days.filter((d) => d !== day) : [...prev.days, day];
      return { ...prev, days: newDays };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        access_key: W3F_KEY,
        subject: 'New Career Application — The Time Gallery',
        from_name: 'The Time Gallery Website',
        'First Name': formData.firstName,
        'Last Name': formData.lastName,
        Email: formData.email,
        Phone: formData.phone,
        'How did you find us': formData.source || 'Not specified',
        'Available Days': formData.days.join(', ') || 'Not specified',
        'About the Applicant': formData.aboutYou || 'Not provided',
      };

      const response = await fetch(W3F_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Submission failed. Please try again.');
      }

      setSubmitSuccess(true);
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error.message || 'Something went wrong. Please try again.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="career-form" onSubmit={handleSubmit} noValidate aria-label="Career Application Form">
      {/* Row 1: First Name & Last Name */}
      <div className="career-form-row career-form-row--names">
        <div className="career-form-field career-form-field--first-name">
          <label htmlFor="career-first-name" className="sr-only">
            First name (required)
          </label>
          <input
            id="career-first-name"
            name="firstName"
            type="text"
            required
            placeholder="First name"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`career-input ${errors.firstName ? 'career-input--error' : ''}`}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? 'career-first-name-error' : undefined}
          />
          {errors.firstName && (
            <span id="career-first-name-error" className="career-inline-error" role="alert">
              {errors.firstName}
            </span>
          )}
        </div>

        <div className="career-form-field career-form-field--last-name">
          <label htmlFor="career-last-name" className="sr-only">
            Last Name (required)
          </label>
          <input
            id="career-last-name"
            name="lastName"
            type="text"
            required
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`career-input ${errors.lastName ? 'career-input--error' : ''}`}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? 'career-last-name-error' : undefined}
          />
          {errors.lastName && (
            <span id="career-last-name-error" className="career-inline-error" role="alert">
              {errors.lastName}
            </span>
          )}
        </div>
      </div>

      {/* Row 2: E-mail */}
      <div className="career-form-row career-form-row--email">
        <div className="career-form-field career-form-field--full">
          <label htmlFor="career-email" className="sr-only">
            E-mail (required)
          </label>
          <input
            id="career-email"
            name="email"
            type="email"
            required
            placeholder="E-mail"
            value={formData.email}
            onChange={handleInputChange}
            className={`career-input ${errors.email ? 'career-input--error' : ''}`}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'career-email-error' : undefined}
          />
          {errors.email && (
            <span id="career-email-error" className="career-inline-error" role="alert">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      {/* Row 3: Phone Number & How did you find us ? */}
      <div className="career-form-row career-form-row--phone-source">
        <div className="career-form-field career-form-field--phone">
          <label htmlFor="career-phone" className="sr-only">
            Phone Number (required)
          </label>
          <input
            id="career-phone"
            name="phone"
            type="tel"
            required
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className={`career-input ${errors.phone ? 'career-input--error' : ''}`}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'career-phone-error' : undefined}
          />
          {errors.phone && (
            <span id="career-phone-error" className="career-inline-error" role="alert">
              {errors.phone}
            </span>
          )}
        </div>

        <div className="career-form-field career-form-field--source">
          <label htmlFor="career-source" className="sr-only">
            How did you find us ?
          </label>
          <div className="career-select-wrapper">
            <select
              id="career-source"
              name="source"
              value={formData.source}
              onChange={handleInputChange}
              className="career-select"
            >
              {HOW_DID_YOU_FIND_US_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="career-select-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="#222222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Fieldset: Which days are you available? */}
      <fieldset className="career-fieldset">
        <legend className="career-legend">Which days are you available?</legend>
        <div className="career-days-row">
          {AVAILABLE_DAYS.map((day) => {
            const isChecked = formData.days.includes(day);
            return (
              <label key={day} className="career-day-item">
                <input
                  type="checkbox"
                  name="days"
                  value={day}
                  checked={isChecked}
                  onChange={() => handleDayToggle(day)}
                  className="career-checkbox-native sr-only"
                />
                <span className={`career-checkbox-custom ${isChecked ? 'is-checked' : ''}`} aria-hidden="true">
                  {isChecked && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#9d5feb" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="career-checkmark">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
                <span className="career-day-label">{day}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* A few words about you */}
      <div className="career-form-row career-form-row--about-you">
        <label htmlFor="career-about-you" className="career-textarea-label">
          A few words about you
        </label>
        <textarea
          id="career-about-you"
          name="aboutYou"
          placeholder="Tell us a bit about yourself"
          value={formData.aboutYou}
          onChange={handleInputChange}
          className="career-textarea"
        />
      </div>

      {/* Submit Button */}
      <div className="career-button-container">
        {errors.submit && (
          <p className="career-inline-error" role="alert" style={{ marginBottom: '8px' }}>
            {errors.submit}
          </p>
        )}
        <button type="submit" disabled={isSubmitting} className="career-submit-button">
          Submit Application
        </button>

        {submitSuccess && (
          <p className="career-success-message" aria-live="polite">
            {SUCCESS_MESSAGE}
          </p>
        )}
      </div>
    </form>
  );
}

