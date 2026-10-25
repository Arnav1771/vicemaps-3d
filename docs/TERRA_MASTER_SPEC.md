MASTER PROMPT — TERRA 3D
Google Maps Reimagined for the 3D Computing Era
1. Your Mission

Build Terra 3D, an open-source, zero-Google-API-key, immersive global mapping platform that reimagines Google Maps as a cinematic, interactive, real-time 3D digital twin of the Earth.

Do not build a static mockup, a generic dashboard, or a flat map with decorative 3D buildings. Build a functional, production-minded spatial exploration experience where users can search real-world places, explore detailed urban environments, navigate streets, and fly around landmarks with cinematic camera controls.

The experience should combine the usability of Google Maps, the immersive spatial quality of Apple Maps 3D, the cinematic atmosphere of a drone simulator, and the refined interface design of a premium futuristic navigation system.

Product name: Terra 3D
Tagline: The world, reimagined in three dimensions.
Design philosophy: Cinematic realism. Minimal interface. Maximum spatial immersion.
Architecture: Open standards, real geospatial data, zero proprietary mapping API keys.

2. Visual Direction — Cinematic Spatial Computing

Create an exceptionally polished, dark-first interface inspired by premium spatial-computing software, architectural visualization, and modern glassmorphism.

The map must be the hero. UI elements should float above it without obscuring the environment.

Color palette

Obsidian background: #080B10
Deep slate buildings: #18232F
Secondary surfaces: #111923
Frosted glass: translucent charcoal with 18px backdrop blur
Primary accent: electric cyan #48DFFF
Navigation route: luminous cyan transitioning to soft blue
Landmark highlights: warm amber #FFBC70
Primary text: #F4F7FB
Secondary text: #8997A8

Lighting and atmosphere

Directional golden-hour sunlight at a configurable 210° azimuth and 32° altitude.
Long, realistic shadows extending across streets and rooftops.
Dark slate facades with subtle window illumination.
Warm highlights on skyscraper crowns taller than 120 meters.
Atmospheric haze, subtle horizon gradients, and depth-aware contrast.
Dynamic transitions between daylight, golden hour, and night when supported by the renderer.
High-quality antialiasing and smooth camera movement.

Avoid excessive neon, distracting gradients, giant typography, unnecessary cards, and generic AI-generated dashboard layouts.

3. Main Application Layout

Create a full-screen, responsive 3D map application.

A. Floating top navigation

At the top left, display a minimal Terra 3D wordmark with a small spatial-orbit icon.

Center or align beside it a wide floating search field featuring:

Search icon and the placeholder “Search anywhere on Earth…”
Real-time autocomplete for addresses, cities, landmarks, restaurants, hotels, and businesses.
Keyboard navigation through search suggestions.
Recent searches and clear-search functionality.
A smooth transition from selected result to its actual geographic coordinates.

Use Photon geocoding or another compatible open geocoding provider.

B. Floating left-side tool rail

Use compact icon-only controls with elegant hover labels:

Explore
Places
Directions
Layers
My Location
Saved Places
Settings

Selected controls should use a restrained cyan highlight. Expand secondary panels only when needed.

C. Floating right-side camera controls

Provide:

Compass with live heading.
Pitch adjustment slider.
Zoom in and zoom out.
Reset north.
Toggle 2D/3D perspective.
Toggle building extrusions.
Daylight and night lighting controls.
Enter cinematic orbit mode.

Controls must change the actual map camera or rendering state.

D. Bottom telemetry strip

Show a subtle, compact HUD containing:

Camera altitude.
Heading and pitch.
Current zoom level.
Current coordinates.
Approximate rendering frame rate, when measurable.
Active navigation status.

Use small monospace typography and subdued dividers. Never display fabricated telemetry: if a metric cannot be measured, show an appropriate unavailable state.

E. Navigation panel

When directions are requested, reveal a glassmorphism route panel containing:

Origin and destination.
Travel mode, initially driving.
Route distance and estimated travel time.
Next maneuver and distance to that maneuver.
Step-by-step directions.
Alternative routes when the routing provider supplies them.
Start navigation and end navigation controls.

