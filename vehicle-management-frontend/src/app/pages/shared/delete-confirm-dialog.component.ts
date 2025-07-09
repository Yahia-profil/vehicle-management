import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'delete-confirm-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Confirm Delete</h2>
    <mat-dialog-content>Are you sure you want to delete this item?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>No</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Yes</button>
    </mat-dialog-actions>
  `,
  imports: [MatButtonModule, MatDialogModule]
})
export class DeleteConfirmDialog {}
