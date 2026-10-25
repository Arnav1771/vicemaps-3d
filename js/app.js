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
  mapEngine.map.on('move', () => {
    const center = mapEngine.map.getCenter();
    const pitch = Math.round(mapEngine.map.getPitch());
    const bearing = Math.round((mapEngine.map.getBearing() + 360) % 360);
    const zoom = mapEngine.map.getZoom().toFixed(1);

    if (telemetryCoords) {
      telemetryCoords.textContent = `${center.lat.toFixed(4)}°N, ${Math.abs(center.lng).toFixed(4)}°W`;
    }
    if (telemetryHeading) {
      telemetryHeading.textContent = `${bearing}° (PITCH ${pitch}°)`;
    }
    if (telemetryZoom) {
      telemetryZoom.textContent = `Z${zoom}`;
    }
    if (pitchSlider) {
      pitchSlider.value = pitch;
      pitchValText.textContent = `${pitch}°`;
    }
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
    btnCinematic.textContent = isPlaying ? '⏹️ Exit Tour' : '🎬 Cinematic Tour';
  });

  // Street Roam Mode
  btnStreetRoam.addEventListener('click', () => {
    const isRoaming = streetRoamCtrl.toggle((speed) => {
      if (speedometerVal) speedometerVal.textContent = Math.abs(speed);
    });
    btnStreetRoam.classList.toggle('active', isRoaming);
    btnStreetRoam.textContent = isRoaming ? '⏹️ Exit Roam' : '🏎️ Street Roam';
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
          searchInput.value = title;
          searchSuggestions.classList.add('hidden');
          mapEngine.flyTo(coords, 16.5, 68, 30);
          triggerRoute(coords, title);
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

  // Handle Popup "Set GPS Waypoint" click
  document.addEventListener('click', (e) => {
    const routeBtn = e.target.closest('.btn-popup-route');
    if (routeBtn) {
      const coords = routeBtn.dataset.coords.split(',').map(Number);
      const name = routeBtn.dataset.name;
      triggerRoute(coords, name);
    }
  });

  async function triggerRoute(destCoords, destName) {
    const originCoords = userLocation || [-80.1918, 25.7617]; // Real user GPS or Downtown Vice City
    routeHud.classList.remove('hidden');
    routeDestName.textContent = `Destination: ${destName}`;
    routeDistance.textContent = 'Calculating...';
    routeDuration.textContent = '...';

    const route = await routingEngine.calculateRoute(originCoords, destCoords, destName);
    if (route) {
      routeDistance.textContent = route.distance;
      routeDuration.textContent = route.duration;
      if (route.steps.length && route.steps[0].maneuver) {
        routeManeuver.textContent = route.steps[0].maneuver.instruction || 'Follow highlighted neon road';
      }
    }
  }

  btnCancelRoute.addEventListener('click', () => {
    routingEngine.clearRoute();
    routeHud.classList.add('hidden');
  });

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    if (e.code === 'KeyR') {
      btnStreetRoam.click();
    } else if (e.code === 'KeyC') {
      btnCinematic.click();
    } else if (e.code === 'KeyN') {
      btnToggleNeon.click();
    }
  });

  console.log("⚡ ViceMaps 3D Engine Initialized · GTA 6 Neon Dusk Theme");
})();
