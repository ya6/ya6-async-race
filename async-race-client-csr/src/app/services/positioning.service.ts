import { Injectable, HostListener } from '@angular/core';

import config from '../config';

@Injectable({
  providedIn: 'root',
})
export class PositioningService {
  innerWidth!: number;
  innerHeight!: number;

  constructor() {
    this.updateViewportSize();
  }

  updateViewportSize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    console.log('positioniit-service-new', this.innerWidth, this.innerHeight);
  }

  getTrackSizes() {
    const trackHeight = Math.trunc(
      (this.innerHeight - config.header) / config.tracks
    );
    const trackBottom = Math.trunc(trackHeight / 30);
    const trackTop = trackHeight / 3;
    const trackLength = Math.round(this.innerWidth - 300);
    return {
      innerWidth: this.innerWidth,
      trackHeight,
      trackTop,
      trackBottom,
      trackLength,
    };
  }
}
