import { PersonaConListadoDepartamento } from '../DTOs/PersonaConListadoDepartamento';
import { PersonaConDepartamentoSeleccionado } from '../DTOs/PersonaConDepartamentoSeleccionado';

export interface IPersonaUseCase {
  getPersonas(): Promise<PersonaConListadoDepartamento[]>;
  comprobarAciertos(personas: PersonaConDepartamentoSeleccionado[]): number;
}