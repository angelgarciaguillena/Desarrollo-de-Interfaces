import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const TAMANO_CASILLA = (width - 80) / 3;

interface CasillaProps {
  valor: string | null;
  posicion: number;
  onPress: () => void;
  deshabilitada: boolean;
}

export const Casilla: React.FC<CasillaProps> = ({
  valor,
  posicion,
  onPress,
  deshabilitada,
}) => {
  const getColor = () => {
    if (valor === "X") return "#FF3B30";
    if (valor === "O") return "#007AFF";
    return "#000";
  };

  return (
    <TouchableOpacity
      style={[
        styles.casilla,
        deshabilitada && styles.casillaDeshabilitada,
      ]}
      onPress={onPress}
      disabled={deshabilitada || valor !== null}
      activeOpacity={0.7}
    >
      <Text style={[styles.textoFicha, { color: getColor() }]}>
        {valor || ""}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  casilla: {
    width: TAMANO_CASILLA,
    height: TAMANO_CASILLA,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E5EA",
  },
  casillaDeshabilitada: {
    opacity: 0.6,
  },
  textoFicha: {
    fontSize: 60,
    fontWeight: "bold",
  },
});