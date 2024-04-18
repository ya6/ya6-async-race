import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, lastValueFrom, take } from 'rxjs';
import { Car } from '../interfaces/interfaces';
import config from '../config';

const cars = [
  { id: 1, name: 'Mercedes', color: 'black' },
  { id: 2, name: 'Toyota', color: 'white' },
  { id: 3, name: 'Toyota', color: 'white' },
  { id: 4, name: 'Toyota', color: 'white' },
  { id: 5, name: 'Toyota', color: 'white' },
  { id: 6, name: 'Toyota', color: 'white' },
  { id: 7, name: 'Toyota', color: 'white' },
  { id: 8, name: 'Toyota', color: 'white' },
  { id: 9, name: 'Toyota', color: 'white' },
];

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor() {}

  async getAll() {
    const response = await fetch(config.garageUrl);
    const cars = await response.json();
    const upgCars = cars.map((car: Car) => {
      return { ...car, offsetX: 0, time: 0 };
    });
    console.log(cars);

    return upgCars;
  }

  async create(name: string, color: string) {
    const response = await fetch(config.garageUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, color }),
    });
  }

  async update(car: Car) {
    const response = await fetch(config.garageUrl + car.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: car.name, color: car.color }),
    });
  }

  async delete() {}

  async genetateSet(n = 2) {}

  // async getAll() {
  //   const upgCars = cars.map((car) => {
  //     return { ...car, offsetX: 0, time: 0 };
  //   });
  //   return upgCars;
  // }
}
