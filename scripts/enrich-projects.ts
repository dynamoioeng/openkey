#!/usr/bin/env tsx

import { promises as fs } from "fs";
import path from "path";
import {
  enrichProject,
  calculateEnrichmentCost,
  type EnrichedProject,
} from "../lib/enrichment/maps";
import { PROJECTS, type Project } from "../lib/data/projects";

const PROJECTS_FILE_PATH = path.join(
  __dirname,
  "../lib/data/projects.ts"
);

async function main() {
  console.log("🚀 Starting project enrichment...\n");

  if (!process.env.GOOGLE_MAPS_API_KEY) {
    console.error(
      "❌ Error: GOOGLE_MAPS_API_KEY not set in environment variables"
    );
    console.log("Please add GOOGLE_MAPS_API_KEY to your .env.local file\n");
    process.exit(1);
  }

  const enrichedProjects: EnrichedProject[] = [];
  let apiCallCount = 0;
  let enrichedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (let i = 0; i < PROJECTS.length; i++) {
    const project = PROJECTS[i];

    // Check if project already has nearby data
    if ((project as any).nearby) {
      console.log(
        `⏭️  Skipping ${project.id} (${project.name}) - already enriched`
      );
      enrichedProjects.push(project as EnrichedProject);
      skippedCount++;
      continue;
    }

    try {
      console.log(
        `\n[${i + 1}/${PROJECTS.length}] Enriching ${project.id} (${project.name})...`
      );

      const enriched = await enrichProject(project);
      enrichedProjects.push(enriched);

      // Count API calls (9 per project: one for each place type)
      apiCallCount += 9;
      enrichedCount++;

      // Log summary for this project
      const totalNearby = enriched.nearby
        ? Object.values(enriched.nearby).reduce(
            (sum, places) => sum + places.length,
            0
          )
        : 0;

      const categoryCounts: string[] = [];
      if (enriched.nearby) {
        if (enriched.nearby.parks.length > 0)
          categoryCounts.push(`${enriched.nearby.parks.length} parks`);
        if (enriched.nearby.schools.length > 0)
          categoryCounts.push(`${enriched.nearby.schools.length} schools`);
        if (enriched.nearby.transit_stations.length > 0)
          categoryCounts.push(
            `${enriched.nearby.transit_stations.length} transit`
          );
        if (enriched.nearby.shopping_malls.length > 0)
          categoryCounts.push(
            `${enriched.nearby.shopping_malls.length} malls`
          );
        if (enriched.nearby.hospitals.length > 0)
          categoryCounts.push(
            `${enriched.nearby.hospitals.length} hospitals`
          );
      }

      console.log(
        `✅ Done. Found ${totalNearby} nearby places: ${categoryCounts.join(", ") || "none"}`
      );

      // Save progress after each project
      await saveEnrichedProjects(enrichedProjects);
      console.log(`💾 Progress saved (${enrichedCount} enriched so far)`);

      // Delay to respect rate limits (1 second)
      if (i < PROJECTS.length - 1) {
        console.log("⏳ Waiting 1 second before next project...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(
        `❌ Error enriching ${project.id}: ${error instanceof Error ? error.message : error}`
      );
      errorCount++;

      // Save project without enrichment
      enrichedProjects.push(project as EnrichedProject);

      // Continue to next project
      console.log("Continuing to next project...\n");
    }
  }

  // Final save
  await saveEnrichedProjects(enrichedProjects);

  // Print summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 ENRICHMENT SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total projects: ${PROJECTS.length}`);
  console.log(`✅ Enriched: ${enrichedCount}`);
  console.log(`⏭️  Skipped (already enriched): ${skippedCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`\n📞 Total API calls: ${apiCallCount}`);
  console.log(
    `💰 Estimated cost: $${calculateEnrichmentCost(apiCallCount).toFixed(2)}`
  );
  console.log("=".repeat(60));
  console.log("\n✨ Enrichment complete! Updated lib/data/projects.ts\n");
}

async function saveEnrichedProjects(projects: EnrichedProject[]) {
  // Read the current file to preserve imports and type definitions
  const currentContent = await fs.readFile(PROJECTS_FILE_PATH, "utf-8");

  // Find where PROJECTS array starts
  const projectsArrayMatch = currentContent.match(
    /export const PROJECTS: Project\[\] = \[/
  );
  if (!projectsArrayMatch) {
    throw new Error("Could not find PROJECTS array in file");
  }

  const beforeArray = currentContent.substring(0, projectsArrayMatch.index);

  // Generate the new PROJECTS array with enriched data
  const projectsCode = projects.map((p) => {
    const nearby = (p as any).nearby
      ? `\n    nearby: ${JSON.stringify((p as any).nearby, null, 6).replace(/\n/g, "\n    ")},`
      : "";

    return `  {
    id: "${p.id}",
    name: "${p.name}",
    developer: "${p.developer}",
    lat: ${p.lat},
    lon: ${p.lon},
    price_aed: ${p.price_aed},
    size_sqm: ${p.size_sqm},
    handover_month: "${p.handover_month}",
    amenities: ${JSON.stringify(p.amenities)},
    key_highlights: "${p.key_highlights}",
    short_desc: "${p.short_desc}",
    thumbnail_url: "${p.thumbnail_url}",
    docs: ${JSON.stringify(p.docs, null, 6).replace(/\n/g, "\n    ")},${nearby}
  }`;
  });

  const newContent = `${beforeArray}export const PROJECTS: Project[] = [
${projectsCode.join(",\n")}
];

export async function getProjects(): Promise<Project[]> {
  return PROJECTS;
}

export async function getProjectById(id: string): Promise<Project | null> {
  return PROJECTS.find((p) => p.id === id) || null;
}
`;

  await fs.writeFile(PROJECTS_FILE_PATH, newContent, "utf-8");
}

// Run the script
main().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});


