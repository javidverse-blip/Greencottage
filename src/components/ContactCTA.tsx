import { Mail, Phone } from 'lucide-react';
import { business } from '../data/site';

export function ContactCTA() {
  return (
    <section className="section contact-cta" id="contact" aria-labelledby="contact-heading">
      <div className="contact-shell page-pad" data-reveal>
        <p className="eyebrow eyebrow-gold">Now Accepting New Residents</p>
        <h2 id="contact-heading">Ready for a New Beginning?</h2>
        <p>
          Contact Grace Cottage to learn more about admissions, availability, and the next steps toward residency.
        </p>
        <div className="cta-actions">
          <a className="btn btn-cream" href={business.phoneHref}>
            <Phone aria-hidden="true" size={18} /> Call {business.phoneDisplay}
          </a>
          <a className="btn btn-outline-light" href={business.emailHref}>
            <Mail aria-hidden="true" size={18} /> Email Grace Cottage
          </a>
        </div>
      </div>
    </section>
  );
}
