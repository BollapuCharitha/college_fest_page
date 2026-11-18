/*
# PULSE Fest 2026 — Database schema

## Overview
Creates the data layer for the PULSE 2026 college fest website (a public landing
page with a registration form). This is a single-tenant, no-auth app: visitors
land on the page and can register for a free fest pass without signing in.
Therefore all policies target `anon, authenticated` and there is no `user_id`.

## 1. New Tables

- `events` — the catalogue of fest events (CodeClash, RoboWars, etc.)
  - `id` text PRIMARY KEY (stable slug like 'e1', 'e2' matching the frontend)
  - `title` text NOT NULL
  - `category` text NOT NULL — one of Tech | Cultural | Gaming | Sports | Workshop
  - `blurb` text NOT NULL
  - `prize` text NOT NULL
  - `day` smallint NOT NULL CHECK (1..3)
  - `time` text NOT NULL
  - `venue` text NOT NULL
  - `team_size` text NOT NULL
  - `accent` text NOT NULL — pulse | volt | amber
  - `icon` text NOT NULL — lucide icon name
  - `created_at` timestamptz DEFAULT now()

- `schedule_days` — the three fest days and their labelled slots
  - `id` smallint PRIMARY KEY (1, 2, 3 — the day number)
  - `label` text NOT NULL — e.g. 'Day 01'
  - `date` text NOT NULL — e.g. 'Sat, Mar 14'

- `schedule_slots` — individual time-slot entries on a day
  - `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
  - `day_id` smallint REFERENCES schedule_days(id) ON DELETE CASCADE
  - `time` text NOT NULL
  - `title` text NOT NULL
  - `venue` text NOT NULL
  - `kind` text NOT NULL — flag | tech | cultural | game | close
  - `position` int NOT NULL DEFAULT 0 (keeps slots ordered within a day)

- `sponsors` — fest sponsors grouped by tier
  - `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
  - `name` text NOT NULL
  - `tier` text NOT NULL — Title | Platinum | Gold | Innovation
  - `position` int NOT NULL DEFAULT 0

- `registrations` — people who claim a free pass via the registration form
  - `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
  - `full_name` text NOT NULL
  - `email` text NOT NULL
  - `college` text NOT NULL
  - `created_at` timestamptz DEFAULT now()
  - Unique on `email` so a visitor can only register once

## 2. Security (RLS + Grants)

All tables have RLS enabled.

- `events`, `schedule_days`, `schedule_slots`, `sponsors`:
  - SELECT only is granted to `anon, authenticated` — these are read-only
    catalogue data shown to every visitor. No INSERT/UPDATE/DELETE through the
    Data API (admin changes go through the service role / dashboard).
  - One SELECT policy `USING (true)` per table — the data is intentionally
    public so any visitor can read it.

- `registrations`:
  - INSERT granted to `anon, authenticated` — visitors submit the form without
    signing in. SELECT/UPDATE/DELETE are NOT granted to anon/authenticated:
    a visitor can create their registration but cannot list or read other
    people's registrations (emails are private). Admin reads happen via the
    service role which bypasses RLS.
  - INSERT policy `WITH CHECK (true)` — any visitor may insert a row.
  - No SELECT policy for anon/authenticated, so the Data API returns nothing
    on reads — protecting registrant privacy.

## 3. Indexes
- `registrations_email_idx` unique index on `registrations(email)` — enforces
  one pass per email and speeds duplicate lookups.
- `schedule_slots_day_idx` on `schedule_slots(day_id)` — day-based queries.
- `sponsors_tier_idx` on `sponsors(tier)`.

## 4. Notes
- This migration is idempotent: every CREATE uses IF NOT EXISTS and every
  policy is dropped before recreate.
- No `user_id` / `auth.uid()` columns — this is a public, no-auth fest site.
- Day numbers are stored as smallint PKs (1,2,3) so schedule_slots can FK to
  them and the frontend day filter maps cleanly.
*/

-- ---------- events ----------
CREATE TABLE IF NOT EXISTS events (
  id text PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL CHECK (category IN ('Tech','Cultural','Gaming','Sports','Workshop')),
  blurb text NOT NULL,
  prize text NOT NULL,
  day smallint NOT NULL CHECK (day BETWEEN 1 AND 3),
  time text NOT NULL,
  venue text NOT NULL,
  team_size text NOT NULL,
  accent text NOT NULL CHECK (accent IN ('pulse','volt','amber')),
  icon text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON events TO anon, authenticated;
DROP POLICY IF EXISTS "public_read_events" ON events;
CREATE POLICY "public_read_events" ON events FOR SELECT
  TO anon, authenticated USING (true);

-- ---------- schedule_days ----------
CREATE TABLE IF NOT EXISTS schedule_days (
  id smallint PRIMARY KEY,
  label text NOT NULL,
  date text NOT NULL
);
ALTER TABLE schedule_days ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON schedule_days TO anon, authenticated;
DROP POLICY IF EXISTS "public_read_schedule_days" ON schedule_days;
CREATE POLICY "public_read_schedule_days" ON schedule_days FOR SELECT
  TO anon, authenticated USING (true);

-- ---------- schedule_slots ----------
CREATE TABLE IF NOT EXISTS schedule_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_id smallint NOT NULL REFERENCES schedule_days(id) ON DELETE CASCADE,
  time text NOT NULL,
  title text NOT NULL,
  venue text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('flag','tech','cultural','game','close')),
  position int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE schedule_slots ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON schedule_slots TO anon, authenticated;
DROP POLICY IF EXISTS "public_read_schedule_slots" ON schedule_slots;
CREATE POLICY "public_read_schedule_slots" ON schedule_slots FOR SELECT
  TO anon, authenticated USING (true);
CREATE INDEX IF NOT EXISTS schedule_slots_day_idx ON schedule_slots(day_id);

-- ---------- sponsors ----------
CREATE TABLE IF NOT EXISTS sponsors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  tier text NOT NULL CHECK (tier IN ('Title','Platinum','Gold','Innovation')),
  position int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON sponsors TO anon, authenticated;
DROP POLICY IF EXISTS "public_read_sponsors" ON sponsors;
CREATE POLICY "public_read_sponsors" ON sponsors FOR SELECT
  TO anon, authenticated USING (true);
CREATE INDEX IF NOT EXISTS sponsors_tier_idx ON sponsors(tier);

-- ---------- registrations ----------
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  college text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
GRANT INSERT ON registrations TO anon, authenticated;
DROP POLICY IF EXISTS "public_insert_registrations" ON registrations;
CREATE POLICY "public_insert_registrations" ON registrations FOR INSERT
  TO anon, authenticated WITH CHECK (true);
CREATE UNIQUE INDEX IF NOT EXISTS registrations_email_idx ON registrations(email);
