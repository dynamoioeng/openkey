import { NextRequest, NextResponse } from "next/server";
import { UserIntent } from "@/lib/score/intent";
import { extractPromptAmenities } from "@/lib/score/amenities";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const text = String(prompt || "");

    // Extract budget using regex patterns
    const aedRange = /aed[\s]*([0-9,.]+)\s*-\s*aed[\s]*([0-9,.]+)/i.exec(text);
    const aedUnder = /under\s*aed\s*([0-9,.]+)/i.exec(text);

    let budgetMin: number | undefined;
    let budgetMax: number | undefined;

    if (aedRange && aedRange.length === 3) {
      budgetMin = Number(aedRange[1].replace(/[,\.]/g, ""));
      budgetMax = Number(aedRange[2].replace(/[,\.]/g, ""));
    } else if (aedUnder && aedUnder.length === 2) {
      budgetMin = 0;
      budgetMax = Number(aedUnder[1].replace(/[,\.]/g, ""));
    }

    // Extract size (e.g., "120 sqm")
    const sizeMatch = /([0-9]{2,4})\s*(sqm|m2)/i.exec(text);
    const sizeMin = sizeMatch ? Number(sizeMatch[1]) * 0.9 : undefined;
    const sizeMax = sizeMatch ? Number(sizeMatch[1]) * 1.1 : undefined;

    // Map known area names to coordinates (minimal set for MVP)
    const AREA_MAP: Record<string, { lat: number; lon: number; name: string }> = {
      "dubai marina": { lat: 25.080, lon: 55.139, name: "Dubai Marina" },
      "palm jumeirah": { lat: 25.112, lon: 55.138, name: "Palm Jumeirah" },
      "downtown dubai": { lat: 25.197, lon: 55.274, name: "Downtown Dubai" },
      "business bay": { lat: 25.187, lon: 55.265, name: "Business Bay" },
      "jbr": { lat: 25.076, lon: 55.134, name: "JBR" },
      "jumeirah beach residence": { lat: 25.076, lon: 55.134, name: "JBR" },
      "dubai hills": { lat: 25.042, lon: 55.171, name: "Dubai Hills Estate" },
      "city walk": { lat: 25.205, lon: 55.265, name: "City Walk" },
    };

    const preferredAreas = Object.keys(AREA_MAP)
      .filter((key) => text.toLowerCase().includes(key))
      .map((key) => AREA_MAP[key]);

    // Extract amenities
    const amenitiesRequested = extractPromptAmenities(text);

    // Extract lifestyle keywords
    const keywords = [
      "family",
      "quiet",
      "sea view",
      "investment",
      "schools",
      "parks",
      "luxury",
      "beach",
      "golf",
    ].filter((k) => text.toLowerCase().includes(k));

    const intent: UserIntent = {
      rawText: text,
      budgetMin,
      budgetMax,
      sizeMin,
      sizeMax,
      preferredAreas,
      preferredHandoverMonth: undefined, // TODO: add date parsing later
      keywords,
      amenitiesRequested,
    };

    return NextResponse.json({ intent });
  } catch (error) {
    console.error("Parse error:", error);
    return NextResponse.json(
      { error: "Failed to parse prompt" },
      { status: 500 }
    );
  }
}