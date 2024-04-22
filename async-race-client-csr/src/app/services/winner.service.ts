import { Injectable } from '@angular/core';
import config from '../config';
import { CarService } from './car.service';

@Injectable({
  providedIn: 'root',
})
export class WinnerService {
  async getAll() {
    const response_cars = await fetch(config.garageUrl);
    const cars = await response_cars.json();
    const response = await fetch(config.winnersUrl);
    const winners = await response.json();

    const upgWinners = winners.map((winner: any) => {
      const car = cars.find((_car: any) => _car.id === winner.id);
      return { ...winner, car };
    });

    return upgWinners;
  }
}
