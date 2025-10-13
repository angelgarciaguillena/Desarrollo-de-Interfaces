import React from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";

const users = [
  { id: 1, name: 'Juan', lastName: 'Perez' },
  { id: 2, name: 'Maria', lastName: 'Gomez' },
  { id: 3, name: 'Carlos', lastName: 'Lopez' },
  { id: 4, name: 'Ana', lastName: 'Martinez' },
  { id: 5, name: 'Luis', lastName: 'Rodriguez' },
  { id: 6, name: 'Sofia', lastName: 'Garcia' },
  { id: 7, name: 'Miguel', lastName: 'Hernandez' },
  { id: 8, name: 'Laura', lastName: 'Sanchez' },
  { id: 9, name: 'Diego', lastName: 'Ramirez' },
  { id: 10, name: 'Elena', lastName: 'Torres' },
  { id: 11, name: 'Javier', lastName: 'Flores' },
  { id: 12, name: 'Carmen', lastName: 'Rivera' },
  { id: 13, name: 'Andres', lastName: 'Vargas' },
  { id: 14, name: 'Marta', lastName: 'Castillo' },
  { id: 15, name: 'Fernando', lastName: 'Jimenez' },
  { id: 16, name: 'Isabel', lastName: 'Mendoza' },
  { id: 17, name: 'Ricardo', lastName: 'Silva' },
  { id: 18, name: 'Patricia', lastName: 'Cruz' },
  { id: 19, name: 'Santiago', lastName: 'Morales' },
  { id: 20, name: 'Valeria', lastName: 'Ortiz' }
];

export default function Index() {
  return(
    <FlatList
    data = {users}
    keyExtractor = {(item) => item.id.toString()}
    renderItem = {({ item }) => (
      <View style = {styles.container}>
        <View style = {styles.item}>
          <Text style = {styles.text}>{item.name} {item.lastName}</Text>
        </View>
      </View>
    )}
    />
  )
}

const styles= StyleSheet.create({
  item: {
    padding: 10,
    borderColor: '#000000',
    alignItems: 'center'
  },
  text: {
    fontSize: 22
  },
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#16d1d1ff',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
})