import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Car, TrackSize } from '../../interfaces/interfaces';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',
})
export class CarComponent {
  constructor() {}

  @Input() car!: Car;
  @Input() trackHeight!: number;
  @Input() left!: string;
  @Input() bottom!: string;
  @Input() right!: string;
}
