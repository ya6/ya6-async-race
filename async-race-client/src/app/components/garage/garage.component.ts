import { Component } from '@angular/core';
import { TracsBoxComponent } from '../tracs-box/tracs-box.component';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [TracsBoxComponent],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent {
  firstPage = 1;
  currentPage = 1;
  lastPage = 1;
  cars = 1;
}
