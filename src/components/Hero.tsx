import { ArrowRight, BedDouble, Home, MapPin, Phone } from 'lucide-react';
import { business } from '../data/site';

export function Hero() {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-heading">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-layout page-pad">
        <div className="hero-copy is-visible" data-reveal>
          <p className="eyebrow eyebrow-gold">Sober Living in Decaturville, Tennessee</p>
          <h1 id="hero-heading">Grace Cottage</h1>
          <p className="hero-tagline">Where Every Day Is a Gift</p>
          <p className="hero-script">Hope. Healing. New Beginnings.</p>
          <p className="hero-subtitle">
            Providing a safe, structured, and supportive sober living environment where individuals can rebuild their
            lives with dignity, accountability, and hope.
          </p>
          <p className="hero-existing-copy">Cozy, Stylish Newly Renovated Home in a Quiet Country Setting.</p>
          <p className="availability-pill">Now Accepting New Residents</p>

          <div className="hero-meta" aria-label="Property information">
            <span>
              <MapPin aria-hidden="true" size={17} /> {business.location}
            </span>
            <span>
              <Home aria-hidden="true" size={17} /> 3 Bedrooms
            </span>
            <span>
              <BedDouble aria-hidden="true" size={17} /> 3 Beds
            </span>
            <span>2.5 Baths</span>
          </div>

          <div className="hero-actions">
            <a className="btn btn-gold" href="#apply">
              Apply for Residency <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a className="btn btn-outline-light" href={business.phoneHref}>
              <Phone aria-hidden="true" size={18} /> Call {business.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="hero-image-wrap is-visible" data-reveal>
          <div className="gold-arch" aria-hidden="true" />
          <img src={`${import.meta.env.BASE_URL}images/hero-placeholder.png`} alt="Grace Cottage residence in Decaturville Tennessee" />
          <div className="hero-card-note">
            <span>GRACE Cottage</span>
            <strong>{business.category}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
