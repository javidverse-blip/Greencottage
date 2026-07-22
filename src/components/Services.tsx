import type { CSSProperties } from 'react';
import { serviceCards } from '../data/site';

type ServiceCardStyle = CSSProperties & {
  '--service-bg': string;
};

export function Services() {
  return (
    <section className="section services-section" id="services" aria-labelledby="services-heading">
      <span id="amenities" className="anchor-alias" aria-hidden="true" />
      <div className="section-intro page-pad" data-reveal>
        <p className="eyebrow">Services & Amenities</p>
        <h2 id="services-heading">Thoughtful care and a serene lifestyle curated for comfort.</h2>
        <p className="small-note">Nearby natural retreats include Mousetail State Park and Natchez Trace State Park.</p>
      </div>

      <div className="services-grid page-pad">
        {serviceCards.map(({ title, Icon, background }) => (
          <article className="service-card" key={title} style={{ '--service-bg': `url(${background})` } as ServiceCardStyle} data-reveal>
            <div className="service-icon">
              <Icon aria-hidden="true" size={26} />
            </div>
            <h3>{title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
