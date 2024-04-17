import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../interfaces/interfaces';
import config from '../config';

@Injectable()
export class CarObsService {
  constructor(private http: HttpClient) {}

  getAll$() {
    const source$: Observable<any> = this.http.get(config.garageUrl);
    return source$;
  }
}
