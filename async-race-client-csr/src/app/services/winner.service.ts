import { Injectable } from '@angular/core';
import config from '../config';

import { Winner } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class WinnerService {
  async getAll() {
    const response_cars = await fetch(config.garageUrl);
    const cars = await response_cars.json();
    const response = await fetch(config.winnersUrl);
    const winners = await response.json();

    const upgWinners = winners.map((winner: any) => {
      const car = cars.find((_car: any) => _car.id === winner.id);
      return { ...winner, car };
    });

    return upgWinners;
  }

  async updateWinnersTable(winner: Winner) {
    const oldWinnerDate = await this.getWinner(winner.id);
    if (oldWinnerDate && oldWinnerDate.id) {
      const newWins = oldWinnerDate.wins + 1;
      const newTime =
        oldWinnerDate.time > winner.time ? winner.time : oldWinnerDate.time;

      await this.update({ id: winner.id, wins: newWins, time: newTime });
    } else {
      await this.create({ id: winner.id, wins: 1, time: winner.time });
    }
  }

  async getWinner(id: number) {
    const response = await fetch(config.winnersUrl + id);
    return await response.json();
  }

  async create(winner: Winner) {
    const response = await fetch(config.winnersUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
  }

  async update(newWinnerData: Winner) {
    const response = await fetch(config.winnersUrl + newWinnerData.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wins: newWinnerData.wins,
        time: newWinnerData.time,
      }),
    });
  }

  async delete(id: number) {
    const response = await fetch(config.winnersUrl + id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
