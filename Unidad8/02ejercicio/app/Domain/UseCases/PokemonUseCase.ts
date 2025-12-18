import { IPokemonUseCase } from '../Interfaces/IPokemonUseCase';
import { IPokemonRepository } from '../Repositories/IPokemonRepository';
import { PokemonConNombre } from '../DTOs/PokemonConNombre';

export class PokemonUseCase implements IPokemonUseCase {
  private readonly _pokemonRepository: IPokemonRepository;

  constructor(pokemonRepository: IPokemonRepository) {
    this._pokemonRepository = pokemonRepository;
  }

  public async getPokemons(offset: number, limit: number): Promise<PokemonConNombre[]> {
    const pokemons = await this._pokemonRepository.getPokemons(offset, limit);
    return pokemons.map(pokemon => new PokemonConNombre(pokemon));
  }
}