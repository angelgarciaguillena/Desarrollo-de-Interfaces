import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { observer } from "mobx-react-lite";
import { container } from "../../../Core/Container";
import { PersonaViewModel } from "../../../UI/ViewModels/PersonaViewModel";
import { TYPES } from "../../../Core/Types";
import { PersonaListItem } from "../../../Components/PersonaListItem";
import { PersonaConIcono } from "../../../UI/Models/PersonaConIcono";

const ListadoPersonas: React.FC<{ navigation: any }> = observer(({ navigation }) => {
  const [viewModel] = useState(() => container.get<PersonaViewModel>(TYPES.PersonaViewModel));
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });

    return unsubscribe;
  }, [navigation]);

  const loadData = async () => {
    try {
      await viewModel.cargarPersonas();
    } catch (error) {
      console.error("Error al cargar personas:", error);
    }
  };

  const filteredPersonas = viewModel.personas.filter(
    (persona) =>
      persona.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
      persona.apellidos.toLowerCase().includes(searchText.toLowerCase()) ||
      persona.nombreDepartamento.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (persona: PersonaConIcono) => {
    viewModel.seleccionarPersona(persona);
    navigation.navigate("EditarInsertarPersona");
  };

  const handleDelete = async (persona: PersonaConIcono) => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Está seguro de eliminar a ${persona.nombre} ${persona.apellidos}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await viewModel.eliminarPersona(persona.id);
              Alert.alert("Éxito", "Persona eliminada correctamente");
            } catch (error) {
              Alert.alert(
                "Error",
                error instanceof Error ? error.message : "Error al eliminar"
              );
            }
          },
        },
      ]
    );
  };

  const handleAdd = () => {
    viewModel.seleccionarPersona(null);
    navigation.navigate("EditarInsertarPersona");
  };

  if (viewModel.isLoading && viewModel.personas.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando personas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar personas..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      {viewModel.error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{viewModel.error}</Text>
          <TouchableOpacity onPress={() => viewModel.limpiarError()}>
            <Text style={styles.closeError}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredPersonas}
        keyExtractor={(item, index) =>
          item.id != null ? `persona-${item.id}` : `persona-${index}`
        }
        renderItem={({ item }) => (
          <PersonaListItem
            persona={item}
            onPress={() => handleEdit(item)}
            onDelete={() => handleDelete(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>👥</Text>
            <Text style={styles.emptyText}>
              {searchText
                ? "No se encontraron personas"
                : "No hay personas registradas"}
            </Text>
            {!searchText && (
              <TouchableOpacity style={styles.emptyButton} onPress={handleAdd}>
                <Text style={styles.emptyButtonText}>Agregar Primera Persona</Text>
              </TouchableOpacity>
            )}
          </View>
        }
        refreshing={viewModel.isLoading}
        onRefresh={loadData}
        contentContainerStyle={filteredPersonas.length === 0 ? styles.emptyList : undefined}
        extraData={viewModel.personas.length}
      />

    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  header: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  searchInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 22.5,
    paddingHorizontal: 20,
    marginRight: 8,
    backgroundColor: "#f9f9f9",
    fontSize: 15,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 22.5,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    padding: 12,
    margin: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorText: {
    color: "#c62828",
    flex: 1,
  },
  closeError: {
    color: "#c62828",
    fontSize: 20,
    paddingLeft: 10,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 22.5,
  },
  emptyButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});

export default ListadoPersonas;