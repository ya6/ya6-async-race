import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  _cars: any[] = [];
  _raceResults: any = {};

  constructor() {}

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
}
