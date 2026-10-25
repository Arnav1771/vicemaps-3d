/**
 * Curated Points of Interest (POIs) - Vice City / Miami Map
 * Includes iconic spots corresponding to GTA 6 trailer locations.
 */

export const POI_DATA = [
  {
    id: "ocean-drive",
    title: "Ocean Drive & Art Deco Strip",
    category: "strip",
    categoryLabel: "Iconic Strip",
    icon: "🌴",
    color: "#00f0ff",
    coords: [-80.1305, 25.7825],
    camera: { zoom: 16.5, pitch: 70, bearing: 6 },
    description: "The world-famous Art Deco neon avenue running along South Beach. High-density pedestrian buzz, vintage supercars, and pastel facades.",
    tags: ["Beach", "Neon", "Cruising", "Nightlife"]
  },
  {
    id: "malibu-club",
    title: "The Malibu Club",
    category: "nightlife",
    categoryLabel: "Nightclub",
    icon: "🍸",
    color: "#ff007f",
    coords: [-80.1328, 25.7905],
    camera: { zoom: 16.8, pitch: 65, bearing: -30 },
    description: "The legendary multi-level neon nightclub. Electronic synthwave beats, VIP rooftop lounge, and beachfront cocktail terrace.",
    tags: ["Nightclub", "Synthwave", "VIP"]
  },
  {
    id: "downtown-towers",
    title: "Downtown Financial Towers & Skybridge",
    category: "landmark",
    categoryLabel: "Skyscrapers",
    icon: "🏙️",
    color: "#00f0ff",
    coords: [-80.1905, 25.7715],
    camera: { zoom: 16.0, pitch: 74, bearing: 45 },
    description: "Volumetric glass monoliths towering over the bay. Includes rooftop infinity decks, high-speed elevators, and banking headquarters.",
    tags: ["Skyscrapers", "Commercial", "3D Architecture"]
  },
  {
    id: "downtown-helipad",
    title: "Apex Tower Rooftop Helipad",
    category: "helipad",
    categoryLabel: "Helipad",
    icon: "🚁",
    color: "#f59e0b",
    coords: [-80.1872, 25.7680],
    camera: { zoom: 17.2, pitch: 75, bearing: 110 },
    description: "Private executive rooftop helipad standing 210 meters above Biscayne Bay. Prime launch point for panoramic aerial city flyovers.",
    tags: ["Aviation", "Helipad", "Skyline View"]
  },
  {
    id: "port-of-vice",
    title: "Port of Vice City & Mega-Terminal",
    category: "marina",
    categoryLabel: "Port & Marina",
    icon: "⚓",
    color: "#10b981",
    coords: [-80.1700, 25.7760],
    camera: { zoom: 15.2, pitch: 62, bearing: -75 },
    description: "One of the busiest maritime cruise and cargo terminals in the Americas. Massive container gantries, luxury cruise liners, and deep-water docks.",
    tags: ["Shipping", "Superyachts", "Harbor"]
  },
  {
    id: "venetian-islands",
    title: "Venetian Causeway & Island Mansions",
    category: "strip",
    categoryLabel: "Causeway",
    icon: "🌉",
    color: "#8b5cf6",
    coords: [-80.1600, 25.7905],
    camera: { zoom: 15.6, pitch: 68, bearing: 82 },
    description: "Chain of man-made residential barrier islands linked by toll bridges. Waterfront villas with private boat slips and bayfront skyline views.",
    tags: ["Bridge", "Waterfront", "Speedway"]
  },
  {
    id: "star-island",
    title: "Star Island Billionaire Enclave",
    category: "landmark",
    categoryLabel: "Luxury Estates",
    icon: "🏰",
    color: "#f59e0b",
    coords: [-80.1500, 25.7780],
    camera: { zoom: 16.2, pitch: 64, bearing: -40 },
    description: "Gated celebrity island guarded by private water security. Mega-mansions with helicopter pads, tennis courts, and Biscayne Bay frontage.",
    tags: ["Exclusive", "Estates", "Gated"]
  }
];
