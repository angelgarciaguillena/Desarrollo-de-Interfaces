import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { container } from "../../Core/container";
import { TYPES } from "../../Core/types";
import { Persona } from "../../Domain/Entities/Persona";
import { PeopleListVM } from "../ViewsModels/PersonaViewModel";

const PeopleList = observer(() => {

  // Crear una referencia que almacenará el VM
  const vmRef = useRef<PeopleListVM | null>(null);

  // Instanciar el VM solo si no existe
  if (vmRef.current === null) {
    vmRef.current = container.get<PeopleListVM>(TYPES.IndexVM);
  }

  //Acceder a la instancia persistente
  const viewModel = vmRef.current;

  // Render de cada persona
  const renderItem = ({ item }: { item: Persona }) => (
    <Pressable
      onPress={() => { viewModel.personaSeleccionada = item; }}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed
      ]}
    >
      <Text style={styles.cardTitle}>{item.name} {item.lastName}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Listado de Personas</Text>
      <Text style={styles.subtitulo}>
        Persona seleccionada:{" "}
        <Text style={{ fontWeight: "bold" }}>
          {viewModel.personaSeleccionada.name} {viewModel.personaSeleccionada.lastName}
        </Text>
      </Text>

      <FlatList
        data={viewModel.personasList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <Text style={styles.textoVacio}>No hay personas registradas</Text>
        )}
      />
    </SafeAreaView>
  );
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F2F5",
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#222",
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#555",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardPressed: {
    backgroundColor: "#E6F0FF",
    transform: [{ scale: 0.98 }],
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },
  separator: {
    height: 14,
  },
  textoVacio: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
  },
});

export default PeopleList;
