import { Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { business, navLinks } from '../data/site';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`site-header ${isScrolled || isOpen ? 'site-header--solid' : ''}`}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="nav-shell">
        <a className="brand-link" href="#top" aria-label="Grace Cottage home" onClick={closeMenu}>
          <img src={`${import.meta.env.BASE_URL}images/Logo-white.png`} alt="Grace Cottage logo" className="brand-logo" />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#apply">
          Apply Now
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div className={`mobile-nav-panel ${isOpen ? 'mobile-nav-panel--open' : ''}`} id="mobile-navigation">
        <nav aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mobile-actions">
          <a className="btn btn-gold" href="#apply" onClick={closeMenu}>
            Apply Now
          </a>
          <a className="btn btn-outline-dark" href={business.phoneHref} onClick={closeMenu}>
            <Phone aria-hidden="true" size={18} /> Call Now
          </a>
        </div>
      </div>
    </header>
  );
}
