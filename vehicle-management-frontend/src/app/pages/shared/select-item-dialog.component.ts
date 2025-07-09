import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'select-item-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatListModule, MatInputModule, FormsModule],
  template: `
    <h2 mat-dialog-title>Select {{ data.label }}</h2>
    <mat-dialog-content>
      <mat-form-field style="width: 100%;">
        <mat-label>Search</mat-label>
        <input matInput [(ngModel)]="searchText" placeholder="Type to filter...">
      </mat-form-field>
      <mat-nav-list style="max-height: 300px; overflow-y: auto;">
        <a mat-list-item *ngFor="let item of filteredItems()" (click)="select(item)">
          {{ item[data.displayProp] }}
        </a>
      </mat-nav-list>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
    </mat-dialog-actions>
  `
})
export class SelectItemDialogComponent {
  searchText = '';
  constructor(
    public dialogRef: MatDialogRef<SelectItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { items: any[], displayProp: string, label: string }
  ) {}

  filteredItems() {
    if (!this.searchText) return this.data.items;
    return this.data.items.filter(item =>
      (item[this.data.displayProp] || '').toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  select(item: any) {
    this.dialogRef.close(item);
  }
} 