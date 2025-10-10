// Simple token-based similarity as placeholder
// TODO: Replace with OpenAI embeddings later for better accuracy
export function cosineSimFromText(a: string, b: string): number {
    const tokenize = (s: string): Set<string> =>
      new Set(
        s
          .toLowerCase()
          .split(/[^a-z0-9]+/)
          .filter(Boolean)
      );
  
    const setA = tokenize(a);
    const setB = tokenize(b);
  
    // Count intersection
    const intersection = [...setA].filter((token) => setB.has(token)).length;
  
    // Cosine similarity approximation: intersection / sqrt(|A| * |B|)
    const denominator = Math.sqrt(setA.size * setB.size) || 1;
    return Math.min(1, intersection / denominator);
  }

