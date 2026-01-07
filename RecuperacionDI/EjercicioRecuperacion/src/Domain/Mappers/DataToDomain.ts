import { Persona } from '../Entities/Persona';
import { PersonaDTO } from '../DTOs/PersonaDTO';
import { IDataToDomain } from './IDataToDomain';
import { injectable } from 'inversify';

@injectable()
export class DataToDomain implements IDataToDomain {
    
  public transformar(persona: Persona): PersonaDTO {
    return new PersonaDTO(persona.id, persona.nombre, persona.apellidos, persona.idDepartamento);
  }
}