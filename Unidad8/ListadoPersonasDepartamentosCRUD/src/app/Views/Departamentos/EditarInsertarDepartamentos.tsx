import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { observer } from "mobx-react-lite";
import { container } from "../../../Core/Container";
import { DepartamentoViewModel } from "../../../UI/ViewModels/DepartamentoViewModel";
import { TYPES } from "../../../Core/Types";
import { Departamento } from "../../../Domain/Entities/Departamento";

const EditarInsertarDepartamento: React.FC<{ navigation: any }> = observer(({ navigation }) => {
  const [viewModel] = useState(() => container.get<DepartamentoViewModel>(TYPES.DepartamentoViewModel));
  const [nombre, setNombre] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const isEditing = viewModel.departamentoSeleccionado !== null;

  useEffect(() => {
    if (viewModel.departamentoSeleccionado) {
      setNombre(viewModel.departamentoSeleccionado.nombre);
    } else {
      setNombre("");
    }
  }, [viewModel.departamentoSeleccionado]);

  const handleSave = async () => {
    if (!nombre.trim()) {
      Alert.alert("Error", "El nombre del departamento es obligatorio");
      return;
    }

    setIsSaving(true);

    try {
      const departamento = new Departamento(
        viewModel.departamentoSeleccionado?.id || 0,
        nombre.trim()
      );

      if (isEditing) {
        await viewModel.actualizarDepartamento(departamento);
        navigation.goBack();
        setTimeout(() => {
          Alert.alert("Éxito", "Departamento actualizado correctamente");
        }, 300);
      } else {
        await viewModel.agregarDepartamento(departamento);
        navigation.goBack();
        setTimeout(() => {
          Alert.alert("Éxito", "Departamento creado correctamente");
        }, 300);
      }
    } catch (error) {
      console.error("Error al guardar departamento:", error);
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Error al guardar el departamento"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>
            {isEditing ? "Editar Departamento" : "Nuevo Departamento"}
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre del Departamento *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Recursos Humanos"
              value={nombre}
              onChangeText={setNombre}
              editable={!isSaving}
            />
          </View>

          {viewModel.error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{viewModel.error}</Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => navigation.goBack()}
              disabled={isSaving}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.saveButton, isSaving && styles.disabledButton]}
              onPress={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>
                  {isEditing ? "Actualizar" : "Guardar"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#c62828",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default EditarInsertarDepartamento;