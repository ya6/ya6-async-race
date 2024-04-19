export interface BaseEntity {
  id: number;
}

export interface Car extends BaseEntity {
  name: string;
  color: string;
  offsetX?: number;
  time?: number;
  move?: number;
  dbIdx?: number;
}

export interface TrackSize {
  trackHeight: number;
  trackTop: number;
  trackBottom: number;
  innerWidth: number;
  trackLength: number;
}
