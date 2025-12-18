import { Pokemon } from '../Entities/Pokemon';

export class PokemonConNombre {
  private readonly _nombre: string;

  constructor(pokemon: Pokemon) {
    this._nombre = pokemon.nombre;
  }

  public get nombre(): string {
    return this._nombre;
  }
}