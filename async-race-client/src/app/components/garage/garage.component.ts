import {
  Component,
  OnDestroy,
  OnInit,
  OnChanges,
  DoCheck,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { TrackComponent } from '../track/track.component';
import { Car, TrackSize } from '../../interfaces/interfaces';
import { PositioningService } from '../../services/positioning.service';
import { CarComponent } from '../car/car.component';
import config from '../../config';
import { CarsStore } from '../../services/cars.store';
import { Observable, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [CommonModule, TrackComponent, CarComponent, FormsModule],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent implements OnInit, OnDestroy, OnChanges, DoCheck {
  constructor(
    private positioningService: PositioningService,
    public carsStore: CarsStore
  ) {
    this.subscribtions.add(
      this.carsStore.cars$.subscribe((cars) => (this.cars = cars))
    );
  }
  creteCarData = {
    name: '',
    color: '#008800',
  };

  updateCarData = {
    id: 0,
    name: '',
    color: '#008800',
  };

  handleSelect(updCar: Car) {
    this.updateCarData = { ...updCar };
  }

  hanldleCreate(form: any) {
    if (!this.creteCarData.name) {
      this.creteCarData.name = 'Noname car';
    }
    this.carsStore.create(this.creteCarData.name, this.creteCarData.color);
  }

  hanldleUpdate(form: any) {
  
    if (!this.updateCarData.name) {
      this.creteCarData.name = 'Noname updated car';
    }
    this.carsStore.update(this.updateCarData);
  }

  cars: Car[] = [];
  subscribtions: Subscription = new Subscription();

  trackSize!: TrackSize;
  pagination = {
    firstPage: 1,
    currentPage: config.startPage,
    pageSize: config.tracks,
    start: 0,
    end: config.tracks,
    lastPage: 10,
  };

  async ngOnInit() {
    console.log('garage ngOnItit');
    this.trackSize = await this.positioningService.getTrackSizes();

    this.pagination.lastPage = Math.ceil(
      this.cars.length / this.pagination.pageSize
    );
  }

  startRace() {
    this.cars = this.cars.map((car: Car) => {
      return {
        ...car,
        time: 1,
        offsetX: Math.round(this.trackSize.innerWidth * 0.75),
      };
    });

    this.carsStore.cars$ = this.cars;
  }

  resetRace() {
    this.cars = this.cars.map((car: Car) => {
      return { ...car, time: 0, offsetX: 0 };
    });
    this.carsStore.cars$ = this.cars;
  }

  prevPage() {
    this.pagination.currentPage -= 1;
    this.pagination.start -= this.pagination.pageSize;
    this.pagination.end -= this.pagination.pageSize;
  }

  nextPage() {
    this.pagination.currentPage += 1;
    this.pagination.start += this.pagination.pageSize;
    this.pagination.end += this.pagination.pageSize;
  }

  async generateCars() {
    console.log('generateCars');
    this.carsStore.gen100Cars();
  }

  ngOnChanges() {
    console.log('ngOnChanges');
  }
  async ngDoCheck() {
    console.log('ngDoCheck');
  }

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }
}
