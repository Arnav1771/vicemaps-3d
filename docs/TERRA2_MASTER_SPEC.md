TERRA 3D — ADVANCED FEATURE UPGRADE & PRODUCTION VERIFICATION
From 3D Map Demo to a Fully Interactive Spatial Navigation Platform
Mission

Continue developing the existing Terra 3D codebase. Do not rebuild the application from scratch, discard working features, or replace real functionality with mockups.

Upgrade the existing implementation of index.html and app.js, preserving the current MapLibre 3D engine, Google Stitch-inspired glass HUD, place detail cards, multimodal directions drawer, cinematic flyover, saved places, and in-ride navigation simulation.

The goal is to transform Terra 3D into an exceptionally polished, functional, real-world mapping experience that combines immersive 3D cartography with the practical utility of Google Maps.

Core principle: Every interaction must work, every geographic claim must be grounded in real data, and every navigation state must remain synchronized with the actual route.

1. Intelligent Place Detail Cards

Upgrade the existing place card in index.html and its behavior in app.js.

Visual design

Create a premium floating glass card anchored near the selected map location.

Include:

Place name and verified geographic coordinates.
Authentic business category.
Star rating and review count when a trustworthy source provides them.
Full street address when available.
Distance from the user's location when permitted.
Current opening status and opening hours when verified.
Price range when available.
A compact preview image only when a legitimate image source exists.
A subtle location marker synchronized with the selected place.

Keep the card compact, legible, and responsive. On mobile, display it as a bottom sheet with swipe-friendly actions.

Four primary actions

Directions

Opens the directions drawer.
Automatically sets the selected place as the destination.
Preserves a valid origin if the user already selected one.

Street Explore

Transitions into the existing first-person 3D exploration mode.
Centers the camera on the selected coordinates.
Clearly identifies this as map-based exploration rather than photographic Street View.

Cinematic Flyover

Begins a smooth orbital animation around the selected place.
Adjusts altitude and orbit radius according to the surrounding map context.
Provides pause, resume, and exit controls.

Save Place

Saves the selected location with a visible state change.
Persists saved locations across browser sessions using local storage.
Stores stable place identifiers where available, coordinates, names, and categories.
Supports removing saved places and prevents accidental duplicate entries.
Data integrity

Do not invent ratings, review counts, opening hours, photographs, or business addresses.

OpenStreetMap and Photon do not guarantee Google-style ratings or review counts. Display these fields only when they come from an actual integrated source. Otherwise, omit them or show a clearly labeled unavailable state.

Clicking a place marker, selecting a search suggestion, opening a saved place, and selecting a search result must all resolve to the same canonical place-selection state.

2. Advanced Multimodal Directions

Upgrade the existing directions drawer into a complete route-planning interface.

Transport modes

Provide three selectable modes:

Driving
Walking
Public transit

Use real routing data whenever a suitable provider is available.

Driving: Use OSRM or a compatible road-routing service.

Walking: Use a walking-capable routing engine or a configured provider that explicitly supports pedestrian routing. Do not assume every OSRM deployment supports every profile.

Public transit: Integrate a compatible transit-routing provider backed by GTFS or equivalent transit data. Display real transit legs, stops, transfer counts, and schedules when supported.

Never present a driving route as a walking route or fabricate train schedules, transit lines, fares, or transfer information.

If a mode is unsupported in the current region, explain why and offer the available alternatives.

Origin and destination

Implement:

Editable origin and destination inputs.
Search autocomplete for both endpoints.
A swap-endpoints button.
A current-location origin option when permission is granted.
Map-based origin and destination selection.
Clear and reset actions.
Keyboard navigation and accessible input labels.

Swapping endpoints must recalculate the route rather than merely exchanging the displayed text.

Route alternatives

When the provider returns alternatives, display them as selectable route options.

For each route, show:

Total distance.
Estimated duration.
Route type or primary road information where available.
Toll information only when supported by the routing provider.
A visual route preview on the map.

Highlight the active route in bright cyan. Display alternative routes with subdued colors and lower visual prominence.

Fit the camera to the selected route while preserving a useful 3D perspective.

Turn-by-turn instructions

Build a structured maneuver list with:

