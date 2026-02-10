import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
    if (esperandoJugador) return "Esperando oponente...";
    if (juegoTerminado) {
      if (ganador === "Empate") return "¡Empate!";
      if (ganador === miSimbolo) return "¡Ganaste!";
      return "Perdiste";
    }
    if (esMiTurno) return "Tu turno";
    return "Turno del oponente";
  };

  const getIcono = () => {
    if (esperandoJugador) return "⏳";
    if (juegoTerminado) {
      if (ganador === miSimbolo) return "🏆";
      if (ganador === "Empate") return "🤝";
      return "💪";
    }
    if (esMiTurno) return "👆";
    return "⏱️";
  };

  return (
    <View style={styles.infoContainer}>
      <LinearGradient
        colors={['#00d4ff', '#0984e3']}
        style={styles.tituloGradiente}
      >
        <Text style={styles.titulo}>TIC TAC TOE</Text>
      </LinearGradient>
      
      {miSimbolo && (
        <View style={styles.simboloCard}>
          <LinearGradient
            colors={miSimbolo === "X" ? ['#ff6b6b', '#ee5a6f'] : ['#4ecdc4', '#44a3d5']}
            style={styles.simboloGradiente}
          >
            <Text style={styles.textoJugador}>Eres</Text>
            <Text style={styles.simboloGrande}>{miSimbolo}</Text>
          </LinearGradient>
        </View>
      )}

      <View style={styles.mensajeWrapper}>
        <LinearGradient
          colors={(() => {
            if (juegoTerminado) {
              if (ganador === miSimbolo) return ['#00b894', '#00cec9'];
              if (ganador === "Empate") return ['#fdcb6e', '#e17055'];
              return ['#d63031', '#e84393'];
            }
            if (esMiTurno) return ['#00d4ff', '#0984e3'];
            return ['#636e72', '#2d3436'];
          })()}
          style={styles.mensajeContainer}
        >
          <Text style={styles.iconoEstado}>{getIcono()}</Text>
          <Text style={styles.textoMensaje}>{getMensaje()}</Text>
        </LinearGradient>
        
        {esMiTurno && !juegoTerminado && (
          <View style={styles.pulsoDot} />
        )}
      </View>
      
      {!esperandoJugador && (
        <View style={styles.indicadoresContainer}>
          <View style={[
            styles.indicadorJugador,
            { borderColor: turnoActual === "X" ? "#ff6b6b" : "rgba(255,255,255,0.2)" }
          ]}>
            <Text style={[styles.indicadorTexto, { color: "#ff6b6b" }]}>X</Text>
            {turnoActual === "X" && <View style={styles.puntoBrillante} />}
          </View>
          
          <View style={styles.separadorVS}>
            <Text style={styles.textoVS}>VS</Text>
          </View>
          
          <View style={[
            styles.indicadorJugador,
            { borderColor: turnoActual === "O" ? "#4ecdc4" : "rgba(255,255,255,0.2)" }
          ]}>
            <Text style={[styles.indicadorTexto, { color: "#4ecdc4" }]}>O</Text>
            {turnoActual === "O" && <View style={styles.puntoBrillante} />}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  tituloGradiente: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: "#00d4ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  titulo: {
    fontSize: 36,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  simboloCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  simboloGradiente: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  textoJugador: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
  },
  simboloGrande: {
    fontSize: 32,
    fontWeight: "900",
    color: "#ffffff",
  },
  mensajeWrapper: {
    position: "relative",
    marginBottom: 20,
  },
  mensajeContainer: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 240,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  iconoEstado: {
    fontSize: 24,
  },
  textoMensaje: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  pulsoDot: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#00ff88",
    shadowColor: "#00ff88",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  indicadoresContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  indicadorJugador: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    position: "relative",
  },
  indicadorTexto: {
    fontSize: 28,
    fontWeight: "900",
  },
  puntoBrillante: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00ff88",
  },
  separadorVS: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
  },
  textoVS: {
    fontSize: 16,
    fontWeight: "800",
    color: "rgba(255, 255, 255, 0.6)",
  },
});