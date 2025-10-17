import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService, Employee } from '../../services/employee.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteConfirmDialog } from '../shared/delete-confirm-dialog.component';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatInputModule,
    MatIconModule, MatSnackBarModule, MatDialogModule, ReactiveFormsModule, MatSelectModule
  ],
  templateUrl: './employees.html',
  styleUrls: ['./employees.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns = ['id', 'name', 'role', 'shift', 'actions'];
  form: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      role: ['', Validators.required],
      shift: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAll().subscribe(data => this.employees = data);
  }

  submit() {
    const name = this.form.value.name?.trim().toLowerCase();
    const id = this.form.value.id;
    if (this.employees.some(e => e.name.trim().toLowerCase() === name && (!id || e.id !== id))) {
      this.snackBar.open('Employee with this name already exists!', 'Close', { duration: 2000 });
      return;
    }
    if (id) {
      this.employeeService.update(this.form.value).subscribe(() => {
        this.loadEmployees();
        this.form.reset();
        this.snackBar.open('Employee updated!', 'Close', { duration: 2000 });
      });
    } else {
      this.employeeService.add(this.form.value).subscribe(() => {
        this.loadEmployees();
        this.form.reset();
        this.snackBar.open('Employee added!', 'Close', { duration: 2000 });
      });
    }
  }

  edit(employee: Employee) {
    this.form.patchValue(employee);
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.delete(id).subscribe(() => {
          this.loadEmployees();
          this.snackBar.open('Employee deleted!', 'Close', { duration: 2000 });
        });
      }
    });
  }
}