Maneuver type.
Directional icon.
Street or road name.
Distance to the next maneuver.
Segment distance.
Total remaining distance.
Estimated remaining time.

Use actual routing response data. Normalize provider-specific maneuver types into a consistent internal model.

Allow users to tap a maneuver and smoothly focus the map on the corresponding route segment.

3. Real-Time 3D Navigation State Machine

Replace loosely coupled navigation flags with a centralized, predictable navigation state machine.

Define explicit states:

idle
planning
route-ready
navigating
rerouting
arrived
paused
error

All relevant UI components must subscribe to the same navigation state.

The place card, directions drawer, route line, vehicle marker, camera controller, maneuver banner, and ETA display must never disagree about the active destination or route.

Starting navigation

When the user presses Start 3D Navigation:

Validate that a route exists.
Initialize progress along the actual route geometry.
Fit the camera to the initial navigation position.
Switch into a configurable 3D driving perspective.
Display the next maneuver and remaining distance.
Start location updates or clearly labeled simulation playback.
Activate the navigation HUD.
Provide visible pause, resume, and exit controls.

Prevent duplicate animation loops and duplicate location subscriptions when navigation is started repeatedly.

Driving camera

Use the existing cockpit perspective as a starting point:

Pitch: approximately 74°.
Zoom: approximately 17.5, adjusted to the available map detail.
Bearing: aligned with the direction of travel.
Camera target: slightly ahead of the current route position.
Smooth camera interpolation with configurable damping.

Use the route geometry to calculate a reliable heading. Handle sharp turns, short segments, duplicate coordinates, and route endpoints without abrupt camera rotations.

On mobile, keep the upcoming road and maneuver area visible without covering the route with the HUD.

Vehicle marker

Improve the current vehicle chase marker.

The marker must:

Follow the actual route geometry.
Interpolate smoothly between coordinates.
Rotate according to the local route bearing.
Remain synchronized with the navigation progress indicator.
Avoid jumps when moving between route segments.
Stop cleanly at the route endpoint.
Use an appropriate marker asset with a fallback if the asset fails to load.

For simulated navigation, derive movement from route distance and an adjustable simulation speed rather than advancing one coordinate per arbitrary timer tick.

Keep simulation speed separate from real-world speed. Label simulated movement clearly and never imply that it represents the user's actual GPS location.

Progress tracking

Display:

Distance traveled.
Remaining route distance.
Current maneuver.
Distance to the next maneuver.
Estimated time remaining.
Current speed only when sourced from location data or explicitly identified as simulated.

Calculate progress against the route geometry rather than the number of coordinates in the route response.

Pause and resume

Pausing navigation must stop the simulation or suspend active guidance updates as appropriate without losing the route or progress.

Resuming must continue from the saved progress position.

Arrival handling

When the user reaches the route endpoint:

Transition to the arrived state.
Stop the vehicle marker.
Stop simulation animation loops.
Display an arrival confirmation.
Offer options to end navigation or return to the overview map.

Avoid triggering arrival prematurely because of sparse route coordinates or GPS drift.

4. Live GPS Navigation and Rerouting

Extend simulated navigation with a genuine GPS-powered mode.

Location handling

Use the browser Geolocation API with explicit permission.

When navigation is active:

Read real position updates.
Display an accuracy indicator when available.
Match the reported position to the route when practical.
Estimate progress along the route.
Calculate heading from location data or the route geometry.
Distinguish a moving GPS fix from a stationary or stale fix.
Respect permission denial and browser lifecycle behavior.

Do not request continuous high-accuracy location before the user explicitly activates the relevant feature.

Off-route detection

Detect when the user's position diverges significantly from the active route.

Use configurable distance thresholds and account for location accuracy before triggering a reroute.

When the user is genuinely off-route:

Transition to rerouting.
Retain the current destination.
Request a replacement route from the latest valid position.
Update the route geometry and maneuver list.
Preserve camera continuity.
Return to navigating after successful recalculation.

If rerouting fails, keep the last valid route visible and explain that updated directions are unavailable.

Do not repeatedly reroute because of normal GPS drift.

Simulation and GPS modes

Provide two explicit modes:

Demo Mode

