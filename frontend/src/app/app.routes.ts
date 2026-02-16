import { Routes } from '@angular/router';
import { AddPartComponent } from './pages/add-part/add-part';
import { DashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'add-part', component: AddPartComponent },
  { path: 'dashboard', component: DashboardComponent }
];
