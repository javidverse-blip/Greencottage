import { HeartIcon } from '../data/site';

export function About() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-heading">
      <div className="about-layout page-pad">
        <div className="about-image" data-reveal>
          <img src={`${import.meta.env.BASE_URL}images/exterior/side-view.png`} alt="Side view of the newly renovated Grace Cottage residence" loading="lazy" />
          <div className="leaf-line" aria-hidden="true" />
        </div>
        <div className="about-copy" data-reveal>
          <p className="eyebrow">A Cozy Place to Call Home</p>
          <h2 id="about-heading">
            GRACE Cottage provides compassionate sober-living support in a peaceful country environment.
          </h2>
          <div className="gold-divider" aria-hidden="true">
            <HeartIcon size={16} />
          </div>
          <p>
            Our newly renovated home creates a warm and uplifting atmosphere where every resident feels valued and cared
            for. We focus on comfort, healthy living, and meaningful community so each day is calm, dignified, and full
            of gentle connection.
          </p>
          <blockquote>A Place to <em>Heal.</em> A Place to <em>Grow.</em></blockquote>
        </div>
      </div>
    </section>
  );
}
