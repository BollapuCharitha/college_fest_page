import { Zap, Instagram, Linkedin, Twitter, Youtube, ArrowUp } from 'lucide-react';
import { FEST } from '../festData';

const SOCIALS = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

const LINKS = [
  { label: 'Events', href: '#events' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Register', href: '#register' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-ink-950">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-pulse-400 to-volt-500 text-ink-950">
                <Zap className="h-5 w-5" strokeWidth={2.6} />
              </span>
              <span className="font-clash text-xl font-bold tracking-tight">
                {FEST.name}<span className="text-pulse-400">{FEST.edition}</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              {FEST.subtitle}. The annual tech &amp; cultural fest of {FEST.location}. Built by students, for students.
            </p>
            <div className="mt-5 flex gap-2.5">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-pulse-400/40 hover:text-pulse-300"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Explore</h4>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/65 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Details */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">The details</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              <li>{FEST.dates}</li>
              <li>{FEST.location}</li>
              <li>Prize pool: <span className="text-pulse-300">{FEST.prizePool}</span></li>
              <li>
                <a href="mailto:team@pulsefest.in" className="transition-colors hover:text-white">
                  team@pulsefest.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {FEST.name} {FEST.edition}, {FEST.location}. All rights reserved.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50 transition-colors hover:text-white"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
