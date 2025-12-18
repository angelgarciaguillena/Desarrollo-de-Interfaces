export class Pokemon {
  private _nombre: string;
  private _url: string;

  constructor(nombre: string = '', url: string = '') {
    this._nombre = nombre;
    this._url = url;
  }

  public get nombre(): string {
    return this._nombre;
  }

  public set nombre(value: string) {
    this._nombre = value;
  }

  public get url(): string {
    return this._url;
  }

  public set url(value: string) {
    this._url = value;
  }
}