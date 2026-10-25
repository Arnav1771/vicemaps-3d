/**
 * First-Person Street Roam Controller
 * Allows user to drive/walk at street level along 3D avenues with keyboard controls.
 */

export class StreetRoamController {
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
    window.addEventListener('keydown', (e) => {
      if (!this.isActive) return;
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        this.keys[e.code] = true;
      }
      if (e.code === 'Escape') {
        this.stop();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (!this.isActive) return;
      this.keys[e.code] = false;
    });
  }

  start(onSpeedCallback) {
    if (this.isActive) return;
    this.isActive = true;
    this.onSpeedUpdate = onSpeedCallback;

    document.body.classList.add('street-roam-active');

    // Drop camera to street level
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
    document.body.classList.remove('street-roam-active');

    // Restore comfortable 3D overview
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

      const isAccel = this.keys['KeyW'] || this.keys['ArrowUp'];
      const isBrake = this.keys['KeyS'] || this.keys['ArrowDown'];
      const isLeft = this.keys['KeyA'] || this.keys['ArrowLeft'];
      const isRight = this.keys['KeyD'] || this.keys['ArrowRight'];

      // Acceleration & Braking
      if (isAccel) {
        this.speedMph = Math.min(this.maxSpeed, this.speedMph + 1.2);
      } else if (isBrake) {
        this.speedMph = Math.max(-20, this.speedMph - 2.0);
      } else {
        // Natural friction coasting
        if (this.speedMph > 0) this.speedMph = Math.max(0, this.speedMph - 0.5);
        if (this.speedMph < 0) this.speedMph = Math.min(0, this.speedMph + 0.5);
      }

      // Steering (scales with velocity)
      let bearing = this.map.getBearing();
      const steerFactor = Math.min(1.5, Math.abs(this.speedMph) / 25);
      if (isLeft) bearing -= 1.8 * steerFactor;
      if (isRight) bearing += 1.8 * steerFactor;

      // Displacement
      const center = this.map.getCenter();
      const rad = (bearing * Math.PI) / 180;
      // Convert mph to deg delta approx (~0.000004 deg per mph frame)
      const stepDist = (this.speedMph * 0.0000035);

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
}
