/*
# Seed PULSE Fest catalogue data

## Overview
Populates the read-only catalogue tables (`events`, `schedule_days`,
`schedule_slots`, `sponsors`) with the fest content that currently lives
hard-coded in the frontend's `src/festData.ts`. This mirrors that file so the
website can later load these from the database instead.

## 1. events
Inserts 9 events (e1..e9) with their category, prize, day, time, venue, team
size, accent colour and lucide icon — matching `EVENTS` in festData.ts.

## 2. schedule_days
Inserts the three fest days (id 1, 2, 3) with label and date.

## 3. schedule_slots
Inserts the 18 schedule slots across the three days, ordered by `position`.

## 4. sponsors
Inserts the 12 sponsors grouped by tier (Title, Platinum, Gold, Innovation),
ordered by `position` within tier.

## 5. Idempotency
- `events` and `schedule_days` use `ON CONFLICT (id) DO UPDATE` so re-running
  the migration updates rows in place instead of erroring on duplicates.
- `schedule_slots` and `sponsors` use a DELETE + INSERT pattern scoped to avoid
  duplicates on re-run: schedule_slots are deleted per-day before re-insert;
  sponsors are fully deleted before re-insert. This is safe because these
  tables hold only seeded reference data (no user-created rows).
- No registrations are seeded (that table is filled by website visitors).
*/

-- ---------- events ----------
INSERT INTO events (id, title, category, blurb, prize, day, time, venue, team_size, accent, icon) VALUES
  ('e1','CodeClash Hackathon','Tech','36 hours. Real problem statements from product startups. Build, ship, win.','₹2,00,000',1,'10:00 – 22:00','Innovation Block','4','pulse','Code2'),
  ('e2','RoboWars Arena','Tech','Combat bots clash in a bullet-proof arena. Last bot rolling takes the crown.','₹1,50,000',2,'14:00 – 18:00','Tech Park','5','volt','Bot'),
  ('e3','Neon Night Concert','Cultural','Headliner: Anuv Jain + a synthwave DJ set under a laser dome.','—',2,'19:30 – 23:00','Main Ground','Solo','pulse','Music'),
  ('e4','Valorant Showdown','Gaming','5v5 tactical FPS LAN tournament. Double elimination. Live cast on stage.','₹75,000',1,'11:00 – 20:00','Gaming Lounge','5','volt','Gamepad2'),
  ('e5','AI Forge Workshop','Workshop','Hands-on LLM fine-tuning lab with engineers from leading AI labs.','Certificate',3,'09:30 – 13:00','Seminar Hall A','Solo','amber','BrainCircuit'),
  ('e6','Dance Duel','Cultural','Inter-college choreography battle. Hip-hop, contemporary, fusion — any style.','₹1,00,000',1,'16:00 – 21:00','Open Air Theatre','8','pulse','PersonStanding'),
  ('e7','Drone Racing GP','Tech','FPV drones rip through a neon-lit circuit. Fastest lap wins.','₹90,000',3,'15:00 – 18:30','Sky Track','2','volt','Plane'),
  ('e8','Battle of Bands','Cultural','Original sets, 25 mins each. Judges from the indie music circuit.','₹1,20,000',2,'15:00 – 19:00','Amphitheatre','6','pulse','Disc3'),
  ('e9','BGMI Pro League','Gaming','Chicken Dinner on the big screen. 4 maps, 16 squads, one winner.','₹60,000',3,'10:00 – 17:00','Gaming Lounge','4','volt','Crosshair')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  blurb = EXCLUDED.blurb,
  prize = EXCLUDED.prize,
  day = EXCLUDED.day,
  time = EXCLUDED.time,
  venue = EXCLUDED.venue,
  team_size = EXCLUDED.team_size,
  accent = EXCLUDED.accent,
  icon = EXCLUDED.icon;

-- ---------- schedule_days ----------
INSERT INTO schedule_days (id, label, date) VALUES
  (1,'Day 01','Sat, Mar 14'),
  (2,'Day 02','Sun, Mar 15'),
  (3,'Day 03','Mon, Mar 16')
ON CONFLICT (id) DO UPDATE SET
  label = EXCLUDED.label,
  date = EXCLUDED.date;

-- ---------- schedule_slots ----------
DELETE FROM schedule_slots;
INSERT INTO schedule_slots (day_id, time, title, venue, kind, position) VALUES
  -- Day 1
  (1,'09:00','Opening Ceremony & Keynote — Dr. K. Saraswat','Main Ground','flag',1),
  (1,'10:00','CodeClash Hackathon kicks off','Innovation Block','tech',2),
  (1,'11:00','Valorant Showdown — Group Stage','Gaming Lounge','game',3),
  (1,'13:00','Munch Street food festival opens','Quad','flag',4),
  (1,'16:00','Dance Duel — Prelims','Open Air Theatre','cultural',5),
  (1,'19:00','Sunset Unplugged — acoustic showcase','Amphitheatre','cultural',6),
  -- Day 2
  (2,'09:30','RoboWars Arena — Qualifiers','Tech Park','tech',1),
  (2,'11:00','Tech Talk: "Scaling to a billion users"','Seminar Hall B','tech',2),
  (2,'14:00','RoboWars Arena — Finals','Tech Park','tech',3),
  (2,'15:00','Battle of Bands — Prelims','Amphitheatre','cultural',4),
  (2,'17:00','Dance Duel — Finals','Open Air Theatre','cultural',5),
  (2,'19:30','Neon Night Concert — headliner set','Main Ground','flag',6),
  -- Day 3
  (3,'09:30','AI Forge Workshop — LLM lab','Seminar Hall A','tech',1),
  (3,'10:00','BGMI Pro League — Grand Finals','Gaming Lounge','game',2),
  (3,'15:00','Drone Racing GP — Final laps','Sky Track','tech',3),
  (3,'17:00','CodeClash final demos + judging','Innovation Block','tech',4),
  (3,'19:00','Award Night & Prize Distribution','Main Ground','close',5),
  (3,'21:30','Closing Afterparty — DJ + fireworks','Main Ground','close',6);

-- ---------- sponsors ----------
DELETE FROM sponsors;
INSERT INTO sponsors (name, tier, position) VALUES
  ('Quantum Motors','Title',1),
  ('Nimbus Cloud','Title',2),
  ('Vertex AI','Platinum',1),
  ('OrbitPay','Platinum',2),
  ('Hyperloop Foods','Gold',1),
  ('Lumen Studios','Gold',2),
  ('ByteForge','Gold',3),
  ('Aperture Wear','Innovation',1),
  ('Pulse Energy','Innovation',2),
  ('Cipher Securities','Innovation',3),
  ('NorthStar Logistics','Innovation',4),
  ('Echo Audio','Innovation',5);
