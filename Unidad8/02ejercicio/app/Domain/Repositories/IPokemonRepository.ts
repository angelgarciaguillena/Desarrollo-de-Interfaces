import { Pokemon } from '../Entities/Pokemon';

export interface IPokemonRepository {
  getPokemons(offset: number, limit: number): Promise<Pokemon[]>;
}