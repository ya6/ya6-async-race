import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
 _cars = []

  constructor() { }
  get cars() {
    return this._cars;
  } 

  set cars(value) {
    this._cars = value;
  
  }
}
