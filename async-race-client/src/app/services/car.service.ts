import { Injectable } from '@angular/core';

const cars = [
  { id: 1, name: 'Mersedes', color: 'black' },
  { id: 2, name: 'Toyota', color: 'wthite' },
];

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor() {}

  getAll() {
    return cars;
  }
}
