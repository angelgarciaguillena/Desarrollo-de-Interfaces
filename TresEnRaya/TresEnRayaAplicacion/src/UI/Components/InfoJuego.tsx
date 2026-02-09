import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface InfoJuegoProps {
  miSimbolo: string | null;
  turnoActual: string;
  esperandoJugador: boolean;
  esMiTurno: boolean;
  juegoTerminado: boolean;
  ganador: string | null;
}

export const InfoJuego: React.FC<InfoJuegoProps> = ({
  miSimbolo,
  turnoActual,
  esperandoJugador,
  esMiTurno,
  juegoTerminado,
  ganador,
}) => {
  const getMensaje = () => {
    if (esperandoJugador) {
      return "Esperando oponente...";
    }
    if (juegoTerminado) {
      if (ganador === "Empate") return "¡Empate!";
      if (ganador === miSimbolo) return "¡Ganaste!";
      return "Perdiste";
    }
    if (esMiTurno) {
      return "Tu turno";
    }
    return "Turno del oponente";
  };

  const getColor = () => {
    if (juegoTerminado) {
      if (ganador === miSimbolo) return "#34C759";
      if (ganador === "Empate") return "#FF9500";
      return "#FF3B30";
    }
    if (esMiTurno) return "#007AFF";
    return "#8E8E93";
  };

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.titulo}>Tres en Raya</Text>
      
      {miSimbolo && (
        <View style={styles.simboloContainer}>
          <Text style={styles.textoSimbolo}>
            Eres: <Text style={styles.simbolo}>{miSimbolo}</Text>
          </Text>
        </View>
      )}

      <View style={[styles.mensajeContainer, { backgroundColor: getColor() }]}>
        <Text style={styles.textoMensaje}>{getMensaje()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 20,
  },
  simboloContainer: {
    marginBottom: 10,
  },
  textoSimbolo: {
    fontSize: 18,
    color: "#000",
  },
  simbolo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  mensajeContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 15,
  },
  textoMensaje: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFF",
  },
});