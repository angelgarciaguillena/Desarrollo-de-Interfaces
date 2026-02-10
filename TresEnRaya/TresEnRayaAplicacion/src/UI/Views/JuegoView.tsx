import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  Platform,
} from "react-native";
import { observer } from "mobx-react-lite";
import { LinearGradient } from "expo-linear-gradient";
import { container } from "../../Core/Container";
import { TYPES } from "../../Core/Types";
import { JuegoViewModel } from "../ViewModels/JuegoViewModel";
import { Tablero } from "../Components/Tablero";
import { InfoJuego } from "../Components/InfoJuego";
import { ModalResultado } from "../Components/ModalResultado";

export const JuegoView: React.FC = observer(() => {
  const viewModel = React.useMemo(
    () => container.get<JuegoViewModel>(TYPES.JuegoViewModel),
    []
  );

  useEffect(() => {
    viewModel.initialize();
    return () => {
      viewModel.disconnect();
    };
  }, [viewModel]);

  const handleCasillaPress = (posicion: number) => {
    viewModel.manejarClicCasilla(posicion);
  };

  const handleReiniciar = () => {
    viewModel.reiniciarJuego();
  };

  const handleSalir = () => {
    viewModel.disconnect();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      
      <LinearGradient
        colors={['#0f0c29', '#302b63', '#24243e']}
        style={styles.gradientBackground}
      >
        <View style={styles.container}>
          {viewModel.estaCargando ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#00d4ff" />
            </View>
          ) : (
            <View style={styles.gameContainer}>
              <InfoJuego
                miSimbolo={viewModel.miSimbolo}
                turnoActual={viewModel.estadoJuego.turnoActual}
                esperandoJugador={viewModel.estadoJuego.esperandoJugador}
                esMiTurno={viewModel.esMiTurno}
                juegoTerminado={viewModel.estadoJuego.juegoTerminado}
                ganador={viewModel.estadoJuego.ganador}
              />
              
              <Tablero
                tablero={viewModel.estadoJuego.tablero}
                onCasillaPress={handleCasillaPress}
                deshabilitado={!viewModel.esMiTurno}
              />
              
              <ModalResultado
                visible={viewModel.estadoJuego.juegoTerminado}
                ganador={viewModel.estadoJuego.ganador}
                miSimbolo={viewModel.miSimbolo}
                onReiniciar={handleReiniciar}
                onSalir={handleSalir}
              />
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0f0c29",
  },
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    width: "100%",
    alignSelf: "center",
  },
  gameContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});