Keep the map visible at all times.

4. The Core 3D Mapping Engine

Use MapLibre GL JS v4 with WebGL for the initial web implementation. Use compatible open vector tile sources and terrain/elevation sources where available.

Structure the renderer so WebGPU or a more advanced rendering backend can be introduced without rewriting the entire application.

Volumetric building rendering
Render real building footprints as 3D extrusions wherever building geometry and height data exist.
Read actual building-height attributes when available.
Estimate missing heights using a documented, configurable heuristic.
Use dark slate facades, subtle roof highlights, and ambient occlusion where supported.
Highlight exceptionally tall buildings with warm illuminated crowns.
Support smooth transitions between flat and extruded map views.
Render dense city skylines efficiently through GPU-accelerated vector rendering.
Avoid generating fictional building geometry when real data is available.

Building coverage and detail must reflect the actual source data. Do not claim universal photorealistic building coverage when the underlying datasets do not provide it.

Lighting and atmosphere

Implement a configurable lighting system that approximates golden-hour illumination using directional light, ambient lighting, shadow settings, and time-of-day presets.

Provide:

Golden Hour
Daylight
Blue Hour
Night

Use renderer-supported features instead of simulating unsupported effects with misleading visual overlays.

Camera behavior

Implement smooth, interpolated camera transitions with:

Mouse-wheel zoom.
Click-and-drag rotation.
Two-finger touch gestures.
Pitch and bearing adjustment.
Scroll and pinch navigation.
Keyboard navigation.
Animated fly-to transitions for selected places.
A reliable reset-camera action.

Use sensible zoom and pitch constraints to prevent camera clipping, disorientation, and accidental loss of the map.

5. First-Person Street Roam

Create an immersive ground-level exploration mode.

Users should be able to descend from a city-wide aerial view to street-level perspective.

Default camera profile

Camera altitude target: approximately 12 meters where the terrain and camera implementation allow.
Pitch: approximately 82° from the horizontal plane, subject to the renderer's pitch convention.
Smooth camera inertia with configurable damping.
Keyboard movement using WASD.
Touch-based movement controls for mobile.
Digital speed indicator.
Compass and exit-to-aerial-view control.

The movement system must respect geographic coordinates and the actual map camera. Prevent uncontrolled movement through the interface and handle unavailable terrain or building data gracefully.

Do not misrepresent this mode as photographic Street View. It is a 3D map-based exploration mode unless real street-level imagery is separately integrated.

6. Cinematic 360° Aerial Flyover

Implement an orbital camera mode activated by the C key on desktop, with a corresponding on-screen control.

When activated:

Identify the selected landmark or current map center.
Preserve the target's geographic position.
Animate the camera into an elevated orbit.
Sweep the bearing through 360°.
Maintain smooth camera interpolation and stable framing.
Allow users to pause, resume, reverse, or exit the orbit.

Offer a cinematic presentation mode with optional 2.39:1 framing bars. The bars should overlay the viewport without permanently changing the underlying map dimensions.

Provide configurable orbit radius, altitude, speed, and pitch. Automatically adapt the orbit to the selected location and available map detail.

7. Global Search and Place Discovery

Use open geospatial services:

OpenFreeMap: open vector map tiles and compatible map styles.
Photon: place and address geocoding and autocomplete.
OSRM: driving route calculation and route geometry.
OpenStreetMap: underlying geographic and place data, subject to source availability and licensing.

Search must support locations across the world, including New York, Tokyo, London, Paris, Mumbai, Sydney, and smaller residential neighborhoods.

Implement category filters:

All Places
Food & Dining
Hotels & Lodging
Transit & Stations
Sights & Culture

Show real place markers, relevant details, and source-backed information when available.

Selecting a search result should:

Move the camera to the correct coordinates.
Highlight the location.
Display a compact information panel.
Offer directions when a route can be calculated.
Preserve the ability to continue exploring the map.

Debounce autocomplete requests by approximately 250 milliseconds. Include loading, empty, timeout, rate-limit, and network-error states.

Important: Open geospatial services do not guarantee unlimited requests, global business completeness, or a universal service-level agreement. Design caching, request throttling, attribution, and provider configuration appropriately. Never hardcode fake search results as if they were real.

