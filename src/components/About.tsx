import { Flame, Trophy, Mic2, Wrench, Rocket } from 'lucide-react';

const PILLARS = [
  { icon: Rocket, title: 'Origin', text: 'Born in 2009 as a 200-student tech quiz. Now the region\'s largest student-run convergence of code, culture, and chaos.' },
  { icon: Flame, title: 'Spirit', text: 'PULSE is where the quiet coder and the loud frontman share the same green room. No silos, just signal.' },
  { icon: Trophy, title: 'Stakes', text: '₹25 lakh across 60+ events. Industry judges. Recruitment scouts. The springboard for a thousand careers.' },
  { icon: Mic2, title: 'Stage', text: 'Three nights. Two concert headliners. One open mic that runs till sunrise. The speakers never actually stop.' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          {/* Left: heading */}
          <div className="reveal lg:sticky lg:top-28">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-volt-400">
              The Story
            </p>
            <h2 className="font-clash text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              What the <span className="text-gradient-volt">noise</span> is about
            </h2>
            <p className="mt-5 max-w-md text-white/60">
              PULSE isn&apos;t a fest you attend — it&apos;s one you sync to. For 72 hours the whole campus runs on a single frequency, and everyone within range picks it up.
            </p>
            <div className="mt-7 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <Wrench className="h-7 w-7 shrink-0 text-pulse-400" />
              <p className="text-sm text-white/70">
                <span className="font-semibold text-white">Student-built, end to end.</span> 400+ student volunteers design, build, and run every stage, network, and snack stall.
              </p>
            </div>
          </div>

          {/* Right: pillars */}
          <div className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="reveal group rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6 transition-all duration-300 hover:border-white/20"
                  data-delay={(i % 2) * 100}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-ink-900/60 text-pulse-300 transition-colors duration-300 group-hover:text-volt-300">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 font-clash text-xl font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/55">{p.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
