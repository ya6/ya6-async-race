import { Injectable } from '@angular/core';
import { Car } from '../interfaces/interfaces';
import config from '../config';
import { WinnerService } from './winner.service';

const cars = [
  { id: 1, name: 'Mercedes', color: 'black' },
  { id: 2, name: 'Toyota', color: 'white' },
];

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private winnerService: WinnerService) {}

  async getAll() {
    const response = await fetch(config.garageUrl);
    const cars = await response.json();
    const upgCars = cars.map((car: Car, idx: number) => {
      return { ...car, offsetX: 0, time: 0, move: 0, dbIdx: idx };
    });

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

  async delete(id: number) {
    const response = await fetch(config.garageUrl + id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.winnerService.delete(id);
  }

  async createSet(n = 5) {
    const carSet = this.generateSet(n);

    const allRequests = carSet.map((car) => {
      return fetch(config.garageUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
      });
    });
    const res = await Promise.all(allRequests);
  }

  async engineControlSet(data: any[]) {
    const allRequests = data.map((el: any) => {
      const { id, status } = el;
      return fetch(`${config.engineUrl}?id=${id}&status=${status}`, {
        method: 'PATCH',
      });
    });
    const responses = await Promise.all(allRequests);
    const jsons = responses.map((el: any) => {
      return new Promise((resolve) => resolve(el.json()));
    });
    return await Promise.all(jsons);
  }

  async __engineDriveSet(data: any[]) {
    const allRequests = data.map((el: any) => {
      const { id, status } = el;
      return fetch(`${config.engineUrl}?id=${id}&status=${status}`, {
        method: 'PATCH',
      });
    });
    const responses = await Promise.allSettled(allRequests);
    console.log('1v-->', responses);

    const jsons = responses.map((el: any) => {
      return new Promise((resolve) => resolve(el.json()));
    });
    const res = await Promise.allSettled(jsons);

    return res;
  }

  async engineControl(data: any) {
    const { id, status } = data;

    const response = await fetch(
      `${config.engineUrl}?id=${Number(id)}&status=${status}`,
      {
        method: 'PATCH',
      }
    );
    return await response.json();
  }

  async engineDrive(data: any) {
    const { id, status, dbIdx } = data;

    try {
      const response = await fetch(
        `${config.engineUrl}?id=${Number(id)}&status=${status}`,
        {
          method: 'PATCH',
        }
      );
      return await response.json();
    } catch (error) {
      return { success: false, dbIdx: dbIdx };
    }
  }

  generateSet(n = 5) {
    const { names, models, colors } = config;
    const newCars = [];
    for (let index = 0; index < n; index++) {
      const newCar = {
        name: `${names.at(this.rand10())} - ${models.at(this.rand10())}`,
        color: colors.at(this.rand10()),
      };
      newCars.push(newCar);
    }
    return newCars;
  }

  getRandom(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  rand10(): number {
    return Math.random() * 10;
  }
}
