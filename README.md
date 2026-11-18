# PULSE 2026 — Neon Renaissance

A high-energy, production-ready landing page for **PULSE**, a 3-day college techno-cultural festival. Built with a neon-Renaissance aesthetic: dark ink backgrounds, gradient accents, scroll-reveal animations, and a live countdown to opening day.

> **PULSE 2026 · Neon Renaissance**
> March 14–16, 2026 · NIST University, Bengaluru
> 60+ events · ₹25,00,000 prize pool · 1,00,000+ footfall · 400+ colleges

## Features

- **Hero** with a live countdown timer to the festival opening ceremony
- **Events** grid — 9 flagship events across Tech, Cultural, Gaming, Sports & Workshop categories, each with prize, day, venue, and team size
- **Schedule** — a 3-day, tabbed itinerary of flag, tech, cultural, gaming, and closing slots
- **About** — festival stats and the Neon Renaissance concept
- **Sponsors** — tiered sponsor wall (Title / Platinum / Gold / Innovation)
- **Register** — a free-pass registration form (simulated submit; wired for Supabase in production)
- **Footer** with social links
- Scroll-reveal animations via `IntersectionObserver` (`src/useReveal.ts`)
- Fully responsive from mobile to desktop

## Tech Stack

| Layer       | Choice                                   |
| ----------- | ---------------------------------------- |
| Framework   | React 18 + TypeScript                    |
| Build tool  | Vite 5                                    |
| Styling     | Tailwind CSS 3 (custom `ink`/`pulse`/`volt`/`amber` color ramps) |
| Icons       | lucide-react                              |
| Backend     | Supabase (ready to wire up for registrations) |
| Fonts       | Space Grotesk + JetBrains Mono (Google Fonts) |

## Getting Started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# type-check
npm run typecheck

# lint
npm run lint

# production build
npm run build

# preview the production build locally
npm run preview
```

## Project Structure

```
src/
├── App.tsx                 # Root — assembles all sections
├── main.tsx                # React entry point
├── index.css               # Tailwind layers, fonts, base styles, utilities
├── useReveal.ts            # IntersectionObserver scroll-reveal hook
├── festData.ts             # All festival content (events, schedule, sponsors, meta)
└── components/
    ├── Navbar.tsx          # Sticky nav with smooth-scroll links
    ├── Hero.tsx            # Headline + live countdown
    ├── Events.tsx          # Filterable events grid
    ├── Schedule.tsx        # 3-day tabbed schedule
    ├── About.tsx           # Festival story + stats
    ├── Sponsors.tsx        # Tiered sponsor wall
    ├── Register.tsx        # Free-pass registration form
    └── Footer.tsx          # Social + footer links
```

## Customizing the Festival

All content is data-driven and lives in **`src/festData.ts`**. Edit the `FEST` object to change the name, edition, dates, location, stats, and countdown target, and modify the `EVENTS`, `SCHEDULE`, and `SPONSORS` arrays to update the program.

## Production: Wiring Registrations to Supabase

The registration form currently simulates a successful submit. To persist entries, create a `registrations` table in Supabase and replace the `setTimeout` in `src/components/Register.tsx` with a `supabase.from('registrations').insert(...)` call (enable RLS and scope policies to `authenticated` or `anon` as appropriate).

---

Built for PULSE · Neon Renaissance.
