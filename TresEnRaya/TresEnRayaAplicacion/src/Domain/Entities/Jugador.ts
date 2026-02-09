export class Jugador {
  private _connectionId: string;
  private _simbolo: string;
  private _nombre: string;

  constructor(connectionId: string, simbolo: string, nombre: string) {
    this._connectionId = connectionId;
    this._simbolo = simbolo;
    this._nombre = nombre;
  }

  public get connectionId(): string {
    return this._connectionId;
  }

  public set connectionId(value: string) {
    this._connectionId = value;
  }

  public get simbolo(): string {
    return this._simbolo;
  }

  public set simbolo(value: string) {
    this._simbolo = value;
  }

  public get nombre(): string {
    return this._nombre;
  }

  public set nombre(value: string) {
    this._nombre = value;
  }

  public esValido(): boolean {
    return (
      this.connectionId.length > 0 &&
      (this.simbolo === "X" || this.simbolo === "O")
    );
  }

  public static fromJSON(json: any): Jugador {
    return new Jugador(
      json.connectionId || "",
      json.simbolo || "",
      json.nombre || "Jugador"
    );
  }

  public toJSON(): any {
    return {
      connectionId: this.connectionId,
      simbolo: this.simbolo,
      nombre: this.nombre,
    };
  }
}