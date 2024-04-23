import { Component, OnInit } from '@angular/core';
import { TopScoresRowComponent } from '../top-scores-row/top-scores-row.component';
import { WinnerService } from '../../services/winner.service';
import { CarComponent } from '../car/car.component';
import { CommonModule } from '@angular/common';
import { UpgadedWinner } from '../../interfaces/interfaces';
import config from '../../config';

@Component({
  selector: 'app-top-scores',
  standalone: true,
  imports: [TopScoresRowComponent, CarComponent, CommonModule],
  templateUrl: './top-scores.component.html',
  styleUrl: './top-scores.component.scss',
})
export class TopScoresComponent implements OnInit {
  winners: UpgadedWinner[] = [];
  trackHeight = 40;

  pagination = {
    firstPage: 1,
    currentPage: config.startPage,
    pageSize: config.winners,
    start: 0,
    end: config.winners,
    lastPage: 10,
  };

  constructor(private winnerService: WinnerService) {}
  async ngOnInit() {
    this.winners = await this.winnerService.getAll();
    this.setLastPage();
  }

  handleWinsSort() {
    this.winners.sort((a: UpgadedWinner, b: UpgadedWinner) => {
      return Number(b.wins) - Number(a.wins);
    });
  }

  handleTimeSort() {
    this.winners.sort((a: UpgadedWinner, b: UpgadedWinner) => {
      return Number(a.time) - Number(b.time);
    });
  }

  setLastPage() {
    this.pagination.lastPage = Math.ceil(
      this.winners.length / this.pagination.pageSize
    );
    if (this.pagination.lastPage === 0) {
      this.pagination.lastPage = 1;
    }
  }

  prevPage() {
    this.pagination.currentPage -= 1;
    this.pagination.start -= this.pagination.pageSize;
    this.pagination.end -= this.pagination.pageSize;
  }

  nextPage() {
    this.pagination.currentPage += 1;
    this.pagination.start += this.pagination.pageSize;
    this.pagination.end += this.pagination.pageSize;
  }
}
