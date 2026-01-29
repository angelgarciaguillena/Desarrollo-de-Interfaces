import { Persona } from "../../Entities/Persona";

export interface IPersonaApi {
  getPersonas(): Promise<Persona[]>;
  getPersona(idPersona: number): Promise<Persona>;
  agregarPersona(persona: Persona): Promise<number>;
  actualizarPersona(persona: Persona): Promise<number>;
  eliminarPersona(idPersona: number): Promise<number>;
}