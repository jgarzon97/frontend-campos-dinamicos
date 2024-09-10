import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Persona {
  id?: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  private apiUrl = 'http://localhost:3000/personas';

  constructor(private http: HttpClient) { }

  addPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.apiUrl, persona);
  }

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }

  updatePersona(persona: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${persona.id}`, persona);
  }

  deletePersona(id?: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addField(newField: { name: string, type: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-field`, newField);
  }
}