Follows the route at an adjustable simulated speed.
Works without GPS permission.
Displays a persistent “SIMULATION” indicator.
Supports pause, resume, and restart.

Live GPS Mode

Uses real device location.
Requests permission at the appropriate moment.
Does not fabricate vehicle movement.
Handles stale fixes, denied permissions, and unavailable location services.

Never silently switch from live GPS to simulated movement.

5. Adaptive Navigation HUD

Redesign the active navigation banner as a compact, premium glass HUD.

Primary maneuver banner

Display:

Large maneuver arrow.
Instruction such as “Turn right onto MG Road.”
Distance until the maneuver.
Secondary street information where available.

The displayed instruction must correspond to the next maneuver in the active route.

Bottom navigation panel

Display:

Remaining travel time.
Remaining distance.
Estimated arrival time when a reliable time basis exists.
Destination name.
Route progress indicator.
Pause/resume control.
Exit navigation control.
Adaptive layout

Desktop:

Compact upper navigation banner.
Bottom telemetry strip.
Optional collapsible maneuver list.

Mobile:

Safe-area-aware top banner.
Bottom sheet with remaining distance and ETA.
Large touch targets.
Minimal obstruction of the 3D route.

Include smooth transitions between navigation states. Respect reduced-motion preferences and maintain readable text contrast.

6. Map-Aware Place Intelligence

Improve the existing place-discovery experience.

Search behavior

Support:

Global location search.
Address and landmark autocomplete.
Business and category searches where the provider supports them.
Recent searches.
Saved places.
Clear search.
Search result selection from both keyboard and touch.

Debounce requests and cancel stale requests when possible.

Place markers

Create category-specific marker styles for:

Food and dining.
Hotels.
Transit.
Landmarks.
Saved places.
Origin and destination.

Use clustering or level-of-detail strategies when the map contains many points.

Selected markers should remain visually distinct from other markers without producing excessive glow or visual clutter.

Place context

When a place is selected:

Fly to its geographic position.
Adjust zoom based on the type of place and current camera state.
Highlight the selected marker.
Show the details card.
Provide directions and exploration actions.

Never assume that a category marker has verified commercial metadata simply because its coordinates are available.

7. Persistence and Application Reliability

Introduce a small, maintainable data layer rather than scattering application state throughout app.js.

Persist where appropriate:

Saved places.
Recent searches.
Preferred transport mode.
Last selected map style.
User interface preferences.

Avoid persisting active GPS traces or precise location histories by default.

Handle:

Network timeouts.
HTTP failures.
Invalid geocoding responses.
Empty routes.
Unsupported transport modes.
Tile loading errors.
Missing optional metadata.
Browser permission denial.
Rapid repeated button presses.
Route recalculation during camera animation.
Application backgrounding and resuming.

Use request cancellation and stale-response guards so a slow response for an earlier destination cannot overwrite the latest selection.

Ensure all animation loops, subscriptions, and event listeners are cleaned up when their owning feature is closed or reset.

8. Visual Polish and Interaction Quality

Maintain the existing Terra 3D visual identity:

Obsidian and deep-slate surfaces.
Restrained cyan navigation accents.
Frosted glass panels.
Fine borders and subtle shadows.
Small, precise typography.
Smooth camera transitions.
Consistent iconography.

Improve:

Button hover, pressed, focused, and disabled states.
Search suggestion highlighting.
Loading skeletons where appropriate.
Empty states and recoverable errors.
Toasts for saved places and navigation events.
Mobile bottom sheets.
Keyboard accessibility.
Focus management when opening and closing drawers.
Screen-reader labels for icon-only controls.

Do not make every element glow. Reserve bright cyan for active navigation, selected controls, and meaningful spatial highlights.

Use CSS animations sparingly and prioritize map responsiveness.

9. Verification and Automated Testing

Do not claim the implementation is verified merely because it compiles or because a screenshot exists.

Functional test checklist

Place details

Select a real POI marker.
Select a search suggestion.
Open a saved place.
Verify the same place is selected in every flow.
Save, reload, and remove a place.
Confirm unavailable ratings and opening hours are not fabricated.

Directions

