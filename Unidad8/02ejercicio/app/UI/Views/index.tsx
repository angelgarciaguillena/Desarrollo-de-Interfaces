import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { PokemonViewModel } from '../ViewModels/PokemonViewModel';
import Container from '../../Core/container';

const Index = observer(() => {
  const [viewModel] = React.useState(
    () => new PokemonViewModel(Container.pokemonUseCase)
  );

  const handleCargarPokemons = () => {
    viewModel.obtenerPokemons();
  };

  const renderPokemon = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.pokemonItem}>
      <Text style={styles.pokemonNumber}>{index + 1 + viewModel.offset - viewModel.limit}</Text>
      <Text style={styles.pokemonName}>{item.nombre}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>

      <TouchableOpacity
        style={[styles.button, viewModel.loading && styles.buttonDisabled]}
        onPress={handleCargarPokemons}
        disabled={viewModel.loading}
      >
        <Text style={styles.buttonText}>
          {viewModel.loading ? 'Cargando...' : 'Cargar Pokémons'}
        </Text>
      </TouchableOpacity>

      {viewModel.error ? (
        <Text style={styles.errorText}>{viewModel.error}</Text>
      ) : null}

      {viewModel.loading ? (
        <ActivityIndicator size="large" color="#ef4444" style={styles.loader} />
      ) : (
        <FlatList
          data={viewModel.pokemons}
          renderItem={renderPokemon}
          keyExtractor={(_, index) => `${viewModel.offset - viewModel.limit + index}`}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Pulsa el botón para cargar pokémons
            </Text>
          }
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ef4444',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  pokemonItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pokemonNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b7280',
    marginRight: 12,
    minWidth: 40,
  },
  pokemonName: {
    fontSize: 18,
    color: '#1f2937',
    textTransform: 'capitalize',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 16,
    marginTop: 40,
  },
});

export default Index;