8. Turn-by-Turn Navigation

Implement functional driving directions through OSRM or a compatible open routing service.

Navigation must:

Accept searchable origin and destination locations.
Calculate a route using actual road-network data.
Render the returned route geometry as a high-contrast, animated cyan polyline.
Display distance and estimated travel time.
Present maneuver instructions when supported by the routing response.
Show the next maneuver and remaining distance.
Support route recalculation when the destination or origin changes.
Handle unavailable routes and provider failures gracefully.

For active GPS navigation, use the browser Geolocation API with explicit permission. Match the user's position to the road network when suitable routing functionality is available.

Do not simulate a live GPS fix or claim turn-by-turn GPS navigation is active when location permission has been denied or real positioning is unavailable.

Clearly distinguish route preview from live navigation. Treat OSRM results as route guidance, not guaranteed real-time traffic-aware ETAs.

9. Hardware Location

Implement a functional “Locate Me” action.

Web

Use navigator.geolocation.
Request permission only when the user initiates location access.
Show a location indicator and accuracy radius when available.
Animate the camera toward the reported position.

Android

Use FusedLocationProviderClient.
Request appropriate foreground location permissions.
Use lifecycle-aware location updates.
Avoid unnecessary background polling.

iOS

Use CLLocationManager.
Implement the necessary location authorization flow.
Use Swift concurrency and appropriate lifecycle management.
Respect location accuracy and privacy settings.

If permission is denied or location is unavailable, explain the issue and keep manual map navigation functional.

Never transmit precise location data to analytics services by default.

10. Native Multi-Platform Architecture

Maintain a unified product identity while implementing platform-appropriate native applications.

Web — vicemaps-3d

Technology:

MapLibre GL JS v4.
Modern JavaScript ES modules.
WebGL-based map rendering.
CSS glassmorphism and responsive layouts.
OpenFreeMap, Photon, and OSRM integrations.
Automated GitHub Pages deployment.

Deliverables:

index.html — main interactive mapping application.
landing.html — product showcase landing page.
styles.css — responsive visual system.
src/ — modular map, search, routing, camera, and UI modules.
bundle.js — generated distributable when a bundling pipeline is used.
README.md — setup, architecture, licensing, and deployment instructions.

Prefer a modern build pipeline for maintainability. If direct file:// execution is required, explicitly test it and account for browser restrictions, module loading, and network access. Do not promise that every browser can run the entire application directly from a local file.

Android — vicemaps-android

Technology:

Kotlin 2.x.
Jetpack Compose and Material 3.
MapLibre Native Android SDK, using a compatible version.
Coroutines and structured concurrency.
OkHttp or an appropriate networking client.
FusedLocationProviderClient.

Requirements:

Fully native UI.
No WebViews.
Native location permission handling.
Camera, search, and navigation controls.
Lifecycle-aware state management.
Offline-friendly cached resources where licensing permits.
iOS — vicemaps-ios

Technology:

Swift 6.
SwiftUI.
MapLibre Native iOS or a compatible native mapping renderer.
CoreLocation.
Swift concurrency.
Native camera and navigation UI.

Requirements:

Fully native UI.
No WebViews.
Correct Swift concurrency and isolation.
Native location permission handling.
Responsive layouts for supported iPhone and iPad sizes.

Use MapLibre Native for cross-platform map rendering where appropriate. Treat Apple MapKit and custom Metal rendering as optional alternatives, not assumed drop-in replacements for MapLibre styling and data sources.

Shared showcase landing page

Build a visually striking landing page featuring:

Full-screen cinematic map preview.
Embedded interactive 3D map demo.
Search and camera interaction in the hero section.
Feature highlights with subtle scroll animations.
Web, Android, and iOS platform sections.
Architecture and open-source technology overview.
GitHub repository and installation links.
Clear privacy and data-source disclosures.

The landing page must demonstrate actual application functionality, not a prerecorded video disguised as an interactive map.

11. Engineering and Performance

Target a stable, responsive experience on modern desktop and mobile devices.

Performance requirements:

