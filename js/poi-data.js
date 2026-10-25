/**
 * Real-World Points of Interest (POIs) & Global Landmarks
 * Google Maps Reimagined: Authentic global locations and commercial categories.
 */

export const POI_DATA = [
  {
    id: "times-square",
    title: "Times Square & Broadway District",
    category: "sights",
    categoryLabel: "Iconic Landmark",
    icon: "🏙️",
    color: "#00f0ff",
    coords: [-73.9855, 40.7580],
    camera: { zoom: 16.5, pitch: 72, bearing: 28 },
    description: "The premier commercial intersection in Midtown Manhattan. Illuminated digital displays, Broadway theaters, and dense skyscraper canyons.",
    tags: ["New York", "Manhattan", "Sightseeing", "Theaters"]
  },
  {
    id: "eiffel-tower",
    title: "Eiffel Tower & Champ de Mars",
    category: "sights",
    categoryLabel: "Monument",
    icon: "🗼",
    color: "#f59e0b",
    coords: [2.2945, 48.8584],
    camera: { zoom: 16.2, pitch: 68, bearing: -45 },
    description: "Wrought-iron lattice tower on the Champ de Mars in Paris. World-renowned architectural icon with panoramic Seine river views.",
    tags: ["Paris", "France", "Monument", "Architecture"]
  },
  {
    id: "shibuya-crossing",
    title: "Shibuya Crossing & Hachiko Square",
    category: "transit",
    categoryLabel: "Transit & District",
    icon: "🚆",
    color: "#ff007f",
    coords: [139.7006, 35.6595],
    camera: { zoom: 17.0, pitch: 65, bearing: 15 },
    description: "The world's busiest pedestrian scramble intersection outside Shibuya Station. Multi-directional neon video billboards and subway network.",
    tags: ["Tokyo", "Japan", "Transit", "Crosswalk"]
  },
  {
    id: "burj-khalifa",
    title: "Burj Khalifa & Downtown Dubai",
    category: "sights",
    categoryLabel: "Super-Skyscraper",
    icon: "✨",
    color: "#00f0ff",
    coords: [55.2744, 25.1972],
    camera: { zoom: 16.0, pitch: 76, bearing: -60 },
    description: "The tallest structure on Earth standing at 828 meters. Surrounded by the Dubai Fountain, luxury hotels, and expansive avenue grids.",
    tags: ["Dubai", "UAE", "Skyscrapers", "Modern"]
  },
  {
    id: "big-ben",
    title: "Palace of Westminster & Big Ben",
    category: "sights",
    categoryLabel: "Historic Landmark",
    icon: "🏛️",
    color: "#f59e0b",
    coords: [-0.1246, 51.5007],
    camera: { zoom: 16.5, pitch: 66, bearing: 85 },
    description: "The historic seat of the Parliament of the United Kingdom on the river Thames. Celebrated neo-Gothic clock tower and Westminster Bridge.",
    tags: ["London", "UK", "History", "Thames"]
  },
  {
    id: "ocean-drive",
    title: "Ocean Drive & Art Deco District",
    category: "restaurants",
    categoryLabel: "Dining & Promenade",
    icon: "🍽️",
    color: "#10b981",
    coords: [-80.1305, 25.7825],
    camera: { zoom: 16.5, pitch: 70, bearing: 6 },
    description: "Historic waterfront promenade lined with sidewalk bistros, boutique hotels, and preserved 1930s Art Deco architecture.",
    tags: ["Miami", "Bistros", "Architecture", "Dining"]
  },
  {
    id: "marina-bay",
    title: "Marina Bay Sands & Gardens",
    category: "hotels",
    categoryLabel: "Hotel & Resort",
    icon: "🏨",
    color: "#ff007f",
    coords: [103.8596, 1.2834],
    camera: { zoom: 16.3, pitch: 68, bearing: -120 },
    description: "Integrated resort complex featuring three 55-story hotel towers topped by a cantilevered SkyPark and infinite waterfront promenade.",
    tags: ["Singapore", "Hotel", "Resort", "Waterfront"]
  },
  {
    id: "pholram-park",
    title: "Pholram Park (Rishi Nagar, Delhi)",
    category: "sights",
    categoryLabel: "Public Green Park",
    icon: "🌳",
    color: "#10b981",
    coords: [77.1273, 28.6867],
    camera: { zoom: 16.8, pitch: 65, bearing: 24 },
    description: "Public neighborhood park and green space located in the Rishi Nagar / Pitampura district of North West Delhi, India.",
    tags: ["India", "Delhi", "Pitampura", "Rishi Nagar", "Park", "Pholram"]
  }
];
