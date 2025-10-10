export type Project = {
    id: string;
    name: string;
    developer: string;
    lat: number;
    lon: number;
    price_aed: number;
    size_sqm: number;
    handover_month: string;
    amenities: string[];
    key_highlights: string;
    short_desc: string;
    thumbnail_url: string;
    docs: {
      floor_plans: boolean;
      payment_schedule: boolean;
      service_charges: boolean;
      approvals: boolean;
      master_plan: boolean;
    };
    nearby?: {
      parks: Array<{name: string, distance_km: number, type: string}>;
      schools: Array<{name: string, distance_km: number, rating: number, type: string}>;
      transit: Array<{name: string, distance_km: number, type: string, line?: string}>;
      hospitals: Array<{name: string, distance_km: number, type: string}>;
      shopping: Array<{name: string, distance_km: number, type: string}>;
      restaurants: Array<{name: string, distance_km: number, count?: number}>;
      gyms: Array<{name: string, distance_km: number}>;
      beaches?: Array<{name: string, distance_km: number, type: string}>;
    };
  };
  
  export const PROJECTS: Project[] = [
    {
      id: "p1",
      name: "Azure Residences",
      developer: "Emaar Properties",
      lat: 25.0761,
      lon: 55.1344,
      price_aed: 2800000,
      size_sqm: 140,
      handover_month: "2027-06",
      amenities: ["pool", "gym", "beach_access", "parking", "concierge"],
      key_highlights: "Beachfront living with direct access to JBR beach.",
      short_desc: "Luxury 2BR apartments with sea views in JBR.",
      thumbnail_url: "/placeholder-azure.jpg",
      docs: { floor_plans: true, payment_schedule: true, service_charges: true, approvals: true, master_plan: true },
      nearby: {
        parks: [
          {name: "Marina Beach Park", distance_km: 0.8, type: "Waterfront Park"},
          {name: "JBR Beach Park", distance_km: 0.3, type: "Beach Park"},
          {name: "Al Sufouh Park", distance_km: 2.1, type: "Community Park"}
        ],
        schools: [
          {name: "GEMS Wellington International School", distance_km: 3.2, rating: 4.5, type: "International"},
          {name: "Dubai British School", distance_km: 4.1, rating: 4.4, type: "British Curriculum"},
          {name: "Kings' School Dubai", distance_km: 3.8, rating: 4.3, type: "British Curriculum"}
        ],
        transit: [
          {name: "Dubai Tram - JBR Station", distance_km: 0.4, type: "Tram", line: "Red Line"},
          {name: "DMCC Metro Station", distance_km: 1.2, type: "Metro", line: "Red Line"},
          {name: "Dubai Marina Metro Station", distance_km: 1.5, type: "Metro", line: "Red Line"}
        ],
        hospitals: [
          {name: "Medcare Hospital - Dubai Marina", distance_km: 1.3, type: "Private Hospital"},
          {name: "NMC Royal Hospital", distance_km: 2.8, type: "Private Hospital"},
          {name: "Saudi German Hospital", distance_km: 4.5, type: "Private Hospital"}
        ],
        shopping: [
          {name: "The Beach at JBR", distance_km: 0.5, type: "Mall"},
          {name: "Dubai Marina Mall", distance_km: 1.4, type: "Mall"},
          {name: "Mall of the Emirates", distance_km: 5.2, type: "Major Mall"}
        ],
        restaurants: [
          {name: "The Walk at JBR", distance_km: 0.4, count: 50},
          {name: "Marina Walk", distance_km: 1.2, count: 30},
          {name: "City Walk Restaurants", distance_km: 8.5, count: 40}
        ],
        gyms: [
          {name: "Fitness First - JBR", distance_km: 0.6},
          {name: "Gold's Gym - Marina", distance_km: 1.3},
          {name: "The Warehouse Gym", distance_km: 1.8}
        ],
        beaches: [
          {name: "JBR Beach", distance_km: 0.2, type: "Public Beach"},
          {name: "Sunset Beach", distance_km: 1.5, type: "Public Beach"},
          {name: "Kite Beach", distance_km: 3.2, type: "Sports Beach"}
        ]
      }
    },
    {
      id: "p2",
      name: "Palm Gardens",
      developer: "Nakheel",
      lat: 25.1124,
      lon: 55.1390,
      price_aed: 4500000,
      size_sqm: 220,
      handover_month: "2028-03",
      amenities: ["pool", "gym", "kids_area", "beach_access", "parking", "tennis"],
      key_highlights: "Exclusive villas on Palm Jumeirah with private beach access.",
      short_desc: "4BR villas on Palm Jumeirah with Burj Al Arab views.",
      thumbnail_url: "/placeholder-palm.jpg",
      docs: { floor_plans: true, payment_schedule: true, service_charges: false, approvals: true, master_plan: true },
      nearby: {
        parks: [
          {name: "Palm West Beach Park", distance_km: 0.5, type: "Beach Park"},
          {name: "The Pointe Park", distance_km: 1.2, type: "Waterfront Park"},
          {name: "Marina Beach Park", distance_km: 2.5, type: "Waterfront Park"}
        ],
        schools: [
          {name: "GEMS World Academy", distance_km: 4.2, rating: 4.6, type: "International"},
          {name: "Dubai College", distance_km: 5.1, rating: 4.7, type: "British Curriculum"},
          {name: "Jumeirah English Speaking School", distance_km: 3.8, rating: 4.5, type: "British Curriculum"}
        ],
        transit: [
          {name: "Palm Jumeirah Monorail - Gateway Station", distance_km: 1.8, type: "Monorail"},
          {name: "Nakheel Mall Station", distance_km: 1.5, type: "Monorail"},
          {name: "DMCC Metro Station", distance_km: 3.2, type: "Metro", line: "Red Line"}
        ],
        hospitals: [
          {name: "Medcare Hospital - Palm Jumeirah", distance_km: 1.6, type: "Private Hospital"},
          {name: "American Hospital Dubai", distance_km: 5.8, type: "Private Hospital"},
          {name: "Mediclinic Parkview Hospital", distance_km: 6.2, type: "Private Hospital"}
        ],
        shopping: [
          {name: "Nakheel Mall", distance_km: 1.4, type: "Mall"},
          {name: "The Pointe", distance_km: 1.3, type: "Waterfront Retail"},
          {name: "Golden Mile Galleria", distance_km: 2.1, type: "Boutique Mall"},
          {name: "Mall of the Emirates", distance_km: 6.5, type: "Major Mall"}
        ],
        restaurants: [
          {name: "The Pointe Restaurants", distance_km: 1.2, count: 25},
          {name: "Nakheel Mall Dining", distance_km: 1.4, count: 20},
          {name: "Palm West Beach Restaurants", distance_km: 0.8, count: 15}
        ],
        gyms: [
          {name: "Fitness First - Palm Jumeirah", distance_km: 1.5},
          {name: "Reform Athletica", distance_km: 2.8},
          {name: "The Warehouse Gym", distance_km: 3.5}
        ],
        beaches: [
          {name: "Palm West Beach", distance_km: 0.6, type: "Private Beach"},
          {name: "Atlantis Beach", distance_km: 2.2, type: "Resort Beach"},
          {name: "Sunset Beach", distance_km: 3.1, type: "Public Beach"}
        ]
      }
    },
    {
      id: "p3",
      name: "Downtown Heights",
      developer: "Emaar Properties",
      lat: 25.1972,
      lon: 55.2744,
      price_aed: 1900000,
      size_sqm: 95,
      handover_month: "2026-12",
      amenities: ["pool", "gym", "metro", "parking", "co_working"],
      key_highlights: "Walking distance to Dubai Mall and Burj Khalifa.",
      short_desc: "Compact 1BR apartments in Downtown Dubai.",
      thumbnail_url: "/placeholder-downtown.jpg",
      docs: { floor_plans: true, payment_schedule: true, service_charges: true, approvals: true, master_plan: false },
      nearby: {
        parks: [
          {name: "Burj Park", distance_km: 0.6, type: "Urban Park"},
          {name: "Zabeel Park", distance_km: 2.8, type: "Major Park"},
          {name: "Al Khazzan Park", distance_km: 1.5, type: "Community Park"}
        ],
        schools: [
          {name: "Dubai International Academy", distance_km: 4.5, rating: 4.4, type: "International"},
          {name: "Raffles International School", distance_km: 3.8, rating: 4.3, type: "International"},
          {name: "Regent International School", distance_km: 5.2, rating: 4.2, type: "British Curriculum"}
        ],
        transit: [
          {name: "Burj Khalifa/Dubai Mall Metro Station", distance_km: 0.5, type: "Metro", line: "Red Line"},
          {name: "Business Bay Metro Station", distance_km: 1.2, type: "Metro", line: "Red Line"},
          {name: "Financial Centre Metro Station", distance_km: 0.8, type: "Metro", line: "Red Line"}
        ],
        hospitals: [
          {name: "Mediclinic City Hospital", distance_km: 3.2, type: "Private Hospital"},
          {name: "King's College Hospital Dubai", distance_km: 4.1, type: "Private Hospital"},
          {name: "Canadian Specialist Hospital", distance_km: 2.5, type: "Private Hospital"}
        ],
        shopping: [
          {name: "Dubai Mall", distance_km: 0.7, type: "Super Mall"},
          {name: "Souk Al Bahar", distance_km: 0.9, type: "Traditional Souk"},
          {name: "City Walk", distance_km: 3.5, type: "Lifestyle District"},
          {name: "Wafi Mall", distance_km: 3.8, type: "Mall"}
        ],
        restaurants: [
          {name: "Downtown Boulevard", distance_km: 0.5, count: 45},
          {name: "Dubai Mall Dining", distance_km: 0.7, count: 200},
          {name: "Souk Al Bahar Restaurants", distance_km: 0.9, count: 22}
        ],
        gyms: [
          {name: "Fitness First - Dubai Mall", distance_km: 0.8},
          {name: "Embody Fitness", distance_km: 1.2},
          {name: "Gold's Gym - Business Bay", distance_km: 1.5}
        ]
      }
    },
    {
      id: "p4",
      name: "Marina Bay Residences",
      developer: "DAMAC Properties",
      lat: 25.0805,
      lon: 55.1385,
      price_aed: 3200000,
      size_sqm: 165,
      handover_month: "2027-09",
      amenities: ["pool", "gym", "marina_access", "parking", "kids_area", "sauna"],
      key_highlights: "Waterfront apartments overlooking Dubai Marina.",
      short_desc: "3BR apartments with marina views.",
      thumbnail_url: "/placeholder-marina.jpg",
      docs: { floor_plans: true, payment_schedule: true, service_charges: true, approvals: true, master_plan: true },
      nearby: {
        parks: [
          {name: "Dubai Marina Walk Park", distance_km: 0.4, type: "Waterfront Promenade"},
          {name: "Marina Beach Park", distance_km: 0.9, type: "Beach Park"},
          {name: "Al Sufouh Park", distance_km: 2.3, type: "Community Park"}
        ],
        schools: [
          {name: "GEMS Wellington International School", distance_km: 2.8, rating: 4.5, type: "International"},
          {name: "Dubai British School", distance_km: 3.6, rating: 4.4, type: "British Curriculum"},
          {name: "JESS Arabian Ranches", distance_km: 4.2, rating: 4.5, type: "British Curriculum"}
        ],
        transit: [
          {name: "Dubai Marina Metro Station", distance_km: 0.6, type: "Metro", line: "Red Line"},
          {name: "Dubai Tram - Marina Towers Station", distance_km: 0.3, type: "Tram", line: "Red Line"},
          {name: "DMCC Metro Station", distance_km: 0.9, type: "Metro", line: "Red Line"}
        ],
        hospitals: [
          {name: "Medcare Hospital - Dubai Marina", distance_km: 0.8, type: "Private Hospital"},
          {name: "NMC Royal Hospital", distance_km: 2.1, type: "Private Hospital"},
          {name: "American Hospital Dubai", distance_km: 7.2, type: "Private Hospital"}
        ],
        shopping: [
          {name: "Dubai Marina Mall", distance_km: 0.5, type: "Mall"},
          {name: "Marina Walk Shops", distance_km: 0.4, type: "Waterfront Retail"},
          {name: "Ibn Battuta Mall", distance_km: 3.5, type: "Theme Mall"},
          {name: "Mall of the Emirates", distance_km: 4.8, type: "Major Mall"}
        ],
        restaurants: [
          {name: "Marina Walk Dining", distance_km: 0.4, count: 45},
          {name: "The Walk at JBR", distance_km: 1.1, count: 50},
          {name: "Pier 7", distance_km: 0.6, count: 7}
        ],
        gyms: [
          {name: "Fitness First - Marina Mall", distance_km: 0.5},
          {name: "Gold's Gym - Marina", distance_km: 0.7},
          {name: "Body Fuel Gym", distance_km: 1.2}
        ],
        beaches: [
          {name: "Marina Beach", distance_km: 0.9, type: "Public Beach"},
          {name: "JBR Beach", distance_km: 1.2, type: "Public Beach"},
          {name: "Sunset Beach", distance_km: 2.1, type: "Public Beach"}
        ]
      }
    },
    {
      id: "p5",
      name: "Green Valley",
      developer: "Meraas",
      lat: 25.0421,
      lon: 55.1713,
      price_aed: 2200000,
      size_sqm: 130,
      handover_month: "2027-03",
      amenities: ["pool", "gym", "park_nearby", "school_nearby", "kids_area", "parking"],
      key_highlights: "Family-friendly community with parks and top schools.",
      short_desc: "2BR townhouses in Dubai Hills Estate.",
      thumbnail_url: "/placeholder-green.jpg",
      docs: { floor_plans: true, payment_schedule: true, service_charges: true, approvals: true, master_plan: true },
      nearby: {
        parks: [
          {name: "Dubai Hills Park", distance_km: 0.8, type: "Community Park"},
          {name: "Mushrif Park", distance_km: 5.2, type: "Major Park"},
          {name: "Barari Forest Park", distance_km: 1.5, type: "Forest Park"}
        ],
        schools: [
          {name: "GEMS Wellington Academy - Al Khail", distance_km: 1.2, rating: 4.6, type: "British Curriculum"},
          {name: "Dubai Heights Academy", distance_km: 0.9, rating: 4.4, type: "British Curriculum"},
          {name: "GEMS Founders School", distance_km: 2.3, rating: 4.5, type: "International"}
        ],
        transit: [
          {name: "Noor Bank Metro Station", distance_km: 3.8, type: "Metro", line: "Red Line"},
          {name: "First Abu Dhabi Bank Metro Station", distance_km: 4.2, type: "Metro", line: "Red Line"},
          {name: "Dubai Hills Bus Station", distance_km: 1.1, type: "Bus Station"}
        ],
        hospitals: [
          {name: "Mediclinic Parkview Hospital", distance_km: 2.1, type: "Private Hospital"},
          {name: "Aster Hospital - Mankhool", distance_km: 6.8, type: "Private Hospital"},
          {name: "NMC Royal Hospital", distance_km: 7.5, type: "Private Hospital"}
        ],
        shopping: [
          {name: "Dubai Hills Mall", distance_km: 0.7, type: "Mall"},
          {name: "The Ranches Souk", distance_km: 3.5, type: "Community Mall"},
          {name: "Mall of the Emirates", distance_km: 6.2, type: "Major Mall"}
        ],
        restaurants: [
          {name: "Dubai Hills Mall Dining", distance_km: 0.7, count: 35},
          {name: "Dubai Hills Golf Club", distance_km: 1.3, count: 5},
          {name: "Vida Hotels Restaurants", distance_km: 1.5, count: 8}
        ],
        gyms: [
          {name: "Fitness First - Dubai Hills Mall", distance_km: 0.8},
          {name: "Gold's Gym - Dubai Hills", distance_km: 1.1},
          {name: "Warehouse Gym", distance_km: 2.5}
        ]
      }
    },
    {
        id: "p6",
        name: "Sky Tower",
        developer: "Tiger Properties",
        lat: 25.0968,
        lon: 55.1561,
        price_aed: 1600000,
        size_sqm: 80,
        handover_month: "2026-09",
        amenities: ["pool", "gym", "metro", "parking"],
        key_highlights: "Affordable studio apartments near metro with high rental yields.",
        short_desc: "Investment-focused studios in Business Bay.",
        thumbnail_url: "/placeholder-sky.jpg",
        docs: { floor_plans: true, payment_schedule: true, service_charges: false, approvals: true, master_plan: false },
        nearby: {
          parks: [
            {name: "Burj Park", distance_km: 2.2, type: "Urban Park"},
            {name: "Al Khazzan Park", distance_km: 1.8, type: "Community Park"},
            {name: "Dubai Water Canal Park", distance_km: 0.9, type: "Waterfront Park"}
          ],
          schools: [
            {name: "Dubai International Academy", distance_km: 3.8, rating: 4.4, type: "International"},
            {name: "Raffles International School", distance_km: 3.2, rating: 4.3, type: "International"},
            {name: "Jumeirah International Nursery", distance_km: 4.5, rating: 4.2, type: "Nursery"}
          ],
          transit: [
            {name: "Business Bay Metro Station", distance_km: 0.5, type: "Metro", line: "Red Line"},
            {name: "First Gulf Bank Metro Station", distance_km: 1.1, type: "Metro", line: "Red Line"},
            {name: "Burj Khalifa/Dubai Mall Metro Station", distance_km: 1.8, type: "Metro", line: "Red Line"}
          ],
          hospitals: [
            {name: "Canadian Specialist Hospital", distance_km: 1.2, type: "Private Hospital"},
            {name: "Mediclinic City Hospital", distance_km: 2.8, type: "Private Hospital"},
            {name: "King's College Hospital Dubai", distance_km: 3.5, type: "Private Hospital"}
          ],
          shopping: [
            {name: "Bay Square", distance_km: 0.8, type: "Retail Complex"},
            {name: "Dubai Mall", distance_km: 2.5, type: "Super Mall"},
            {name: "City Walk", distance_km: 4.2, type: "Lifestyle District"}
          ],
          restaurants: [
            {name: "Business Bay Restaurants", distance_km: 0.6, count: 35},
            {name: "Bay Square Dining", distance_km: 0.8, count: 18},
            {name: "Dubai Water Canal Cafes", distance_km: 1.2, count: 22}
          ],
          gyms: [
            {name: "Gold's Gym - Business Bay", distance_km: 0.7},
            {name: "Fitness First - Business Bay", distance_km: 0.9},
            {name: "Embody Fitness", distance_km: 1.5}
          ]
        }
      },
      {
        id: "p7",
        name: "Sunset Villas",
        developer: "Dubai Properties",
        lat: 25.0350,
        lon: 55.1950,
        price_aed: 5800000,
        size_sqm: 350,
        handover_month: "2028-12",
        amenities: ["pool", "gym", "golf_course", "kids_area", "parking", "tennis", "sauna"],
        key_highlights: "Ultra-luxury villas with private pools and golf course views.",
        short_desc: "5BR villas in Dubai Hills with championship golf access.",
        thumbnail_url: "/placeholder-sunset.jpg",
        docs: { floor_plans: true, payment_schedule: true, service_charges: true, approvals: true, master_plan: true },
        nearby: {
          parks: [
            {name: "Dubai Hills Park", distance_km: 1.1, type: "Community Park"},
            {name: "Dubai Hills Golf Course Greens", distance_km: 0.3, type: "Golf Park"},
            {name: "Barari Forest Park", distance_km: 1.8, type: "Forest Park"}
          ],
          schools: [
            {name: "GEMS Wellington Academy - Al Khail", distance_km: 1.5, rating: 4.6, type: "British Curriculum"},
            {name: "Dubai Heights Academy", distance_km: 1.2, rating: 4.4, type: "British Curriculum"},
            {name: "GEMS Founders School", distance_km: 2.6, rating: 4.5, type: "International"},
            {name: "Fairgreen International School", distance_km: 2.8, rating: 4.3, type: "International"}
          ],
          transit: [
            {name: "Dubai Hills Bus Station", distance_km: 1.4, type: "Bus Station"},
            {name: "Noor Bank Metro Station", distance_km: 4.2, type: "Metro", line: "Red Line"},
            {name: "Mall of the Emirates Metro Station", distance_km: 5.8, type: "Metro", line: "Red Line"}
          ],
          hospitals: [
            {name: "Mediclinic Parkview Hospital", distance_km: 2.4, type: "Private Hospital"},
            {name: "Aster Hospital", distance_km: 7.2, type: "Private Hospital"},
            {name: "Saudi German Hospital", distance_km: 8.5, type: "Private Hospital"}
          ],
          shopping: [
            {name: "Dubai Hills Mall", distance_km: 1.0, type: "Mall"},
            {name: "The Ranches Souk", distance_km: 3.2, type: "Community Mall"},
            {name: "Mall of the Emirates", distance_km: 5.9, type: "Major Mall"}
          ],
          restaurants: [
            {name: "Dubai Hills Mall Dining", distance_km: 1.0, count: 35},
            {name: "Dubai Hills Golf Club Restaurant", distance_km: 0.4, count: 5},
            {name: "Vida Hotels Restaurants", distance_km: 1.7, count: 8}
          ],
          gyms: [
            {name: "Fitness First - Dubai Hills Mall", distance_km: 1.1},
            {name: "Dubai Hills Golf Club Fitness", distance_km: 0.5},
            {name: "Gold's Gym - Dubai Hills", distance_km: 1.4}
          ]
        }
      },
      {
        id: "p8",
        name: "Canal Residences",
        developer: "Omniyat",
        lat: 25.1872,
        lon: 55.2608,
        price_aed: 3500000,
        size_sqm: 180,
        handover_month: "2027-06",
        amenities: ["pool", "gym", "concierge", "parking", "sauna", "cinema"],
        key_highlights: "Architectural masterpiece overlooking Dubai Water Canal.",
        short_desc: "3BR luxury apartments on Dubai Water Canal.",
        thumbnail_url: "/placeholder-canal.jpg",
        docs: { floor_plans: true, payment_schedule: true, service_charges: true, approvals: true, master_plan: true },
        nearby: {
          parks: [
            {name: "Dubai Water Canal Park", distance_km: 0.3, type: "Waterfront Park"},
            {name: "Safa Park", distance_km: 2.1, type: "Major Park"},
            {name: "Al Khazzan Park", distance_km: 1.6, type: "Community Park"}
          ],
          schools: [
            {name: "Dubai International Academy", distance_km: 3.5, rating: 4.4, type: "International"},
            {name: "Raffles International School", distance_km: 2.8, rating: 4.3, type: "International"},
            {name: "Jumeirah English Speaking School", distance_km: 4.2, rating: 4.5, type: "British Curriculum"}
          ],
          transit: [
            {name: "Business Bay Metro Station", distance_km: 1.5, type: "Metro", line: "Red Line"},
            {name: "Financial Centre Metro Station", distance_km: 2.1, type: "Metro", line: "Red Line"},
            {name: "Burj Khalifa/Dubai Mall Metro Station", distance_km: 2.8, type: "Metro", line: "Red Line"}
          ],
          hospitals: [
            {name: "Canadian Specialist Hospital", distance_km: 2.2, type: "Private Hospital"},
            {name: "Mediclinic City Hospital", distance_km: 3.5, type: "Private Hospital"},
            {name: "American Hospital Dubai", distance_km: 5.8, type: "Private Hospital"}
          ],
          shopping: [
            {name: "City Walk", distance_km: 0.8, type: "Lifestyle District"},
            {name: "Box Park", distance_km: 1.2, type: "Boutique Mall"},
            {name: "Dubai Mall", distance_km: 3.2, type: "Super Mall"}
          ],
          restaurants: [
            {name: "City Walk Restaurants", distance_km: 0.8, count: 40},
            {name: "Box Park Dining", distance_km: 1.2, count: 15},
            {name: "Safa Park Cafes", distance_km: 2.3, count: 12}
          ],
          gyms: [
            {name: "Fitness First - City Walk", distance_km: 0.9},
            {name: "CrossFit Yas", distance_km: 1.5},
            {name: "Embody Fitness", distance_km: 2.1}
          ]
        }
      },
      {
        id: "p9",
        name: "Oasis Apartments",
        developer: "Azizi Developments",
        lat: 25.0550,
        lon: 55.1425,
        price_aed: 1200000,
        size_sqm: 70,
        handover_month: "2026-06",
        amenities: ["pool", "gym", "parking"],
        key_highlights: "Budget-friendly apartments ideal for first-time buyers.",
        short_desc: "Studio apartments in Al Furjan with easy payment plans.",
        thumbnail_url: "/placeholder-oasis.jpg",
        docs: { floor_plans: true, payment_schedule: true, service_charges: false, approvals: true, master_plan: false },
        nearby: {
          parks: [
            {name: "Al Furjan Community Park", distance_km: 0.6, type: "Community Park"},
            {name: "Discovery Gardens Park", distance_km: 1.8, type: "Community Park"},
            {name: "Ibn Battuta Gate Park", distance_km: 2.2, type: "Urban Park"}
          ],
          schools: [
            {name: "Formarke School Dubai", distance_km: 3.2, rating: 4.3, type: "British Curriculum"},
            {name: "GEMS Metropole School", distance_km: 2.8, rating: 4.2, type: "International"},
            {name: "Dubai British School Jumeirah Park", distance_km: 4.5, rating: 4.4, type: "British Curriculum"}
          ],
          transit: [
            {name: "Discovery Gardens Metro Station", distance_km: 1.5, type: "Metro", line: "Red Line"},
            {name: "Ibn Battuta Metro Station", distance_km: 2.3, type: "Metro", line: "Red Line"},
            {name: "Furjan Metro Station", distance_km: 0.8, type: "Metro", line: "Red Line"}
          ],
          hospitals: [
            {name: "Aster Hospital - Jebel Ali", distance_km: 3.5, type: "Private Hospital"},
            {name: "Saudi German Hospital", distance_km: 6.2, type: "Private Hospital"},
            {name: "Mediclinic Ibn Battuta", distance_km: 2.5, type: "Private Hospital"}
          ],
          shopping: [
            {name: "Ibn Battuta Mall", distance_km: 2.1, type: "Theme Mall"},
            {name: "Discovery Gardens Shopping Center", distance_km: 1.6, type: "Community Mall"},
            {name: "Dubai Marina Mall", distance_km: 5.8, type: "Mall"}
          ],
          restaurants: [
            {name: "Ibn Battuta Mall Dining", distance_km: 2.1, count: 35},
            {name: "Al Furjan Pavilion", distance_km: 0.7, count: 12},
            {name: "Discovery Gardens Cafes", distance_km: 1.5, count: 18}
          ],
          gyms: [
            {name: "Fitness First - Ibn Battuta", distance_km: 2.2},
            {name: "Gold's Gym - Discovery Gardens", distance_km: 1.7},
            {name: "Fitness Zone - Al Furjan", distance_km: 0.9}
          ]
        }
      },
      {
        id: "p10",
        name: "Serene Gardens",
        developer: "Sobha Realty",
        lat: 25.1124,
        lon: 55.2085,
        price_aed: 2600000,
        size_sqm: 145,
        handover_month: "2027-12",
        amenities: ["pool", "gym", "park_nearby", "school_nearby", "kids_area", "parking", "pet_friendly"],
        key_highlights: "Nature-inspired community with expansive parks.",
        short_desc: "2BR apartments in Mohammed Bin Rashid City.",
      thumbnail_url: "/placeholder-serene.jpg",
      docs: { floor_plans: true, payment_schedule: true, service_charges: true, approvals: true, master_plan: true },
      nearby: {
        parks: [
          {name: "MBR City Central Park", distance_km: 0.5, type: "Major Park"},
          {name: "Crystal Lagoon Park", distance_km: 1.2, type: "Waterfront Park"},
          {name: "Meydan One Park", distance_km: 2.3, type: "Community Park"}
        ],
        schools: [
          {name: "Hartland International School", distance_km: 1.5, rating: 4.5, type: "International"},
          {name: "Jumeirah College", distance_km: 3.8, rating: 4.6, type: "British Curriculum"},
          {name: "GEMS FirstPoint School", distance_km: 2.8, rating: 4.4, type: "British Curriculum"}
        ],
        transit: [
          {name: "Meydan Metro Station", distance_km: 2.5, type: "Metro", line: "Red Line"},
          {name: "Rashidiya Metro Station", distance_km: 4.2, type: "Metro", line: "Red Line"},
          {name: "MBR City Bus Station", distance_km: 0.8, type: "Bus Station"}
        ],
        hospitals: [
          {name: "Mediclinic Parkview Hospital", distance_km: 4.5, type: "Private Hospital"},
          {name: "Aster Hospital", distance_km: 5.8, type: "Private Hospital"},
          {name: "King's College Hospital Dubai", distance_km: 6.2, type: "Private Hospital"}
        ],
        shopping: [
          {name: "Meydan One Mall", distance_km: 2.1, type: "Mall"},
          {name: "Dubai Festival City Mall", distance_km: 4.5, type: "Major Mall"},
          {name: "Dubai Mall", distance_km: 7.5, type: "Super Mall"}
        ],
        restaurants: [
          {name: "MBR City Boulevard Dining", distance_km: 0.9, count: 18},
          {name: "Meydan Racecourse Restaurants", distance_km: 2.4, count: 12},
          {name: "Dubai Festival City Dining", distance_km: 4.6, count: 50}
        ],
        gyms: [
          {name: "Fitness First - Meydan", distance_km: 2.2},
          {name: "Gold's Gym - MBR City", distance_km: 1.5},
          {name: "Barry's Bootcamp", distance_km: 3.8}
        ]
      }
    },
    {
      id: "p11",
      name: "Urban Lofts",
      developer: "Meraas",
      lat: 25.2050,
      lon: 55.2650,
      price_aed: 1800000,
      size_sqm: 100,
      handover_month: "2026-09",
      amenities: ["pool", "gym", "metro", "parking", "co_working"],
      key_highlights: "Contemporary lofts in City Walk with vibrant street life.",
      short_desc: "1BR loft-style apartments in City Walk.",
      thumbnail_url: "/placeholder-urban.jpg",
      docs: { floor_plans: true, payment_schedule: true, service_charges: true, approvals: true, master_plan: true },
      nearby: {
        parks: [
          {name: "City Walk Park", distance_km: 0.3, type: "Urban Park"},
          {name: "Safa Park", distance_km: 1.5, type: "Major Park"},
          {name: "Dubai Water Canal Park", distance_km: 0.8, type: "Waterfront Park"}
        ],
        schools: [
          {name: "Jumeirah English Speaking School", distance_km: 3.5, rating: 4.5, type: "British Curriculum"},
          {name: "Dubai International Academy", distance_km: 2.8, rating: 4.4, type: "International"},
          {name: "Raffles International School", distance_km: 2.2, rating: 4.3, type: "International"}
        ],
        transit: [
          {name: "Business Bay Metro Station", distance_km: 2.1, type: "Metro", line: "Red Line"},
          {name: "Financial Centre Metro Station", distance_km: 2.8, type: "Metro", line: "Red Line"},
          {name: "World Trade Centre Metro Station", distance_km: 3.2, type: "Metro", line: "Red Line"}
        ],
        hospitals: [
          {name: "Canadian Specialist Hospital", distance_km: 2.5, type: "Private Hospital"},
          {name: "American Hospital Dubai", distance_km: 4.2, type: "Private Hospital"},
          {name: "Mediclinic City Hospital", distance_km: 3.8, type: "Private Hospital"}
        ],
        shopping: [
          {name: "City Walk", distance_km: 0.2, type: "Lifestyle District"},
          {name: "Box Park", distance_km: 0.5, type: "Boutique Mall"},
          {name: "Dubai Mall", distance_km: 3.5, type: "Super Mall"}
        ],
        restaurants: [
          {name: "City Walk Restaurants", distance_km: 0.2, count: 40},
          {name: "Box Park Dining", distance_km: 0.5, count: 15},
          {name: "Safa Park Cafes", distance_km: 1.6, count: 12}
        ],
        gyms: [
          {name: "Fitness First - City Walk", distance_km: 0.3},
          {name: "CrossFit Yas", distance_km: 1.1},
          {name: "Reform Athletica", distance_km: 1.8}
        ]
      }
    },
    {
      id: "p12",
      name: "Island Retreat",
      developer: "Nakheel",
      lat: 25.1340,
      lon: 55.1860,
      price_aed: 6200000,
      size_sqm: 400,
      handover_month: "2029-06",
      amenities: ["pool", "gym", "beach_access", "marina_access", "kids_area", "parking", "tennis", "sauna"],
      key_highlights: "Private island living with exclusive beach and marina access.",
      short_desc: "6BR beachfront villas on Deira Islands.",
      thumbnail_url: "/placeholder-island.jpg",
      docs: { floor_plans: true, payment_schedule: true, service_charges: true, approvals: true, master_plan: true },
      nearby: {
        parks: [
          {name: "Deira Islands Beach Park", distance_km: 0.4, type: "Beach Park"},
          {name: "Al Mamzar Beach Park", distance_km: 2.8, type: "Major Beach Park"},
          {name: "Deira Waterfront Park", distance_km: 1.5, type: "Waterfront Park"}
        ],
        schools: [
          {name: "GEMS Our Own English High School", distance_km: 4.5, rating: 4.3, type: "British Curriculum"},
          {name: "Dubai National School", distance_km: 5.2, rating: 4.2, type: "International"},
          {name: "The Westminster School", distance_km: 6.1, rating: 4.4, type: "British Curriculum"}
        ],
        transit: [
          {name: "Palm Deira Metro Station (Under Construction)", distance_km: 1.2, type: "Metro", line: "Red Line"},
          {name: "Deira Islands Ferry Terminal", distance_km: 0.8, type: "Ferry"},
          {name: "Union Metro Station", distance_km: 5.8, type: "Metro", line: "Red Line"}
        ],
        hospitals: [
          {name: "NMC Royal Hospital - Deira", distance_km: 4.2, type: "Private Hospital"},
          {name: "Aster Hospital - Dubai", distance_km: 5.5, type: "Private Hospital"},
          {name: "Mediclinic Welcare Hospital", distance_km: 6.8, type: "Private Hospital"}
        ],
        shopping: [
          {name: "Deira Mall", distance_km: 4.5, type: "Mall"},
          {name: "Deira City Centre", distance_km: 5.8, type: "Major Mall"},
          {name: "Dubai Festival City Mall", distance_km: 7.2, type: "Major Mall"}
        ],
        restaurants: [
          {name: "Deira Islands Boulevard", distance_km: 0.6, count: 15},
          {name: "Al Mamzar Restaurants", distance_km: 2.9, count: 25},
          {name: "Deira Waterfront Dining", distance_km: 1.6, count: 18}
        ],
        gyms: [
          {name: "Fitness First - Deira", distance_km: 4.6},
          {name: "Gold's Gym - Deira City Centre", distance_km: 5.9},
          {name: "Body Master Gym", distance_km: 4.2}
        ],
        beaches: [
          {name: "Deira Islands Beach", distance_km: 0.3, type: "Private Beach"},
          {name: "Al Mamzar Beach", distance_km: 2.7, type: "Public Beach"},
          {name: "Jumeirah Beach", distance_km: 12.5, type: "Public Beach"}
        ]
      }
    },
    {
      id: "p13",
      name: "Smart Studios",
      developer: "Danube Properties",
      lat: 25.0650,
      lon: 55.1320,
      price_aed: 950000,
      size_sqm: 55,
      handover_month: "2026-03",
      amenities: ["pool", "gym", "parking"],
      key_highlights: "Affordable smart studios with flexible payment plans.",
      short_desc: "Investment studios in International City.",
      thumbnail_url: "/placeholder-smart.jpg",
      docs: { floor_plans: true, payment_schedule: true, service_charges: false, approvals: true, master_plan: false },
      nearby: {
        parks: [
          {name: "International City Park", distance_km: 0.5, type: "Community Park"},
          {name: "Warsan Park", distance_km: 2.8, type: "Community Park"},
          {name: "Dragon Mart Park", distance_km: 1.2, type: "Urban Park"}
        ],
        schools: [
          {name: "GEMS Modern Academy", distance_km: 3.2, rating: 4.1, type: "International"},
          {name: "Greenfield International School", distance_km: 2.8, rating: 4.0, type: "International"},
          {name: "Sunrise English Private School", distance_km: 4.5, rating: 3.9, type: "British Curriculum"}
        ],
        transit: [
          {name: "International City Bus Station", distance_km: 0.6, type: "Bus Station"},
          {name: "Centrepoint Metro Station", distance_km: 3.5, type: "Metro", line: "Red Line"},
          {name: "Rashidiya Metro Station", distance_km: 4.8, type: "Metro", line: "Red Line"}
        ],
        hospitals: [
          {name: "Aster Hospital - Warsan", distance_km: 2.5, type: "Private Hospital"},
          {name: "NMC Royal Hospital", distance_km: 6.8, type: "Private Hospital"},
          {name: "Mediclinic Dubai Mall", distance_km: 8.5, type: "Private Hospital"}
        ],
        shopping: [
          {name: "Dragon Mart", distance_km: 1.1, type: "Shopping Complex"},
          {name: "International City China Cluster Mall", distance_km: 0.4, type: "Community Mall"},
          {name: "Dubai Outlet Mall", distance_km: 5.2, type: "Outlet Mall"}
        ],
        restaurants: [
          {name: "Dragon Mart Dining", distance_km: 1.1, count: 30},
          {name: "International City Food Courts", distance_km: 0.5, count: 25},
          {name: "Warsan Village Restaurants", distance_km: 2.9, count: 15}
        ],
        gyms: [
          {name: "Fitness Zone - International City", distance_km: 0.7},
          {name: "Body Master Gym", distance_km: 1.5},
          {name: "Gold's Gym - Dragon Mart", distance_km: 1.2}
        ]
      }
    },
    {
      id: "p14",
      name: "Horizon Towers",
      developer: "Select Group",
      lat: 25.0920,
      lon: 55.1690,
      price_aed: 2400000,
      size_sqm: 125,
      handover_month: "2027-03",
      amenities: ["pool", "gym", "metro", "parking", "kids_area"],
      key_highlights: "Modern towers with panoramic city views.",
      short_desc: "2BR apartments in Dubai Sports City.",
      thumbnail_url: "/placeholder-horizon.jpg",
      docs: { floor_plans: true, payment_schedule: true, service_charges: true, approvals: true, master_plan: true },
      nearby: {
        parks: [
          {name: "Victory Heights Park", distance_km: 1.2, type: "Community Park"},
          {name: "Sports City Canal Park", distance_km: 0.8, type: "Waterfront Park"},
          {name: "Motor City Park", distance_km: 2.5, type: "Community Park"}
        ],
        schools: [
          {name: "GEMS Metropole School - Motor City", distance_km: 2.8, rating: 4.2, type: "International"},
          {name: "Victory Heights Primary School", distance_km: 1.5, rating: 4.3, type: "British Curriculum"},
          {name: "Jumeirah International Nursery", distance_km: 3.5, rating: 4.1, type: "Nursery"}
        ],
        transit: [
          {name: "Dubai Sports City Metro Station", distance_km: 0.5, type: "Metro", line: "Red Line"},
          {name: "Dubai Investment Park Metro Station", distance_km: 2.1, type: "Metro", line: "Red Line"},
          {name: "Noor Bank Metro Station", distance_km: 3.8, type: "Metro", line: "Red Line"}
        ],
        hospitals: [
          {name: "Mediclinic Parkview Hospital", distance_km: 4.5, type: "Private Hospital"},
          {name: "Saudi German Hospital", distance_km: 5.8, type: "Private Hospital"},
          {name: "Aster Hospital", distance_km: 6.2, type: "Private Hospital"}
        ],
        shopping: [
          {name: "The Sevens Mall", distance_km: 1.1, type: "Community Mall"},
          {name: "Motor City Shopping Complex", distance_km: 2.6, type: "Community Mall"},
          {name: "Mall of the Emirates", distance_km: 7.5, type: "Major Mall"}
        ],
        restaurants: [
          {name: "Sports City Restaurants", distance_km: 0.6, count: 20},
          {name: "Victory Heights Cafes", distance_km: 1.3, count: 12},
          {name: "Motor City Dining", distance_km: 2.7, count: 18}
        ],
        gyms: [
          {name: "Fitness First - Sports City", distance_km: 0.7},
          {name: "Gold's Gym - Motor City", distance_km: 2.8},
          {name: "Cricket Academy Fitness", distance_km: 1.2}
        ]
      }
    },
    {
      id: "p15",
      name: "Coastal Heights",
      developer: "Emaar Properties",
      lat: 25.0850,
      lon: 55.1450,
      price_aed: 3800000,
      size_sqm: 200,
      handover_month: "2028-09",
      amenities: ["pool", "gym", "beach_access", "parking", "kids_area", "concierge", "sauna"],
      key_highlights: "Premium beachfront residences with resort-style amenities.",
      short_desc: "3BR penthouses in Dubai Marina.",
      thumbnail_url: "/placeholder-coastal.jpg",
      docs: { floor_plans: true, payment_schedule: true, service_charges: true, approvals: true, master_plan: true },
      nearby: {
        parks: [
          {name: "Dubai Marina Walk Park", distance_km: 0.5, type: "Waterfront Promenade"},
          {name: "Marina Beach Park", distance_km: 0.7, type: "Beach Park"},
          {name: "JBR Beach Park", distance_km: 1.1, type: "Beach Park"}
        ],
        schools: [
          {name: "GEMS Wellington International School", distance_km: 3.0, rating: 4.5, type: "International"},
          {name: "Dubai British School", distance_km: 3.8, rating: 4.4, type: "British Curriculum"},
          {name: "Kings' School Dubai", distance_km: 4.2, rating: 4.3, type: "British Curriculum"}
        ],
        transit: [
          {name: "Dubai Marina Metro Station", distance_km: 0.7, type: "Metro", line: "Red Line"},
          {name: "Dubai Tram - Marina Towers Station", distance_km: 0.4, type: "Tram", line: "Red Line"},
          {name: "JBR Tram Station", distance_km: 1.2, type: "Tram", line: "Red Line"}
        ],
        hospitals: [
          {name: "Medcare Hospital - Dubai Marina", distance_km: 0.9, type: "Private Hospital"},
          {name: "NMC Royal Hospital", distance_km: 2.5, type: "Private Hospital"},
          {name: "Saudi German Hospital", distance_km: 5.2, type: "Private Hospital"}
        ],
        shopping: [
          {name: "Dubai Marina Mall", distance_km: 0.6, type: "Mall"},
          {name: "The Walk at JBR", distance_km: 1.2, type: "Waterfront Retail"},
          {name: "Ibn Battuta Mall", distance_km: 3.8, type: "Theme Mall"},
          {name: "Mall of the Emirates", distance_km: 5.5, type: "Major Mall"}
        ],
        restaurants: [
          {name: "Marina Walk Dining", distance_km: 0.5, count: 45},
          {name: "The Walk at JBR", distance_km: 1.2, count: 50},
          {name: "Marina Promenade", distance_km: 0.8, count: 30}
        ],
        gyms: [
          {name: "Fitness First - Marina Mall", distance_km: 0.6},
          {name: "Gold's Gym - Marina", distance_km: 0.8},
          {name: "Body Fuel Gym", distance_km: 1.3}
        ],
        beaches: [
          {name: "Marina Beach", distance_km: 0.7, type: "Public Beach"},
          {name: "JBR Beach", distance_km: 1.3, type: "Public Beach"},
          {name: "Sunset Beach", distance_km: 2.4, type: "Public Beach"}
        ]
      }
    },
];

export async function getProjects(): Promise<Project[]> {
  return PROJECTS;
}

export async function getProjectById(id: string): Promise<Project | null> {
  return PROJECTS.find((p) => p.id === id) || null;
}