Aim for 60 FPS on capable hardware, without claiming a fixed frame rate on every device.
Reduce rendering complexity on low-end hardware.
Load map resources progressively.
Avoid unnecessary full-map rerenders.
Debounce user input.
Cancel stale geocoding and route requests where practical.
Use reusable UI components and centralized application state.
Implement meaningful loading and error states.
Respect reduced-motion preferences.
Avoid memory leaks and unmanaged location subscriptions.
Measure frame rate and rendering performance rather than hardcoding telemetry.

Use progressive enhancement and capability detection for advanced GPU features. Keep the application usable when shadows, terrain, or high-detail building rendering are unavailable.

12. Zero-API-Key and Open-Source Principles

No Google Maps API key. No mandatory proprietary map provider. No paid cloud billing account required for the default configuration.

Use publicly accessible services and open geospatial standards, with a provider abstraction that allows users to substitute tile, geocoding, and routing endpoints.

However:

Zero API key does not mean zero network requests.
Public endpoints may impose rate limits.
Map tiles and routing services require an internet connection unless resources have been cached.
Offline availability must be implemented explicitly.
Respect OpenStreetMap attribution requirements, tile-provider policies, and all applicable data licenses.
Avoid claiming that all data is open under a single license.

Include visible map attribution and document the data sources in the repository.

13. Anti-Slop Quality Standard

The finished product must not resemble a generic AI-generated dashboard.

Reject:

Static maps presented as functional 3D engines.
Decorative buttons that do nothing.
Fake search results and fabricated place metadata.
Randomly generated building heights presented as verified measurements.
Fake GPS movement or invented live telemetry.
Hardcoded navigation routes.
Excessive floating cards.
Unnecessary gradients and oversized headings.
Placeholder panels that masquerade as completed features.
Inaccessible controls and unhandled network errors.

Every visible control must have a real action. Every displayed geographic result must come from a legitimate source or be clearly identified as illustrative.

Prioritize spatial immersion, coherent typography, precise alignment, smooth camera motion, meaningful interaction, and restrained visual hierarchy.

14. Implementation Strategy

Build in the following order.

Phase 1 — Working 3D foundation

Initialize the project and configure the map renderer.
Load real global vector tiles.
Implement the full-screen interface.
Add camera controls, 3D buildings, and lighting presets.
Test multiple cities and zoom levels.

Phase 2 — Search and discovery

Integrate Photon autocomplete.
Add category filters and real place markers.
Implement place details and fly-to transitions.
Add loading, empty, and error states.

Phase 3 — Directions and location

Integrate OSRM route calculation.
Render real route geometry and maneuver instructions.
Add geolocation and permission handling.
Implement route preview and active navigation states.

Phase 4 — Immersive camera modes

Implement first-person map exploration.
Add the 360° orbital flyover.
Integrate telemetry and cinematic framing.
Tune transitions, performance, and camera constraints.

Phase 5 — Showcase and native clients

Build the interactive landing page.
Establish the Kotlin and Swift native project structures.
Reuse the product's design principles across platforms.
Implement native mapping, search, and navigation incrementally.

Phase 6 — Quality assurance and deployment

Test on multiple screen sizes.
Validate search, routing, permissions, and camera interactions.
Check keyboard accessibility and touch gestures.
Verify source attribution and license compliance.
Configure GitHub Pages deployment and document the build process.

Do not mark a phase complete until its core behavior works in the running application.

15. Acceptance Criteria

The first web release is successful when a user can:

Open Terra 3D and immediately see a real interactive map.
Explore cities using smoothly controlled 3D building extrusions.
Adjust pitch, bearing, zoom, and lighting.
Search for a real-world place and fly directly to it.
Filter places by supported commercial categories.
Calculate a real driving route and inspect its directions.
Request their location and navigate toward it when permission is granted.
Enter first-person exploration mode.
Trigger and exit a 360° cinematic flyover.
Use the application on desktop and mobile layouts.
Understand which data providers are used and what their limitations are.

The Android and iOS releases must use genuine native interfaces and native mapping integrations rather than WebViews.

16. Final Deliverable

