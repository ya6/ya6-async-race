import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import config from '../config';
import { Car } from '../interfaces/interfaces';

@Injectable()
export class CarObsService {
  constructor(private http: HttpClient) {}

  getAll$() {
    const source$: Observable<any> = this.http.get(config.garageUrl);
    return source$;
  }

  create$(name: string, color: string) {
    this.http.post(config.garageUrl, { name, color }).subscribe();
  }

  update$(updCar: Car) {
    this.http
      .put(config.garageUrl + updCar.id, {
        name: updCar.name,
        color: updCar.color,
      })
      .subscribe();
  }

  gen100Cars$(n = 5) {
    console.log('gen100Cars$');

    const { names, models, colors } = config;
    const newCars = [];
    for (let index = 0; index < n; index++) {
      const newCar = {
        name: `${names.at(this.rand_0_10())} - ${models.at(this.rand_0_10())}`,
        color: colors.at(this.rand_0_10()),
      };
      newCars.push(newCar);
    }
    const observables: Observable<any>[] = newCars.map((car) =>
      this.http.post(config.garageUrl, car)
    );

    forkJoin(observables).subscribe();
  }

  delete(id: number) {
    this.http.delete(config.garageUrl + id).subscribe();
  }

  getRandom(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  rand_0_10(): number {
    return Math.random() * (10 - 0) + 0;
  }
}
