import React from "react";
import { View, StyleSheet } from "react-native";
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
    <View style={styles.tableroContainer}>
      {renderFila(0)}
      {renderFila(3)}
      {renderFila(6)}
    </View>
  );
};

const styles = StyleSheet.create({
  tableroContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  fila: {
    flexDirection: "row",
  },
});