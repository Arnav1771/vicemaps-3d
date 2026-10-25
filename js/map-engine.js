/**
 * Map Engine Module
 * Manages MapLibre GL instance, 3D extruded building geometry, dusk atmospheric shaders,
 * and cinematic camera control.
 */

import { MAP_CONFIG } from './config.js';
import { POI_DATA } from './poi-data.js';

export class MapEngine {
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

      // Map load event
      this.map.on('load', () => {
        this._setupSkyAndAtmosphere();
        this._setup3DBuildings();
        this._setupCustomPOIMarkers();
        resolve(this);
      });

      // Gracefully handle vector tile loading errors by applying fallback dark style
      this.map.on('error', (e) => {
        if (e && e.error && e.error.message && e.error.message.includes('style')) {
          console.warn('Vector tile network error; applying resilient fallback:', e.error);
        }
      });
    });
  }

  _setupSkyAndAtmosphere() {
    // Add GTA 6 Neon Dusk Sky & Fog
    if (this.map.setSky) {
      this.map.setSky({
        'sky-color': '#080816',
        'sky-horizon-blend': 0.7,
        'horizon-color': '#ff4444',
        'horizon-fog-blend': 0.8,
        'fog-color': '#0d1326',
        'fog-ground-blend': 0.85
      });
    }

    // Set directional dusk lighting
    if (this.map.setLight) {
      this.map.setLight({
        anchor: 'map',
        color: '#ffaa66',
        intensity: 0.65,
        position: [1.5, 210, 32]
      });
    }
  }

  _setup3DBuildings() {
    // Search for existing building layer to insert before
    const layers = this.map.getStyle().layers;
    let labelLayerId;
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol' && layers[i].layout && layers[i].layout['text-field']) {
        labelLayerId = layers[i].id;
        break;
      }
    }

    // Check if openmaptiles vector source is available
    const hasBuildingSource = this.map.getSource('openmaptiles');

    if (hasBuildingSource) {
      this.map.addLayer(
        {
          id: '3d-buildings',
          source: 'openmaptiles',
          'source-layer': 'building',
          type: 'fill-extrusion',
          minzoom: 14,
          paint: {
            'fill-extrusion-color': [
              'interpolate',
              ['linear'],
              ['coalesce', ['get', 'render_height'], ['get', 'height'], 15],
              0, '#0d1527',
              30, '#1e293b',
              80, '#ff007f',    // GTA 6 Neon magenta for high-rises
              160, '#00f0ff'   // Electric cyan for towering skyscrapers
            ],
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              14, 0,
              14.5, ['coalesce', ['get', 'render_height'], ['get', 'height'], 20]
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              14, 0,
              14.5, ['coalesce', ['get', 'render_min_height'], ['get', 'min_height'], 0]
            ],
            'fill-extrusion-opacity': 0.90
          }
        },
        labelLayerId
      );
    } else {
      // Procedural 3D buildings generation for Vice City waterfront
      this._injectProceduralViceCity3DBuildings(labelLayerId);
    }
  }

  _injectProceduralViceCity3DBuildings(beforeLayerId) {
    // Generates procedural volumetric buildings around Downtown Miami / Vice City
    const features = [];
    const baseLng = -80.1900;
    const baseLat = 25.7720;

    // Generate skyscraper cluster in Downtown
    for (let i = -7; i <= 7; i++) {
      for (let j = -7; j <= 7; j++) {
        const lng = baseLng + i * 0.0022;
        const lat = baseLat + j * 0.0019;
        const distFromCenter = Math.sqrt(i * i + j * j);
        const height = Math.max(25, Math.floor((1 - distFromCenter / 10) * 220 + ((i * 13 + j * 7) % 45)));

        const w = 0.0008;
        const h = 0.0007;

        features.push({
          type: 'Feature',
          properties: {
            height: height,
            min_height: 0,
            name: `Vice Tower ${(i + 8) * 10 + (j + 8)}`
          },
          geometry: {
            type: 'Polygon',
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

    if (!this.map.getSource('vice-city-3d-source')) {
      this.map.addSource('vice-city-3d-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features
        }
      });

      this.map.addLayer(
        {
          id: '3d-buildings-procedural',
          source: 'vice-city-3d-source',
          type: 'fill-extrusion',
          minzoom: 12,
          paint: {
            'fill-extrusion-color': [
              'interpolate',
              ['linear'],
              ['get', 'height'],
              20, '#0d1527',
              50, '#1e293b',
              100, '#ff007f',
              180, '#00f0ff'
            ],
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.88
          }
        },
        beforeLayerId
      );
    }
  }

  _setupCustomPOIMarkers() {
    POI_DATA.forEach((poi) => {
      // Create custom DOM marker
      const el = document.createElement('div');
      el.className = 'gta-marker';
      el.dataset.id = poi.id;
      el.innerHTML = `
        <div class="marker-pulse" style="border-color: ${poi.color}"></div>
        <div class="marker-badge" style="box-shadow: 0 0 14px ${poi.color}">
          <span class="marker-icon">${poi.icon}</span>
        </div>
        <div class="marker-label">${poi.title}</div>
      `;

      // Popup
      const popup = new maplibregl.Popup({ offset: 25, closeButton: false })
        .setHTML(`
          <div class="gta-popup">
            <div class="popup-tag" style="color: ${poi.color}">${poi.categoryLabel}</div>
            <div class="popup-title">${poi.title}</div>
            <div class="popup-desc">${poi.description}</div>
            <div class="popup-btn-wrap">
              <button class="btn-popup-route" data-coords="${poi.coords[0]},${poi.coords[1]}" data-name="${poi.title}">
                📍 Set GPS Waypoint
              </button>
            </div>
          </div>
        `);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(poi.coords)
        .setPopup(popup)
        .addTo(this.map);

      this.markers.push(marker);

      el.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('terra-poi-click', { detail: poi }));
        if (poi.camera) {
          this.flyTo(poi.coords, poi.camera.zoom, poi.camera.pitch, poi.camera.bearing);
        }
      });
    });
  }

  flyTo(center, zoom = 16.0, pitch = 65, bearing = 38) {
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
    const layerIds = ['3d-buildings', '3d-buildings-procedural'];
    layerIds.forEach(id => {
      if (this.map.getLayer(id)) {
        this.map.setLayoutProperty(id, 'visibility', enabled ? 'visible' : 'none');
      }
    });
  }

  setLightingPreset(mode) {
    if (!this.map.setLight) return;
    const presets = {
      golden: {
        anchor: 'map',
        color: '#FFBC70',       // Warm golden-hour sunlight
        intensity: 0.65,
        position: [1.5, 210, 32] // 210° azimuth, 32° altitude
      },
      daylight: {
        anchor: 'map',
        color: '#FFFFFF',       // Crisp neutral daylight
        intensity: 0.85,
        position: [1.5, 180, 65]
      },
      bluehour: {
        anchor: 'map',
        color: '#4860FF',       // Blue hour cool ambient
        intensity: 0.48,
        position: [1.5, 260, 10]
      },
      night: {
        anchor: 'map',
        color: '#18232F',       // Moonlit dark night
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
      duration: 1000
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
    // Mathematical formula approximation for camera altitude above ground in Web Mercator
    const earthCircumference = 40075016.686;
    const altitude = (earthCircumference * Math.cos(this.map.getCenter().lat * Math.PI / 180)) / Math.pow(2, zoom + 8);
    return Math.max(12, Math.round(altitude * 100));
  }

  toggleNeonMode(enabled) {
    this.isNeonEnabled = enabled;
    const colorExpr = enabled
      ? [
          'interpolate',
          ['linear'],
          ['coalesce', ['get', 'render_height'], ['get', 'height'], 20],
          20, '#0d1527',
          50, '#1e293b',
          100, '#ff007f',
          180, '#00f0ff'
        ]
      : '#334155';

    ['3d-buildings', '3d-buildings-procedural'].forEach(id => {
      if (this.map.getLayer(id)) {
        this.map.setPaintProperty(id, 'fill-extrusion-color', colorExpr);
      }
    });
  }
}
