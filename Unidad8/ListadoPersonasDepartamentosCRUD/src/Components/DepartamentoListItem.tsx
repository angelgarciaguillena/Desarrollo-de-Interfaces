import React from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { Departamento } from "../Domain/Entities/Departamento";

interface DepartamentoListItemProps {
  departamento: Departamento;
  onPress: () => void;
  onDelete: () => void; 
}

export const DepartamentoListItem: React.FC<DepartamentoListItemProps> = ({
  departamento,
  onPress,
  onDelete,
}) => {
  const confirmarEliminacion = () => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Está seguro de eliminar el departamento ${departamento.nombre}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            onDelete();
          },
        },
      ]
    );
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.containerPressed]}
      onPress={onPress} 
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🏢</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{departamento.nombre}</Text>
        <Text style={styles.id}>ID: {departamento.id}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.deleteButton, pressed && styles.deleteButtonPressed]}
        onPress={(e) => {
          e.stopPropagation();
          confirmarEliminacion();
        }}
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
      >
        <Text style={styles.deleteIcon}>🗑️</Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  containerPressed: {
    backgroundColor: "#f5f5f5",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e8f5e9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  id: {
    fontSize: 13,
    color: "#999",
  },
  deleteButton: {
    padding: 12,
    marginLeft: 8,
    borderRadius: 20,
  },
  deleteButtonPressed: {
    backgroundColor: "#ffebee",
  },
  deleteIcon: {
    fontSize: 22,
  },
});
