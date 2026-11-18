import { useState } from 'react';
import { Flag, Cpu, Music2, Gamepad2, Trophy } from 'lucide-react';
import { SCHEDULE, type ScheduleSlot } from '../festData';

const KIND: Record<ScheduleSlot['kind'], { icon: typeof Flag; color: string; dot: string }> = {
  flag: { icon: Flag, color: 'text-amber-400', dot: 'bg-amber-400' },
  tech: { icon: Cpu, color: 'text-pulse-300', dot: 'bg-pulse-400' },
  cultural: { icon: Music2, color: 'text-volt-300', dot: 'bg-volt-400' },
  game: { icon: Gamepad2, color: 'text-volt-300', dot: 'bg-volt-400' },
  close: { icon: Trophy, color: 'text-amber-400', dot: 'bg-amber-400' },
};

export default function Schedule() {
  const [active, setActive] = useState(0);
  const day = SCHEDULE[active];

  return (
    <section id="schedule" className="relative py-24 sm:py-32">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-volt-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <div className="reveal text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-volt-400">
            Three Days, One Frequency
          </p>
          <h2 className="font-clash text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            The <span className="text-gradient-volt">schedule</span>
          </h2>
        </div>

        {/* Day tabs */}
        <div className="reveal mt-10 flex justify-center" data-delay="80">
          <div className="inline-flex gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur">
            {SCHEDULE.map((d, i) => (
              <button
                key={d.day}
                onClick={() => setActive(i)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  active === i ? 'text-ink-950' : 'text-white/60 hover:text-white'
                }`}
              >
                {active === i && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pulse-400 to-volt-500" />
                )}
                <span className="relative">{d.label}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="reveal mt-4 text-center text-sm text-white/50" data-delay="120">
          {day.label} · {day.date}
        </p>

        {/* Timeline */}
        <div key={active} className="mt-12">
          <ol className="relative border-l border-white/10 pl-6 sm:pl-8">
            {day.slots.map((slot, i) => {
              const k = KIND[slot.kind];
              const Icon = k.icon;
              return (
                <li
                  key={i}
                  className="reveal relative pb-8 last:pb-0"
                  data-delay={i * 70}
                >
                  {/* node */}
                  <span className={`absolute -left-[33px] top-1 grid h-6 w-6 place-items-center rounded-full border-2 border-ink-950 sm:-left-[41px] ${k.dot}`}>
                    <Icon className="h-3 w-3 text-ink-950" strokeWidth={2.6} />
                  </span>

                  <div className="group rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] sm:p-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-semibold text-white sm:text-lg">{slot.title}</h3>
                      <span className="font-mono text-sm font-semibold tabular-nums text-white/70">
                        {slot.time}
                      </span>
                    </div>
                    <p className={`mt-1.5 inline-flex items-center gap-1.5 text-xs ${k.color}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${k.dot}`} />
                      {slot.venue}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
