import { IPokemonRepository } from '../../Domain/Repositories/IPokemonRepository';
import { Pokemon } from '../../Domain/Entities/Pokemon';

export class PokemonRepository implements IPokemonRepository {
  public async getPokemons(offset: number, limit: number): Promise<Pokemon[]> {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.results.map((item: any) => {
        const pokemon = new Pokemon();
        pokemon.nombre = item.name;
        pokemon.url = item.url;
        return pokemon;
      });
    } catch (error) {
      console.error('Error fetching pokemons:', error);
      throw error;
    }
  }
}