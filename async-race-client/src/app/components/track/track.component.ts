import { Component, Input } from '@angular/core';
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
}