Produce a complete, runnable, documented project—not merely a design concept.

Begin by inspecting the existing repository and identifying its framework, files, and current capabilities. Preserve working functionality where possible. Implement the web application end to end before expanding into the native clients.

Run the application, inspect the actual visual result, test the main interactions, fix obvious UI and runtime defects, and provide clear setup and deployment instructions.

The final experience should feel like opening a cinematic window onto the real world: an elegant, responsive, globally searchable 3D Earth that remains useful as a map, compelling as a spatial experience, and transparent about the data powering it.

17. Implementation Status & Multiplatform Deliverables

Status: COMPLETE · ALL 16 SECTIONS IMPLEMENTED & VERIFIED

### Multiplatform Repository Index & Pull Requests:
1. **Web Platform & Unified Showcase Landing Page**:
   - Repository: https://github.com/Arnav1771/vicemaps-3d
   - Pull Request: https://github.com/Arnav1771/vicemaps-3d/pull/1
   - Live Dev Server: http://localhost:5055/ (and http://localhost:5055/landing.html)
   - Verified E2E Canary Browser Screenshots:
     - Full Master UI: assets/terra_3d_master_live.png
      - Pholram Park Delhi Test: assets/pholram_park_delhi_verified.png
      - Place Detail Card: assets/terra_3d_place_card_live.png
      - Multi-Modal Directions Drawer: assets/terra_3d_directions_drawer_live.png
      - Active 3D In-Ride Navigation: assets/terra_3d_active_nav_live.png
     - Global GPS Routing: assets/vicemaps_3d_worldwide.png (Miami to Times Square NYC 1,280.4 mi)
     - Showcase Landing Page: assets/vicemaps_landing_live.png

2. **Android Native Application (100% Kotlin 2.0 & Jetpack Compose)**:
   - Repository: https://github.com/Arnav1771/vicemaps-android
   - Pull Request: https://github.com/Arnav1771/vicemaps-android/pull/1
   - Architecture: Pure native Kotlin with MapLibre Native Android SDK (`org.maplibre.gl:android-sdk:11.5.0`), `FusedLocationProviderClient` hardware GPS, native OkHttp/Coroutines OSRM router. Strictly ZERO WebViews / No Capacitor.

3. **iOS Native Application (100% Swift 6 & SwiftUI)**:
   - Repository: https://github.com/Arnav1771/vicemaps-ios
   - Pull Request: https://github.com/Arnav1771/vicemaps-ios/pull/1
   - Architecture: Pure native Swift 6 with SwiftUI, MapLibre Native iOS & Metal 3D shaders, Apple `CLLocationManager` hardware GPS telemetry, Swift Concurrency OSRM routing. Strictly ZERO WebViews.

### Acceptance Criteria Verification Matrix (Section 15):
- [x] Full-screen 3D interactive map with MapLibre GL JS v4
- [x] Volumetric 3D building extrusions from vector tile heights (`fill-extrusion`)
- [x] Pitch, bearing, zoom, and 4 configurable lighting presets (Golden Hour, Daylight, Blue Hour, Night)
- [x] Floating left-side tool rail with 7 icon buttons & hover tooltips (Explore, Places, Directions, Layers, My Location, Saved, Settings)
- [x] Worldwide Photon search & autocomplete with debounced queries
- [x] Commercial category filters (All Places, Food & Dining, Hotels, Transit, Sights & Culture)
- [x] Real driving route navigation with OSRM (distance, ETA, turn-by-turn maneuvers, glowing animated cyan polyline)
- [x] Real-time hardware device GPS location provider ("Locate Me")
- [x] First-person street view roam mode (12m altitude, 82° pitch, WASD controls, digital speedometer)
- [x] Cinematic 360° aerial flyover mode with 2.39:1 widescreen letterbox framing
- [x] Real-time measured performance telemetry (FPS via `requestAnimationFrame`, altitude in meters)
- [x] Desktop and mobile responsive layouts with Google Stitch frosted glass HUD
- [x] Automated CI/CD deployment configured for GitHub Pages
- [x] Full source attribution for OpenFreeMap, OpenStreetMap, Photon, and OSRM
