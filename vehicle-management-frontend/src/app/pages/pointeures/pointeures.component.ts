import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointeurService, Pointeur } from '../../services/pointeur.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteConfirmDialog } from '../shared/delete-confirm-dialog.component';

@Component({
  selector: 'app-pointeures',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatInputModule,
    MatIconModule, MatSnackBarModule, MatDialogModule, ReactiveFormsModule, DeleteConfirmDialog
  ],
  templateUrl: './pointeures.html',
  styleUrls: ['./pointeures.css']
})
export class PointeuresComponent implements OnInit {
  pointeures: Pointeur[] = [];
  displayedColumns = ['id', 'name', 'actions'];
  form: FormGroup;

  constructor(
    private pointeurService: PointeurService,
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
    this.loadPointeures();
  }

  loadPointeures() {
    this.pointeurService.getAll().subscribe(data => this.pointeures = data);
  }

  submit() {
    if (this.form.value.id) {
      this.pointeurService.update(this.form.value).subscribe(() => {
        this.loadPointeures();
        this.form.reset();
        this.snackBar.open('Pointeur updated!', 'Close', { duration: 2000 });
      });
    } else {
      this.pointeurService.add(this.form.value).subscribe(() => {
        this.loadPointeures();
        this.form.reset();
        this.snackBar.open('Pointeur added!', 'Close', { duration: 2000 });
      });
    }
  }

  edit(pointeur: Pointeur) {
    this.form.patchValue(pointeur);
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pointeurService.delete(id).subscribe(() => {
          this.loadPointeures();
          this.snackBar.open('Pointeur deleted!', 'Close', { duration: 2000 });
        });
      }
    });
  }
}