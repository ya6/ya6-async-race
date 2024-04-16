import { Component } from '@angular/core';
import { TracsBoxComponent } from '../tracs-box/tracs-box.component';
import { Car } from '../../api-interfaces/interfaces';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [TracsBoxComponent],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent {

constructor(private carService: CarService){
  this.cars = carService.getAll()
}

  firstPage = 1;
  currentPage = 1;
  lastPage = 1;
  cars: Car[] = [];
}
