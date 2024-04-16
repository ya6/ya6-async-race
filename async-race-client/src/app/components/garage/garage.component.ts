import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';
import { TrackComponent } from '../track/track.component';
import { Car, TrackSize } from '../../interfaces/interfaces';
import { PositioningService } from '../../services/positioning.service';
import { CarComponent } from '../car/car.component';
import config from '../../config';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [CommonModule, TrackComponent, CarComponent],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent implements OnInit {
  constructor(
    private carService: CarService,
    private positioningService: PositioningService
  ) {}

  // cars: Car[] = [];
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
    this.trackSize = await this.positioningService.getTrackSizes();
    this.cars = await this.carService.getAll();
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
  }

  resetRace() {
    this.cars = this.cars.map((car: Car) => {
      return { ...car, time: 0, offsetX: 0 };
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
}
