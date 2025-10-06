import { NextRequest, NextResponse } from "next/server";
import { getProjects } from "@/lib/data/projects";
import { scoreProject } from "@/lib/score/openkey_v1";
import { rationale } from "@/lib/score/rationale";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    // Parse the prompt into structured intent
    const parseRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/parse`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!parseRes.ok) {
      throw new Error("Failed to parse prompt");
    }

    const { intent } = await parseRes.json();

    // Get all projects and score them
    const projects = await getProjects();
    const scored = projects
      .map((project) => {
        const { score, subs } = scoreProject(project, intent);
        return {
          id: project.id,
          name: project.name,
          developer: project.developer,
          thumbnail: project.thumbnail_url,
          price_aed: project.price_aed,
          handover_month: project.handover_month,
          score,
          rationale: rationale(subs, intent.keywords),
          subs,
        };
      })
      .sort((a, b) => b.score - a.score); // Sort by score descending

    return NextResponse.json({ intent, results: scored });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}