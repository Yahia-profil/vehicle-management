import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArretService, Arret } from '../../services/arret.service';
import { EmployeeService, Employee } from '../../services/employee.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { KeycloakService } from '../../keycloak.service';

@Component({
  selector: 'app-arrets',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatInputModule,
    MatIconModule, MatSnackBarModule, MatDialogModule, ReactiveFormsModule, MatSelectModule
  ],
  templateUrl: './arrets.html',
  styleUrls: ['./arrets.css']
})
export class ArretsComponent implements OnInit {
  arrets: Arret[] = [];
  employees: Employee[] = [];
  chefEscales: Employee[] = [];
  chefEquipes: Employee[] = [];
  displayedColumns = ['id', 'chefEscale', 'chefEquipe', 'type', 'description', 'shift', 'startTime', 'endTime', 'actions'];
  form: FormGroup;

  constructor(
    private arretService: ArretService,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public kc: KeycloakService // Inject KeycloakService
  ) {
    this.form = this.fb.group({
      id: [null],
      chefEscale: [null, Validators.required],
      chefEquipe: [null, Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      shift: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadArrets();
    this.employeeService.getAll().subscribe(data => {
      this.employees = data;
      this.updateRoleLists();
    });
    this.form.get('shift')?.valueChanges.subscribe(() => this.updateRoleLists());
  }

  updateRoleLists() {
    const shift = this.form.get('shift')?.value;
    this.chefEscales = this.employees.filter(e => e.role === 'CHEF_ESCALE' && e.shift === shift);
    this.chefEquipes = this.employees.filter(e => e.role === 'CHEF_EQUIPE' && e.shift === shift);
  }

  loadArrets() {
    this.arretService.getAll().subscribe(data => this.arrets = data);
  }

  submit() {
    const shift = this.form.value.shift;
    const startTime = this.form.value.startTime;
    const endTime = this.form.value.endTime;
    let valid = true;
    let shiftStart = '';
    let shiftEnd = '';
    if (shift === 'SHIFT_1') { shiftStart = '07:00'; shiftEnd = '15:00'; }
    else if (shift === 'SHIFT_2') { shiftStart = '15:00'; shiftEnd = '23:00'; }
    else if (shift === 'SHIFT_3') { shiftStart = '23:00'; shiftEnd = '07:00'; }

    // Helper to compare times (HH:mm)
    function isTimeInRange(time: string, start: string, end: string, overnight = false) {
      const t = time.split(':').map(Number);
      const s = start.split(':').map(Number);
      const e = end.split(':').map(Number);
      const tMin = t[0] * 60 + t[1];
      const sMin = s[0] * 60 + s[1];
      const eMin = e[0] * 60 + e[1];
      if (!overnight) return tMin >= sMin && tMin <= eMin;
      // Overnight shift (23:00-07:00)
      return tMin >= sMin || tMin <= eMin;
    }

    if (shift === 'SHIFT_3') {
      valid = isTimeInRange(startTime, shiftStart, shiftEnd, true) && isTimeInRange(endTime, shiftStart, shiftEnd, true);
    } else {
      valid = isTimeInRange(startTime, shiftStart, shiftEnd) && isTimeInRange(endTime, shiftStart, shiftEnd);
    }
    if (!valid) {
      this.snackBar.open('Start and end times must be within the selected shift!', 'Close', { duration: 3000 });
      return;
    }
    if (this.form.value.id) {
      this.arretService.update(this.form.value).subscribe(() => {
        this.loadArrets();
        this.form.reset();
        this.snackBar.open('Arret updated!', 'Close', { duration: 2000 });
      });
    } else {
      this.arretService.add(this.form.value).subscribe(() => {
        this.loadArrets();
        this.form.reset();
        this.snackBar.open('Arret added!', 'Close', { duration: 2000 });
      });
    }
  }

  edit(arret: Arret) {
    this.form.patchValue(arret);
  }

  delete(id: number) {
    this.arretService.delete(id).subscribe(() => {
      this.loadArrets();
      this.snackBar.open('Arret deleted!', 'Close', { duration: 2000 });
    });
  }

  isLoggedIn(): boolean {
    return this.kc.isLoggedIn();
  }

  login() {
    this.kc.login();
  }

  logout() {
    this.kc.logout();
  }

  hasChefDEscaleRole(): boolean {
    return this.kc.hasRole('chef_d_escale');
  }
} 