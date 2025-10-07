// Controlled vocabulary of amenities we recognize
const AMENITY_VOCAB = [
    "pool",
    "gym",
    "beach_access",
    "parking",
    "kids_area",
    "concierge",
    "sauna",
    "tennis",
    "pet_friendly",
    "co_working",
    "metro",
    "tram",
    "school_nearby",
    "park_nearby",
    "marina_access",
    "golf_course",
    "cinema",
  ];
  
  // Extract amenities mentioned in user's prompt
  export function extractPromptAmenities(text: string): string[] {
    const t = text.toLowerCase();
    return AMENITY_VOCAB.filter(
      (amenity) =>
        t.includes(amenity.replace("_", " ")) || t.includes(amenity)
    ).slice(0, 8); // max 8 amenities
  }
  
  // Score how well project amenities match what user requested
  export function amenityMatchScore(
    requested: string[],
    projectAmenities: string[]
  ): number {
    if (!requested || requested.length === 0) return 70; // neutral prior when none specified
  
    const matches = requested.filter((a) => projectAmenities.includes(a));
    return Math.round((matches.length / requested.length) * 100);
  }
