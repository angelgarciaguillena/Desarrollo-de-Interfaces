import { PersonaDTO } from '../../Domain/DTOs/PersonaDTO';
import { Departamento } from '../../Domain/Entities/Departamento';

export class PersonaConColor {
  private _persona: PersonaDTO;
  private _departamentos: Departamento[];
  private _colorDepartamento: string;

  public constructor(persona: PersonaDTO, departamentos: Departamento[], colorDepartamento: string) {
    this._persona = persona;
    this._departamentos = departamentos;
    this._colorDepartamento = colorDepartamento;
  }

  public get persona(): PersonaDTO { 
    return this._persona; 
  }
  
  public get departamentos(): Departamento[] { 
    return this._departamentos; 
  }

  public get colorDepartamento(): string { 
    return this._colorDepartamento; 
  }
}