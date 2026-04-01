import { Routes } from '@angular/router';
import { Room } from './room/room';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'room/:roomCode', component: Room },
];
