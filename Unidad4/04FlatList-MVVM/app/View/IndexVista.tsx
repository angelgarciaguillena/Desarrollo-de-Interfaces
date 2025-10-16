import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import ViewModel from "../ViewModel/IndexViewModel";

export default function Index() {
  const users = new ViewModel();

  // Contenedor especial para web
  if (Platform.OS === "web") {
    return (
      <div style={{ height: "100vh", overflow: "auto", backgroundColor: "#f5f5f5" }}>
        {users.People.map((item) => (
          <div
            key={item.id}
            style={{
              width: "90%",
              margin: "10px auto",
              backgroundColor: "#16d1d1ff",
              border: "1px solid #000",
              borderRadius: 5,
              padding: 15,
              textAlign: "center",
            }}
            onClick={() =>
              window.alert(`Información de la persona\n\nNombre: ${item.name}\nApellido: ${item.lastName}`)
            }
          >
            {item.name} {item.lastName}
          </div>
        ))}
      </div>
    );
  }

  // Móvil / Emulador
  return (
    <View style={styles.container}>
      <FlatList
        data={users.People}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              Alert.alert("Información de la persona", `Nombre: ${item.name}\nApellido: ${item.lastName}`)
            }
          >
            <Text style={styles.text}>
              {item.name} {item.lastName}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingVertical: 20,
  },
  item: {
    width: "90%",
    backgroundColor: "#16d1d1ff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginVertical: 8,
    alignItems: "center",
  },
  text: {
    fontSize: 22,
  },
});