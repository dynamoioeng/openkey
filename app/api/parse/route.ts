import { NextRequest, NextResponse } from "next/server";
import { UserIntent } from "@/lib/score/intent";
import OpenAI from "openai";

// Map known Dubai area names to lat/lon coordinates
const AREA_COORDINATES: Record<
  string,
  { lat: number; lon: number; name: string }
> = {
  // City-level
  dubai: { lat: 25.2048, lon: 55.2708, name: "Dubai (city-wide)" },
  "abu dhabi": { lat: 24.4539, lon: 54.3773, name: "Abu Dhabi (city-wide)" },
  sharjah: { lat: 25.3463, lon: 55.4209, name: "Sharjah (city-wide)" },
  
  // Neighborhoods
  "dubai marina": { lat: 25.08, lon: 55.139, name: "Dubai Marina" },
  "palm jumeirah": { lat: 25.112, lon: 55.138, name: "Palm Jumeirah" },
  "downtown dubai": { lat: 25.197, lon: 55.274, name: "Downtown Dubai" },
  "business bay": { lat: 25.187, lon: 55.265, name: "Business Bay" },
  jbr: { lat: 25.076, lon: 55.134, name: "JBR" },
  "jumeirah beach residence": { lat: 25.076, lon: 55.134, name: "JBR" },
  "dubai hills": { lat: 25.042, lon: 55.171, name: "Dubai Hills Estate" },
  "dubai hills estate": { lat: 25.042, lon: 55.171, name: "Dubai Hills Estate" },
  "city walk": { lat: 25.205, lon: 55.265, name: "City Walk" },
  difc: { lat: 25.214, lon: 55.281, name: "DIFC" },
  "jumeirah lake towers": { lat: 25.072, lon: 55.145, name: "JLT" },
  jlt: { lat: 25.072, lon: 55.145, name: "JLT" },
};

// Structured extraction schema for GPT-4
const extractionFunctionSchema = {
  name: "extract_property_intent",
  description:
    "Extract structured information from a natural language property search query",
  parameters: {
    type: "object",
    properties: {
      budgetMin: {
        type: ["number", "null"],
        description:
          "Minimum budget in AED. Only set if explicitly stated with 'at least', 'from', or in a range like 'between 2M and 3M'. Leave null for single figures like '2.5M' (those are maximums, not minimums).",
      },
      budgetMax: {
        type: ["number", "null"],
        description:
          "Maximum budget in AED. DEFAULT for single figures. '2.5M AED' → 2500000, 'under 2.5M' → 2500000, '2,500,000' → 2500000. Parse 'M' as millions, 'K' as thousands.",
      },
      sizeMin: {
        type: ["number", "null"],
        description:
          "Minimum size in sqm. Parse '120 sqm', 'around 150m2', 'spacious' (infer 150+)",
      },
      sizeMax: {
        type: ["number", "null"],
        description:
          "Maximum size in sqm. Infer from context or explicit mentions",
      },
      preferredAreas: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description:
                "Location name. CITY-LEVEL: Dubai, Abu Dhabi, Sharjah. NEIGHBORHOODS: Dubai Marina, Palm Jumeirah, Downtown Dubai, JBR, Business Bay, Dubai Hills, City Walk, DIFC, JLT",
            },
            inference: {
              type: "string",
              description:
                "How this was inferred (e.g., 'explicit mention', 'near beach → JBR/Marina', 'in Dubai → Dubai', 'downtown → Downtown Dubai')",
            },
          },
        },
        description:
          "Map natural language to locations. Handle BOTH city-level ('in Dubai') and neighborhood-level ('in Dubai Marina'). 'near beach' → JBR/Marina, 'in dubai' → Dubai (city-wide)",
      },
      preferredHandoverMonth: {
        type: ["string", "null"],
        description:
          "Handover date in YYYY-MM format. Parse 'early 2027' → '2027-01', 'Q2 2026' → '2026-04', 'mid 2027' → '2027-06', 'soon' → next 6 months",
      },
      amenitiesRequested: {
        type: "array",
        items: { type: "string" },
        description:
          "Extract from explicit AND implicit needs. Vocab: pool, gym, beach_access, parking, kids_area, school_nearby, park_nearby, concierge, sauna, tennis, pet_friendly, co_working, metro, golf_course, marina_access. 'family friendly' implies kids_area, school_nearby, park_nearby",
      },
      keywords: {
        type: "array",
        items: { type: "string" },
        description:
          "Lifestyle indicators: family, quiet, luxury, investment, beachfront, sea view, golf, nature, urban, modern, etc.",
      },
      investmentFocused: {
        type: "boolean",
        description:
          "True if query mentions ROI, rental yield, investment, rental income, etc.",
      },
    },
    required: [
      "budgetMin",
      "budgetMax",
      "sizeMin",
      "sizeMax",
      "preferredAreas",
      "preferredHandoverMonth",
      "amenitiesRequested",
      "keywords",
      "investmentFocused",
    ],
  },
};

