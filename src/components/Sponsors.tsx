import {
  Rocket, Cloud, BrainCircuit, CreditCard, UtensilsCrossed,
  Camera, Terminal, Shirt, BatteryCharging, ShieldCheck, Truck, Speaker,
  type LucideIcon,
} from 'lucide-react';
import { SPONSORS, type Sponsor } from '../festData';

const LOGO: Record<string, LucideIcon> = {
  'Quantum Motors': Rocket,
  'Nimbus Cloud': Cloud,
  'Vertex AI': BrainCircuit,
  'OrbitPay': CreditCard,
  'Hyperloop Foods': UtensilsCrossed,
  'Lumen Studios': Camera,
  'ByteForge': Terminal,
  'Aperture Wear': Shirt,
  'Pulse Energy': BatteryCharging,
  'Cipher Securities': ShieldCheck,
  'NorthStar Logistics': Truck,
  'Echo Audio': Speaker,
};

const TIER_BADGE: Record<Sponsor['tier'], string> = {
  Title: 'text-amber-400',
  Platinum: 'text-white',
  Gold: 'text-amber-400',
  Innovation: 'text-pulse-300',
};

function LogoCard({ name, tier }: Sponsor) {
  const Icon = LOGO[name] ?? Rocket;
  return (
    <div className="group mx-3 flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 backdrop-blur transition-all duration-300 hover:border-pulse-400/30 hover:bg-white/[0.08] sm:mx-4 sm:px-6">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-white/80 transition-colors duration-300 group-hover:text-pulse-300">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </span>
      <div className="flex flex-col">
        <span className="font-clash text-base font-bold tracking-tight text-white/90 transition-colors duration-300 group-hover:text-white sm:text-lg">
          {name}
        </span>
        <span className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${TIER_BADGE[tier]}`}>
          {tier}
        </span>
      </div>
    </div>
  );
}

export default function Sponsors() {
  // Split into two rows for opposite-direction marquees
  const half = Math.ceil(SPONSORS.length / 2);
  const rowA = SPONSORS.slice(0, half);
  const rowB = SPONSORS.slice(half);

  return (
    <section id="sponsors" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-pulse-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-pulse-400">
            Powered By
          </p>
          <h2 className="font-clash text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Our <span className="text-gradient-pulse">partners</span> in crime
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/55">
            The brands making PULSE {('2026')} possible — from title sponsors to the innovators building the future.
          </p>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="relative mt-16 space-y-5">
        {/* Row A — left to right */}
        <div className="marquee-wrap mask-fade-x">
          <div className="marquee-track">
            {[...rowA, ...rowA].map((s, i) => (
              <LogoCard key={`a-${i}`} {...s} />
            ))}
          </div>
        </div>

        {/* Row B — right to left (reverse) */}
        <div className="marquee-wrap mask-fade-x">
          <div className="marquee-track rev">
            {[...rowB, ...rowB].map((s, i) => (
              <LogoCard key={`b-${i}`} {...s} />
            ))}
          </div>
        </div>
      </div>

      <p className="reveal mt-12 text-center text-sm text-white/40" data-delay="120">
        Want your brand here?{' '}
        <a href="#register" className="font-semibold text-pulse-300 underline-offset-4 hover:underline">
          Become a sponsor →
        </a>
      </p>
    </section>
  );
}
