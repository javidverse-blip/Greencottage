import { CheckCircle2, Mail, Phone } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';
import { contactMethods } from '../data/applicationOptions';
import { business } from '../data/site';
import { initialApplicationData } from '../lib/applicationDefaults';
import { validateApplicationStep } from '../lib/applicationValidation';
import type { ApplicationErrors, ResidentApplicationData } from '../types/application';
import { ApplicationStep } from './ApplicationStep';

type SectionName = 'personal';

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  description?: string;
  maxLength?: number;
  autoComplete?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  required,
  optional,
  description,
  maxLength,
  autoComplete,
}: FieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label} {required ? <span aria-label="required">*</span> : null} {optional ? <small>Optional</small> : null}
      </label>
      {description ? <p id={descriptionId}>{description}</p> : null}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
        maxLength={maxLength}
        autoComplete={autoComplete}
      />
      {error ? <span className="field-error" id={errorId}>{error}</span> : null}
    </div>
  );
}

type SelectProps = Omit<FieldProps, 'type' | 'onChange'> & {
  options: string[];
  onChange: (value: string) => void;
};

function SelectField({ id, label, value, options, onChange, error, required, optional, description }: SelectProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label} {required ? <span aria-label="required">*</span> : null} {optional ? <small>Optional</small> : null}
      </label>
      {description ? <p id={descriptionId}>{description}</p> : null}
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <span className="field-error" id={errorId}>{error}</span> : null}
    </div>
  );
}

export function ResidentApplication() {
  const [data, setData] = useState<ResidentApplicationData>(() => initialApplicationData());
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [applicationReady, setApplicationReady] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const summaryRef = useRef<HTMLDivElement>(null);

  const updateField = <K extends SectionName>(section: K, field: keyof ResidentApplicationData[K], value: string | boolean) => {
    setData((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }));
  };

  const setWebsite = (value: string) => setData((current) => ({ ...current, website: value }));
  const errorFor = (name: string) => errors[name];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (applicationReady) return;

    const formErrors = validateApplicationStep(data, 0);
    setErrors(formErrors);
    if (Object.keys(formErrors).length) {
      setStatusMessage('Submission failed. Please correct the highlighted fields.');
      summaryRef.current?.focus();
      return;
    }

    setApplicationReady(true);
    setData(initialApplicationData());
    setErrors({});
    setStatusMessage('Application form completed.');
  };

  const errorEntries = Object.entries(errors);

  if (applicationReady) {
    return (
      <section className="section application-section" id="apply" aria-labelledby="application-success-heading">
        <div className="application-shell page-pad success-shell" data-reveal>
          <CheckCircle2 className="success-icon" aria-hidden="true" />
          <h2 id="application-success-heading">Application Form Completed</h2>
          <p>
            Thank you for completing the Grace Cottage residency application. This local website version is not connected
            to online storage, so your answers were not sent or saved. Please call or email Grace Cottage to continue the
            admissions conversation.
          </p>
          <div className="cta-actions">
            <a className="btn btn-gold" href="#top">Return to Home</a>
            <a className="btn btn-outline-dark" href={business.phoneHref}><Phone aria-hidden="true" size={18} /> Call Grace Cottage</a>
            <a className="btn btn-outline-dark" href={business.emailHref}><Mail aria-hidden="true" size={18} /> Email Grace Cottage</a>
          </div>
          <div aria-live="polite" className="sr-only">Application form completed. No information was sent or saved.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="section application-section" id="apply" aria-labelledby="application-heading">
      <div className="application-shell page-pad" data-reveal>
        <div className="section-intro application-intro">
          <p className="eyebrow">Confidential Application</p>
          <h2 id="application-heading">Apply for Residency</h2>
          <p>
            Take the first step toward a safe, structured, and supportive living environment. Complete the application
            below, then contact Grace Cottage directly regarding availability and next steps.
          </p>
        </div>

        <div className="form-status" aria-live="polite">
          {statusMessage}
        </div>

        {errorEntries.length ? (
          <div className="validation-summary" ref={summaryRef} tabIndex={-1} role="alert">
            <h3>Please review these fields</h3>
            <ul>
              {errorEntries.map(([name, message]) => (
                <li key={name}>{message}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <form className="application-form" onSubmit={handleSubmit} noValidate>
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" value={data.website ?? ''} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" />
          </div>

          <ApplicationStep title="Personal Information">
            <div className="form-grid">
              <Field id="legalFirstName" label="Legal first name" value={data.personal.legalFirstName} onChange={(value) => updateField('personal', 'legalFirstName', value)} error={errorFor('personal.legalFirstName')} required autoComplete="given-name" />
              <Field id="middleName" label="Middle name" value={data.personal.middleName} onChange={(value) => updateField('personal', 'middleName', value)} optional autoComplete="additional-name" />
              <Field id="legalLastName" label="Legal last name" value={data.personal.legalLastName} onChange={(value) => updateField('personal', 'legalLastName', value)} error={errorFor('personal.legalLastName')} required autoComplete="family-name" />
              <Field id="dateOfBirth" label="Date of birth" type="date" value={data.personal.dateOfBirth} onChange={(value) => updateField('personal', 'dateOfBirth', value)} error={errorFor('personal.dateOfBirth')} required />
              <Field id="phone" label="Phone number" type="tel" value={data.personal.phone} onChange={(value) => updateField('personal', 'phone', value)} error={errorFor('personal.phone')} required autoComplete="tel" />
              <Field id="email" label="Email address" type="email" value={data.personal.email} onChange={(value) => updateField('personal', 'email', value)} error={errorFor('personal.email')} required autoComplete="email" />
              <Field id="currentCity" label="Current city" value={data.personal.currentCity} onChange={(value) => updateField('personal', 'currentCity', value)} error={errorFor('personal.currentCity')} required />
              <Field id="currentState" label="Current state" value={data.personal.currentState} onChange={(value) => updateField('personal', 'currentState', value)} error={errorFor('personal.currentState')} required />
              <SelectField id="preferredContactMethod" label="Preferred contact method" value={data.personal.preferredContactMethod} options={contactMethods} onChange={(value) => updateField('personal', 'preferredContactMethod', value)} error={errorFor('personal.preferredContactMethod')} required />
              <Field id="preferredMoveInDate" label="Preferred move-in date" type="date" value={data.personal.preferredMoveInDate} onChange={(value) => updateField('personal', 'preferredMoveInDate', value)} error={errorFor('personal.preferredMoveInDate')} required />
            </div>
          </ApplicationStep>

          <div className="form-actions">
            <button className="btn btn-gold" type="submit" disabled={applicationReady}>
              Submit Personal Information
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
