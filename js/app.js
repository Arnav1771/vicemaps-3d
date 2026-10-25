/**
 * Main Application Controller for ViceMaps 3D
 * Integrates MapEngine, Routing, Cinematic Tour, Street Roam, and Google Stitch HUD.
 */

import { MAP_CONFIG } from './config.js';
import { POI_DATA } from './poi-data.js';
import { MapEngine } from './map-engine.js';
import { RoutingEngine } from './routing.js';
import { CinematicController } from './cinematic.js';
import { StreetRoamController } from './street-roam.js';

(async function () {
  'use strict';

  // Instantiate Core Modules
  const mapEngine = new MapEngine('map');
  await mapEngine.init();
  window.mapEngineInstance = mapEngine;

  const routingEngine = new RoutingEngine(mapEngine);
  const cinematicCtrl = new CinematicController(mapEngine);
  const streetRoamCtrl = new StreetRoamController(mapEngine);

  // DOM Elements
  const searchInput = document.getElementById('search-input');
  const searchSuggestions = document.getElementById('search-suggestions');
  const btnGpsLocate = document.getElementById('btn-gps-locate');
  const categoryFilters = document.getElementById('category-filters');
  const routeHud = document.getElementById('route-hud');
  const routeDestName = document.getElementById('route-dest-name');
  const routeDistance = document.getElementById('route-distance');
  const routeDuration = document.getElementById('route-duration');
  const routeManeuver = document.getElementById('route-maneuver');
  const btnCancelRoute = document.getElementById('btn-cancel-route');
  const btnToggle3D = document.getElementById('btn-toggle-3d');
  const btnToggleNeon = document.getElementById('btn-toggle-neon');
  const btnCinematic = document.getElementById('btn-cinematic');
  const btnStreetRoam = document.getElementById('btn-street-roam');
  const streetHud = document.getElementById('street-hud');
  const speedometerVal = document.getElementById('speedometer-val');
  const pitchSlider = document.getElementById('pitch-slider');
  const pitchValText = document.getElementById('pitch-val-text');
  const citySelect = document.getElementById('city-select');
  const telemetryCoords = document.getElementById('telemetry-coords');
  const telemetryHeading = document.getElementById('telemetry-heading');
  const telemetryZoom = document.getElementById('telemetry-zoom');

  // Place Detail Card Elements
  const placeDetailCard = document.getElementById('place-detail-card');
  const placeCatBadge = document.getElementById('place-cat-badge');
  const btnClosePlaceCard = document.getElementById('btn-close-place-card');
  const placeDetailTitle = document.getElementById('place-detail-title');
  const placeReviewsText = document.getElementById('place-reviews-text');
  const placeAddressText = document.getElementById('place-address-text');
  const btnPlaceDirections = document.getElementById('btn-place-directions');
  const btnPlaceStreetView = document.getElementById('btn-place-street-view');
  const btnPlaceFlyover = document.getElementById('btn-place-flyover');
  const btnPlaceSave = document.getElementById('btn-place-save');
  const btnSaveLabel = document.getElementById('btn-save-label');
  const placeDescText = document.getElementById('place-desc-text');

  // Multi-Modal Directions Drawer Elements
  const directionsDrawer = document.getElementById('directions-drawer');
  const btnCloseDirections = document.getElementById('btn-close-directions');
  const modeTabs = document.querySelectorAll('.mode-tab');
  const routeOriginInput = document.getElementById('route-origin-input');
  const btnSwapEndpoints = document.getElementById('btn-swap-endpoints');
  const routeDestInput = document.getElementById('route-dest-input');
  const dirDrawerDistance = document.getElementById('dir-drawer-distance');
  const dirDrawerDuration = document.getElementById('dir-drawer-duration');
  const dirStepsList = document.getElementById('dir-steps-list');
  const btnStartNav = document.getElementById('btn-start-navigation');

  // Active Navigation Banner Elements
  const activeNavBanner = document.getElementById('active-nav-banner');
  const activeNavIcon = document.getElementById('active-nav-icon');
  const activeNavInstruction = document.getElementById('active-nav-instruction');
  const activeNavRemaining = document.getElementById('active-nav-remaining');
  const btnExitNav = document.getElementById('btn-exit-navigation');

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

  // Real-time GPS Location Handler
  if (btnGpsLocate) {
    btnGpsLocate.addEventListener('click', () => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
      }
      btnGpsLocate.style.opacity = '0.5';
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          btnGpsLocate.style.opacity = '1';
          const { longitude, latitude } = pos.coords;
          userLocation = [longitude, latitude];
          mapEngine.flyTo(userLocation, 16.5, 68, 38);

          if (!userMarker) {
            const el = document.createElement('div');
            el.className = 'gta-marker user-location-marker';
            el.innerHTML = `
              <div class="marker-pulse" style="border-color: #00f0ff"></div>
              <div class="marker-badge" style="background: #00f0ff; border-color: #fff; box-shadow: 0 0 16px #00f0ff">
                <span class="marker-icon" style="color: #060812; font-size: 11px;">📍</span>
              </div>
              <div class="marker-label">YOU ARE HERE</div>
            `;
            userMarker = new maplibregl.Marker({ element: el })
              .setLngLat(userLocation)
              .addTo(mapEngine.map);
          } else {
            userMarker.setLngLat(userLocation);
          }
        },
        (err) => {
          btnGpsLocate.style.opacity = '1';
          console.warn("GPS Geolocation error:", err.message);
          mapEngine.flyTo(MAP_CONFIG.defaultLocation.center, 16.5, 68, 38);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });
  }

  // Setup City Bookmarks in Select Dropdown
  MAP_CONFIG.cityBookmarks.forEach((city) => {
    const opt = document.createElement('option');
    opt.value = city.id;
    opt.textContent = `${city.name} (${city.tag})`;
    citySelect.appendChild(opt);
  });

  citySelect.addEventListener('change', (e) => {
    const selected = MAP_CONFIG.cityBookmarks.find(c => c.id === e.target.value);
    if (selected) {
      mapEngine.flyTo(selected.center, selected.zoom, selected.pitch, selected.bearing);
    }
  });

  // Telemetry HUD updates on map move
  const telemetryAltitude = document.getElementById('telemetry-altitude');
  const compassNeedle = document.getElementById('compass-needle');
  const compassHeadingText = document.getElementById('compass-heading-text');

  mapEngine.map.on('move', () => {
    const center = mapEngine.map.getCenter();
    const pitch = Math.round(mapEngine.map.getPitch());
    const bearing = Math.round((mapEngine.map.getBearing() + 360) % 360);
    const zoom = mapEngine.map.getZoom().toFixed(1);
    const alt = mapEngine.calculateAltitudeMeters();

    if (telemetryCoords) {
      telemetryCoords.textContent = `${center.lat.toFixed(4)}°N, ${Math.abs(center.lng).toFixed(4)}°W`;
    }
    if (telemetryHeading) {
      telemetryHeading.textContent = `${bearing}° (PITCH ${pitch}°)`;
    }
    if (telemetryZoom) {
      telemetryZoom.textContent = `Z${zoom}`;
    }
    if (telemetryAltitude) {
      telemetryAltitude.textContent = `${alt} M`;
    }
    if (compassHeadingText) {
      compassHeadingText.textContent = `${bearing}° N`;
    }
    if (compassNeedle) {
      compassNeedle.style.transform = `rotate(${-bearing}deg)`;
    }
    if (pitchSlider) {
      pitchSlider.value = pitch;
      pitchValText.textContent = `${pitch}°`;
    }
  });

  // Real-Time Measured Frame Rate (FPS) Performance Monitor
  let frameCount = 0;
  let lastFpsTime = performance.now();
  const fpsElement = document.getElementById('telemetry-fps');

  function measureFps() {
    frameCount++;
    const now = performance.now();
    if (now - lastFpsTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (now - lastFpsTime));
      if (fpsElement) {
        fpsElement.textContent = `${fps} FPS`;
      }
      frameCount = 0;
      lastFpsTime = now;
    }
    requestAnimationFrame(measureFps);
  }
  requestAnimationFrame(measureFps);

  // Floating Left Tool Rail (Section 3.B)
  const railExplore = document.getElementById('rail-explore');
  const railPlaces = document.getElementById('rail-places');
  const railDirections = document.getElementById('rail-directions');
  const railLayers = document.getElementById('rail-layers');
  const railLocation = document.getElementById('rail-location');
  const railSaved = document.getElementById('rail-saved');
  const railSettings = document.getElementById('rail-settings');

  function activateRail(btn) {
    document.querySelectorAll('.rail-btn').forEach(b => b.classList.remove('active'));
    btn?.classList.add('active');
  }

  railExplore?.addEventListener('click', () => {
    activateRail(railExplore);
    mapEngine.flyTo(MAP_CONFIG.defaultLocation.center, 15.8, 65, 38);
  });

  railPlaces?.addEventListener('click', () => {
    activateRail(railPlaces);
    const randomPoi = POI_DATA[Math.floor(Math.random() * POI_DATA.length)];
    if (randomPoi) showPlaceDetail(randomPoi);
  });

  railDirections?.addEventListener('click', () => {
    activateRail(railDirections);
    if (selectedPlace) {
      openDirectionsDrawer(selectedPlace.coords, selectedPlace.title);
    } else {
      openDirectionsDrawer([-80.1300, 25.7907], "Ocean Drive Promenade");
    }
  });

  railLayers?.addEventListener('click', () => {
    activateRail(railLayers);
    btnToggle3D.click();
  });

  railLocation?.addEventListener('click', () => {
    activateRail(railLocation);
    btnGpsLocate?.click();
  });

  railSaved?.addEventListener('click', () => {
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

  railSettings?.addEventListener('click', () => {
    activateRail(railSettings);
    btnToggleNeon.click();
  });

  // Right Camera Controls (Section 3.C)
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnToggle2d3d = document.getElementById('btn-toggle-2d3d');
  const btnResetNorth = document.getElementById('btn-reset-north');

  btnZoomIn?.addEventListener('click', () => mapEngine.zoomIn());
  btnZoomOut?.addEventListener('click', () => mapEngine.zoomOut());
  btnResetNorth?.addEventListener('click', () => mapEngine.resetNorth());

  btnToggle2d3d?.addEventListener('click', () => {
    const is3D = mapEngine.toggle2D3D();
    btnToggle2d3d.textContent = is3D ? '3D' : '2D';
  });

  // Lighting Presets (Section 4)
  const lightingModeLabel = document.getElementById('lighting-mode-label');
  const telemetryLighting = document.getElementById('telemetry-lighting');
  document.querySelectorAll('.lighting-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lighting-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.light;
      mapEngine.setLightingPreset(mode);
      const labels = {
        golden: 'GOLDEN HOUR · 210°',
        daylight: 'DAYLIGHT · 180°',
        bluehour: 'BLUE HOUR · 260°',
        night: 'NIGHT ILLUMINATION'
      };
      if (lightingModeLabel) lightingModeLabel.textContent = mode.toUpperCase();
      if (telemetryLighting) telemetryLighting.textContent = labels[mode] || mode.toUpperCase();
    });
  });

  // Pitch Slider
  pitchSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    mapEngine.setPitch(val);
    pitchValText.textContent = `${val}°`;
  });

  // 3D Buildings Toggle
  btnToggle3D.addEventListener('click', () => {
    const active = btnToggle3D.classList.toggle('active');
    mapEngine.toggle3D(active);
  });

  // Neon Mode Toggle
  btnToggleNeon.addEventListener('click', () => {
    const active = btnToggleNeon.classList.toggle('active');
    mapEngine.toggleNeonMode(active);
  });

  // Cinematic Tour Mode
  btnCinematic.addEventListener('click', () => {
    const isPlaying = cinematicCtrl.toggle();
    btnCinematic.classList.toggle('active', isPlaying);
    btnCinematic.textContent = isPlaying ? '⏹️ Exit Flyover' : '🎬 360° Flyover';
  });

  // Street Roam Mode
  btnStreetRoam.addEventListener('click', () => {
    const isRoaming = streetRoamCtrl.toggle((speed) => {
      if (speedometerVal) speedometerVal.textContent = Math.abs(speed);
    });
    btnStreetRoam.classList.toggle('active', isRoaming);
    btnStreetRoam.textContent = isRoaming ? '⏹️ Exit Street View' : '🚶 Street View';
    streetHud.classList.toggle('hidden', !isRoaming);
  });

  // Worldwide Search & Autocomplete
  let searchDebounceTimer = null;
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    if (!q) {
      searchSuggestions.classList.add('hidden');
      return;
    }

    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(async () => {
      // 1. Check local POIs
      const localMatches = POI_DATA.filter(p =>
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(q.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(q.toLowerCase()))
      ).slice(0, 3);

      // 2. Query Worldwide Photon OpenStreetMap Geocoder
      let globalMatches = [];
      try {
        const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=5`);
        if (res.ok) {
          const data = await res.json();
          globalMatches = (data.features || []).map(f => {
            const props = f.properties || {};
            const name = props.name || props.street || q;
            const subtitle = [props.city, props.state, props.country].filter(Boolean).join(', ');
            return {
              title: name,
              subtitle: subtitle || 'Global Landmark',
              coords: f.geometry.coordinates,
              isGlobal: true,
              icon: '🌍'
            };
          });
        }
      } catch (err) {
        console.warn("Global geocode lookup:", err);
      }

      const combined = [
        ...localMatches.map(m => ({
          title: m.title,
          subtitle: `${m.categoryLabel} • Vice City`,
          coords: m.coords,
          isGlobal: false,
          icon: m.icon
        })),
        ...globalMatches
      ];

      if (!combined.length) {
        searchSuggestions.innerHTML = `<div class="search-item empty">No matching location found on Earth</div>`;
        searchSuggestions.classList.remove('hidden');
        return;
      }

      searchSuggestions.innerHTML = combined.map(item => `
        <div class="search-item" data-coords="${item.coords[0]},${item.coords[1]}" data-title="${item.title}">
          <span class="search-icon">${item.icon}</span>
          <div class="search-info">
            <div class="search-title">
              ${item.title}
              ${item.isGlobal ? '<span class="search-item-global-badge">WORLDWIDE</span>' : ''}
            </div>
            <div class="search-cat">${item.subtitle}</div>
          </div>
        </div>
      `).join('');

      searchSuggestions.classList.remove('hidden');

      searchSuggestions.querySelectorAll('.search-item:not(.empty)').forEach(el => {
        el.addEventListener('click', () => {
          const coords = el.dataset.coords.split(',').map(Number);
          const title = el.dataset.title;
          const subtitle = el.querySelector('.search-cat')?.textContent || 'Global Landmark';
          searchInput.value = title;
          searchSuggestions.classList.add('hidden');

          showPlaceDetail({
            title,
            subtitle,
            coords,
            category: 'sights',
            categoryLabel: 'Search Landmark',
            rating: '4.9',
            reviews: '2,450 Google reviews',
            description: `${title} (${subtitle}) rendered with full 3D vector geometry, custom volumetric lighting, and interactive camera perspective.`
          });
        });
      });
    }, 280);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box-wrap')) {
      searchSuggestions.classList.add('hidden');
    }
  });

  // Category Filter Pills
  categoryFilters.querySelectorAll('.cat-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      categoryFilters.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;

      if (cat === 'all') {
        mapEngine.markers.forEach(m => m.getElement().style.display = 'block');
      } else {
        POI_DATA.forEach((p, idx) => {
          const visible = p.category === cat;
          if (mapEngine.markers[idx]) {
            mapEngine.markers[idx].getElement().style.display = visible ? 'block' : 'none';
          }
        });
      }
    });
  });

  // ==========================================================================
  // Terra 3D - Place Detail Card Controller (Section 7)
  // ==========================================================================
  function showPlaceDetail(place) {
    selectedPlace = place;
    if (placeCatBadge) placeCatBadge.textContent = place.categoryLabel || place.category || 'Point of Interest';
    if (placeDetailTitle) placeDetailTitle.textContent = place.title;
    if (placeReviewsText) placeReviewsText.textContent = `(${place.reviews || '1,850 Google reviews'})`;
    if (placeAddressText) placeAddressText.textContent = `📍 ${place.subtitle || place.address || 'Global Destination'}`;
    if (placeDescText) {
      placeDescText.textContent = place.description || `${place.title} is an authentic real-world landmark rendered in full photorealistic 3D vector geometry.`;
    }

    placeDetailCard?.classList.remove('hidden');
    directionsDrawer?.classList.add('hidden');
    activeNavBanner?.classList.add('hidden');
    routeHud?.classList.add('hidden');

    if (place.coords) {
      mapEngine.flyTo(place.coords, 16.5, 66, 32);
    }
  }

  btnClosePlaceCard?.addEventListener('click', () => {
    placeDetailCard?.classList.add('hidden');
  });

  btnPlaceSave?.addEventListener('click', () => {
    const isSaved = btnSaveLabel?.textContent.includes('Saved');
    if (btnSaveLabel) btnSaveLabel.textContent = isSaved ? 'Save' : 'Saved ⭐';
    if (btnPlaceSave) {
      btnPlaceSave.style.borderColor = isSaved ? 'var(--border-hud)' : 'var(--neon-amber)';
      btnPlaceSave.style.color = isSaved ? 'var(--text-primary)' : 'var(--neon-amber)';
    }
  });

  btnPlaceFlyover?.addEventListener('click', () => {
    cinematicCtrl.toggle();
  });

  btnPlaceStreetView?.addEventListener('click', () => {
    btnStreetRoam?.click();
  });

  btnPlaceDirections?.addEventListener('click', () => {
    if (selectedPlace) {
      openDirectionsDrawer(selectedPlace.coords, selectedPlace.title);
    }
  });

  // Handle POI Marker Click Event
  window.addEventListener('terra-poi-click', (e) => {
    if (e.detail) showPlaceDetail(e.detail);
  });

  // Handle Popup "Set GPS Waypoint" click
  document.addEventListener('click', (e) => {
    const routeBtn = e.target.closest('.btn-popup-route');
    if (routeBtn) {
      const coords = routeBtn.dataset.coords.split(',').map(Number);
      const name = routeBtn.dataset.name;
      openDirectionsDrawer(coords, name);
    }
  });

  // ==========================================================================
  // Terra 3D - Multi-Modal Directions Drawer Controller (Section 3.E & 8)
  // ==========================================================================
  let currentNavRoute = null;
  let currentNavMode = 'driving';

  async function openDirectionsDrawer(destCoords, destName) {
    placeDetailCard?.classList.add('hidden');
    directionsDrawer?.classList.remove('hidden');
    routeHud?.classList.add('hidden');
    activeNavBanner?.classList.add('hidden');

    if (routeDestInput) routeDestInput.value = destName;
    const originCoords = userLocation || [-80.1918, 25.7617];
    if (routeOriginInput) routeOriginInput.value = userLocation ? 'My GPS Location' : 'Downtown Miami (HQ)';

    await updateDirections(currentNavMode, originCoords, destCoords, destName);
  }

  async function updateDirections(mode, originCoords, destCoords, destName) {
    if (dirDrawerDistance) dirDrawerDistance.textContent = 'Calculating...';
    if (dirDrawerDuration) dirDrawerDuration.textContent = '...';
    if (dirStepsList) dirStepsList.innerHTML = '<div class="maneuver-item">Calculating live road navigation…</div>';

    const route = await routingEngine.calculateRoute(originCoords, destCoords, destName);
    if (!route) return;

    currentNavRoute = route;

    // Apply modal speed adjustments
    let durText = route.duration;
    let distText = route.distance;
    const baseMins = parseInt(route.duration) || 15;

    if (mode === 'transit') {
      durText = `${Math.round(baseMins * 1.35)} MIN`;
    } else if (mode === 'walking') {
      durText = `${Math.round(baseMins * 5.2)} MIN`;
    }

    if (dirDrawerDistance) dirDrawerDistance.textContent = distText;
    if (dirDrawerDuration) dirDrawerDuration.textContent = durText;

    // Build step maneuvers list
    const steps = (route.steps && route.steps.length) ? route.steps : [
      { maneuver: { instruction: `Head towards ${destName} on main artery` } },
      { maneuver: { instruction: `Continue for 2.4 miles along illuminated corridor` } },
      { maneuver: { instruction: `Turn into destination approach` } },
      { maneuver: { instruction: `Arrive at ${destName}` } }
    ];

    if (dirStepsList) {
      dirStepsList.innerHTML = steps.map((s, idx) => {
        const instr = s.maneuver?.instruction || `Proceed along route segment ${idx + 1}`;
        let icon = '⬆️';
        if (instr.toLowerCase().includes('right')) icon = '↗️';
        else if (instr.toLowerCase().includes('left')) icon = '↖️';
        else if (instr.toLowerCase().includes('arrive') || idx === steps.length - 1) icon = '🏁';

        return `
          <div class="maneuver-item">
            <span class="maneuver-item-icon">${icon}</span>
            <div style="flex:1">
              <div style="font-weight:600; color:var(--text-primary); margin-bottom:2px;">${instr}</div>
              <div class="maneuver-item-dist">${s.distance ? (s.distance / 1609.34).toFixed(1) + ' mi' : 'Step ' + (idx + 1)}</div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // Transport Mode Tabs Switcher
  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentNavMode = tab.dataset.mode;
      if (selectedPlace) {
        const originCoords = userLocation || [-80.1918, 25.7617];
        updateDirections(currentNavMode, originCoords, selectedPlace.coords, selectedPlace.title);
      }
    });
  });

  // Swap Endpoints
  btnSwapEndpoints?.addEventListener('click', () => {
    const temp = routeOriginInput.value;
    routeOriginInput.value = routeDestInput.value;
    routeDestInput.value = temp;
  });

  btnCloseDirections?.addEventListener('click', () => {
    directionsDrawer?.classList.add('hidden');
    routingEngine.clearRoute();
  });

  btnCancelRoute?.addEventListener('click', () => {
    routingEngine.clearRoute();
    routeHud?.classList.add('hidden');
  });

  // ==========================================================================
  // Terra 3D - Active In-Ride 3D Navigation Simulation
  // ==========================================================================
  let inNavAnimationId = null;

  btnStartNav?.addEventListener('click', () => {
    if (!currentNavRoute || !currentNavRoute.coordinates || !currentNavRoute.coordinates.length) {
      alert("Please calculate a route before starting navigation");
      return;
    }
    startActive3DNavigation(currentNavRoute);
  });

  function startActive3DNavigation(route) {
    directionsDrawer?.classList.add('hidden');
    placeDetailCard?.classList.add('hidden');
    activeNavBanner?.classList.remove('hidden');

    // Camera cockpit angle
    mapEngine.setPitch(74);

    const coords = route.coordinates;
    let stepIdx = 0;
    const totalSteps = coords.length;

    // Create navigation vehicle pointer marker if not present
    let carMarker = window._navCarMarker;
    if (!carMarker) {
      const carEl = document.createElement('div');
      carEl.className = 'gta-marker nav-car-marker';
      carEl.innerHTML = `
        <div class="marker-pulse" style="border-color: #00f0ff; animation-duration: 0.8s;"></div>
        <div class="marker-badge" style="background: #00f0ff; box-shadow: 0 0 20px #00f0ff; width:34px; height:34px;">
          <span style="font-size:16px;">🚗</span>
        </div>
      `;
      carMarker = new maplibregl.Marker({ element: carEl }).setLngLat(coords[0]).addTo(mapEngine.map);
      window._navCarMarker = carMarker;
    }

    function stepNavigation() {
      if (stepIdx >= totalSteps - 1) {
        if (activeNavInstruction) activeNavInstruction.textContent = `You have arrived at ${route.destinationName}!`;
        if (activeNavRemaining) activeNavRemaining.textContent = "Route completed";
        if (activeNavIcon) activeNavIcon.textContent = "🏁";
        return;
      }

      const curr = coords[stepIdx];
      const next = coords[Math.min(stepIdx + 1, totalSteps - 1)];

      // Calculate bearing between curr and next
      const dLng = (next[0] - curr[0]) * Math.cos(curr[1] * Math.PI / 180);
      const dLat = next[1] - curr[1];
      const bearing = (Math.atan2(dLng, dLat) * 180 / Math.PI + 360) % 360;

      carMarker.setLngLat(curr);

      // Smooth camera chase
      mapEngine.map.easeTo({
        center: curr,
        bearing: bearing,
        pitch: 74,
        zoom: 17.5,
        duration: 950,
        easing: (t) => t
      });

      // Update instructions
      const pctLeft = Math.round(100 - (stepIdx / totalSteps) * 100);
      if (activeNavInstruction) activeNavInstruction.textContent = `Proceed along illuminated route to ${route.destinationName}`;
      if (activeNavRemaining) activeNavRemaining.textContent = `${pctLeft}% remaining · In-ride real-time guidance`;
      if (activeNavIcon) activeNavIcon.textContent = stepIdx % 4 === 0 ? "↗️" : "⬆️";

      stepIdx++;
      inNavAnimationId = setTimeout(stepNavigation, 1000);
    }

    stepNavigation();
  }

  function exitActive3DNavigation() {
    if (inNavAnimationId) {
      clearTimeout(inNavAnimationId);
      inNavAnimationId = null;
    }
    activeNavBanner?.classList.add('hidden');
    mapEngine.setPitch(60);
    routingEngine.clearRoute();
    if (window._navCarMarker) {
      window._navCarMarker.remove();
      window._navCarMarker = null;
    }
  }

  btnExitNav?.addEventListener('click', exitActive3DNavigation);

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    if (e.code === 'KeyR') {
      btnStreetRoam?.click();
    } else if (e.code === 'KeyC') {
      btnCinematic?.click();
    } else if (e.code === 'KeyN') {
      btnToggleNeon?.click();
    } else if (e.key === 'Escape') {
      placeDetailCard?.classList.add('hidden');
      directionsDrawer?.classList.add('hidden');
      exitActive3DNavigation();
    }
  });

  console.log("⚡ Terra 3D Engine Initialized · Real-World Photorealistic 3D Mapping");
})();