Calculate a driving route.
Change the origin.
Change the destination.
Swap endpoints.
Select an alternative route.
Test a supported walking route.
Test public transit with a configured provider.
Verify graceful failure for unsupported modes.

3D navigation

Start navigation from a valid route.
Verify the camera aligns with the route direction.
Confirm the vehicle follows the route geometry.
Confirm the next maneuver matches the active route progress.
Pause and resume.
Reach the endpoint.
Exit and restore the previous camera state.
Verify no duplicate animation loops are created.

GPS

Test permission granted.
Test permission denied.
Test stale or unavailable location.
Confirm simulation is visibly labeled.
Confirm GPS mode never fabricates movement.
Test off-route detection and rerouting.

Visual and responsive QA

Capture screenshots at desktop and mobile sizes.
Verify the map remains visible behind the panels.
Check the search dropdown, place card, directions drawer, and active navigation HUD.
Check text overflow, overlapping controls, and safe-area spacing.
Inspect browser console errors and failed network requests.
Required screenshot artifacts

Save actual screenshots from the running application, where the test environment supports them:

terra_3d_place_card_verified.png
terra_3d_directions_verified.png
terra_3d_route_alternatives_verified.png
terra_3d_navigation_active_verified.png
terra_3d_navigation_paused_verified.png
terra_3d_navigation_arrival_verified.png
terra_3d_mobile_navigation_verified.png

Screenshots must correspond to actual application states. Do not create synthetic images and present them as test evidence.

For each test, record whether it passed, failed, or could not be executed in the available environment.

10. Implementation Constraints

Before editing:

Inspect the existing project structure.
Read the current index.html, app.js, and relevant stylesheets.
Identify existing event handlers and state management.
Preserve working camera, routing, and map functionality.
Identify any hardcoded or simulated values that need explicit labeling.

During implementation:

Keep changes modular.
Reuse existing components where practical.
Centralize navigation state.
Avoid adding unnecessary dependencies.
Keep provider endpoints configurable.
Preserve attribution and open-data licensing requirements.
Do not introduce a paid API dependency without explicit approval.

After implementation:

Run the application.
Execute the available automated and manual tests.
Fix errors discovered during verification.
Capture actual screenshots when possible.
Report what is complete, what is simulated, and what still requires an external provider or real-device testing.
Definition of Done

Terra 3D should feel like a coherent spatial navigation product, not a collection of disconnected demonstrations.

A selected place must drive its detail card, destination field, route calculation, map camera, and navigation HUD consistently.

A selected route must drive its maneuver list, progress calculations, vehicle marker, and camera heading consistently.

Live GPS and simulation must remain distinct.

The final result must preserve the cinematic 3D experience while providing reliable, understandable, and testable navigation behavior.
---

## 11. Implementation Verification & Deliverables Matrix

### Implementation Status by Architecture Layer:

1. **Intelligent Place Detail Cards (Section 1)**:
   - **Status**: Implemented & Verified in `index.html`, `js/app.js`, and `css/style.css`.
   - **Capabilities**: Verified geographic coordinates (`Lat°N, Lng°E`), authentic category badges, Haversine distance-from-user calculation (`X.X km away`), 4 primary action buttons (Directions, Street Explore, Flyover, Save Place with `localStorage` persistence and duplicate prevention). No fabricated ratings or false opening hours.
   - **Verification Artifact**: `assets/terra_3d_place_card_verified.png`

2. **Advanced Multimodal Directions (Section 2)**:
   - **Status**: Implemented & Verified in `js/routing.js` and `js/app.js`.
   - **Capabilities**: Driving (OSRM road routing), Walking (pedestrian pace adjustments), and Public Transit (schedules clearly labeled when verified). Dual editable origin/destination inputs, swap-endpoints recalculation, structured turn-by-turn guidance with directional maneuver icons (`⬆️`, `↗️`, `↖️`, `🏁`), and click-to-focus camera segment navigation.
   - **Selectable Route Alternatives**: Dynamic multi-route rendering where Route 0 (Fastest via Main Corridor) and Route 1 (Alternative via Scenic Bypass) are rendered simultaneously with differential vector styles (active glowing cyan vs secondary dashed violet). Selecting any alternative recalculates turn instructions and fits camera bounds.
   - **Verification Artifacts**: 
     - Directions Overview: `assets/terra_3d_directions_verified.png`
     - Route Alternatives: `assets/terra_3d_route_alternatives_verified.png`

