import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from './vehicle.service';
import { Pointeur } from './pointeur.service';

export interface Assignment {
  id?: number;
  vehicle: Vehicle;
  pointeur: Pointeur;
  assignmentDate: string; // ISO string, e.g. "2024-07-08"
}

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private apiUrl = 'http://localhost:8080/api/assignments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.apiUrl);
  }

  getById(id: number): Observable<Assignment> {
    return this.http.get<Assignment>(`${this.apiUrl}/${id}`);
  }

  add(assignment: Assignment): Observable<Assignment> {
    return this.http.post<Assignment>(this.apiUrl, assignment);
  }

  update(assignment: Assignment): Observable<Assignment> {
    return this.http.put<Assignment>(`${this.apiUrl}/${assignment.id}`, assignment);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}