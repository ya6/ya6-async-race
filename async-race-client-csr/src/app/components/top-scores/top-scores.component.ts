import { Component, OnInit } from '@angular/core';
import { TopScoresRowComponent } from '../top-scores-row/top-scores-row.component';
import { WinnerService } from '../../services/winner.service';
import { CarComponent } from '../car/car.component';

@Component({
  selector: 'app-top-scores',
  standalone: true,
  imports: [TopScoresRowComponent, CarComponent],
  templateUrl: './top-scores.component.html',
  styleUrl: './top-scores.component.scss',
})
export class TopScoresComponent implements OnInit {
  winners: any = [];
  trackHeight = 40;

  constructor(private winnerService: WinnerService) {}
  async ngOnInit() {
    this.winners = await this.winnerService.getAll();
    console.log('winners: ', this.winners);
  }
}
