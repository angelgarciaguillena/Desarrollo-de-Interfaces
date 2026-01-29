import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { observer } from "mobx-react-lite";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { container } from "../../../Core/Container";
import { PersonaViewModel } from "../../../UI/ViewModels/PersonaViewModel";
import { DepartamentoViewModel } from "../../../UI/ViewModels/DepartamentoViewModel";
import { TYPES } from "../../../Core/Types";
import { Persona } from "../../../Domain/Entities/Persona";

const EditarInsertarPersona: React.FC<{ navigation: any }> = observer(({ navigation }) => {
  const [personaVM] = useState(() => container.get<PersonaViewModel>(TYPES.PersonaViewModel));
  const [departamentoVM] = useState(() => container.get<DepartamentoViewModel>(TYPES.DepartamentoViewModel));

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [foto, setFoto] = useState("");
  const [idDepartamento, setIdDepartamento] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isEditMode = personaVM.personaSeleccionada !== null;

  useEffect(() => {
  departamentoVM.cargarDepartamentos();
}, []);

useEffect(() => {
  if (personaVM.personaSeleccionada) {
    const persona = personaVM.personaSeleccionada;

    setNombre(persona.nombre);
    setApellidos(persona.apellidos);
    setFechaNacimiento(new Date(persona.fechaNacimiento));
    setDireccion(persona.direccion);
    setTelefono(persona.telefono);
    setFoto(persona.foto);
    setIdDepartamento(persona.idDepartamento);
  } else {
    setNombre("");
    setApellidos("");
    setFechaNacimiento(new Date());
    setDireccion("");
    setTelefono("");
    setFoto("");
    setIdDepartamento(0);
  }
}, [personaVM.personaSeleccionada]);


  const handleSave = async () => {
    if (!nombre.trim()) {
      Alert.alert("Error", "El nombre es obligatorio");
      return;
    }
    if (!apellidos.trim()) {
      Alert.alert("Error", "Los apellidos son obligatorios");
      return;
    }
    if (idDepartamento === 0) {
      Alert.alert("Error", "Debe seleccionar un departamento");
      return;
    }

    setIsSaving(true);

    try {
      const persona = new Persona(
        isEditMode ? personaVM.personaSeleccionada!.id : 0,
        nombre.trim(),
        apellidos.trim(),
        fechaNacimiento,
        direccion.trim(),
        telefono.trim(),
        foto.trim(),
        idDepartamento
      );

      if (isEditMode) {
        await personaVM.actualizarPersona(persona);
        navigation.goBack();
        setTimeout(() => {
          Alert.alert("Éxito", "Persona actualizada correctamente");
        }, 300);
      } else {
        await personaVM.agregarPersona(persona);
        navigation.goBack();
        setTimeout(() => {
          Alert.alert("Éxito", "Persona agregada correctamente");
        }, 300);
      }
    } catch (error) {
      console.error("Error al guardar persona:", error);
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Error al guardar"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setFechaNacimiento(selectedDate);
      if (Platform.OS === 'ios') {
        setShowDatePicker(false);
      }
    } else if (Platform.OS === 'ios') {
      setShowDatePicker(false);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (departamentoVM.isLoading && departamentoVM.departamentos.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.form}>
        <Text style={styles.title}>
          {isEditMode ? "Editar Persona" : "Nueva Persona"}
        </Text>

        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ingrese el nombre"
          placeholderTextColor="#999"
          editable={!isSaving}
        />

        <Text style={styles.label}>Apellidos *</Text>
        <TextInput
          style={styles.input}
          value={apellidos}
          onChangeText={setApellidos}
          placeholder="Ingrese los apellidos"
          placeholderTextColor="#999"
          editable={!isSaving}
        />

        <Text style={styles.label}>Fecha de Nacimiento</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => !isSaving && setShowDatePicker(true)}
          disabled={isSaving}
        >
          <Text style={styles.dateText}>{formatDate(fechaNacimiento)}</Text>
          <Text style={styles.calendarIcon}>📅</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={fechaNacimiento}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          value={direccion}
          onChangeText={setDireccion}
          placeholder="Ingrese la dirección"
          placeholderTextColor="#999"
          editable={!isSaving}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          value={telefono}
          onChangeText={setTelefono}
          placeholder="Ingrese el teléfono"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          editable={!isSaving}
        />

        <Text style={styles.label}>Foto (URL)</Text>
        <TextInput
          style={styles.input}
          value={foto}
          onChangeText={setFoto}
          placeholder="https://ejemplo.com/foto.jpg"
          placeholderTextColor="#999"
          autoCapitalize="none"
          keyboardType="url"
          editable={!isSaving}
        />

        <Text style={styles.label}>Departamento *</Text>
        <View style={[styles.pickerContainer, isSaving && styles.disabledInput]}>
          <Picker
            selectedValue={idDepartamento}
            onValueChange={(value) => setIdDepartamento(value)}
            style={styles.picker}
            enabled={!isSaving}
          >
            <Picker.Item label="Seleccione un departamento" value={0} />
            {departamentoVM.departamentos.map((dept) => (
              <Picker.Item
                key={dept.id}
                label={dept.nombre}
                value={dept.id}
              />
            ))}
          </Picker>
        </View>

        {personaVM.error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{personaVM.error}</Text>
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
                {isEditMode ? "Actualizar" : "Guardar"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  form: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: "#333",
  },
  dateButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  calendarIcon: {
    fontSize: 20,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  disabledInput: {
    opacity: 0.6,
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  errorText: {
    color: "#c62828",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 32,
    marginBottom: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
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
    backgroundColor: "#007AFF",
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

export default EditarInsertarPersona;