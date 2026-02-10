import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }
  }, [visible]);

  const getTexto = () => {
    if (ganador === "Empate") return "Empate";
    if (ganador === miSimbolo) return "¡Victoria!";
    return "Derrota";
  };

  const getIcono = () => {
    if (ganador === miSimbolo) return "🏆";
    if (ganador === "Empate") return "🤝";
    return "💪";
  };

  const getMensaje = () => {
    if (ganador === miSimbolo) return "¡Excelente jugada!";
    if (ganador === "Empate") return "¡Muy reñido!";
    return "¡La próxima será tuya!";
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View
        style={[
          styles.modalOverlay,
          { opacity: opacityAnim },
        ]}
      >
        <Animated.View
          style={[
            styles.modalContentWrapper,
            {
              transform: [
                { scale: scaleAnim },
                {
                  translateY: scaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={(() => {
              if (ganador === miSimbolo) return ['#00b894', '#00cec9'];
              if (ganador === "Empate") return ['#fdcb6e', '#e17055'];
              return ['#d63031', '#e84393'];
            })()}
            style={styles.modalContainer}
          >
            <Animated.View
              style={[
                styles.iconoContainer,
                {
                  transform: [
                    {
                      rotate: scaleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['-180deg', '0deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.modalIcono}>{getIcono()}</Text>
            </Animated.View>

            <Text style={styles.modalTitulo}>{getTexto()}</Text>
            <Text style={styles.mensajeSecundario}>{getMensaje()}</Text>

            <View style={styles.estadisticaContainer}>
              <View style={styles.estadisticaItem}>
                <Text style={styles.estadisticaLabel}>Ganador</Text>
                <LinearGradient
                  colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                  style={styles.estadisticaValor}
                >
                  <Text style={styles.estadisticaTexto}>
                    {ganador === "Empate" ? "🤝" : ganador}
                  </Text>
                </LinearGradient>
              </View>
              
              {ganador !== "Empate" && (
                <View style={styles.estadisticaItem}>
                  <Text style={styles.estadisticaLabel}>Tu símbolo</Text>
                  <LinearGradient
                    colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                    style={styles.estadisticaValor}
                  >
                    <Text style={styles.estadisticaTexto}>{miSimbolo}</Text>
                  </LinearGradient>
                </View>
              )}
            </View>

            <View style={styles.modalBotones}>
              <TouchableOpacity
                style={styles.botonWrapper}
                onPress={onReiniciar}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#ffffff', '#f0f0f0']}
                  style={styles.botonReiniciar}
                >
                  <Text style={styles.iconoBoton}>🔄</Text>
                  <Text style={styles.textoBotonPrimario}>Jugar de nuevo</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.botonWrapper}
                onPress={onSalir}
                activeOpacity={0.8}
              >
                <View style={styles.botonSalir}>
                  <Text style={styles.iconoBoton}>👋</Text>
                  <Text style={styles.textoBotonSecundario}>Salir</Text>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentWrapper: {
    width: width * 0.9,
    maxWidth: 500,
  },
  modalContainer: {
    borderRadius: 30,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 20,
  },
  iconoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  modalIcono: {
    fontSize: 60,
  },
  modalTitulo: {
    fontSize: 42,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  mensajeSecundario: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 25,
    fontWeight: "600",
  },
  estadisticaContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 30,
    width: "100%",
    justifyContent: "center",
  },
  estadisticaItem: {
    alignItems: "center",
  },
  estadisticaLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 8,
    fontWeight: "600",
  },
  estadisticaValor: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    minWidth: 80,
    alignItems: "center",
  },
  estadisticaTexto: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
  },
  modalBotones: {
    width: "100%",
    gap: 15,
  },
  botonWrapper: {
    borderRadius: 20,
    overflow: "hidden",
  },
  botonReiniciar: {
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  botonSalir: {
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  iconoBoton: {
    fontSize: 22,
  },
  textoBotonPrimario: {
    color: "#2d3436",
    fontSize: 18,
    fontWeight: "800",
  },
  textoBotonSecundario: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
});