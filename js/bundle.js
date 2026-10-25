(() => {
  // vicemaps-3d/js/config.js
  var MAP_CONFIG = {
    // Default camera setting: Vice City (Miami, FL) Downtown & Biscayne Bay
    defaultLocation: {
      name: "Vice City (Miami)",
      center: [-80.188, 25.7725],
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
      color: "#ff9955",
      // Warm golden-hour sunset light
      intensity: 0.65,
      position: [1.5, 210, 32]
      // Sun low on southwest horizon
    },
    // 3D Building Extrusions Color Ramp
    building3D: {
      baseColor: "#0f172a",
      tallColor: "#00f0ff",
      // Electric cyan crown for skyscrapers > 120m
      midColor: "#ff007f",
      // Neon magenta for towers 60m - 120m
      lowColor: "#1e293b",
      // Deep slate for residential/mid-rises
      opacity: 0.88
    },
    // Iconic City Skylines
    cityBookmarks: [
      {
        id: "delhi-pholram",
        name: "\u{1F1EE}\u{1F1F3} Pholram Park (Delhi)",
        center: [77.1273, 28.6867],
        zoom: 16.8,
        pitch: 65,
        bearing: 24,
        tag: "Pitampura / Rishi Nagar"
      },
      {
        id: "miami",
        name: "\u{1F334} Miami (Biscayne Bay)",
        center: [-80.188, 25.7725],
        zoom: 15.8,
        pitch: 65,
        bearing: 38,
        tag: "Coastal Skyline"
      },
      {
        id: "tokyo",
        name: "\u{1F5FC} Tokyo (Shibuya & Shinjuku)",
        center: [139.7006, 35.6895],
        zoom: 15.6,
        pitch: 68,
        bearing: -25,
        tag: "Neon Metropolis"
      },
      {
        id: "manhattan",
        name: "\u{1F5FD} New York (Manhattan)",
        center: [-73.9851, 40.7488],
        zoom: 15.4,
        pitch: 68,
        bearing: 42,
        tag: "Empire High-Rises"
      },
      {
        id: "dubai",
        name: "\u{1F3D9}\uFE0F Dubai (Downtown & Burj)",
        center: [55.2744, 25.1972],
        zoom: 15.5,
        pitch: 66,
        bearing: 55,
        tag: "Mega Structures"
      },
      {
        id: "paris",
        name: "\u{1F5FC} Paris (Eiffel & Seine)",
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

  // vicemaps-3d/js/poi-data.js
  var POI_DATA = [
    {
      id: "times-square",
      title: "Times Square & Broadway District",
      category: "sights",
      categoryLabel: "Iconic Landmark",
      icon: "\u{1F3D9}\uFE0F",
      color: "#00f0ff",
      coords: [-73.9855, 40.758],
      camera: { zoom: 16.5, pitch: 72, bearing: 28 },
      description: "The premier commercial intersection in Midtown Manhattan. Illuminated digital displays, Broadway theaters, and dense skyscraper canyons.",
      tags: ["New York", "Manhattan", "Sightseeing", "Theaters"]
    },
    {
      id: "eiffel-tower",
      title: "Eiffel Tower & Champ de Mars",
      category: "sights",
      categoryLabel: "Monument",
      icon: "\u{1F5FC}",
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
      icon: "\u{1F686}",
      color: "#ff007f",
      coords: [139.7006, 35.6595],
      camera: { zoom: 17, pitch: 65, bearing: 15 },
      description: "The world's busiest pedestrian scramble intersection outside Shibuya Station. Multi-directional neon video billboards and subway network.",
      tags: ["Tokyo", "Japan", "Transit", "Crosswalk"]
    },
    {
      id: "burj-khalifa",
      title: "Burj Khalifa & Downtown Dubai",
      category: "sights",
      categoryLabel: "Super-Skyscraper",
      icon: "\u2728",
      color: "#00f0ff",
      coords: [55.2744, 25.1972],
      camera: { zoom: 16, pitch: 76, bearing: -60 },
      description: "The tallest structure on Earth standing at 828 meters. Surrounded by the Dubai Fountain, luxury hotels, and expansive avenue grids.",
      tags: ["Dubai", "UAE", "Skyscrapers", "Modern"]
    },
    {
      id: "big-ben",
      title: "Palace of Westminster & Big Ben",
      category: "sights",
      categoryLabel: "Historic Landmark",
      icon: "\u{1F3DB}\uFE0F",
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
      icon: "\u{1F37D}\uFE0F",
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
      icon: "\u{1F3E8}",
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
      icon: "\u{1F333}",
      color: "#10b981",
      coords: [77.1273, 28.6867],
      camera: { zoom: 16.8, pitch: 65, bearing: 24 },
      description: "Public neighborhood park and green space located in the Rishi Nagar / Pitampura district of North West Delhi, India.",
      tags: ["India", "Delhi", "Pitampura", "Rishi Nagar", "Park", "Pholram"]
    }
  ];

  // vicemaps-3d/js/map-engine.js
  var MapEngine = class {
    constructor(containerId) {
      this.containerId = containerId;
      this.map = null;
      this.markers = [];
      this.is3DEnabled = true;
      this.isNeonEnabled = true;
      this.currentLocation = MAP_CONFIG.defaultLocation;
    }
    async init() {
      return new Promise((resolve) => {
        this.map = new maplibregl.Map({
          container: this.containerId,
          style: MAP_CONFIG.styleUrl,
          center: this.currentLocation.center,
          zoom: this.currentLocation.zoom,
          pitch: this.currentLocation.pitch,
          bearing: this.currentLocation.bearing,
          minZoom: MAP_CONFIG.defaultLocation.minZoom,
          maxZoom: MAP_CONFIG.defaultLocation.maxZoom,
          maxPitch: MAP_CONFIG.defaultLocation.maxPitch,
          antialias: true
        });
        this.map.on("load", () => {
          this._setupSkyAndAtmosphere();
          this._setup3DBuildings();
          this._setupCustomPOIMarkers();
          resolve(this);
        });
        this.map.on("error", (e) => {
          if (e && e.error && e.error.message && e.error.message.includes("style")) {
            console.warn("Vector tile network error; applying resilient fallback:", e.error);
          }
        });
      });
    }
    _setupSkyAndAtmosphere() {
      if (this.map.setSky) {
        this.map.setSky({
          "sky-color": "#080816",
          "sky-horizon-blend": 0.7,
          "horizon-color": "#ff4444",
          "horizon-fog-blend": 0.8,
          "fog-color": "#0d1326",
          "fog-ground-blend": 0.85
        });
      }
      if (this.map.setLight) {
        this.map.setLight({
          anchor: "map",
          color: "#ffaa66",
          intensity: 0.65,
          position: [1.5, 210, 32]
        });
      }
    }
    _setup3DBuildings() {
      const layers = this.map.getStyle().layers;
      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === "symbol" && layers[i].layout && layers[i].layout["text-field"]) {
          labelLayerId = layers[i].id;
          break;
        }
      }
      const hasBuildingSource = this.map.getSource("openmaptiles");
      if (hasBuildingSource) {
        this.map.addLayer(
          {
            id: "3d-buildings",
            source: "openmaptiles",
            "source-layer": "building",
            type: "fill-extrusion",
            minzoom: 14,
            paint: {
              "fill-extrusion-color": [
                "interpolate",
                ["linear"],
                ["coalesce", ["get", "render_height"], ["get", "height"], 15],
                0,
                "#0d1527",
                30,
                "#1e293b",
                80,
                "#ff007f",
                // GTA 6 Neon magenta for high-rises
                160,
                "#00f0ff"
                // Electric cyan for towering skyscrapers
              ],
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                14,
                0,
                14.5,
                ["coalesce", ["get", "render_height"], ["get", "height"], 20]
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                14,
                0,
                14.5,
                ["coalesce", ["get", "render_min_height"], ["get", "min_height"], 0]
              ],
              "fill-extrusion-opacity": 0.9
            }
          },
          labelLayerId
        );
      } else {
        this._injectProceduralViceCity3DBuildings(labelLayerId);
      }
    }
    _injectProceduralViceCity3DBuildings(beforeLayerId) {
      const features = [];
      const baseLng = -80.19;
      const baseLat = 25.772;
      for (let i = -7; i <= 7; i++) {
        for (let j = -7; j <= 7; j++) {
          const lng = baseLng + i * 22e-4;
          const lat = baseLat + j * 19e-4;
          const distFromCenter = Math.sqrt(i * i + j * j);
          const height = Math.max(25, Math.floor((1 - distFromCenter / 10) * 220 + (i * 13 + j * 7) % 45));
          const w = 8e-4;
          const h = 7e-4;
          features.push({
            type: "Feature",
            properties: {
              height,
              min_height: 0,
              name: `Vice Tower ${(i + 8) * 10 + (j + 8)}`
            },
            geometry: {
              type: "Polygon",
              coordinates: [[
                [lng - w, lat - h],
                [lng + w, lat - h],
                [lng + w, lat + h],
                [lng - w, lat + h],
                [lng - w, lat - h]
              ]]
            }
          });
        }
      }
      if (!this.map.getSource("vice-city-3d-source")) {
        this.map.addSource("vice-city-3d-source", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features
          }
        });
        this.map.addLayer(
          {
            id: "3d-buildings-procedural",
            source: "vice-city-3d-source",
            type: "fill-extrusion",
            minzoom: 12,
            paint: {
              "fill-extrusion-color": [
                "interpolate",
                ["linear"],
                ["get", "height"],
                20,
                "#0d1527",
                50,
                "#1e293b",
                100,
                "#ff007f",
                180,
                "#00f0ff"
              ],
              "fill-extrusion-height": ["get", "height"],
              "fill-extrusion-base": ["get", "min_height"],
              "fill-extrusion-opacity": 0.88
            }
          },
          beforeLayerId
        );
      }
    }
    _setupCustomPOIMarkers() {
      POI_DATA.forEach((poi) => {
        const el = document.createElement("div");
        el.className = "gta-marker";
        el.dataset.id = poi.id;
        el.innerHTML = `
        <div class="marker-pulse" style="border-color: ${poi.color}"></div>
        <div class="marker-badge" style="box-shadow: 0 0 14px ${poi.color}">
          <span class="marker-icon">${poi.icon}</span>
        </div>
        <div class="marker-label">${poi.title}</div>
      `;
        const popup = new maplibregl.Popup({ offset: 25, closeButton: false }).setHTML(`
          <div class="gta-popup">
            <div class="popup-tag" style="color: ${poi.color}">${poi.categoryLabel}</div>
            <div class="popup-title">${poi.title}</div>
            <div class="popup-desc">${poi.description}</div>
            <div class="popup-btn-wrap">
              <button class="btn-popup-route" data-coords="${poi.coords[0]},${poi.coords[1]}" data-name="${poi.title}">
                \u{1F4CD} Set GPS Waypoint
              </button>
            </div>
          </div>
        `);
        const marker = new maplibregl.Marker({ element: el }).setLngLat(poi.coords).setPopup(popup).addTo(this.map);
        this.markers.push(marker);
        el.addEventListener("click", () => {
          window.dispatchEvent(new CustomEvent("terra-poi-click", { detail: poi }));
          if (poi.camera) {
            this.flyTo(poi.coords, poi.camera.zoom, poi.camera.pitch, poi.camera.bearing);
          }
        });
      });
    }
    flyTo(center, zoom = 16, pitch = 65, bearing = 38) {
      this.map.flyTo({
        center,
        zoom,
        pitch,
        bearing,
        essential: true,
        duration: 2500,
        curve: 1.42
      });
    }
    setPitch(pitch) {
      this.map.setPitch(pitch);
    }
    setBearing(bearing) {
      this.map.setBearing(bearing);
    }
    toggle3D(enabled) {
      this.is3DEnabled = enabled;
      const layerIds = ["3d-buildings", "3d-buildings-procedural"];
      layerIds.forEach((id) => {
        if (this.map.getLayer(id)) {
          this.map.setLayoutProperty(id, "visibility", enabled ? "visible" : "none");
        }
      });
    }
    setLightingPreset(mode) {
      if (!this.map.setLight) return;
      const presets = {
        golden: {
          anchor: "map",
          color: "#FFBC70",
          // Warm golden-hour sunlight
          intensity: 0.65,
          position: [1.5, 210, 32]
          // 210° azimuth, 32° altitude
        },
        daylight: {
          anchor: "map",
          color: "#FFFFFF",
          // Crisp neutral daylight
          intensity: 0.85,
          position: [1.5, 180, 65]
        },
        bluehour: {
          anchor: "map",
          color: "#4860FF",
          // Blue hour cool ambient
          intensity: 0.48,
          position: [1.5, 260, 10]
        },
        night: {
          anchor: "map",
          color: "#18232F",
          // Moonlit dark night
          intensity: 0.28,
          position: [1.5, 0, 90]
        }
      };
      const cfg = presets[mode] || presets.golden;
      this.map.setLight(cfg);
    }
    toggle2D3D() {
      const currentPitch = this.map.getPitch();
      const targetPitch = currentPitch > 25 ? 0 : 65;
      this.map.easeTo({
        pitch: targetPitch,
        duration: 1e3
      });
      return targetPitch > 25;
    }
    zoomIn() {
      this.map.zoomIn({ duration: 400 });
    }
    zoomOut() {
      this.map.zoomOut({ duration: 400 });
    }
    resetNorth() {
      this.map.easeTo({
        bearing: 0,
        duration: 800
      });
    }
    calculateAltitudeMeters() {
      const zoom = this.map.getZoom();
      const earthCircumference = 40075016686e-3;
      const altitude = earthCircumference * Math.cos(this.map.getCenter().lat * Math.PI / 180) / Math.pow(2, zoom + 8);
      return Math.max(12, Math.round(altitude * 100));
    }
    toggleNeonMode(enabled) {
      this.isNeonEnabled = enabled;
      const colorExpr = enabled ? [
        "interpolate",
        ["linear"],
        ["coalesce", ["get", "render_height"], ["get", "height"], 20],
        20,
        "#0d1527",
        50,
        "#1e293b",
        100,
        "#ff007f",
        180,
        "#00f0ff"
      ] : "#334155";
      ["3d-buildings", "3d-buildings-procedural"].forEach((id) => {
        if (this.map.getLayer(id)) {
          this.map.setPaintProperty(id, "fill-extrusion-color", colorExpr);
        }
      });
    }
  };

  // vicemaps-3d/js/routing.js
  var RoutingEngine = class {
    constructor(mapInstance) {
      this.mapInstance = mapInstance;
      this.map = mapInstance.map;
      this.currentRoute = null;
      this.animationFrameId = null;
      this.dashOffset = 0;
    }
    async calculateRoute(startCoords, endCoords, destinationName = "Custom Waypoint") {
      const url = `${MAP_CONFIG.routingEndpoint}/${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}?overview=full&geometries=geojson&steps=true`;
      try {
        const resp = await fetch(url, { signal: AbortSignal.timeout(6e3) });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        if (!data.routes || !data.routes.length) throw new Error("No route found");
        const route = data.routes[0];
        const distanceMiles = (route.distance / 1609.34).toFixed(1);
        const durationMins = Math.ceil(route.duration / 60);
        const routeData = {
          coordinates: route.geometry.coordinates,
          distance: `${distanceMiles} MI`,
          duration: `${durationMins} MIN`,
          destinationName,
          steps: route.legs[0] && route.legs[0].steps || []
        };
        this.displayRoute(routeData);
        return routeData;
      } catch (err) {
        console.warn("OSRM network routing fallback invoked:", err);
        return this._generateProceduralRoute(startCoords, endCoords, destinationName);
      }
    }
    _generateProceduralRoute(start, end, destinationName) {
      const coords = [start];
      const midLat = start[1] + (end[1] - start[1]) * 0.45;
      const midLng = start[0] + (end[0] - start[0]) * 0.55;
      coords.push([start[0], midLat]);
      coords.push([midLng, midLat]);
      coords.push([midLng, end[1]]);
      coords.push(end);
      const distanceMiles = (Math.sqrt(Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2)) * 69).toFixed(1);
      const durationMins = Math.max(3, Math.ceil(distanceMiles * 1.8));
      const routeData = {
        coordinates: coords,
        distance: `${distanceMiles} MI`,
        duration: `${durationMins} MIN`,
        destinationName,
        steps: [
          { maneuver: { instruction: "Head north on Grand Avenue", modifier: "straight" } },
          { maneuver: { instruction: "Turn right onto Ocean Boulevard", modifier: "right" } },
          { maneuver: { instruction: "Arrive at destination on right", modifier: "arrive" } }
        ]
      };
      this.displayRoute(routeData);
      return routeData;
    }
    displayRoute(routeData) {
      this.clearRoute();
      this.currentRoute = routeData;
      const geojsonData = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: routeData.coordinates
        }
      };
      this.map.addSource("gps-route-source", {
        type: "geojson",
        data: geojsonData
      });
      this.map.addLayer({
        id: "gps-route-glow",
        type: "line",
        source: "gps-route-source",
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#ff007f",
          "line-width": 14,
          "line-opacity": 0.75,
          "line-blur": 6
        }
      });
      this.map.addLayer({
        id: "gps-route-core",
        type: "line",
        source: "gps-route-source",
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#00f0ff",
          "line-width": 5,
          "line-opacity": 0.95
        }
      });
      this.map.addLayer({
        id: "gps-route-pulse",
        type: "line",
        source: "gps-route-source",
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#ffffff",
          "line-width": 2.5,
          "line-dasharray": [1, 3]
        }
      });
      this._startDashAnimation();
      this._fitRouteBounds(routeData.coordinates);
    }
    _startDashAnimation() {
      let step = 0;
      const animate = () => {
        step = (step + 0.1) % 4;
        if (this.map.getLayer("gps-route-pulse")) {
          this.map.setPaintProperty("gps-route-pulse", "line-dasharray", [
            step,
            Math.max(0.1, 4 - step)
          ]);
          this.animationFrameId = requestAnimationFrame(animate);
        }
      };
      this.animationFrameId = requestAnimationFrame(animate);
    }
    _fitRouteBounds(coords) {
      if (!coords || !coords.length) return;
      const bounds = coords.reduce(
        (b, coord) => b.extend(coord),
        new maplibregl.LngLatBounds(coords[0], coords[0])
      );
      this.map.fitBounds(bounds, {
        padding: { top: 120, bottom: 120, left: 160, right: 160 },
        pitch: 62,
        bearing: 35,
        duration: 2e3,
        maxZoom: 16.5
      });
    }
    clearRoute() {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      const layers = ["gps-route-pulse", "gps-route-core", "gps-route-glow"];
      layers.forEach((id) => {
        if (this.map.getLayer(id)) this.map.removeLayer(id);
      });
      if (this.map.getSource("gps-route-source")) {
        this.map.removeSource("gps-route-source");
      }
      this.currentRoute = null;
    }
  };

  // vicemaps-3d/js/cinematic.js
  var CinematicController = class {
    constructor(mapInstance) {
      this.mapInstance = mapInstance;
      this.map = mapInstance.map;
      this.isPlaying = false;
      this.tourFrameId = null;
      this.currentBearing = 38;
    }
    startTour() {
      if (this.isPlaying) return;
      this.isPlaying = true;
      this.currentBearing = this.map.getBearing();
      document.body.classList.add("cinematic-mode");
      this.map.easeTo({
        pitch: 74,
        zoom: 16.2,
        duration: 2e3
      });
      const rotate = () => {
        if (!this.isPlaying) return;
        this.currentBearing = (this.currentBearing + 0.12) % 360;
        this.map.setBearing(this.currentBearing);
        this.tourFrameId = requestAnimationFrame(rotate);
      };
      setTimeout(() => {
        if (this.isPlaying) {
          this.tourFrameId = requestAnimationFrame(rotate);
        }
      }, 1800);
    }
    stopTour() {
      this.isPlaying = false;
      if (this.tourFrameId) {
        cancelAnimationFrame(this.tourFrameId);
        this.tourFrameId = null;
      }
      document.body.classList.remove("cinematic-mode");
    }
    toggle() {
      if (this.isPlaying) {
        this.stopTour();
      } else {
        this.startTour();
      }
      return this.isPlaying;
    }
  };

  // vicemaps-3d/js/street-roam.js
  var StreetRoamController = class {
    constructor(mapInstance) {
      this.mapInstance = mapInstance;
      this.map = mapInstance.map;
      this.isActive = false;
      this.keys = {};
      this.speedMph = 0;
      this.maxSpeed = 95;
      this.loopId = null;
      this.onSpeedUpdate = null;
      this._bindEvents();
    }
    _bindEvents() {
      window.addEventListener("keydown", (e) => {
        if (!this.isActive) return;
        if (["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
          this.keys[e.code] = true;
        }
        if (e.code === "Escape") {
          this.stop();
        }
      });
      window.addEventListener("keyup", (e) => {
        if (!this.isActive) return;
        this.keys[e.code] = false;
      });
    }
    start(onSpeedCallback) {
      if (this.isActive) return;
      this.isActive = true;
      this.onSpeedUpdate = onSpeedCallback;
      document.body.classList.add("street-roam-active");
      this.map.easeTo({
        pitch: 82,
        zoom: 17.4,
        duration: 1500
      });
      this._startPhysicsLoop();
    }
    stop() {
      this.isActive = false;
      this.speedMph = 0;
      this.keys = {};
      if (this.loopId) {
        cancelAnimationFrame(this.loopId);
        this.loopId = null;
      }
      document.body.classList.remove("street-roam-active");
      this.map.easeTo({
        pitch: 65,
        zoom: 15.8,
        duration: 1500
      });
      if (this.onSpeedUpdate) {
        this.onSpeedUpdate(0);
      }
    }
    toggle(callback) {
      if (this.isActive) {
        this.stop();
      } else {
        this.start(callback);
      }
      return this.isActive;
    }
    _startPhysicsLoop() {
      const loop = () => {
        if (!this.isActive) return;
        const isAccel = this.keys["KeyW"] || this.keys["ArrowUp"];
        const isBrake = this.keys["KeyS"] || this.keys["ArrowDown"];
        const isLeft = this.keys["KeyA"] || this.keys["ArrowLeft"];
        const isRight = this.keys["KeyD"] || this.keys["ArrowRight"];
        if (isAccel) {
          this.speedMph = Math.min(this.maxSpeed, this.speedMph + 1.2);
        } else if (isBrake) {
          this.speedMph = Math.max(-20, this.speedMph - 2);
        } else {
          if (this.speedMph > 0) this.speedMph = Math.max(0, this.speedMph - 0.5);
          if (this.speedMph < 0) this.speedMph = Math.min(0, this.speedMph + 0.5);
        }
        let bearing = this.map.getBearing();
        const steerFactor = Math.min(1.5, Math.abs(this.speedMph) / 25);
        if (isLeft) bearing -= 1.8 * steerFactor;
        if (isRight) bearing += 1.8 * steerFactor;
        const center = this.map.getCenter();
        const rad = bearing * Math.PI / 180;
        const stepDist = this.speedMph * 35e-7;
        const newLng = center.lng + Math.sin(rad) * stepDist;
        const newLat = center.lat + Math.cos(rad) * stepDist;
        this.map.setBearing(bearing);
        this.map.setCenter([newLng, newLat]);
        if (this.onSpeedUpdate) {
          this.onSpeedUpdate(Math.round(this.speedMph));
        }
        this.loopId = requestAnimationFrame(loop);
      };
      this.loopId = requestAnimationFrame(loop);
    }
  };

  // vicemaps-3d/js/app.js
  (async function() {
    "use strict";
    const mapEngine = new MapEngine("map");
    await mapEngine.init();
    window.mapEngineInstance = mapEngine;
    const routingEngine = new RoutingEngine(mapEngine);
    const cinematicCtrl = new CinematicController(mapEngine);
    const streetRoamCtrl = new StreetRoamController(mapEngine);
    const searchInput = document.getElementById("search-input");
    const searchSuggestions = document.getElementById("search-suggestions");
    const btnGpsLocate = document.getElementById("btn-gps-locate");
    const categoryFilters = document.getElementById("category-filters");
    const routeHud = document.getElementById("route-hud");
    const routeDestName = document.getElementById("route-dest-name");
    const routeDistance = document.getElementById("route-distance");
    const routeDuration = document.getElementById("route-duration");
    const routeManeuver = document.getElementById("route-maneuver");
    const btnCancelRoute = document.getElementById("btn-cancel-route");
    const btnToggle3D = document.getElementById("btn-toggle-3d");
    const btnToggleNeon = document.getElementById("btn-toggle-neon");
    const btnCinematic = document.getElementById("btn-cinematic");
    const btnStreetRoam = document.getElementById("btn-street-roam");
    const streetHud = document.getElementById("street-hud");
    const speedometerVal = document.getElementById("speedometer-val");
    const pitchSlider = document.getElementById("pitch-slider");
    const pitchValText = document.getElementById("pitch-val-text");
    const citySelect = document.getElementById("city-select");
    const telemetryCoords = document.getElementById("telemetry-coords");
    const telemetryHeading = document.getElementById("telemetry-heading");
    const telemetryZoom = document.getElementById("telemetry-zoom");
    const placeDetailCard = document.getElementById("place-detail-card");
    const placeCatBadge = document.getElementById("place-cat-badge");
    const btnClosePlaceCard = document.getElementById("btn-close-place-card");
    const placeDetailTitle = document.getElementById("place-detail-title");
    const placeReviewsText = document.getElementById("place-reviews-text");
    const placeAddressText = document.getElementById("place-address-text");
    const btnPlaceDirections = document.getElementById("btn-place-directions");
    const btnPlaceStreetView = document.getElementById("btn-place-street-view");
    const btnPlaceFlyover = document.getElementById("btn-place-flyover");
    const btnPlaceSave = document.getElementById("btn-place-save");
    const btnSaveLabel = document.getElementById("btn-save-label");
    const placeDescText = document.getElementById("place-desc-text");
    const directionsDrawer = document.getElementById("directions-drawer");
    const btnCloseDirections = document.getElementById("btn-close-directions");
    const modeTabs = document.querySelectorAll(".mode-tab");
    const routeOriginInput = document.getElementById("route-origin-input");
    const btnSwapEndpoints = document.getElementById("btn-swap-endpoints");
    const routeDestInput = document.getElementById("route-dest-input");
    const dirDrawerDistance = document.getElementById("dir-drawer-distance");
    const dirDrawerDuration = document.getElementById("dir-drawer-duration");
    const dirStepsList = document.getElementById("dir-steps-list");
    const btnStartNav = document.getElementById("btn-start-navigation");
    const activeNavBanner = document.getElementById("active-nav-banner");
    const activeNavIcon = document.getElementById("active-nav-icon");
    const activeNavInstruction = document.getElementById("active-nav-instruction");
    const activeNavRemaining = document.getElementById("active-nav-remaining");
    const btnExitNav = document.getElementById("btn-exit-navigation");
    let selectedPlace = {
      title: "Pholram Park",
      subtitle: "Rishi Nagar, Pitampura, North West Delhi, India",
      coords: [77.1273, 28.6867],
      category: "sights",
      categoryLabel: "Park & Recreation",
      rating: "4.8",
      reviews: "1,240 Google reviews",
      description: "Serene neighborhood green space nestled within Rishi Nagar and Rani Bagh in Delhi. Features walking loops, manicured grass, and dense tree canopies."
    };
    let userLocation = null;
    let userMarker = null;
    if (btnGpsLocate) {
      btnGpsLocate.addEventListener("click", () => {
        if (!navigator.geolocation) {
          alert("Geolocation is not supported by your browser");
          return;
        }
        btnGpsLocate.style.opacity = "0.5";
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            btnGpsLocate.style.opacity = "1";
            const { longitude, latitude } = pos.coords;
            userLocation = [longitude, latitude];
            mapEngine.flyTo(userLocation, 16.5, 68, 38);
            if (!userMarker) {
              const el = document.createElement("div");
              el.className = "gta-marker user-location-marker";
              el.innerHTML = `
              <div class="marker-pulse" style="border-color: #00f0ff"></div>
              <div class="marker-badge" style="background: #00f0ff; border-color: #fff; box-shadow: 0 0 16px #00f0ff">
                <span class="marker-icon" style="color: #060812; font-size: 11px;">\u{1F4CD}</span>
              </div>
              <div class="marker-label">YOU ARE HERE</div>
            `;
              userMarker = new maplibregl.Marker({ element: el }).setLngLat(userLocation).addTo(mapEngine.map);
            } else {
              userMarker.setLngLat(userLocation);
            }
          },
          (err) => {
            btnGpsLocate.style.opacity = "1";
            console.warn("GPS Geolocation error:", err.message);
            mapEngine.flyTo(MAP_CONFIG.defaultLocation.center, 16.5, 68, 38);
          },
          { enableHighAccuracy: true, timeout: 8e3 }
        );
      });
    }
    MAP_CONFIG.cityBookmarks.forEach((city) => {
      const opt = document.createElement("option");
      opt.value = city.id;
      opt.textContent = `${city.name} (${city.tag})`;
      citySelect.appendChild(opt);
    });
    citySelect.addEventListener("change", (e) => {
      const selected = MAP_CONFIG.cityBookmarks.find((c) => c.id === e.target.value);
      if (selected) {
        mapEngine.flyTo(selected.center, selected.zoom, selected.pitch, selected.bearing);
      }
    });
    const telemetryAltitude = document.getElementById("telemetry-altitude");
    const compassNeedle = document.getElementById("compass-needle");
    const compassHeadingText = document.getElementById("compass-heading-text");
    mapEngine.map.on("move", () => {
      const center = mapEngine.map.getCenter();
      const pitch = Math.round(mapEngine.map.getPitch());
      const bearing = Math.round((mapEngine.map.getBearing() + 360) % 360);
      const zoom = mapEngine.map.getZoom().toFixed(1);
      const alt = mapEngine.calculateAltitudeMeters();
      if (telemetryCoords) {
        telemetryCoords.textContent = `${center.lat.toFixed(4)}\xB0N, ${Math.abs(center.lng).toFixed(4)}\xB0W`;
      }
      if (telemetryHeading) {
        telemetryHeading.textContent = `${bearing}\xB0 (PITCH ${pitch}\xB0)`;
      }
      if (telemetryZoom) {
        telemetryZoom.textContent = `Z${zoom}`;
      }
      if (telemetryAltitude) {
        telemetryAltitude.textContent = `${alt} M`;
      }
      if (compassHeadingText) {
        compassHeadingText.textContent = `${bearing}\xB0 N`;
      }
      if (compassNeedle) {
        compassNeedle.style.transform = `rotate(${-bearing}deg)`;
      }
      if (pitchSlider) {
        pitchSlider.value = pitch;
        pitchValText.textContent = `${pitch}\xB0`;
      }
    });
    let frameCount = 0;
    let lastFpsTime = performance.now();
    const fpsElement = document.getElementById("telemetry-fps");
    function measureFps() {
      frameCount++;
      const now = performance.now();
      if (now - lastFpsTime >= 1e3) {
        const fps = Math.round(frameCount * 1e3 / (now - lastFpsTime));
        if (fpsElement) {
          fpsElement.textContent = `${fps} FPS`;
        }
        frameCount = 0;
        lastFpsTime = now;
      }
      requestAnimationFrame(measureFps);
    }
    requestAnimationFrame(measureFps);
    const railExplore = document.getElementById("rail-explore");
    const railPlaces = document.getElementById("rail-places");
    const railDirections = document.getElementById("rail-directions");
    const railLayers = document.getElementById("rail-layers");
    const railLocation = document.getElementById("rail-location");
    const railSaved = document.getElementById("rail-saved");
    const railSettings = document.getElementById("rail-settings");
    function activateRail(btn) {
      document.querySelectorAll(".rail-btn").forEach((b) => b.classList.remove("active"));
      btn?.classList.add("active");
    }
    railExplore?.addEventListener("click", () => {
      activateRail(railExplore);
      mapEngine.flyTo(MAP_CONFIG.defaultLocation.center, 15.8, 65, 38);
    });
    railPlaces?.addEventListener("click", () => {
      activateRail(railPlaces);
      const randomPoi = POI_DATA[Math.floor(Math.random() * POI_DATA.length)];
      if (randomPoi) showPlaceDetail(randomPoi);
    });
    railDirections?.addEventListener("click", () => {
      activateRail(railDirections);
      if (selectedPlace) {
        openDirectionsDrawer(selectedPlace.coords, selectedPlace.title);
      } else {
        openDirectionsDrawer([-80.13, 25.7907], "Ocean Drive Promenade");
      }
    });
    railLayers?.addEventListener("click", () => {
      activateRail(railLayers);
      btnToggle3D.click();
    });
    railLocation?.addEventListener("click", () => {
      activateRail(railLocation);
      btnGpsLocate?.click();
    });
    railSaved?.addEventListener("click", () => {
      activateRail(railSaved);
      showPlaceDetail({
        title: "Pholram Park",
        subtitle: "Rishi Nagar, Pitampura, North West Delhi, India",
        coords: [77.1273, 28.6867],
        category: "sights",
        categoryLabel: "Saved Green Space",
        rating: "4.8",
        reviews: "1,240 Google reviews",
        description: "Saved favorite: Serene neighborhood park in Delhi featuring walking track loops, shaded tree canopies, and vibrant residential street surroundings."
      });
    });
    railSettings?.addEventListener("click", () => {
      activateRail(railSettings);
      btnToggleNeon.click();
    });
    const btnZoomIn = document.getElementById("btn-zoom-in");
    const btnZoomOut = document.getElementById("btn-zoom-out");
    const btnToggle2d3d = document.getElementById("btn-toggle-2d3d");
    const btnResetNorth = document.getElementById("btn-reset-north");
    btnZoomIn?.addEventListener("click", () => mapEngine.zoomIn());
    btnZoomOut?.addEventListener("click", () => mapEngine.zoomOut());
    btnResetNorth?.addEventListener("click", () => mapEngine.resetNorth());
    btnToggle2d3d?.addEventListener("click", () => {
      const is3D = mapEngine.toggle2D3D();
      btnToggle2d3d.textContent = is3D ? "3D" : "2D";
    });
    const lightingModeLabel = document.getElementById("lighting-mode-label");
    const telemetryLighting = document.getElementById("telemetry-lighting");
    document.querySelectorAll(".lighting-pill-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".lighting-pill-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.dataset.light;
        mapEngine.setLightingPreset(mode);
        const labels = {
          golden: "GOLDEN HOUR \xB7 210\xB0",
          daylight: "DAYLIGHT \xB7 180\xB0",
          bluehour: "BLUE HOUR \xB7 260\xB0",
          night: "NIGHT ILLUMINATION"
        };
        if (lightingModeLabel) lightingModeLabel.textContent = mode.toUpperCase();
        if (telemetryLighting) telemetryLighting.textContent = labels[mode] || mode.toUpperCase();
      });
    });
    pitchSlider.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      mapEngine.setPitch(val);
      pitchValText.textContent = `${val}\xB0`;
    });
    btnToggle3D.addEventListener("click", () => {
      const active = btnToggle3D.classList.toggle("active");
      mapEngine.toggle3D(active);
    });
    btnToggleNeon.addEventListener("click", () => {
      const active = btnToggleNeon.classList.toggle("active");
      mapEngine.toggleNeonMode(active);
    });
    btnCinematic.addEventListener("click", () => {
      const isPlaying = cinematicCtrl.toggle();
      btnCinematic.classList.toggle("active", isPlaying);
      btnCinematic.textContent = isPlaying ? "\u23F9\uFE0F Exit Flyover" : "\u{1F3AC} 360\xB0 Flyover";
    });
    btnStreetRoam.addEventListener("click", () => {
      const isRoaming = streetRoamCtrl.toggle((speed) => {
        if (speedometerVal) speedometerVal.textContent = Math.abs(speed);
      });
      btnStreetRoam.classList.toggle("active", isRoaming);
      btnStreetRoam.textContent = isRoaming ? "\u23F9\uFE0F Exit Street View" : "\u{1F6B6} Street View";
      streetHud.classList.toggle("hidden", !isRoaming);
    });
    let searchDebounceTimer = null;
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim();
      if (!q) {
        searchSuggestions.classList.add("hidden");
        return;
      }
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(async () => {
        const localMatches = POI_DATA.filter(
          (p) => p.title.toLowerCase().includes(q.toLowerCase()) || p.categoryLabel.toLowerCase().includes(q.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(q.toLowerCase()))
        ).slice(0, 3);
        let globalMatches = [];
        try {
          const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=5`);
          if (res.ok) {
            const data = await res.json();
            globalMatches = (data.features || []).map((f) => {
              const props = f.properties || {};
              const name = props.name || props.street || q;
              const subtitle = [props.city, props.state, props.country].filter(Boolean).join(", ");
              return {
                title: name,
                subtitle: subtitle || "Global Landmark",
                coords: f.geometry.coordinates,
                isGlobal: true,
                icon: "\u{1F30D}"
              };
            });
          }
        } catch (err) {
          console.warn("Global geocode lookup:", err);
        }
        const combined = [
          ...localMatches.map((m) => ({
            title: m.title,
            subtitle: `${m.categoryLabel} \u2022 Vice City`,
            coords: m.coords,
            isGlobal: false,
            icon: m.icon
          })),
          ...globalMatches
        ];
        if (!combined.length) {
          searchSuggestions.innerHTML = `<div class="search-item empty">No matching location found on Earth</div>`;
          searchSuggestions.classList.remove("hidden");
          return;
        }
        searchSuggestions.innerHTML = combined.map((item) => `
        <div class="search-item" data-coords="${item.coords[0]},${item.coords[1]}" data-title="${item.title}">
          <span class="search-icon">${item.icon}</span>
          <div class="search-info">
            <div class="search-title">
              ${item.title}
              ${item.isGlobal ? '<span class="search-item-global-badge">WORLDWIDE</span>' : ""}
            </div>
            <div class="search-cat">${item.subtitle}</div>
          </div>
        </div>
      `).join("");
        searchSuggestions.classList.remove("hidden");
        searchSuggestions.querySelectorAll(".search-item:not(.empty)").forEach((el) => {
          el.addEventListener("click", () => {
            const coords = el.dataset.coords.split(",").map(Number);
            const title = el.dataset.title;
            const subtitle = el.querySelector(".search-cat")?.textContent || "Global Landmark";
            searchInput.value = title;
            searchSuggestions.classList.add("hidden");
            showPlaceDetail({
              title,
              subtitle,
              coords,
              category: "sights",
              categoryLabel: "Search Landmark",
              rating: "4.9",
              reviews: "2,450 Google reviews",
              description: `${title} (${subtitle}) rendered with full 3D vector geometry, custom volumetric lighting, and interactive camera perspective.`
            });
          });
        });
      }, 280);
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-box-wrap")) {
        searchSuggestions.classList.add("hidden");
      }
    });
    categoryFilters.querySelectorAll(".cat-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        categoryFilters.querySelectorAll(".cat-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.cat;
        if (cat === "all") {
          mapEngine.markers.forEach((m) => m.getElement().style.display = "block");
        } else {
          POI_DATA.forEach((p, idx) => {
            const visible = p.category === cat;
            if (mapEngine.markers[idx]) {
              mapEngine.markers[idx].getElement().style.display = visible ? "block" : "none";
            }
          });
        }
      });
    });
    function showPlaceDetail(place) {
      selectedPlace = place;
      if (placeCatBadge) placeCatBadge.textContent = place.categoryLabel || place.category || "Point of Interest";
      if (placeDetailTitle) placeDetailTitle.textContent = place.title;
      if (placeReviewsText) placeReviewsText.textContent = `(${place.reviews || "1,850 Google reviews"})`;
      if (placeAddressText) placeAddressText.textContent = `\u{1F4CD} ${place.subtitle || place.address || "Global Destination"}`;
      if (placeDescText) {
        placeDescText.textContent = place.description || `${place.title} is an authentic real-world landmark rendered in full photorealistic 3D vector geometry.`;
      }
      placeDetailCard?.classList.remove("hidden");
      directionsDrawer?.classList.add("hidden");
      activeNavBanner?.classList.add("hidden");
      routeHud?.classList.add("hidden");
      if (place.coords) {
        mapEngine.flyTo(place.coords, 16.5, 66, 32);
      }
    }
    btnClosePlaceCard?.addEventListener("click", () => {
      placeDetailCard?.classList.add("hidden");
    });
    btnPlaceSave?.addEventListener("click", () => {
      const isSaved = btnSaveLabel?.textContent.includes("Saved");
      if (btnSaveLabel) btnSaveLabel.textContent = isSaved ? "Save" : "Saved \u2B50";
      if (btnPlaceSave) {
        btnPlaceSave.style.borderColor = isSaved ? "var(--border-hud)" : "var(--neon-amber)";
        btnPlaceSave.style.color = isSaved ? "var(--text-primary)" : "var(--neon-amber)";
      }
    });
    btnPlaceFlyover?.addEventListener("click", () => {
      cinematicCtrl.toggle();
    });
    btnPlaceStreetView?.addEventListener("click", () => {
      btnStreetRoam?.click();
    });
    btnPlaceDirections?.addEventListener("click", () => {
      if (selectedPlace) {
        openDirectionsDrawer(selectedPlace.coords, selectedPlace.title);
      }
    });
    window.addEventListener("terra-poi-click", (e) => {
      if (e.detail) showPlaceDetail(e.detail);
    });
    document.addEventListener("click", (e) => {
      const routeBtn = e.target.closest(".btn-popup-route");
      if (routeBtn) {
        const coords = routeBtn.dataset.coords.split(",").map(Number);
        const name = routeBtn.dataset.name;
        openDirectionsDrawer(coords, name);
      }
    });
    let currentNavRoute = null;
    let currentNavMode = "driving";
    async function openDirectionsDrawer(destCoords, destName) {
      placeDetailCard?.classList.add("hidden");
      directionsDrawer?.classList.remove("hidden");
      routeHud?.classList.add("hidden");
      activeNavBanner?.classList.add("hidden");
      if (routeDestInput) routeDestInput.value = destName;
      const originCoords = userLocation || [-80.1918, 25.7617];
      if (routeOriginInput) routeOriginInput.value = userLocation ? "My GPS Location" : "Downtown Miami (HQ)";
      await updateDirections(currentNavMode, originCoords, destCoords, destName);
    }
    async function updateDirections(mode, originCoords, destCoords, destName) {
      if (dirDrawerDistance) dirDrawerDistance.textContent = "Calculating...";
      if (dirDrawerDuration) dirDrawerDuration.textContent = "...";
      if (dirStepsList) dirStepsList.innerHTML = '<div class="maneuver-item">Calculating live road navigation\u2026</div>';
      const route = await routingEngine.calculateRoute(originCoords, destCoords, destName);
      if (!route) return;
      currentNavRoute = route;
      let durText = route.duration;
      let distText = route.distance;
      const baseMins = parseInt(route.duration) || 15;
      if (mode === "transit") {
        durText = `${Math.round(baseMins * 1.35)} MIN`;
      } else if (mode === "walking") {
        durText = `${Math.round(baseMins * 5.2)} MIN`;
      }
      if (dirDrawerDistance) dirDrawerDistance.textContent = distText;
      if (dirDrawerDuration) dirDrawerDuration.textContent = durText;
      const steps = route.steps && route.steps.length ? route.steps : [
        { maneuver: { instruction: `Head towards ${destName} on main artery` } },
        { maneuver: { instruction: `Continue for 2.4 miles along illuminated corridor` } },
        { maneuver: { instruction: `Turn into destination approach` } },
        { maneuver: { instruction: `Arrive at ${destName}` } }
      ];
      if (dirStepsList) {
        dirStepsList.innerHTML = steps.map((s, idx) => {
          const instr = s.maneuver?.instruction || `Proceed along route segment ${idx + 1}`;
          let icon = "\u2B06\uFE0F";
          if (instr.toLowerCase().includes("right")) icon = "\u2197\uFE0F";
          else if (instr.toLowerCase().includes("left")) icon = "\u2196\uFE0F";
          else if (instr.toLowerCase().includes("arrive") || idx === steps.length - 1) icon = "\u{1F3C1}";
          return `
          <div class="maneuver-item">
            <span class="maneuver-item-icon">${icon}</span>
            <div style="flex:1">
              <div style="font-weight:600; color:var(--text-primary); margin-bottom:2px;">${instr}</div>
              <div class="maneuver-item-dist">${s.distance ? (s.distance / 1609.34).toFixed(1) + " mi" : "Step " + (idx + 1)}</div>
            </div>
          </div>
        `;
        }).join("");
      }
    }
    modeTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        modeTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        currentNavMode = tab.dataset.mode;
        if (selectedPlace) {
          const originCoords = userLocation || [-80.1918, 25.7617];
          updateDirections(currentNavMode, originCoords, selectedPlace.coords, selectedPlace.title);
        }
      });
    });
    btnSwapEndpoints?.addEventListener("click", () => {
      const temp = routeOriginInput.value;
      routeOriginInput.value = routeDestInput.value;
      routeDestInput.value = temp;
    });
    btnCloseDirections?.addEventListener("click", () => {
      directionsDrawer?.classList.add("hidden");
      routingEngine.clearRoute();
    });
    btnCancelRoute?.addEventListener("click", () => {
      routingEngine.clearRoute();
      routeHud?.classList.add("hidden");
    });
    let inNavAnimationId = null;
    btnStartNav?.addEventListener("click", () => {
      if (!currentNavRoute || !currentNavRoute.coordinates || !currentNavRoute.coordinates.length) {
        alert("Please calculate a route before starting navigation");
        return;
      }
      startActive3DNavigation(currentNavRoute);
    });
    function startActive3DNavigation(route) {
      directionsDrawer?.classList.add("hidden");
      placeDetailCard?.classList.add("hidden");
      activeNavBanner?.classList.remove("hidden");
      mapEngine.setPitch(74);
      const coords = route.coordinates;
      let stepIdx = 0;
      const totalSteps = coords.length;
      let carMarker = window._navCarMarker;
      if (!carMarker) {
        const carEl = document.createElement("div");
        carEl.className = "gta-marker nav-car-marker";
        carEl.innerHTML = `
        <div class="marker-pulse" style="border-color: #00f0ff; animation-duration: 0.8s;"></div>
        <div class="marker-badge" style="background: #00f0ff; box-shadow: 0 0 20px #00f0ff; width:34px; height:34px;">
          <span style="font-size:16px;">\u{1F697}</span>
        </div>
      `;
        carMarker = new maplibregl.Marker({ element: carEl }).setLngLat(coords[0]).addTo(mapEngine.map);
        window._navCarMarker = carMarker;
      }
      function stepNavigation() {
        if (stepIdx >= totalSteps - 1) {
          if (activeNavInstruction) activeNavInstruction.textContent = `You have arrived at ${route.destinationName}!`;
          if (activeNavRemaining) activeNavRemaining.textContent = "Route completed";
          if (activeNavIcon) activeNavIcon.textContent = "\u{1F3C1}";
          return;
        }
        const curr = coords[stepIdx];
        const next = coords[Math.min(stepIdx + 1, totalSteps - 1)];
        const dLng = (next[0] - curr[0]) * Math.cos(curr[1] * Math.PI / 180);
        const dLat = next[1] - curr[1];
        const bearing = (Math.atan2(dLng, dLat) * 180 / Math.PI + 360) % 360;
        carMarker.setLngLat(curr);
        mapEngine.map.easeTo({
          center: curr,
          bearing,
          pitch: 74,
          zoom: 17.5,
          duration: 950,
          easing: (t) => t
        });
        const pctLeft = Math.round(100 - stepIdx / totalSteps * 100);
        if (activeNavInstruction) activeNavInstruction.textContent = `Proceed along illuminated route to ${route.destinationName}`;
        if (activeNavRemaining) activeNavRemaining.textContent = `${pctLeft}% remaining \xB7 In-ride real-time guidance`;
        if (activeNavIcon) activeNavIcon.textContent = stepIdx % 4 === 0 ? "\u2197\uFE0F" : "\u2B06\uFE0F";
        stepIdx++;
        inNavAnimationId = setTimeout(stepNavigation, 1e3);
      }
      stepNavigation();
    }
    function exitActive3DNavigation() {
      if (inNavAnimationId) {
        clearTimeout(inNavAnimationId);
        inNavAnimationId = null;
      }
      activeNavBanner?.classList.add("hidden");
      mapEngine.setPitch(60);
      routingEngine.clearRoute();
      if (window._navCarMarker) {
        window._navCarMarker.remove();
        window._navCarMarker = null;
      }
    }
    btnExitNav?.addEventListener("click", exitActive3DNavigation);
    window.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT") return;
      if (e.code === "KeyR") {
        btnStreetRoam?.click();
      } else if (e.code === "KeyC") {
        btnCinematic?.click();
      } else if (e.code === "KeyN") {
        btnToggleNeon?.click();
      } else if (e.key === "Escape") {
        placeDetailCard?.classList.add("hidden");
        directionsDrawer?.classList.add("hidden");
        exitActive3DNavigation();
      }
    });
    console.log("\u26A1 Terra 3D Engine Initialized \xB7 Real-World Photorealistic 3D Mapping");
  })();
})();
