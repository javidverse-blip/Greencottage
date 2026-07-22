import { About } from './components/About';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ResidentApplication } from './components/ResidentApplication';
import { Services } from './components/Services';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <ResidentApplication />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
