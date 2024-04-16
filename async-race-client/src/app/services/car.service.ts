import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, lastValueFrom, take } from 'rxjs';
import { Car } from '../interfaces/interfaces';

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
  constructor(private http: HttpClient) {}

  // async getAll() {
  //   this.getServerAll();
  //   const upgCars = cars.map((car) => {
  //     return { ...car, offsetX: 0, time: 0 };
  //   });
  //   return upgCars;
  // }

  async getAll() {
    const source$: Observable<any> = this.http
      .get('http://localhost:3000/garage')
      .pipe(take(1));

    const cars = await lastValueFrom(source$);
    return cars.map((car: Car) => ({ ...car, offsetX: 0, time: 0 }));
  }
}
