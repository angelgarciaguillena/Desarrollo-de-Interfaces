import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Casilla } from "./Casilla";

interface TableroProps {
  tablero: (string | null)[];
  onCasillaPress: (posicion: number) => void;
  deshabilitado: boolean;
}

export const Tablero: React.FC<TableroProps> = ({
  tablero,
  onCasillaPress,
  deshabilitado,
}) => {
  const renderFila = (inicio: number) => {
    return (
      <View style={styles.fila} key={inicio}>
        {[0, 1, 2].map((offset) => {
          const pos = inicio + offset;
          return (
            <Casilla
              key={pos}
              valor={tablero[pos]}
              posicion={pos}
              onPress={() => onCasillaPress(pos)}
              deshabilitada={deshabilitado}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.tableroWrapper}>
      <View style={styles.tableroContainer}>
        {renderFila(0)}
        {renderFila(3)}
        {renderFila(6)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableroWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  tableroContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  fila: {
    flexDirection: "row",
  },
});