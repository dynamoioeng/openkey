// Score project based on documentation completeness
export function docsCompletenessScore(docs: Record<string, boolean>): number {
    const requiredDocs = [
      "floor_plans",
      "payment_schedule",
      "service_charges",
      "approvals",
      "master_plan",
    ];
  
    const available = requiredDocs.filter((key) => docs?.[key]).length;
    return Math.round((available / requiredDocs.length) * 100);
  }
