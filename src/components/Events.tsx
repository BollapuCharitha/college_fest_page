import { useState } from 'react';
import {
  ArrowUpRight, Code2, Bot, Music, Gamepad2, BrainCircuit,
  PersonStanding, Plane, Disc3, Crosshair, type LucideIcon,
} from 'lucide-react';
import { EVENTS, type EventCategory, type FestEvent } from '../festData';

const ICONS: Record<string, LucideIcon> = {
  Code2, Bot, Music, Gamepad2, BrainCircuit, PersonStanding, Plane, Disc3, Crosshair,
};

const FILTERS: (EventCategory | 'All')[] = ['All', 'Tech', 'Cultural', 'Gaming', 'Workshop'];

const ACCENT: Record<FestEvent['accent'], { ring: string; text: string; chip: string; glow: string; bar: string }> = {
  pulse: {
    ring: 'hover:border-pulse-400/50',
    text: 'text-pulse-300',
    chip: 'bg-pulse-500/15 text-pulse-300 border-pulse-400/20',
    glow: 'group-hover:shadow-[0_0_50px_-12px_rgba(34,217,150,0.5)]',
    bar: 'from-pulse-400 to-pulse-600',
  },
  volt: {
    ring: 'hover:border-volt-400/50',
    text: 'text-volt-300',
    chip: 'bg-volt-500/15 text-volt-300 border-volt-400/20',
    glow: 'group-hover:shadow-[0_0_50px_-12px_rgba(72,180,255,0.5)]',
    bar: 'from-volt-400 to-volt-600',
  },
  amber: {
    ring: 'hover:border-amber-400/50',
    text: 'text-amber-400',
    chip: 'bg-amber-500/15 text-amber-400 border-amber-400/20',
    glow: 'group-hover:shadow-[0_0_50px_-12px_rgba(245,158,11,0.45)]',
    bar: 'from-amber-400 to-amber-500',
  },
};

export default function Events() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');

  const filtered = filter === 'All' ? EVENTS : EVENTS.filter((e) => e.category === filter);

  return (
    <section id="events" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-pulse-400">
              The Lineup
            </p>
            <h2 className="font-clash text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Events that <span className="text-gradient-pulse">hit different</span>
            </h2>
            <p className="mt-4 max-w-xl text-white/60">
              From 36-hour hackathons to laser-dome concerts — pick your battles, rally your crew, and take home the prize pool.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  filter === f
                    ? 'border-transparent bg-white text-ink-950'
                    : 'border-white/10 bg-white/5 text-white/65 hover:border-white/25 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event, i) => {
            const a = ACCENT[event.accent];
            const Icon = ICONS[event.icon] ?? Code2;
            return (
              <article
                key={event.id}
                className={`reveal group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-6 backdrop-blur transition-all duration-300 ${a.ring} ${a.glow}`}
                data-delay={(i % 3) * 90}
              >
                {/* top accent line */}
                <div className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r ${a.bar} transition-transform duration-500 group-hover:scale-x-100`} />

                <div className="flex items-start justify-between">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${a.chip}`}>
                    {event.category}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-ink-900/60">
                    <Icon className={`h-5 w-5 ${a.text}`} />
                  </span>
                </div>

                <h3 className="mt-5 font-clash text-2xl font-bold leading-tight tracking-tight">
                  {event.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-white/55">
                  {event.blurb}
                </p>

                {/* meta */}
                <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/8 pt-4 text-xs">
                  <div>
                    <dt className="text-white/40">Prize</dt>
                    <dd className={`mt-0.5 font-semibold ${a.text}`}>{event.prize}</dd>
                  </div>
                  <div>
                    <dt className="text-white/40">Team</dt>
                    <dd className="mt-0.5 font-semibold text-white/85">{event.teamSize}</dd>
                  </div>
                  <div>
                    <dt className="text-white/40">Day {event.day}</dt>
                    <dd className="mt-0.5 font-semibold text-white/85">{event.time}</dd>
                  </div>
                  <div>
                    <dt className="text-white/40">Venue</dt>
                    <dd className="mt-0.5 font-semibold text-white/85">{event.venue}</dd>
                  </div>
                </dl>

                <a
                  href="#register"
                  className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${a.text} transition-transform duration-300 group-hover:gap-2.5`}
                >
                  Register for this
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
