import { PLATFORM_ID, Injectable, HostListener, Inject } from '@angular/core';
import { DOCUMENT, ViewportScroller, isPlatformBrowser } from '@angular/common';
import config from '../config';

@Injectable({
  providedIn: 'root',
})
export class PositioningService {
  innerWidth!: number;
  innerHeight!: number;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.updateViewportSize();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateViewportSize();
  }

  updateViewportSize() {
    this.innerWidth = this.document.documentElement.clientWidth;
    this.innerHeight = this.document.documentElement.clientHeight;
    console.log(this.innerWidth, this.innerHeight);
  }

  getTrackSizes() {
    const trackHeight = Math.trunc(
      (this.innerHeight - config.header) / config.tracks
    );
    const trackBottom = Math.trunc(trackHeight / 30);
    const trackTop = trackHeight / 3;
    return {innerWidth: this.innerWidth, trackHeight, trackTop, trackBottom };
  }
}
