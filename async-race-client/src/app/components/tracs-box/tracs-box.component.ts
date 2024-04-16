import { Component } from '@angular/core';
import { TrackComponent } from '../track/track.component';

@Component({
  selector: 'app-tracs-box',
  standalone: true,
  imports: [TrackComponent],
  templateUrl: './tracs-box.component.html',
  styleUrl: './tracs-box.component.scss'
})
export class TracsBoxComponent {

}
