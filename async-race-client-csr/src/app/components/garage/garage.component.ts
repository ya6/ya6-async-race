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

  isReset = false;
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
    // console.log('garage ngOnItit');

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
    this.isReset = false;
    this.trackSize = this.positioningService.getTrackSizes();
   
    const toEngineCars = this.cars.slice(
      this.pagination.start,
      this.pagination.end
    );

    const data = toEngineCars.map((el) => ({ id: el.id, status: 'started' }));

    const result: any = await this.carService.engineControlSet(data);
   

    for (
      let index = this.pagination.start;
      index < this.pagination.start + toEngineCars.length;
      index++
    ) {
      this.cars[index].time = 1000 / result[index].velocity;

      this.cars[index].move = 1;
      this.cars[index].offsetX = this.trackSize.trackLength;
    }

    for (const car of toEngineCars) {
      this.drive(car);
    }
  }

  async drive(car: Car) {
    const drRes = await this.carService.engineDrive({
      id: car.id,
      dbIdx: car.dbIdx,
      status: 'drive',
    });

    if (!drRes.success) {
      this.cars[drRes.dbIdx].time = 10000;
      this.cars[drRes.dbIdx].offsetX = 1;
    }
  }

  resetRace() {
    this.cars = this.cars.map((car: Car) => {
      return { ...car, time: 0, offsetX: 0 };
    });
  }

  setLastPage() {
    this.pagination.lastPage = Math.ceil(
      this.cars.length / this.pagination.pageSize
    );
  }

  async startEngin(car: Car) {
    const response = await this.carService.engineControl({
      id: car.id,
      status: 'started',
    });
  }

  async stopEngin(car: Car) {
    const response = await this.carService.engineControl({
      id: car.id,
      status: 'stopped',
    });
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
    // console.log('ngOnChanges');
  }
  async ngDoCheck() {
    // console.log('ngDoCheck');
  }

  ngOnDestroy(): void {
    // console.log('ngOnDestroy');
  }
}
