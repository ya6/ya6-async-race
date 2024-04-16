export interface BaseEntity {
  id: number | null;
}

export interface Car extends BaseEntity {
  name: string;
  color: string;
  offsetX?: number;
  time?: number;
}

export interface TrackSize {
  trackHeight: number;
  trackTop: number;
  trackBottom: number;
  innerWidth: number;
  
}
