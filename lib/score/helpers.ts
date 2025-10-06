// Clamp a number between 0 and 1
export const clamp01 = (n: number): number => Math.max(0, Math.min(1, n));

// Convert 0-1 to 0-100 percentage
export const pct = (x: number): number => Math.round(clamp01(x) * 100);

// Linear score: maps a value within [min, max] to 0-100
export function linearScore(current: number, min: number, max: number): number {
  if (min === max) return 100;
  const t = clamp01((current - min) / (max - min));
  return Math.round(t * 100);
}

// Calculate difference in months between two YYYY-MM strings
export function monthDiff(a: string, b: string): number {
  const [ay, am] = a.split("-").map(Number);
  const [by, bm] = b.split("-").map(Number);
  return Math.abs((ay - by) * 12 + (am - bm));
}

// Calculate distance between two lat/lon points in kilometers (Haversine formula)
export function kmDistance(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number }
): number {
  const R = 6371; // Earth's radius in km
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
}