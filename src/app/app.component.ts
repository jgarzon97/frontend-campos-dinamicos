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
  columnas: string[] = [];
  datos: Persona[] = [];
  persona: any = {};
  newField = { name: '', type: '' };
  isEditing: boolean = false;

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.loadPersonas();
  }

  loadPersonas(): void {
    this.personaService.getPersonas().subscribe(
      (data: any[]) => {
        if (data.length > 0) {
          this.columnas = Object.keys(data[0]);
          this.datos = data;
        }
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
  }

  onSubmit() {
    if (this.isEditing) {
      // Si está editando, llama al método para actualizar la persona
      this.personaService.updatePersona(this.persona).subscribe(
        (updatedPersona) => {
          console.log('Persona actualizada:', updatedPersona);
          alert('Persona actualizada exitosamente');
          this.resetForm();
          this.loadPersonas();
        },
        (error) => {
          console.error('Error al actualizar persona', error);
        }
      );
    } else {
      // Si no está editando, agrega una nueva persona
      this.personaService.addPersona(this.persona).subscribe(
        (newPersona) => {
          console.log('Persona agregada:', newPersona);
          alert('Persona agregada exitosamente');
          this.resetForm();
          this.loadPersonas();
        },
        (error) => {
          console.error('Error al agregar persona', error);
        }
      );
    }
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

  onEdit(persona: Persona) {
    this.persona = { ...persona };
    this.isEditing = true;
  }

  resetForm() {
    this.persona = this.columnas.reduce((acc, columna) => {
      acc[columna] = '';
      return acc;
    }, {} as Persona);
    this.isEditing = false;
  }

  onDelete(persona: Persona, event: Event) {
    event.stopPropagation();

    this.persona = { ...persona };
    this.isEditing = false;

    if (confirm('¿Estás seguro de que deseas eliminar esta persona?')) {
      this.personaService.deletePersona(this.persona.id).subscribe(
        response => {
          console.log('Persona eliminada:', response);
          alert('Persona eliminada exitosamente');
          this.loadPersonas();
        },
        error => {
          console.error('Error al eliminar persona', error);
        }
      );
    }
  }

  onCancel() {
    this.resetForm();
  }

  getInputType(field: string): string {
    switch (field) {
      case 'edad':
        return 'number';
      case 'fecha_nacimiento':
        return 'date';
      default:
        return 'text';
    }
  }
}
