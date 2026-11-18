export const FEST = {
  name: 'PULSE',
  edition: '2026',
  tagline: 'Sync. Surge. Surge.',
  subtitle: 'Sync. Surge. Surrender.',
  editionName: 'Neon Renaissance',
  dates: 'March 14 – 16, 2026',
  location: 'NIST University, Bengaluru',
  footfall: '1,00,000+',
  colleges: '400+',
  eventsCount: '60+',
  prizePool: '₹25,00,000',
  // Countdown target — March 14, 2026 09:00 IST (UTC+5:30) => 03:30 UTC
  targetISO: '2026-03-14T03:30:00Z',
} as const;

export type EventCategory = 'Tech' | 'Cultural' | 'Gaming' | 'Sports' | 'Workshop';

export interface FestEvent {
  id: string;
  title: string;
  category: EventCategory;
  blurb: string;
  prize: string;
  day: 1 | 2 | 3;
  time: string;
  venue: string;
  teamSize: string;
  accent: 'pulse' | 'volt' | 'amber';
  icon: string; // lucide name
}

export const EVENTS: FestEvent[] = [
  { id: 'e1', title: 'CodeClash Hackathon', category: 'Tech', blurb: '36 hours. Real problem statements from product startups. Build, ship, win.', prize: '₹2,00,000', day: 1, time: '10:00 – 22:00', venue: 'Innovation Block', teamSize: '4', accent: 'pulse', icon: 'Code2' },
  { id: 'e2', title: 'RoboWars Arena', category: 'Tech', blurb: 'Combat bots clash in a bullet-proof arena. Last bot rolling takes the crown.', prize: '₹1,50,000', day: 2, time: '14:00 – 18:00', venue: 'Tech Park', teamSize: '5', accent: 'volt', icon: 'Bot' },
  { id: 'e3', title: 'Neon Night Concert', category: 'Cultural', blurb: 'Headliner: Anuv Jain + a synthwave DJ set under a laser dome.', prize: '—', day: 2, time: '19:30 – 23:00', venue: 'Main Ground', teamSize: 'Solo', accent: 'pulse', icon: 'Music' },
  { id: 'e4', title: 'Valorant Showdown', category: 'Gaming', blurb: '5v5 tactical FPS LAN tournament. Double elimination. Live cast on stage.', prize: '₹75,000', day: 1, time: '11:00 – 20:00', venue: 'Gaming Lounge', teamSize: '5', accent: 'volt', icon: 'Gamepad2' },
  { id: 'e5', title: 'AI Forge Workshop', category: 'Workshop', blurb: 'Hands-on LLM fine-tuning lab with engineers from leading AI labs.', prize: 'Certificate', day: 3, time: '09:30 – 13:00', venue: 'Seminar Hall A', teamSize: 'Solo', accent: 'amber', icon: 'BrainCircuit' },
  { id: 'e6', title: 'Dance Duel', category: 'Cultural', blurb: 'Inter-college choreography battle. Hip-hop, contemporary, fusion — any style.', prize: '₹1,00,000', day: 1, time: '16:00 – 21:00', venue: 'Open Air Theatre', teamSize: '8', accent: 'pulse', icon: 'PersonStanding' },
  { id: 'e7', title: 'Drone Racing GP', category: 'Tech', blurb: 'FPV drones rip through a neon-lit circuit. Fastest lap wins.', prize: '₹90,000', day: 3, time: '15:00 – 18:30', venue: 'Sky Track', teamSize: '2', accent: 'volt', icon: 'Plane' },
  { id: 'e8', title: 'Battle of Bands', category: 'Cultural', blurb: 'Original sets, 25 mins each. Judges from the indie music circuit.', prize: '₹1,20,000', day: 2, time: '15:00 – 19:00', venue: 'Amphitheatre', teamSize: '6', accent: 'pulse', icon: 'Disc3' },
  { id: 'e9', title: 'BGMI Pro League', category: 'Gaming', blurb: 'Chicken Dinner on the big screen. 4 maps, 16 squads, one winner.', prize: '₹60,000', day: 3, time: '10:00 – 17:00', venue: 'Gaming Lounge', teamSize: '4', accent: 'volt', icon: 'Crosshair' },
];

