import { Persona } from '../../Entities/Persona';

export interface IPersonaRepository {
  getPersonas(): Promise<Persona[]>;
  getPersona(): Promise<Persona>
  agregarPersona(): Number;
  actualizarPersona(): Number;
  borrarPersona(): Number;
}