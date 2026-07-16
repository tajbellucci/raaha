import { useEffect, useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Gap from './components/Gap.jsx';
import Platform from './components/Platform.jsx';
import Languages from './components/Languages.jsx';
import NationalVision from './components/NationalVision.jsx';
import Founders from './components/Founders.jsx';
import Pilot from './components/Pilot.jsx';
import Privacy from './components/Privacy.jsx';
import Footer from './components/Footer.jsx';
import Demo from './demo/Demo.jsx';
import FrontOffice from './frontoffice/FrontOffice.jsx';

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

function Landing() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grain">
      <Nav />
      <main>
        <Hero />
        <Gap />
        <Platform />
        <Languages />
        <NationalVision />
        <Founders />
        <Pilot />
        <Privacy />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const hash = useHashRoute();
  if (hash === '#demo') return <Demo />;
  if (hash === '#business') return <FrontOffice />;
  return <Landing />;
}

export default App;
