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
import { FormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [CommonModule, TrackComponent, CarComponent, FormsModule],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent implements OnInit, OnDestroy, OnChanges, DoCheck {
  constructor(
    private carService: CarService,
    private positioningService: PositioningService
  ) {}
  creteCarData = {
    name: '',
    color: '#fffff',
  };

  updateCarData = {
    id: 0,
    name: '',
    color: '#fffff',
  };

  cars: Car[] = [];

  trackSize!: TrackSize;
  pagination = {
    firstPage: 1,
    currentPage: config.startPage,
    pageSize: config.tracks,
    start: 0,
    end: config.tracks,
    lastPage: 10,
  };

  handleSelect(updCar: Car) {
    this.updateCarData = { ...updCar };
  }

  async handleCreate(form: any) {
    if (!this.creteCarData.name) {
      this.creteCarData.name = 'NoName';
    }
    await this.carService.create(
      this.creteCarData.name,
      this.creteCarData.color
    );
    this.cars = await this.carService.getAll();
  }

  async handleUpdate(form: any) {
    if (!this.updateCarData.name) {
      this.creteCarData.name = 'NoNameUpdated';
    }
    await this.carService.update(this.updateCarData);
    this.cars = await this.carService.getAll();
  }

  async ngOnInit() {
    console.log('garage ngOnItit');

    this.cars = await this.carService.getAll();
    this.trackSize = this.positioningService.getTrackSizes();

    this.pagination.lastPage = Math.ceil(
      this.cars.length / this.pagination.pageSize
    );
  }

  startRace() {
    this.trackSize = this.positioningService.getTrackSizes();
    this.cars = this.cars.map((car: Car) => {
      return {
        ...car,
        time: 1,
        offsetX: Math.round(this.trackSize.innerWidth - 300),
      };
    });

    // this.carsStore.cars$ = this.cars;
  }

  resetRace() {
    this.cars = this.cars.map((car: Car) => {
      return { ...car, time: 0, offsetX: 0 };
    });
    // this.carsStore.cars$ = this.cars;
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
    // this.carsStore.gen100Cars();
  }

  async ngOnChanges() {
    console.log('ngOnChanges');
  }
  async ngDoCheck() {
    console.log('ngDoCheck');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }
}
