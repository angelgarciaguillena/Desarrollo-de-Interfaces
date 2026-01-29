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
import { DepartamentoViewModel } from "../../../UI/ViewModels/DepartamentoViewModel";
import { TYPES } from "../../../Core/Types";
import { DepartamentoListItem } from "../../../Components/DepartamentoListItem";
import { Departamento } from "../../../Domain/Entities/Departamento";

const ListadoDepartamentos: React.FC<{ navigation: any }> = observer(({ navigation }) => {
  const [viewModel] = useState(() => container.get<DepartamentoViewModel>(TYPES.DepartamentoViewModel));
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
      await viewModel.cargarDepartamentos();
    } catch (error) {
      console.error("Error al cargar departamentos:", error);
    }
  };

  const filteredDepartamentos = viewModel.departamentos.filter((dept) =>
    dept.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (departamento: Departamento) => {
    viewModel.seleccionarDepartamento(departamento);
    navigation.navigate("EditarInsertarDepartamento");
  };

  const handleDelete = (departamento: Departamento) => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Está seguro de eliminar el departamento ${departamento.nombre}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            viewModel.eliminarDepartamento(departamento.id)
              .then(() => {
                alert("Departamento eliminado correctamente");
              })
              .catch((err) => {
                alert(err instanceof Error ? err.message : "Error al eliminar");
              });
          },
        },
      ]
    );
  };


  const handleAdd = () => {
    viewModel.seleccionarDepartamento(null);
    navigation.navigate("EditarInsertarDepartamento");
  };

  if (viewModel.isLoading && viewModel.departamentos.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Cargando departamentos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar departamentos..."
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
        data={filteredDepartamentos}
        keyExtractor={(item) => `departamento-${item.id}`}
        renderItem={({ item }) => (
          <DepartamentoListItem
            departamento={item}
            onPress={() => handleEdit(item)}
            onDelete={() => handleDelete(item)}
          />
        )}
        extraData={viewModel.departamentos.slice()} 
        refreshing={viewModel.isLoading}
        onRefresh={loadData}
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
    backgroundColor: "#4CAF50",
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
    backgroundColor: "#4CAF50",
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

export default ListadoDepartamentos;