import { Persona } from "../../Entities/Persona";
import { PersonaDTO } from "../../DTOs/PersonaDTO";

export interface IPersonaUseCase {
  obtenerPersonas(): Promise<PersonaDTO[]>;
  agregarPersona(persona: Persona): Promise<number>;
  actualizarPersona(persona: Persona): Promise<number>;
  eliminarPersona(idPersona: number): Promise<number>;
}