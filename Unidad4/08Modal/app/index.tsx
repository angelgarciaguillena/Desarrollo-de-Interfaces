import React, { useState } from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";

const Index = () => {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ejemplo de Modal</Text>

      <Pressable style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>Mostrar</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Hola, acabas de entrar al modal. Para cerrarlo presione el boton "Cerrar"</Text>
            <Pressable style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6200ee",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#6200ee",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeText: {
    color: "white",
    fontSize: 16,
  },
});

export default Index;