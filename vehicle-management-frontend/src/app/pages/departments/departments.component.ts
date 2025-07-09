import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentService, Department } from '../../services/department.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteConfirmDialog } from '../shared/delete-confirm-dialog.component';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatInputModule,
    MatIconModule, MatSnackBarModule, MatDialogModule, ReactiveFormsModule, DeleteConfirmDialog
  ],
  templateUrl: './departments.html',
  styleUrls: ['./departments.css']
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];
  displayedColumns = ['id', 'name', 'actions'];
  form: FormGroup;

  constructor(
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe(data => this.departments = data);
  }

  submit() {
    if (this.form.value.id) {
      this.departmentService.update(this.form.value).subscribe(() => {
        this.loadDepartments();
        this.form.reset();
        this.snackBar.open('Department updated!', 'Close', { duration: 2000 });
      });
    } else {
      this.departmentService.add(this.form.value).subscribe(() => {
        this.loadDepartments();
        this.form.reset();
        this.snackBar.open('Department added!', 'Close', { duration: 2000 });
      });
    }
  }

  edit(department: Department) {
    this.form.patchValue(department);
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.departmentService.delete(id).subscribe(() => {
          this.loadDepartments();
          this.snackBar.open('Department deleted!', 'Close', { duration: 2000 });
        });
      }
    });
  }
}