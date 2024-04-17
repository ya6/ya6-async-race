import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { CarObsService } from './services/car-obs.service';
import { CarsStore } from './services/cars.store';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [CarObsService, CarsStore],
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
constructor(private carsStore: CarsStore)
   {this.carsStore.getAll()}


}
