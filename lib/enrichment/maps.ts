// Google Maps Places API enrichment
// Finds nearby parks, schools, metro stations, etc.

import { Client } from "@googlemaps/google-maps-services-js";
import type { Project } from "@/lib/data/projects";

// Types
export type GeocodeResult = {
  lat: number;
  lon: number;
  precision: "exact" | "approximate" | "area";
};

export type NearbyPlace = {
  name: string;
  type: string;
  distance_km: number;
  rating?: number;
  address?: string;
};

export type NearbyData = {
  parks: NearbyPlace[];
  schools: NearbyPlace[];
  transit_stations: NearbyPlace[];
  hospitals: NearbyPlace[];
  shopping_malls: NearbyPlace[];
  restaurants: NearbyPlace[];
  gyms: NearbyPlace[];
  golf_courses: NearbyPlace[];
  beaches: NearbyPlace[];
};

export type EnrichedProject = Project & {
  nearby?: NearbyData;
  geocode_precision?: string;
};

// Initialize Google Maps client
const client = new Client({});

// Haversine distance formula
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(a));
}

// 1. Geocode address to coordinates
export async function geocodeAddress(
  address: string
): Promise<GeocodeResult> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_MAPS_API_KEY not set");
  }

  try {
    console.log(`Geocoding address: ${address}`);
    
    const response = await client.geocode({
      params: {
        address,
        key: apiKey,
      },
    });

    if (response.data.status !== "OK" || !response.data.results.length) {
      throw new Error(`Geocoding failed: ${response.data.status}`);
    }

    const result = response.data.results[0];
    const location = result.geometry.location;
    const locationType = result.geometry.location_type;

    // Map Google's location_type to our precision levels
    let precision: "exact" | "approximate" | "area";
    if (locationType === "ROOFTOP") {
      precision = "exact";
    } else if (
      locationType === "RANGE_INTERPOLATED" ||
      locationType === "GEOMETRIC_CENTER"
    ) {
      precision = "approximate";
    } else {
      precision = "area";
    }

    console.log(
      `✓ Geocoded to (${location.lat}, ${location.lng}) - precision: ${precision}`
    );

    return {
      lat: location.lat,
      lon: location.lng,
      precision,
    };
  } catch (error) {
    console.error(`Failed to geocode address "${address}":`, error);
    throw error;
  }
}

// 2. Fetch nearby places for all types
export async function fetchNearbyPlaces(
  lat: number,
  lon: number
): Promise<NearbyData> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_MAPS_API_KEY not set");
  }

  const placeTypes = [
    { key: "parks", type: "park" },
    { key: "schools", type: "school" },
    { key: "transit_stations", type: "transit_station" },
    { key: "hospitals", type: "hospital" },
    { key: "shopping_malls", type: "shopping_mall" },
    { key: "restaurants", type: "restaurant" },
    { key: "gyms", type: "gym" },
    { key: "golf_courses", type: "golf_course" },
    { key: "beaches", type: "natural_feature" }, // beaches are natural features
  ];

  const nearbyData: any = {};

  console.log(`Fetching nearby places for location (${lat}, ${lon})`);

  for (const { key, type } of placeTypes) {
    try {
      const response = await client.placesNearby({
        params: {
          location: { lat, lng: lon },
          radius: 5000, // 5km radius
          type,
          key: apiKey,
        },
      });

      if (response.data.status === "OK" || response.data.status === "ZERO_RESULTS") {
        const places = (response.data.results || [])
          .map((place: any) => {
            const placeLat = place.geometry?.location?.lat;
            const placeLng = place.geometry?.location?.lng;
            
            if (!placeLat || !placeLng) return null;

            const distance = calculateDistance(lat, lon, placeLat, placeLng);

            return {
              name: place.name || "Unknown",
              type,
              distance_km: Math.round(distance * 100) / 100,
              rating: place.rating,
              address: place.vicinity,
            };
          })
          .filter(Boolean)
          .sort((a: any, b: any) => a.distance_km - b.distance_km)
          .slice(0, 5); // Top 5 closest

        nearbyData[key] = places;
        console.log(`  ✓ Found ${places.length} ${key}`);
      } else {
        console.warn(`  ⚠ Failed to fetch ${key}: ${response.data.status}`);
        nearbyData[key] = [];
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`  ✗ Error fetching ${key}:`, error);
      nearbyData[key] = [];
    }
  }

  return nearbyData as NearbyData;
}

// 3. Enrich a project with geocoding and nearby places
export async function enrichProject(
  project: Project
): Promise<EnrichedProject> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_MAPS_API_KEY not set");
  }

  try {
    console.log(`\nEnriching ${project.id} (${project.name})...`);

    // Use existing coordinates (assume they're already geocoded)
    const { lat, lon } = project;
    console.log(`Using coordinates: (${lat}, ${lon})`);

    // Fetch all nearby places
    const nearby = await fetchNearbyPlaces(lat, lon);

    // Count total places found
    const totalPlaces = Object.values(nearby).reduce(
      (sum, places) => sum + places.length,
      0
    );

    console.log(`✓ Done. Found ${totalPlaces} nearby places`);

    return {
      ...project,
      nearby,
      geocode_precision: "exact", // Assuming coordinates are already precise
    };
  } catch (error) {
    console.error(`Failed to enrich project ${project.id}:`, error);
    throw error;
  }
}

// Calculate API cost estimate
export function calculateEnrichmentCost(apiCallCount: number): number {
  // Google Maps Places API Nearby Search: ~$32 per 1000 requests
  // We make 9 API calls per project (one for each place type)
  const costPerRequest = 0.032;
  return Math.round(apiCallCount * costPerRequest * 100) / 100;
}

