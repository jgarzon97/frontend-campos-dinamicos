import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Persona, PersonaService } from './services/persona/persona.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [PersonaService]
})

export class AppComponent {
  personas: Persona[] = [];
  persona: Persona = {
    id: 0,
    nombre: '',
    apellido: '',
    edad: 0,
    correo: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: ''
  };

  newField = { name: '', type: '' };

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.loadPersonas();
  }

  loadPersonas(): void {
    this.personaService.getPersonas().subscribe(
      (data: Persona[]) => {
        this.personas = data;
      },
      (error) => {
        console.error('Error al obtener personas', error);
      }
    );
  }

  onSubmit() {
    this.personaService.addPersona(this.persona).subscribe(
      (newPersona) => {
        console.log('Persona agregada:', newPersona);
        alert('Persona agregada exitosamente');
        this.persona = {
          id: 0,
          nombre: '',
          apellido: '',
          edad: 0,
          correo: '',
          telefono: '',
          direccion: '',
          fecha_nacimiento: '',
        }; this.loadPersonas();
      },
      (error) => {
        console.error('Error al agregar persona', error);
      }
    );
  }

  onAddField() {
    this.personaService.addField(this.newField).subscribe(
      response => {
        console.log('Campo agregado:', response);
        alert('Campo agregado exitosamente');
        // Actualizar la UI si es necesario
      },
      error => {
        console.error('Error al agregar campo', error);
      }
    );
  }
}
