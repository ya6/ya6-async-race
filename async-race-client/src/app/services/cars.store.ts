import { Car } from '../interfaces/interfaces';
import { Store } from '../store';
import { CarObsService } from './car-obs.service';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

@Injectable()
export class CarsStore extends Store<Car[]> {
  constructor(private carObsService: CarObsService) {
    super([]);
  }

  getAll() {
    this.carObsService.getAll$().subscribe((cars) => {
      this.setValue(cars);
    });
  }

  gen100Cars() {
    this.carObsService.gen100Cars$();
    this.getAll();
  }

  delete(id: number) {
    this.carObsService.delete(id);
    this.getAll();
  }

  get cars$(): Observable<Car[]> {
    return this.value$;
  }

  set cars$(value: Car[]) {
    this.setValue(value);
  }
}
