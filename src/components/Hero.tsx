import { useEffect, useRef } from 'react';
import { ArrowRight, CalendarDays, MapPin, Sparkles, Users2 } from 'lucide-react';
import { FEST } from '../festData';

const pad = (n: number) => n.toString().padStart(2, '0');

export default function Hero() {
  // refs to the four number cells — updated imperatively, no React re-render
  const dRef = useRef<HTMLSpanElement>(null);
  const hRef = useRef<HTMLSpanElement>(null);
  const mRef = useRef<HTMLSpanElement>(null);
  const sRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const target = new Date(FEST.targetISO).getTime();
    let raf = 0;
    let lastSec = -1;

    const tick = () => {
      const now = Date.now();
      let diff = target - now;

      if (diff <= 0) {
        diff = 0;
        if (doneRef.current) doneRef.current.style.display = 'block';
        if (wrapRef.current) wrapRef.current.style.opacity = '0.35';
      }

      const days = Math.floor(diff / 86_400_000);
      const hours = Math.floor((diff % 86_400_000) / 3_600_000);
      const mins = Math.floor((diff % 3_600_000) / 60_000);
      const secs = Math.floor((diff % 60_000) / 1000);

      const sec = secs;
      if (dRef.current) dRef.current.textContent = pad(days);
      if (hRef.current) hRef.current.textContent = pad(hours);
      if (mRef.current) mRef.current.textContent = pad(mins);
      if (sRef.current) {
        if (sec !== lastSec) {
          sRef.current.textContent = pad(secs);
          sRef.current.classList.remove('tick-anim');
          // force reflow to restart animation
          void sRef.current.offsetWidth;
          sRef.current.classList.add('tick-anim');
          lastSec = sec;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const stats = [
    { icon: Users2, label: 'Expected Footfall', value: FEST.footfall },
    { icon: CalendarDays, label: 'Colleges', value: FEST.colleges },
    { icon: Sparkles, label: 'Events', value: FEST.eventsCount },
  ];

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-28 sm:pt-32">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 grid-bg radial-fade opacity-70" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-pulse-500/20 blur-[120px]" />
        <div className="absolute -right-24 top-40 h-[24rem] w-[24rem] rounded-full bg-volt-500/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-[22rem] w-[40rem] -translate-x-1/2 rounded-full bg-volt-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Eyebrow */}
        <div className="reveal flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/80 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pulse-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pulse-400" />
            </span>
            {FEST.editionName} · Edition {FEST.edition}
          </span>
        </div>

        {/* Title */}
        <h1
          className="reveal mt-7 text-center font-clash text-[19vw] font-bold leading-[0.85] tracking-tighter sm:text-[15vw] lg:text-[12rem]"
          data-delay="80"
        >
          <span className="text-gradient-pulse">{FEST.name}</span>
          <span className="text-white/90">{FEST.edition}</span>
        </h1>

        {/* Tagline + dates */}
        <p
          className="reveal mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-white/70 sm:text-xl"
          data-delay="160"
        >
          {FEST.subtitle} — {FEST.eventsCount} events,{' '}
          <span className="text-pulse-300">{FEST.prizePool}</span> in prizes,
          three nights of controlled chaos.
        </p>

        <div
          className="reveal mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60"
          data-delay="220"
        >
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-pulse-400" /> {FEST.dates}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-volt-400" /> {FEST.location}
          </span>
        </div>

        {/* Countdown */}
        <div ref={wrapRef} className="reveal mx-auto mt-12 max-w-3xl transition-opacity duration-700" data-delay="300">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
            The fest goes live in
          </p>
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
            {[
              { ref: dRef, label: 'Days' },
              { ref: hRef, label: 'Hours' },
              { ref: mRef, label: 'Minutes' },
              { ref: sRef, label: 'Seconds' },
            ].map(({ ref, label }) => (
              <div
                key={label}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-2 py-5 text-center backdrop-blur transition-colors duration-300 hover:border-pulse-400/40 sm:py-7"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pulse-400/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span
                  ref={ref}
                  className="font-mono text-4xl font-bold tabular-nums text-white sm:text-6xl"
                >
                  00
                </span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45 sm:text-xs">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <p ref={doneRef} className="mt-4 hidden text-center text-pulse-300 font-semibold">
            We are live! The gates are open.
          </p>
        </div>

        {/* CTAs */}
        <div className="reveal mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" data-delay="380">
          <a
            href="#register"
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-pulse-400 to-volt-500 px-8 py-4 text-base font-semibold text-ink-950 transition-transform duration-300 hover:scale-[1.03] glow-pulse sm:w-auto"
          >
            Register Now — Free Pass
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#events"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur transition-colors duration-300 hover:border-white/30 hover:bg-white/10 sm:w-auto"
          >
            Explore Events
          </a>
        </div>

        {/* Stats */}
        <div className="reveal mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5" data-delay="460">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-ink-950/40 px-3 py-5 text-center backdrop-blur">
              <Icon className="mx-auto mb-2 h-5 w-5 text-pulse-400" />
              <div className="font-clash text-2xl font-bold text-white sm:text-3xl">{value}</div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/45 sm:text-xs">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" />
    </section>
  );
}
