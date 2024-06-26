import { Component, OnInit, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackComponent } from '../track/track.component';
import { Car, TrackSize } from '../../interfaces/interfaces';
import { PositioningService } from '../../services/positioning.service';
import { CarComponent } from '../car/car.component';
import { FormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { StateService } from '../../services/state.service';
import { WinnerPopupComponent } from '../winner-popup/winner-popup.component';
import { WinnerService } from '../../services/winner.service';
import config from '../../config';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [
    CommonModule,
    TrackComponent,
    CarComponent,
    FormsModule,
    WinnerPopupComponent,
  ],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent implements OnInit, DoCheck {
  constructor(
    private carService: CarService,
    private positioningService: PositioningService,
    private stateService: StateService,
    private winnerService: WinnerService
  ) {}
  showWinner: boolean = false;
  winnerName: string = '';
  winnerTime: number = 1;
  raceIsOn = false;
  stateIsChanged = false;

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
    if (this.stateService.cars.length === 0) {
      await this.stateService.getAllCars();
    }
    this.cars = this.stateService.cars;
    this.trackSize = this.positioningService.getTrackSizes();
    this.setLastPage();
    this.raceIsOn = this.stateService.raceIsOn;
  }

  async ngDoCheck() {
    if (this.stateIsChanged) {
      await this.stateService.getAllCars();
      this.cars = this.stateService.cars;
      this.setLastPage();
      this.stateIsChanged = false;
    }

    this.raceIsOn = this.stateService.raceIsOn;
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
    this.stateIsChanged = true;
  }

  async handleUpdate(form: any) {
    if (!this.updateCarData.name) {
      this.creteCarData.name = 'NoNameUpdated';
    }
    await this.carService.update(this.updateCarData);
    this.stateIsChanged = true;
  }

  async handleDelete(id: number) {
    await this.carService.delete(id);
    this.stateIsChanged = true;
  }

  async handleGenerateSet(n: number) {
    await this.carService.createSet(n);
    this.stateIsChanged = true;
  }

  setSpeed(car: Car, velocity: number, adapter = 400) {
    this.trackSize = this.positioningService.getTrackSizes();
    car.time = adapter / velocity;
    car.move = 1;
    car.offsetX = this.trackSize.trackLength;
  }

  async startRace() {
    this.resetRace();

    this.stateService.raceIsOn = true;

    const toEngineCars = this.cars.slice(
      this.pagination.start,
      this.pagination.end
    );

    const data = toEngineCars.map((el) => ({ id: el.id, status: 'started' }));

    const result: any = await this.carService.engineControlSet(data);

    const raceStats: any = { raceTime: 0, winner: null };
    let resultIndex = 0;
    for (
      let index = this.pagination.start;
      index < this.pagination.start + toEngineCars.length;
      index++
    ) {
      this.setSpeed(this.cars[index], result[resultIndex].velocity);
      raceStats[this.cars[index].id] = {
        time: this.cars[index].time,
        status: true,
      };
      if (this.cars[index].time! > raceStats.raceTime) {
        raceStats.raceTime = this.cars[index].time;
      }
      resultIndex += 1;
    }

    this.stateService.raceResults = raceStats;

    for (const car of toEngineCars) {
      this.drive(car);
    }

    const win = setTimeout(() => {
      if (toEngineCars.length > 0 && this.raceIsOn) {
        this.showWinner = true;

        const currentWinner = { id: 0, time: Infinity };
        for (const key in this.stateService.raceResults) {
          if (
            Object.prototype.hasOwnProperty.call(
              this.stateService.raceResults,
              key
            )
          ) {
            if (this.stateService.raceResults[key]?.status) {
              if (
                this.stateService.raceResults[key].time < currentWinner.time
              ) {
                currentWinner.time = this.stateService.raceResults[key].time;
                currentWinner.id = Number(key);
              }
            }
          }
        }

        const winnerCar = toEngineCars.find((el) => el.id === currentWinner.id);
        if (typeof winnerCar === 'object') {
          this.winnerName = winnerCar!.name;
          this.winnerTime = Number(currentWinner.time.toFixed(2));
          currentWinner.time = this.winnerTime;

          this.winnerService.updateWinnersTable(currentWinner);
        }
      } else return;
      setTimeout(() => {
        clearTimeout(win);
        this.showWinner = false;
      }, 3000);
    }, raceStats.raceTime * 1000);
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

      const tempState = { ...this.stateService.raceResults };
      tempState[this.cars[drRes.dbIdx].id].status = false;
      this.stateService.raceResults = { ...tempState };
    }
  }

  async resetRace() {
    this.stateService.raceIsOn = false;
    this.showWinner = false;
    const toEngineCars = this.cars.slice(
      this.pagination.start,
      this.pagination.end
    );

    const data = toEngineCars.map((el) => ({ id: el.id, status: 'stopped' }));
    await this.carService.engineControlSet(data);

    this.cars = this.cars.map((car: Car) => {
      return { ...car, time: 0, offsetX: 0 };
    });

    this.stateService.cars = this.cars;
  }

  async startEngin(car: Car) {
    const response = await this.carService.engineControl({
      id: car.id,
      status: 'started',
    });

    this.setSpeed(car, response.velocity, 600);

    const driveResponse = await this.carService.engineControl({
      id: car.id,
      status: 'drive',
    });

    if (!driveResponse.success) {
      car.time = 10000;
      car.offsetX = 1;
    }
  }

  async stopEngin(car: Car) {
    await this.carService.engineControl({
      id: car.id,
      status: 'stopped',
    });
    car.time = 0;
    car.offsetX = 0;
  }

  setLastPage() {
    this.pagination.lastPage = Math.ceil(
      this.cars.length / this.pagination.pageSize
    );
    if (this.pagination.lastPage === 0) {
      this.pagination.lastPage = 1;
    }
  }

  prevPage() {
    this.showWinner = false;
    this.pagination.currentPage -= 1;
    this.pagination.start -= this.pagination.pageSize;
    this.pagination.end -= this.pagination.pageSize;
  }

  nextPage() {
    this.showWinner = false;
    this.pagination.currentPage += 1;
    this.pagination.start += this.pagination.pageSize;
    this.pagination.end += this.pagination.pageSize;
  }
}
