/**
 * Cinematic Flyover Tour Module
 * Orchestrates autonomous orbital camera paths around 3D skyscrapers and coastal avenues.
 */

export class CinematicController {
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

    document.body.classList.add('cinematic-mode');

    // Initial dramatic sweep
    this.map.easeTo({
      pitch: 74,
      zoom: 16.2,
      duration: 2000
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
    document.body.classList.remove('cinematic-mode');
  }

  toggle() {
    if (this.isPlaying) {
      this.stopTour();
    } else {
      this.startTour();
    }
    return this.isPlaying;
  }
}
