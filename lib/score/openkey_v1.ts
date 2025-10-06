import { priceScore, sizeScore, locationScore, timelineScore } from "./subscores";
import { amenityMatchScore } from "./amenities";
import { docsCompletenessScore } from "./transparency";
import { cosineSimFromText } from "./semantic";
import type { Project } from "@/lib/data/projects";
import type { UserIntent } from "./intent";

export type Subscores = {
  price: number;
  size: number;
  location: number;
  timeline: number;
  semantic: number;
  amenities: number;
  transparency: number;
  qfit: number; // quantitative fit (average of price, size, location, timeline)
  qres: number; // qualitative resonance (weighted semantic + amenities)
};

export function scoreProject(
  project: Project,
  intent: UserIntent
): { score: number; subs: Subscores } {
  // Quantitative subscores
  const price = priceScore(intent.budgetMin, intent.budgetMax, project.price_aed);
  const size = sizeScore(intent.sizeMin, intent.sizeMax, project.size_sqm);
  const location = locationScore(intent.preferredAreas, {
    lat: project.lat,
    lon: project.lon,
  });
  const timeline = timelineScore(
    intent.preferredHandoverMonth,
    project.handover_month
  );

  // Quantitative fit: average of the four hard metrics
  const qfit = Math.round((price + size + location + timeline) / 4);

  // Qualitative subscores
  const semantic = Math.round(
    cosineSimFromText(
      intent.rawText,
      project.short_desc + " " + project.key_highlights
    ) * 100
  );
  const amenities = amenityMatchScore(
    intent.amenitiesRequested,
    project.amenities
  );

  // Qualitative resonance: 70% semantic, 30% amenities
  const qres = Math.round(0.7 * semantic + 0.3 * amenities);

  // Transparency
  const transparency = docsCompletenessScore(project.docs);

  // Final OpenKey Score: 55% qfit, 35% qres, 10% transparency
  const score = Math.round(0.55 * qfit + 0.35 * qres + 0.1 * transparency);

  return {
    score,
    subs: {
      price,
      size,
      location,
      timeline,
      semantic,
      amenities,
      transparency,
      qfit,
      qres,
    },
  };
}