import { PersonaDTO } from "./PersonaDTO";
import { Departamento } from "../Entities/Departamento";

export class PersonaConDepartamentoSeleccionado {
  private _persona: PersonaDTO;
  private _departamento: Departamento;

  public constructor(persona: PersonaDTO, departamento: Departamento) {
    this._persona = persona;
    this._departamento = departamento;
  }

  public get persona(): PersonaDTO { 
    return this._persona; 
  }

  public get departamento(): Departamento { 
    return this._departamento; 
  }
}