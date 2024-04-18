import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() updEvent = new EventEmitter()

  handler(e: Event, car: any, action: string) {
    switch (action) {
      case 'del':
        this.carsStore.delete(car.id);
        break;
        
        case 'select':
          this.updEvent.emit(car)
          break;

      case 'run':
        
        break;

      case 'back':
      
        break;


      default:
        console.log(`Sorry`);
    }
    console.log(action);
  }
}
