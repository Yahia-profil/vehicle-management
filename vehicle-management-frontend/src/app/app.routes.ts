import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { AssignmentsComponent } from './pages/assignments/assignments.component';
import { ArretsComponent } from './pages/arrets/arrets.component';
import { VehicleStatisticsComponent } from './pages/vehicles/vehicle-statistics.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'assignments', component: AssignmentsComponent },
  { path: 'arrets', component: ArretsComponent },
  { path: 'vehicles/statistics', component: VehicleStatisticsComponent },
];
