import { Component, Input } from '@angular/core';
import { Car, TrackSize } from '../../interfaces/interfaces';
import { CarsStore } from '../../services/cars.store';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
})
export class TrackComponent {
  constructor(public carsStore: CarsStore) {}

  @Input() car!: Car;
  @Input() trackSize!: TrackSize;

  handler(e: Event, id: any, action: string) {
    switch (action) {
      case 'del':
        this.carsStore.delete(id);
        break;

      case 'run':
        this.carsStore.delete(id);
        break;

      case 'back':
        this.carsStore.delete(id);
        break;

      case 'select':
        this.carsStore.delete(id);
        break;

      default:
        console.log(`Sorry`);
    }
    console.log(typeof id);
    console.log(action);
  }
}
