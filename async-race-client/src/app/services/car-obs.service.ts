import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import config from '../config';

@Injectable()
export class CarObsService {
  constructor(private http: HttpClient) {}

  getAll$() {
    // this.set100$();
    const source$: Observable<any> = this.http.get(config.garageUrl);
    return source$;
  }

  set100$() {
    const { names, colors } = config;
    for (let index = 0; index < 100; index++) {
      const newCar = {
        name: names.at(this.rand_0_10()),
        color: colors.at(this.rand_0_10()),
      };
      console.log(newCar);
    }
  }

  getRandom(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  rand_0_10(): number {
    return Math.random() * (10 - 0) + 0;
  }
}
