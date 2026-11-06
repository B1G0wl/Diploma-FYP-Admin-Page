// Browser-only demo data for the HR preview. No Firebase connection is required.
export const DEMO_EVENTS = [
  { id: 'codeclash', Slogan: 'Code Clash', Committee: 'Technical Committee', description: 'An exciting coding competition where students solve programming challenges, collaborate, and showcase their problem-solving skills.', Image: 'codeclash', date: '15/02/2026' },
  { id: 'ideathon', Slogan: 'Ideathon', Committee: 'Innovation Cell', description: 'A platform for creative minds to pitch innovative ideas and turn meaningful solutions into practical projects.', Image: 'ideathon', date: '22/02/2026' },
  { id: 'techmela', Slogan: 'Tech Mela', Committee: 'Technical Committee', description: 'A celebration of technology featuring student projects, interactive exhibits, and hands-on demonstrations.', Image: 'techmela', date: '05/03/2026' },
  { id: 'neoncricket', Slogan: 'Neon Cricket', Committee: 'Sports Committee', description: 'A fun-filled night cricket event bringing teams together for friendly competition and unforgettable moments.', Image: 'neoncricket', date: '12/03/2026' },
];

const STORAGE_KEY = 'bigowl_demo_events';

export function getDemoEvents() {
  if (typeof window === 'undefined') return DEMO_EVENTS;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_EVENTS));
  } catch (error) {
    console.warn('Unable to read demo events:', error);
  }
  return DEMO_EVENTS;
}

export function saveDemoEvents(events) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  window.dispatchEvent(new Event('bigowl-events-updated'));
}

export async function fetchEventData() {
  return getDemoEvents();
}

export const eventLength = DEMO_EVENTS.length;
export const unsubscribe = () => {};