// Fallback: return neutral intent when GPT fails
function createFallbackIntent(text: string): UserIntent {
  return {
    rawText: text,
    budgetMin: undefined,
    budgetMax: undefined,
    sizeMin: undefined,
    sizeMax: undefined,
    preferredAreas: [],
    preferredHandoverMonth: undefined,
    keywords: [],
    amenitiesRequested: [],
  };
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const text = String(prompt || "").trim();

    if (!text) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.warn("OPENAI_API_KEY not found, using fallback parser");
      return NextResponse.json({ intent: createFallbackIntent(text) });
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    try {
      // Call GPT-4 with function calling for structured extraction
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a Dubai real estate search assistant. Extract structured property search criteria from natural language queries.\n\n" +
              "CRITICAL - Budget Interpretation Rules:\n" +
              "- A SINGLE budget figure (without 'at least' or 'from') means MAXIMUM budget:\n" +
              "  • '2.5M AED' → budgetMax=2500000, budgetMin=null\n" +
              "  • 'under 2.5M' → budgetMax=2500000, budgetMin=null\n" +
              "  • '2.5 million AED' → budgetMax=2500000, budgetMin=null\n" +
              "- 'Around' or 'approximately' means ±10% range:\n" +
              "  • 'around 2.5M' → budgetMin=2250000, budgetMax=2750000\n" +
              "- Range phrases:\n" +
              "  • 'between 2M and 3M' → budgetMin=2000000, budgetMax=3000000\n" +
              "  • '2M to 3M' → budgetMin=2000000, budgetMax=3000000\n" +
              "- Minimum-only phrases:\n" +
              "  • 'at least 2M' → budgetMin=2000000, budgetMax=null\n" +
              "  • 'from 2M' → budgetMin=2000000, budgetMax=null\n\n" +
              "Location Inference:\n" +
              "- CITY-LEVEL queries:\n" +
              "  • 'in Dubai' → Dubai (city-wide)\n" +
              "  • 'in Abu Dhabi' → Abu Dhabi (city-wide)\n" +
              "  • 'properties in dubai' → Dubai (city-wide)\n" +
              "- NEIGHBORHOOD-LEVEL queries:\n" +
              "  • 'near beach' → JBR or Dubai Marina\n" +
              "  • 'downtown' → Downtown Dubai\n" +
              "  • 'in Dubai Marina' → Dubai Marina\n" +
              "- IMPLICIT needs:\n" +
              "  • 'family friendly' → infer kids_area, school_nearby, park_nearby amenities",
          },
          {
            role: "user",
            content: text,
          },
        ],
        functions: [extractionFunctionSchema],
        function_call: { name: "extract_property_intent" },
        temperature: 0.1,
      });

      // Parse the function call response
      const functionCall = completion.choices[0]?.message?.function_call;
      if (!functionCall || !functionCall.arguments) {
        console.warn("No function call returned, using fallback");
        return NextResponse.json({ intent: createFallbackIntent(text) });
      }

      const extracted = JSON.parse(functionCall.arguments);

      // Map area names to coordinates
      const preferredAreas = (extracted.preferredAreas || [])
        .map((area: { name: string; inference: string }) => {
          const areaKey = area.name.toLowerCase().trim();
          const coords = AREA_COORDINATES[areaKey];
          if (coords) {
            return coords;
          }
          return null;
        })
        .filter(Boolean);

      // Build final UserIntent
      const intent: UserIntent = {
        rawText: text,
        budgetMin: extracted.budgetMin || undefined,
        budgetMax: extracted.budgetMax || undefined,
        sizeMin: extracted.sizeMin || undefined,
        sizeMax: extracted.sizeMax || undefined,
        preferredAreas,
        preferredHandoverMonth: extracted.preferredHandoverMonth || undefined,
        keywords: extracted.keywords || [],
        amenitiesRequested: extracted.amenitiesRequested || [],
      };

      return NextResponse.json({ intent });
    } catch (gptError) {
      console.error("GPT extraction failed:", gptError);
      console.warn("Falling back to neutral intent");
      return NextResponse.json({ intent: createFallbackIntent(text) });
    }
  } catch (error) {
    console.error("Parse error:", error);
    return NextResponse.json(
      { error: "Failed to parse prompt" },
      { status: 500 }
    );
  }
}