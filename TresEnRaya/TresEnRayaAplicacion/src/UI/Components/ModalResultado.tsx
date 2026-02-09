import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

interface ModalResultadoProps {
  visible: boolean;
  ganador: string | null;
  miSimbolo: string | null;
  onReiniciar: () => void;
  onSalir: () => void;
}

export const ModalResultado: React.FC<ModalResultadoProps> = ({
  visible,
  ganador,
  miSimbolo,
  onReiniciar,
  onSalir,
}) => {
  const getTexto = () => {
    if (ganador === "Empate") return "Empate";
    if (ganador === miSimbolo) return "¡Victoria!";
    return "Derrota";
  };

  const getIcono = () => {
    if (ganador === miSimbolo) return "🏆";
    if (ganador === "Empate") return "🤝";
    return "😢";
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalIcono}>{getIcono()}</Text>
          <Text style={styles.modalTitulo}>{getTexto()}</Text>
          
          <View style={styles.modalBotones}>
            <TouchableOpacity
              style={[styles.boton, styles.botonReiniciar]}
              onPress={onReiniciar}
            >
              <Text style={styles.textoBoton}>Jugar de nuevo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.boton, styles.botonSalir]}
              onPress={onSalir}
            >
              <Text style={styles.textoBotonSec}>Salir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    width: width * 0.85,
  },
  modalIcono: {
    fontSize: 80,
    marginBottom: 16,
  },
  modalTitulo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#000",
  },
  modalBotones: {
    width: "100%",
    gap: 12,
  },
  boton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  botonReiniciar: {
    backgroundColor: "#007AFF",
  },
  botonSalir: {
    backgroundColor: "#E5E5EA",
  },
  textoBoton: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  textoBotonSec: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
});