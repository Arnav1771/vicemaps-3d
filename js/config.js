/**
 * ViceMaps 3D Configuration
 * Defines cartographic styles, camera presets, dusk lighting parameters, and routing endpoints.
 */

export const MAP_CONFIG = {
  // Default camera setting: Vice City (Miami, FL) Downtown & Biscayne Bay
  defaultLocation: {
    name: "Vice City (Miami)",
    center: [-80.1880, 25.7725],
    zoom: 15.8,
    pitch: 65,
    bearing: 38,
    minZoom: 2,
    maxZoom: 20,
    maxPitch: 85
  },

  // OpenFreeMap Zero-API-Key Vector Tile Style
  styleUrl: "https://tiles.openfreemap.org/styles/dark",

  // Fallback style if offline or throttled
  fallbackRasterTile: "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",

  // GTA 6 Neon Dusk Lighting
  lighting: {
    anchor: "map",
    color: "#ff9955",       // Warm golden-hour sunset light
    intensity: 0.65,
    position: [1.5, 210, 32] // Sun low on southwest horizon
  },

  // 3D Building Extrusions Color Ramp
  building3D: {
    baseColor: "#0f172a",
    tallColor: "#00f0ff",   // Electric cyan crown for skyscrapers > 120m
    midColor: "#ff007f",    // Neon magenta for towers 60m - 120m
    lowColor: "#1e293b",    // Deep slate for residential/mid-rises
    opacity: 0.88
  },

  // Iconic City Skylines
  cityBookmarks: [
    {
      id: "miami",
      name: "🌴 Miami (Biscayne Bay)",
      center: [-80.1880, 25.7725],
      zoom: 15.8,
      pitch: 65,
      bearing: 38,
      tag: "Coastal Skyline"
    },
    {
      id: "tokyo",
      name: "🗼 Tokyo (Shibuya & Shinjuku)",
      center: [139.7006, 35.6895],
      zoom: 15.6,
      pitch: 68,
      bearing: -25,
      tag: "Neon Metropolis"
    },
    {
      id: "manhattan",
      name: "🗽 New York (Manhattan)",
      center: [-73.9851, 40.7488],
      zoom: 15.4,
      pitch: 68,
      bearing: 42,
      tag: "Empire High-Rises"
    },
    {
      id: "dubai",
      name: "🏙️ Dubai (Downtown & Burj)",
      center: [55.2744, 25.1972],
      zoom: 15.5,
      pitch: 66,
      bearing: 55,
      tag: "Mega Structures"
    },
    {
      id: "paris",
      name: "🗼 Paris (Eiffel & Seine)",
      center: [2.2945, 48.8584],
      zoom: 15.6,
      pitch: 60,
      bearing: -15,
      tag: "Historic Capital"
    }
  ],

  // Public OSRM routing endpoint (OpenStreetMap)
  routingEndpoint: "https://router.project-osrm.org/route/v1/driving"
};
