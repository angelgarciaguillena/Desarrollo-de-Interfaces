export class PersonaDTO {
  private _id: number;
  private _nombre: string;
  private _apellidos: string;
  private _idDepartamento: number;

  public constructor(id: number, nombre: string, apellidos: string, idDepartamento: number) {
    this._id = id;
    this._nombre = nombre;
    this._apellidos = apellidos;
    this._idDepartamento = idDepartamento;
  }

  public get id(): number { 
    return this._id; 
  }

  public get nombre(): string { 
    return this._nombre; 
  }

  public get apellidos(): string { 
    return this._apellidos; 
  }

  public get idDepartamento(): number { 
    return this._idDepartamento; 
  }
}