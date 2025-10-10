# Scripts

## enrich-projects.ts

Enriches project data with nearby places information using Google Maps Places API.

### What it does

For each project in `lib/data/projects.ts`:

1. **Checks for existing data** - Skips projects that already have `nearby` data
2. **Fetches nearby places** within 5km radius:
   - Parks
   - Schools
   - Transit stations (metro, tram, bus)
   - Hospitals
   - Shopping malls
   - Restaurants
   - Gyms
   - Golf courses
   - Beaches (natural features)

3. **Saves enriched data** - Updates `lib/data/projects.ts` with nearby places for each project
4. **Progress tracking** - Saves after each project so you can resume if interrupted
5. **Rate limiting** - Adds 1-second delay between projects to respect API limits

### Usage

```bash
# Make sure GOOGLE_MAPS_API_KEY is set in .env.local
npm run enrich

# Or run directly with tsx
npx tsx scripts/enrich-projects.ts
```

### Requirements

1. **Google Maps API Key** in `.env.local`:
   ```
   GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

2. **Enable these APIs** in Google Cloud Console:
   - Geocoding API
   - Places API (Nearby Search)

### Cost Estimate

- **9 API calls per project** (one for each place type)
- **$0.032 per API call** (Places Nearby Search pricing)
- **~$0.29 per project**
- **~$4.35 for 15 projects**

The script displays the actual cost at completion.

### Output

The script adds a `nearby` field to each project with structure:

```typescript
{
  id: "p1",
  name: "Azure Residences",
  // ... other fields ...
  nearby: {
    parks: [
      { name: "Jumeirah Beach Park", type: "park", distance_km: 0.8, rating: 4.5, address: "Jumeirah Rd" }
    ],
    schools: [
      { name: "GEMS Wellington", type: "school", distance_km: 1.2, rating: 4.8, address: "Al Sufouh Rd" }
    ],
    transit_stations: [
      { name: "Dubai Marina Metro", type: "transit_station", distance_km: 0.6 }
    ],
    // ... other categories
  }
}
```

### Error Handling

- If a project fails to enrich, the error is logged and the script continues
- Progress is saved after each successful enrichment
- If the script crashes, re-run it - it will skip already enriched projects

### Example Output

```
🚀 Starting project enrichment...

[1/15] Enriching p1 (Azure Residences)...
Using coordinates: (25.0761, 55.1344)
Fetching nearby places for location (25.0761, 55.1344)
  ✓ Found 5 parks
  ✓ Found 4 schools
  ✓ Found 3 transit_stations
  ✓ Found 2 shopping_malls
  ✓ Found 3 hospitals
✅ Done. Found 25 nearby places: 5 parks, 4 schools, 3 transit, 2 malls, 3 hospitals
💾 Progress saved (1 enriched so far)
⏳ Waiting 1 second before next project...

[2/15] Enriching p2 (Palm Gardens)...
...

============================================================
📊 ENRICHMENT SUMMARY
============================================================
Total projects: 15
✅ Enriched: 15
⏭️  Skipped (already enriched): 0
❌ Errors: 0

📞 Total API calls: 135
💰 Estimated cost: $4.32
============================================================

✨ Enrichment complete! Updated lib/data/projects.ts
```


