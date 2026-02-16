// import { Routes } from '@angular/router';

// export const routes: Routes = [];
import { Routes } from '@angular/router';
import { AddPartComponent } from './pages/add-part/add-part';
import { DashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'add-part', component: AddPartComponent },
  { path: 'dashboard', component: DashboardComponent }
];
