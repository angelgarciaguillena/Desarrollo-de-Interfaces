import { injectable } from "inversify";
import { IDomainToUI } from "./IDomainToUI";
import { PersonaDTO } from "../../Domain/DTOs/PersonaDTO";
import { PersonaConIcono } from "../Models/PersonaConIcono";

@injectable()
export class DomainToUI implements IDomainToUI {
  transformar(persona: PersonaDTO): PersonaConIcono {
    const iniciales = this.calcularIniciales(persona.nombre, persona.apellidos);

    return {
      ...persona,
      iniciales,
    };
  }

  private calcularIniciales(nombre: string, apellidos: string): string {
    const inicialNombre = nombre.charAt(0).toUpperCase();
    const inicialApellido = apellidos.charAt(0).toUpperCase();
    return `${inicialNombre}${inicialApellido}`;
  }
}