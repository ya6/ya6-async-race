import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { PositioningService } from './services/positioning.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [RouterOutlet, TopBarComponent, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private positioningService: PositioningService) {}

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.positioningService.updateViewportSize();
  }
}
