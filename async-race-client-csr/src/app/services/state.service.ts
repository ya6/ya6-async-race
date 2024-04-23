import { Injectable } from '@angular/core';
import { CarService } from './car.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  _cars: any[] = [];
  _raceResults: any = {};
  _raceIsOn: boolean = false;

  constructor(private carService: CarService) {}

  async getAllCars() {
    const cars = await this.carService.getAll();
    this.cars = cars;
  }

  get cars() {
    return this._cars;
  }

  set cars(value) {
    this._cars = value;
  }

  get raceResults() {
    return this._raceResults;
  }

  set raceResults(value) {
    this._raceResults = value;
  }

  get raceIsOn() {
    return this._raceIsOn;
  }

  set raceIsOn(value) {
    this._raceIsOn = value;
  }
}
