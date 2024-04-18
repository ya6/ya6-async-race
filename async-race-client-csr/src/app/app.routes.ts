import { Routes } from '@angular/router';
import { GarageComponent } from './components/garage/garage.component';
import { TopScoresComponent } from './components/top-scores/top-scores.component';

export const routes: Routes = [
  {
    path: '',
    component: GarageComponent,
  },
  {
    path: 'topscores',
    component: TopScoresComponent,
  },
];
