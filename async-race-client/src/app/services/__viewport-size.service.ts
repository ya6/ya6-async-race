import { Injectable, HostListener } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ViewportSizeService {
  innerWidth!: number;
  innerHeight!: number;

  constructor(private viewportScroller: ViewportScroller) {
    this.updateViewportSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log(event);
    this.updateViewportSize();
  }

  updateViewportSize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    console.log(this.innerWidth, this.innerHeight);
  }
}
