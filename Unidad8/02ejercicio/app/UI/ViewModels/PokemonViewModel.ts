// UI/ViewModels/PokemonViewModel.ts

import { makeObservable, observable, action } from 'mobx';
import { IPokemonUseCase } from '../../Domain/Interfaces/IPokemonUseCase';
import { PokemonConNombre } from '../../Domain/DTOs/PokemonConNombre';

export class PokemonViewModel {
  private readonly _pokemonUseCase: IPokemonUseCase;

  public pokemons: PokemonConNombre[] = [];
  public loading: boolean = false;
  public error: string = '';
  public offset: number = 0;
  public readonly limit: number = 20;

  constructor(pokemonUseCase: IPokemonUseCase) {
    this._pokemonUseCase = pokemonUseCase;

    makeObservable(this, {
      pokemons: observable,
      loading: observable,
      error: observable,
      offset: observable,
      obtenerPokemons: action,
    });
  }

  public async obtenerPokemons(): Promise<void> {
    this.loading = true;
    this.error = '';

    try {
      const pokemonsObtenidos = await this._pokemonUseCase.getPokemons(
        this.offset,
        this.limit
      );
      this.pokemons = pokemonsObtenidos;
      this.offset += this.limit;
    } catch (error) {
      this.error = 'Error al cargar los pokémons';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}