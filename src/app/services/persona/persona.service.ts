import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Persona {
  id?: number;
  nombre: string;
  apellido: string;
  edad: number;
  correo: string;
  telefono: string;
  direccion: string;
  fecha_nacimiento: string;
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

  addField(newField: { name: string, type: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-field`, newField);
  }
}
