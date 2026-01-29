import React from "react";
import { View, Text, Pressable, StyleSheet, Image, Alert } from "react-native";
import { PersonaConIcono } from "../UI/Models/PersonaConIcono";

interface PersonaListItemProps {
  persona: PersonaConIcono;
  onPress: () => void;
  onDelete: () => void;
}

export const PersonaListItem: React.FC<PersonaListItemProps> = ({
  persona,
  onPress,
  onDelete,
}) => {
  const handleDelete = () => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Está seguro de eliminar a ${persona.nombre} ${persona.apellidos}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: () => onDelete() },
      ]
    );
  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: persona.foto }}
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {persona.nombre} {persona.apellidos}
        </Text>
        <Text style={styles.department}>{persona.nombreDepartamento}</Text>
        {persona.telefono && (
          <Text style={styles.phone}>📞 {persona.telefono}</Text>
        )}
      </View>

      <Pressable
        onPress={(e) => {
          e.stopPropagation(); // Evita que se dispare onPress de toda la fila
          handleDelete();
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
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 12,
    backgroundColor: "#eee",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  department: {
    fontSize: 14,
    color: "#666",
  },
  phone: {
    fontSize: 13,
    color: "#999",
  },
  deleteIcon: {
    fontSize: 22,
    padding: 8,
  },
});