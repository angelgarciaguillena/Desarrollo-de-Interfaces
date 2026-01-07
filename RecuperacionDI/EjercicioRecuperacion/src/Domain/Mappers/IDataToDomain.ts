import { Persona } from '../Entities/Persona';
import { PersonaDTO } from '../DTOs/PersonaDTO';

export interface IDataToDomain {
  transformar(persona: Persona): PersonaDTO;
}