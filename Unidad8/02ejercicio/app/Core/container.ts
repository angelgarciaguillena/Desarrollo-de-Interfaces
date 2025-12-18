import { PokemonRepository } from '../Data/Repositories/PokemonRepository';
import { PokemonUseCase } from '../Domain/UseCases/PokemonUseCase';
import { IPokemonRepository } from '../Domain/Repositories/IPokemonRepository';
import { IPokemonUseCase } from '../Domain/Interfaces/IPokemonUseCase';

class Container {
  private static _pokemonRepository: IPokemonRepository;
  private static _pokemonUseCase: IPokemonUseCase;

  public static get pokemonRepository(): IPokemonRepository {
    if (!this._pokemonRepository) {
      this._pokemonRepository = new PokemonRepository();
    }
    return this._pokemonRepository;
  }

  public static get pokemonUseCase(): IPokemonUseCase {
    if (!this._pokemonUseCase) {
      this._pokemonUseCase = new PokemonUseCase(this.pokemonRepository);
    }
    return this._pokemonUseCase;
  }
}

export default Container;