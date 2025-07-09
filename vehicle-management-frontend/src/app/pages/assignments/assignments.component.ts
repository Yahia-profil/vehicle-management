import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentService, Assignment } from '../../services/assignment.service';
import { VehicleService, Vehicle } from '../../services/vehicle.service';
import { PointeurService, Pointeur } from '../../services/pointeur.service';
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
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatInputModule,
    MatIconModule, MatSnackBarModule, MatDialogModule, ReactiveFormsModule, DeleteConfirmDialog, SelectItemDialogComponent
  ],
  templateUrl: './assignments.html',
  styleUrls: ['./assignments.css']
})
export class AssignmentsComponent implements OnInit {
  assignments: Assignment[] = [];
  vehicles: Vehicle[] = [];
  pointeures: Pointeur[] = [];
  departments: Department[] = [];
  displayedColumns = ['id', 'vehicle', 'pointeur', 'department', 'assignmentDate', 'actions'];
  form: FormGroup;

  constructor(
    private assignmentService: AssignmentService,
    private vehicleService: VehicleService,
    private pointeurService: PointeurService,
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      id: [null],
      vehicle: [null, Validators.required],
      pointeur: [null, Validators.required],
      department: [null, Validators.required],
      assignmentDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadAssignments();
    this.vehicleService.getAll().subscribe(data => this.vehicles = data);
    this.pointeurService.getAll().subscribe(data => this.pointeures = data);
    this.departmentService.getAll().subscribe(data => this.departments = data);
  }

  loadAssignments() {
    this.assignmentService.getAll().subscribe(data => this.assignments = data);
  }

  openSelectDialog(type: 'vehicle' | 'pointeur' | 'department') {
    let items: any[] = [];
    let displayProp = '';
    let label = '';
    if (type === 'vehicle') {
      items = this.vehicles;
      displayProp = 'licensePlate';
      label = 'Vehicle';
    } else if (type === 'pointeur') {
      items = this.pointeures;
      displayProp = 'name';
      label = 'Pointeur';
    } else if (type === 'department') {
      items = this.departments;
      displayProp = 'name';
      label = 'Department';
    }
    const dialogRef = this.dialog.open(SelectItemDialogComponent, {
      data: { items, displayProp, label },
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(selected => {
      if (selected) {
        this.form.get(type)?.setValue(selected);
      }
    });
  }

  submit() {
    if (this.form.value.id) {
      this.assignmentService.update(this.form.value).subscribe(() => {
        this.loadAssignments();
        this.form.reset();
        this.snackBar.open('Assignment updated!', 'Close', { duration: 2000 });
      });
    } else {
      this.assignmentService.add(this.form.value).subscribe(() => {
        this.loadAssignments();
        this.form.reset();
        this.snackBar.open('Assignment added!', 'Close', { duration: 2000 });
      });
    }
  }

  edit(assignment: Assignment) {
    this.form.patchValue(assignment);
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assignmentService.delete(id).subscribe(() => {
          this.loadAssignments();
          this.snackBar.open('Assignment deleted!', 'Close', { duration: 2000 });
        });
      }
    });
  }
}
