import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleService, Vehicle } from '../../services/vehicle.service';
import { DepartmentService, Department } from '../../services/department.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteConfirmDialog } from '../shared/delete-confirm-dialog.component';
import { SelectItemDialogComponent } from '../shared/select-item-dialog.component';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatInputModule,
    MatIconModule, MatSnackBarModule, MatDialogModule, ReactiveFormsModule, DeleteConfirmDialog, SelectItemDialogComponent
  ],
  templateUrl: './vehicles.html',
  styleUrls: ['./vehicles.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  departments: Department[] = [];
  displayedColumns = ['id', 'licensePlate', 'barcode', 'department', 'actions'];
  form: FormGroup;

  constructor(
    private vehicleService: VehicleService,
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      id: [null],
      licensePlate: ['', Validators.required],
      barcode: ['', Validators.required],
      department: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.loadVehicles();
    this.departmentService.getAll().subscribe(data => this.departments = data);
  }

  loadVehicles() {
    this.vehicleService.getAll().subscribe(data => this.vehicles = data);
  }

  openSelectDialog() {
    const dialogRef = this.dialog.open(SelectItemDialogComponent, {
      data: { items: this.departments, displayProp: 'name', label: 'Department' },
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(selected => {
      if (selected) {
        this.form.get('department')?.setValue(selected);
      }
    });
  }

  submit() {
    if (this.form.value.id) {
      this.vehicleService.update(this.form.value).subscribe(() => {
        this.loadVehicles();
        this.form.reset();
        this.snackBar.open('Vehicle updated!', 'Close', { duration: 2000 });
      });
    } else {
      this.vehicleService.add(this.form.value).subscribe(() => {
        this.loadVehicles();
        this.form.reset();
        this.snackBar.open('Vehicle added!', 'Close', { duration: 2000 });
      });
    }
  }

  edit(vehicle: Vehicle) {
    this.form.patchValue(vehicle);
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vehicleService.delete(id).subscribe(() => {
          this.loadVehicles();
          this.snackBar.open('Vehicle deleted!', 'Close', { duration: 2000 });
        });
      }
    });
  }
}