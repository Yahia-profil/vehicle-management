import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pointeur {
  id?: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PointeurService {
  private apiUrl = 'https://vehicle-management-production-0aa4.up.railway.app/api/pointeures';

  constructor(private http: HttpClient) {}

  // Get all pointeures
  getAll(): Observable<Pointeur[]> {
    return this.http.get<Pointeur[]>(this.apiUrl);
  }

  // Get a single pointeur by ID
  getById(id: number): Observable<Pointeur> {
    return this.http.get<Pointeur>(`${this.apiUrl}/${id}`);
  }

  // Add a new pointeur
  add(pointeur: Pointeur): Observable<Pointeur> {
    return this.http.post<Pointeur>(this.apiUrl, pointeur);
  }

  // Update an existing pointeur
  update(pointeur: Pointeur): Observable<Pointeur> {
    return this.http.put<Pointeur>(`${this.apiUrl}/${pointeur.id}`, pointeur);
  }

  // Delete a pointeur by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}