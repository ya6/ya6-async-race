import { Component, Input } from '@angular/core';
import { Car, TrackSize } from '../../interfaces/interfaces';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',
})
export class CarComponent {
  @Input() car!: Car;
  @Input() trackSize!: TrackSize;

  move() {}

  //  const way = document.body.clientWidth;
  //     car.style.transform = `translateX(${way - 250}px)`;
  //     car.style.transition = `all ease-in ${time}s`;
}
