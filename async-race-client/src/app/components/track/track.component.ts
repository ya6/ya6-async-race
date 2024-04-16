import { Component } from '@angular/core';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
})
export class TrackComponent {
  name = 'mersedes';
  index = 1;
  id = 1;
  color = 'red';
}
