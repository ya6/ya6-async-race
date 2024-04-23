import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car, TrackSize } from '../../interfaces/interfaces';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
})
export class TrackComponent {
  @Input() car!: Car;
  @Input() trackSize!: TrackSize;
  @Output() updEvent = new EventEmitter();

  handler(e: Event, car: any, action: string) {
    switch (action) {
      case 'del':
        this.updEvent.emit({ car, action: 'del' });
        break;

      case 'select':
        this.updEvent.emit({ car, action: 'select' });
        break;

      case 'run':
        this.updEvent.emit({ car, action: 'run' });
        break;

      case 'back':
        this.updEvent.emit({ car, action: 'back' });
        break;

      default:
        console.log(`Sorry`);
    }
  }
}
