import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PointeuresComponent } from './pages/pointeures/pointeures.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { AssignmentsComponent } from './pages/assignments/assignments.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pointeures', component: PointeuresComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'assignments', component: AssignmentsComponent },
];
