import { Departamento } from '../Entities/Departamento';
import { PersonaDTO } from './PersonaDTO';

export class PersonaConListadoDepartamento {
  private _persona: PersonaDTO;
  private _listadoDepartamentos: Departamento[];

  public constructor(persona: PersonaDTO, listadoDepartamentos: Departamento[]) {
    this._persona = persona;
    this._listadoDepartamentos = listadoDepartamentos;
  }

  public get persona(): PersonaDTO { 
    return this._persona; 
  }

  public get listadoDepartamentos(): Departamento[] { 
    return this._listadoDepartamentos; 
  }
}