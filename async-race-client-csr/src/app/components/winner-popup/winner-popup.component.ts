import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-winner-popup',
  standalone: true,
  imports: [],
  templateUrl: './winner-popup.component.html',
  styleUrl: './winner-popup.component.scss',
})
export class WinnerPopupComponent {
  @Input() winner: string = '';
  @Input() winnerTime: number = 0;
}
