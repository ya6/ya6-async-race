import { Component, Input } from '@angular/core';
import { UpgadedWinner } from '../../interfaces/interfaces';

@Component({
  selector: 'app-top-scores-row',
  standalone: true,
  imports: [],
  templateUrl: './top-scores-row.component.html',
  styleUrl: './top-scores-row.component.scss',
})
export class TopScoresRowComponent {
  @Input() winner!: UpgadedWinner;
}