export interface ScheduleSlot {
  time: string;
  title: string;
  venue: string;
  kind: 'flag' | 'tech' | 'cultural' | 'game' | 'close';
}

export const SCHEDULE: { day: 1 | 2 | 3; label: string; date: string; slots: ScheduleSlot[] }[] = [
  {
    day: 1, label: 'Day 01', date: 'Sat, Mar 14',
    slots: [
      { time: '09:00', title: 'Opening Ceremony & Keynote — Dr. K. Saraswat', venue: 'Main Ground', kind: 'flag' },
      { time: '10:00', title: 'CodeClash Hackathon kicks off', venue: 'Innovation Block', kind: 'tech' },
      { time: '11:00', title: 'Valorant Showdown — Group Stage', venue: 'Gaming Lounge', kind: 'game' },
      { time: '13:00', title: 'Munch Street food festival opens', venue: 'Quad', kind: 'flag' },
      { time: '16:00', title: 'Dance Duel — Prelims', venue: 'Open Air Theatre', kind: 'cultural' },
      { time: '19:00', title: 'Sunset Unplugged — acoustic showcase', venue: 'Amphitheatre', kind: 'cultural' },
    ],
  },
  {
    day: 2, label: 'Day 02', date: 'Sun, Mar 15',
    slots: [
      { time: '09:30', title: 'RoboWars Arena — Qualifiers', venue: 'Tech Park', kind: 'tech' },
      { time: '11:00', title: 'Tech Talk: "Scaling to a billion users"', venue: 'Seminar Hall B', kind: 'tech' },
      { time: '14:00', title: 'RoboWars Arena — Finals', venue: 'Tech Park', kind: 'tech' },
      { time: '15:00', title: 'Battle of Bands — Prelims', venue: 'Amphitheatre', kind: 'cultural' },
      { time: '17:00', title: 'Dance Duel — Finals', venue: 'Open Air Theatre', kind: 'cultural' },
      { time: '19:30', title: 'Neon Night Concert — headliner set', venue: 'Main Ground', kind: 'flag' },
    ],
  },
  {
    day: 3, label: 'Day 03', date: 'Mon, Mar 16',
    slots: [
      { time: '09:30', title: 'AI Forge Workshop — LLM lab', venue: 'Seminar Hall A', kind: 'tech' },
      { time: '10:00', title: 'BGMI Pro League — Grand Finals', venue: 'Gaming Lounge', kind: 'game' },
      { time: '15:00', title: 'Drone Racing GP — Final laps', venue: 'Sky Track', kind: 'tech' },
      { time: '17:00', title: 'CodeClash final demos + judging', venue: 'Innovation Block', kind: 'tech' },
      { time: '19:00', title: 'Award Night & Prize Distribution', venue: 'Main Ground', kind: 'close' },
      { time: '21:30', title: 'Closing Afterparty — DJ + fireworks', venue: 'Main Ground', kind: 'close' },
    ],
  },
];

export interface Sponsor {
  name: string;
  tier: 'Title' | 'Platinum' | 'Gold' | 'Innovation';
}

export const SPONSORS: Sponsor[] = [
  { name: 'Quantum Motors', tier: 'Title' },
  { name: 'Nimbus Cloud', tier: 'Title' },
  { name: 'Vertex AI', tier: 'Platinum' },
  { name: 'OrbitPay', tier: 'Platinum' },
  { name: 'Hyperloop Foods', tier: 'Gold' },
  { name: 'Lumen Studios', tier: 'Gold' },
  { name: 'ByteForge', tier: 'Gold' },
  { name: 'Aperture Wear', tier: 'Innovation' },
  { name: 'Pulse Energy', tier: 'Innovation' },
  { name: 'Cipher Securities', tier: 'Innovation' },
  { name: 'NorthStar Logistics', tier: 'Innovation' },
  { name: 'Echo Audio', tier: 'Innovation' },
];
