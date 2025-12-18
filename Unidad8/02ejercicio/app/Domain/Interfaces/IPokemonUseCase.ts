import { PokemonConNombre } from '../DTOs/PokemonConNombre';

export interface IPokemonUseCase {
  getPokemons(offset: number, limit: number): Promise<PokemonConNombre[]>;
}