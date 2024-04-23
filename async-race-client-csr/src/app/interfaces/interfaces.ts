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

export interface Winner extends BaseEntity {
  id: number;
  wins?: number;
  car?: Car;
  time: number;
}

export interface UpgadedWinner extends Winner {
  car: Car;
}

export interface TrackSize {
  trackHeight: number;
  trackTop: number;
  trackBottom: number;
  innerWidth: number;
  trackLength: number;
}
