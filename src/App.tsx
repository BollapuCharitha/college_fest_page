import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Events from './components/Events';
import Schedule from './components/Schedule';
import Sponsors from './components/Sponsors';
import About from './components/About';
import Register from './components/Register';
import Footer from './components/Footer';
import { useReveal } from './useReveal';

export default function App() {
  const rootRef = useReveal<HTMLDivElement>();

  return (
    <div ref={rootRef} className="relative min-h-screen bg-ink-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <Events />
        <Schedule />
        <About />
        <Sponsors />
        <Register />
      </main>
      <Footer />
    </div>
  );
}
