import { Mail, MapPin, Phone } from 'lucide-react';
import { business, navLinks } from '../data/site';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid page-pad">
        <div className="footer-brand">
          <img src={`${import.meta.env.BASE_URL}images/Logo-white.png`} alt="Grace Cottage logo" />
          <p>{business.category} in {business.location}</p>
        </div>

        <div>
          <h2>Contact</h2>
          <p>
            <Phone aria-hidden="true" size={16} /> <a href={business.phoneHref}>{business.phoneDisplay}</a>
          </p>
          <p>
            <Mail aria-hidden="true" size={16} /> <a href={business.emailHref}>{business.email}</a>
          </p>
          <p>
            <MapPin aria-hidden="true" size={16} /> {business.location}
          </p>
        </div>

        <div>
          <h2>Quick Links</h2>
          <nav aria-label="Footer quick links" className="footer-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="footer-bottom page-pad">
        <p>© {new Date().getFullYear()} Grace Cottage. All rights reserved.</p>
        <p className="footer-credit">
          <span>Designed by JavidVerse - For All Creative Solutions</span>
          <span className="footer-credit-separator"> | </span>
          <span>Email us at:</span>
          <a href="mailto:javidverse@gmail.com">javidverse@gmail.com</a>
        </p>
      </div>
    </footer>
  );
}
