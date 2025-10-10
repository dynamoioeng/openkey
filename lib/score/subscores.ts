import { kmDistance, monthDiff } from "./helpers";

// Score how well a project's price matches the user's budget
export function priceScore(
  budgetMin?: number,
  budgetMax?: number,
  price?: number
): number {
  if (!price) return 0;
  if (budgetMin == null && budgetMax == null) return 70; // neutral when no budget specified

  const min = budgetMin ?? 0;
  const max = budgetMax ?? min * 2; // fallback if only min given

  // Perfect match
  if (price >= min && price <= max) return 100;

  // Below budget: harder penalty (0 at 50% below min)
  if (price < min) {
    const floor = min * 0.5;
    return Math.max(0, Math.round(100 * ((price - floor) / (min - floor))));
  }

  // Above budget: very harsh penalty (0 at 10% above max)
  const cap = max * 1.10;
  return Math.max(0, Math.round(100 * (1 - (price - max) / (cap - max))));
}

// Score how well a project's size matches the user's desired range
export function sizeScore(
  sizeMin?: number,
  sizeMax?: number,
  size?: number
): number {
  if (!size) return 0;
  if (sizeMin == null && sizeMax == null) return 70; // neutral

  const min = sizeMin ?? 0;
  const max = sizeMax ?? min + 100; // fallback

  // Perfect match
  if (size >= min && size <= max) return 100;

  // Outside range: linear penalty based on deviation
  const band = Math.max(1, max - min);
  const delta = size < min ? min - size : size - max;
  const penalty = Math.min(1, delta / band);
  return Math.round(100 * (1 - penalty));
}

// Score how close a project is to user's preferred areas
export function locationScore(
  preferredAreas: { lat: number; lon: number }[],
  projectLocation: { lat: number; lon: number }
): number {
  if (!preferredAreas || preferredAreas.length === 0) return 80; // neutral

  // Find closest preferred area
  const distances = preferredAreas.map((area) =>
    kmDistance(area, projectLocation)
  );
  const closestDistance = Math.min(...distances);

  // Score: 100 at ≤1km, 0 at ≥25km, linear between
  if (closestDistance <= 1) return 100;
  if (closestDistance >= 25) return 0;
  return Math.round(100 * (1 - (closestDistance - 1) / (25 - 1)));
}

// Score how well handover timeline matches user's preference
export function timelineScore(
  preferredMonth?: string,
  handoverMonth?: string
): number {
  if (!handoverMonth) return 0;
  if (!preferredMonth) return 70; // neutral

  const monthsDiff = monthDiff(preferredMonth, handoverMonth);

  // 0 after 24 months difference; ~4.17 points per month
  return Math.max(0, Math.round(100 - 4.17 * monthsDiff));
}