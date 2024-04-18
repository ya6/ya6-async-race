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

  async ngOnInit() {
    console.log('garage ngOnItit');

    this.cars = await this.carService.getAll();
    this.trackSize = this.positioningService.getTrackSizes();

    this.setLastPage();
  }

  handleButtons(data: any) {
    const { car, action } = data;
    switch (action) {
      case 'del':
        this.handleDelete(car.id);
        break;

      case 'select':
        this.updateCarData = { ...car };
        break;

      case 'run':
        this.startEngin(car);
        break;

      case 'back':
        this.stopEngin(car);
        break;

      default:
        console.log(`no Action found`);
    }
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
    this.setLastPage();
  }

  async handleUpdate(form: any) {
    if (!this.updateCarData.name) {
      this.creteCarData.name = 'NoNameUpdated';
    }
    await this.carService.update(this.updateCarData);
    this.cars = await this.carService.getAll();
    this.setLastPage();
  }

  async handleDelete(id: number) {
    await this.carService.delete(id);
    this.cars = await this.carService.getAll();
    this.setLastPage();
  }

  async handleGenerateSet(n: number) {
    await this.carService.createSet(n);
    this.cars = await this.carService.getAll();
    this.setLastPage();
  }

  async startRace() {
    console.log(this.pagination.start, this.pagination.end);
    const toEngineCars = this.cars.slice(
      this.pagination.start,
      this.pagination.end
    );
    console.log(toEngineCars);
    const data = toEngineCars.map((el) => ({ id: el.id, status: 'started' }));
    console.log(data);

    const result = await this.carService.engineControlSet(data);
    console.log(result);

    // this.trackSize = this.positioningService.getTrackSizes();
    // this.cars = this.cars.map((car: Car) => {
    //   return {
    //     ...car,
    //     time: 1,
    //     offsetX: Math.round(this.trackSize.innerWidth - 300),
    //     move: 1,
    //   };
    // });

    // this.carsStore.cars$ = this.cars;

    // ! get data
    // get ids
    // get fetch data

    // !run race
    // fetch move
    //set move
  }

  setLastPage() {
    this.pagination.lastPage = Math.ceil(
      this.cars.length / this.pagination.pageSize
    );
  }

  resetRace() {
    this.cars = this.cars.map((car: Car) => {
      return { ...car, time: 0, offsetX: 0 };
    });
    // this.carsStore.cars$ = this.cars;
  }

  async startEngin(car: Car) {
    const response = await this.carService.engineControl({
      id: car.id,
      status: 'started',
    });
    console.log(response);
  }

  async stopEngin(car: Car) {
    const response = await this.carService.engineControl({
      id: car.id,
      status: 'stopped',
    });
    console.log(response);
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
