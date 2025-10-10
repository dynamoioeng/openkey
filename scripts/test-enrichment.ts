async function test() {
  const apiKey = "AIzaSyD55dPZPjJjCz9fp3GSrn8jFd0hQjfw5OU";
  
  console.log("✅ Using API key");
  
  // Test the NEW Places API
  console.log("\n🏞️  Testing Places API (New) - searching for parks...");
  
  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchNearby",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "places.displayName,places.location,places.types,places.rating",
        },
        body: JSON.stringify({
          includedTypes: ["park"],
          maxResultCount: 10,
          locationRestriction: {
            circle: {
              center: {
                latitude: 25.042,
                longitude: 55.171,
              },
              radius: 3000.0,
            },
          },
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error("❌ API Error:", data);
      return;
    }

    console.log("✅ Found parks:", data.places?.length || 0);
    
    if (data.places?.[0]) {
      console.log("First park:", data.places[0].displayName?.text);
      console.log("Location:", data.places[0].location);
    }
    
    console.log("\n✅ Places API (New) is working!");
    
  } catch (error: any) {
    console.error("❌ Error:", error.message);
  }
}

test();