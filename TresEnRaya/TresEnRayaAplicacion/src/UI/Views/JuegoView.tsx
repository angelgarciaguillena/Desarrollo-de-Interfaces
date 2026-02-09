import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { observer } from "mobx-react-lite";
import { container } from "../../Core/Container";
import { TYPES } from "../../Core/Types";
import { JuegoViewModel } from "../ViewModels/JuegoViewModel";
import { Tablero } from "../Components/Tablero";
import { InfoJuego } from "../Components/InfoJuego";
import { ModalResultado } from "../Components/ModalResultado";

/**
 * Pantalla principal del juego
 */
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.content}>
        {viewModel.estaCargando ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : (
          <>
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
          </>
        )}
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});