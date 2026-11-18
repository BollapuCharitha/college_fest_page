import { useEffect, useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { FEST } from '../festData';

const LINKS = [
  { label: 'Events', href: '#events' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink-950/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-pulse-400 to-volt-500 text-ink-950">
            <Zap className="h-5 w-5" strokeWidth={2.6} />
            <span className="absolute inset-0 rounded-xl bg-pulse-400/40 blur-md transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
          </span>
          <span className="font-clash text-xl font-bold tracking-tight">
            {FEST.name}<span className="text-pulse-400">{FEST.edition}</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-pulse-400 to-volt-400 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#register"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 transition-transform duration-300 hover:scale-[1.03]"
          >
            Register
            <span className="h-1.5 w-1.5 rounded-full bg-pulse-500 transition-colors group-hover:bg-volt-500" />
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg text-white/80 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile */}
      <div
        className={`overflow-hidden border-t border-white/5 bg-ink-950/95 backdrop-blur-xl transition-[max-height] duration-500 md:hidden ${
          open ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#register"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-ink-950"
            >
              Register Now
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
