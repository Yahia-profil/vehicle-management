import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Arret {
  id?: number;
  chefEscale: any;
  chefEquipe: any;
  type: 'RETARD_ACOSTAGE' | 'PANNE_VOITURE' | 'LA_MARREE' | 'MAUVAIS_TEMPS' | 'RETARD_SAISISSAGE_DESAISISSAGE' | 'DEHALLAGE' | 'PROBLEME_RAMPE' | 'ARRET_PAR_BORD' | 'AUTRE';
  description: string;
  shift: 'SHIFT_1' | 'SHIFT_2' | 'SHIFT_3';
  startTime: string;
  endTime: string;
}

@Injectable({ providedIn: 'root' })
export class ArretService {
  private apiUrl = 'http://localhost:8081/api/arrets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Arret[]> {
    return this.http.get<Arret[]>(this.apiUrl);
  }

  add(arret: Arret): Observable<Arret> {
    return this.http.post<Arret>(this.apiUrl, arret);
  }

  update(arret: Arret): Observable<Arret> {
    return this.http.put<Arret>(`${this.apiUrl}/${arret.id}`, arret);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 