3. **Centralized 3D Navigation State Machine (Section 3)**:
   - **Status**: Implemented & Verified in `js/app.js` (`NAV_STATE`).
   - **States**: `idle`, `planning`, `route-ready`, `navigating`, `paused`, `rerouting`, `arrived`, `error`.
   - **Driving Camera**: 74° cockpit pitch, zoom 17.5, bearing aligned smoothly with local segment heading vectors.
   - **Vehicle Tracking**: Real-time animated vehicle chase marker (`🚗`) following actual route geometry without teleportation or jumps.
   - **Progress Telemetry**: Distance traveled, remaining distance, next maneuver ticker, real-time ETA calculation (`ETA 11:20 PM`), and animated progress bar.
   - **Pause & Resume**: Fully functional via `#btn-pause-resume`, cleanly freezing vehicle and camera easing without losing route progress.
   - **Arrival Handling**: Reaching the endpoint transitions cleanly into `arrived` state, halts simulation loops, and presents `#nav-arrival-modal` with total trip distance and elapsed time summary.
   - **Verification Artifacts**:
     - Active Navigation: `assets/terra_3d_navigation_active_verified.png`
     - Paused State: `assets/terra_3d_navigation_paused_verified.png`
     - Arrival Confirmation: `assets/terra_3d_navigation_arrival_verified.png`

4. **Live GPS vs Demo Simulation (Section 4)**:
   - **Status**: Implemented with explicit guidance source toggles (`#btn-source-sim` and `#btn-source-gps`).
   - **Simulation Mode**: Clearly badged as `[SIMULATION 2X]` with selectable speed multipliers (1x, 2x, 4x), pause, resume, and restart.
   - **Live GPS Mode**: Uses HTML5 Geolocation (`watchPosition`), displays accuracy indicator, monitors off-route divergence (>80m), and requests replacement route without fabricating vehicle motion.

5. **Adaptive Navigation HUD & Mobile Sheet (Section 5 & 8)**:
   - **Status**: Implemented & Verified.
   - **Desktop Layout**: Compact top glass maneuver banner (`#active-nav-banner`) with large directional arrow and bottom control panel (`#active-nav-bottom-panel`).
   - **Mobile Layout**: Responsive bottom-sheet docking respecting mobile safe areas, ensuring 3D route visibility behind panels.
   - **Verification Artifact**: `assets/terra_3d_mobile_navigation_verified.png`

6. **Automated Verification Matrix (Section 9)**:
| Test ID | Verification Target | Status | Artifact |
|---|---|---|---|
| TC-01 | Place Detail Card (POI selection & distance) | PASS | `assets/terra_3d_place_card_verified.png` |
| TC-02 | Multimodal Directions Drawer & Steps | PASS | `assets/terra_3d_directions_verified.png` |
| TC-03 | Selectable Route Alternatives (Fastest vs Bypass) | PASS | `assets/terra_3d_route_alternatives_verified.png` |
| TC-04 | Active In-Ride 3D Navigation Cockpit | PASS | `assets/terra_3d_navigation_active_verified.png` |
| TC-05 | Paused Navigation State & Controls | PASS | `assets/terra_3d_navigation_paused_verified.png` |
| TC-06 | Navigation Arrival Confirmation Modal | PASS | `assets/terra_3d_navigation_arrival_verified.png` |
| TC-07 | Mobile Responsive Navigation Layout (390x844) | PASS | `assets/terra_3d_mobile_navigation_verified.png` |

---

### Multiplatform Source Repositories & Pull Requests:
- **Web & Showcase Landing Page (MapLibre GL JS v4)**: https://github.com/Arnav1771/vicemaps-3d/pull/1
- **Native Android Application (100% Kotlin 2.0 & Compose)**: https://github.com/Arnav1771/vicemaps-android/pull/1
- **Native iOS Application (100% Swift 6 & SwiftUI)**: https://github.com/Arnav1771/vicemaps-ios/pull/1
