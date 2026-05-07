import { useEffect, useRef, useState } from 'react';
import {
  Star,
  Phone,
  Mail,
  MapPin,
  BedDouble,
  Bath,
  DoorOpen,
  Heart,
  Car,
  TreePine,
  Utensils,
  Bus,
  CalendarDays,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return ref;
}

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  {
    icon: Utensils,
    title: 'Healthy Plant-Based Cuisine',
    desc: 'Nutritious, home-cooked meals prepared with fresh ingredients to nourish body and soul.',
  },
  {
    icon: Car,
    title: 'Transportation to Medical Appointments',
    desc: 'Reliable, comfortable transportation ensuring residents never miss an important appointment.',
  },
  {
    icon: CalendarDays,
    title: 'Scheduled Outings',
    desc: 'Regular community outings and activities that bring joy and connection to everyday life.',
  },
  {
    icon: TreePine,
    title: 'Quiet Country Setting',
    desc: 'Peaceful surroundings near Mousetail State Park and Natchez Trace State Park.',
  },
  {
    icon: DoorOpen,
    title: 'Cozy Newly Renovated Living Spaces',
    desc: 'Beautifully updated interiors designed for comfort, safety, and a true sense of home.',
  },
  {
    icon: Bus,
    title: 'Nearby Parks & Recreation',
    desc: 'Easy access to nature trails, scenic views, and recreational activities for all abilities.',
  },
];

const GALLERY_IMAGES = [
  {
    src: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Cozy cottage exterior',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Warm living room',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Comfortable bedroom',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Peaceful garden',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Dining area',
    span: 'col-span-1 row-span-1',
  },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a
            href="#hero"
            className={`font-heading text-lg sm:text-xl font-bold tracking-wide transition-colors duration-300 ${
              scrolled ? 'text-primary' : 'text-white'
            }`}
          >
            GRACE
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 hover:text-primary-light ${
                  scrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:863-236-0503"
              className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors duration-300 shadow-md"
            >
              Call Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-primary' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md shadow-lg px-4 pb-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-gray-700 font-semibold text-sm border-b border-gray-100 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:863-236-0503"
            className="block mt-3 bg-primary text-white text-center px-5 py-3 rounded-full text-sm font-semibold"
          >
            Call Now
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const ref = useFadeIn();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/70" />

      <div ref={ref} className="fade-in-up relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Rating badge */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6 sm:mb-8">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white font-semibold text-sm">Rating 4.93</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6">
          Where Every Day<br />is a Gift
        </h1>

        <p className="text-white/90 text-lg sm:text-xl md:text-2xl font-medium mb-3 sm:mb-4 leading-relaxed">
          Cozy, Stylish Newly Renovated Home<br className="hidden sm:block" /> in a Quiet Country Setting.
        </p>

        <p className="text-white/80 text-base sm:text-lg font-semibold mb-2">
          Now Accepting New Residents
        </p>

        <div className="flex items-center justify-center gap-1.5 text-white/70 text-sm mb-8 sm:mb-10">
          <MapPin size={16} />
          <span>Decaturville, Tennessee</span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <a
            href="#contact"
            className="w-full sm:w-auto bg-white text-primary px-8 py-4 rounded-full text-base font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Schedule a Visit
          </a>
          <a
            href="tel:863-236-0503"
            className="w-full sm:w-auto bg-accent text-white px-8 py-4 rounded-full text-base font-bold hover:bg-accent-light transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Phone size={18} />
            Call Now
          </a>
        </div>

        {/* Property details */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 text-white/80 text-sm sm:text-base">
          <span className="flex items-center gap-1.5">
            <DoorOpen size={16} />
            3 Bedrooms
          </span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span className="flex items-center gap-1.5">
            <BedDouble size={16} />
            3 Beds
          </span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span className="flex items-center gap-1.5">
            <Bath size={16} />
            2.5 Baths
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}

function About() {
  const ref = useFadeIn();

  return (
    <section id="about" className="py-20 sm:py-28 lg:py-32 bg-white">
      <div ref={ref} className="fade-in-up max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Cozy living space at Grace Senior Living"
                className="w-full h-72 sm:h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-white rounded-xl px-5 py-3 shadow-lg hidden sm:block">
              <p className="font-heading text-lg font-bold">Est.</p>
              <p className="text-sm font-medium opacity-90">Caring Since Day One</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              About Us
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              A Cozy Place to<br />Call Home
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
              Grace Senior Living Cottage provides compassionate senior care in a
              peaceful country environment focused on comfort, healthy living, and
              meaningful community. Our newly renovated home creates a warm and
              uplifting atmosphere where every resident feels valued and cared for.
            </p>
            <div className="flex items-center gap-3 text-primary">
              <Heart size={20} className="fill-primary" />
              <span className="font-semibold text-sm sm:text-base">
                Where compassion meets comfort
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const ref = useFadeIn();

  return (
    <section id="services" className="py-20 sm:py-28 lg:py-32 bg-gray-50">
      <div ref={ref} className="fade-in-up max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
            What We Offer
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Services & Amenities
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
            Everything your loved one needs for a comfortable, fulfilling life in a
            warm and supportive environment.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Parks mention */}
        <div className="mt-12 sm:mt-16 text-center bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
          <TreePine size={28} className="text-primary mx-auto mb-3" />
          <p className="text-gray-600 text-sm sm:text-base">
            Surrounded by nature with easy access to{' '}
            <span className="font-semibold text-gray-800">
              Mousetail State Park
            </span>{' '}
            and{' '}
            <span className="font-semibold text-gray-800">
              Natchez Trace State Park
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const ref = useFadeIn();

  return (
    <section id="gallery" className="py-20 sm:py-28 lg:py-32 bg-white">
      <div ref={ref} className="fade-in-up max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
            Take a Look
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Our Home
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[200px]">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className={`${img.span} rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const ref = useFadeIn();

  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-32 bg-primary">
      <div ref={ref} className="fade-in-up max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-white/70 font-semibold text-sm tracking-widest uppercase mb-3">
          Join Our Community
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
          Now Accepting New Residents
        </h2>
        <p className="text-white/80 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Experience peaceful senior living in a warm and welcoming environment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:863-236-0503"
            className="w-full sm:w-auto bg-white text-primary px-8 py-4 rounded-full text-base font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Phone size={18} />
            Call 863-236-0503
          </a>
          <a
            href="mailto:dbooker1888@gmail.com"
            className="w-full sm:w-auto bg-transparent border-2 border-white/40 text-white px-8 py-4 rounded-full text-base font-bold hover:bg-white/10 hover:border-white/60 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Mail size={18} />
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-2">
              GRACE Senior Living Cottage
            </h3>
            <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-1">
              <MapPin size={14} />
              Decaturville, Tennessee
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase text-gray-400 mb-4">
              Contact
            </h4>
            <a
              href="mailto:dbooker1888@gmail.com"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm mb-2"
            >
              <Mail size={14} />
              dbooker1888@gmail.com
            </a>
            <a
              href="tel:863-236-0503"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm mb-2"
            >
              <Phone size={14} />
              863-236-0503
            </a>
            <p className="text-gray-400 text-sm mt-3">
              Ask for <span className="text-white font-semibold">Diana Booker</span>
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase text-gray-400 mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1.5"
                >
                  <ChevronRight size={12} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500 text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} GRACE Senior Living Cottage. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="font-body text-gray-900 antialiased">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
