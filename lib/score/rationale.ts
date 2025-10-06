import type { Subscores } from "./openkey_v1";

// Generate a 2-sentence rationale explaining the score
export function rationale(subs: Subscores, intentKeywords: string[]): string {
  // Build pairs of [label, score]
  const pairs: [string, number][] = [
    ["budget", subs.price],
    ["size", subs.size],
    ["location", subs.location],
    ["timeline", subs.timeline],
    ["intent match", subs.semantic],
    ["amenities", subs.amenities],
  ];

  // Sort by score descending
  const sorted = pairs.sort((a, b) => b[1] - a[1]);

  // Pick top 2 and worst 1
  const top = sorted.slice(0, 2).map((p) => p[0]);
  const worst = sorted[sorted.length - 1][0];

  // Format intent keywords
  const intent = intentKeywords.slice(0, 2).join(" + ") || "your prompt";

  return `Strong fit on ${top.join(" & ")}; aligns with ${intent}. Trade-off: ${worst}.`;
}