import React, { useEffect, useRef } from "react";
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Dimensions,
  Animated,
  Platform,
  ColorValue
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const MAX_WIDTH = Platform.OS === "web" ? 600 : width;
const TAMANO_CASILLA = Math.min((MAX_WIDTH - 100) / 3, 130);

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
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (valor) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [valor]);

  const getGradientColors = (): readonly [ColorValue, ColorValue] => {
    if (valor === "X") return ['#ff6b6b', '#ee5a6f'];
    if (valor === "O") return ['#4ecdc4', '#44a3d5'];
    return ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)'];
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.casillaWrapper,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={deshabilitada || valor !== null}
        activeOpacity={0.9}
        style={styles.touchable}
      >
        <LinearGradient
          colors={getGradientColors()}
          style={[
            styles.casilla,
            deshabilitada && !valor && styles.casillaDeshabilitada,
            valor && styles.casillaConValor,
          ]}
        >
          {valor && (
            <Animated.Text
              style={[
                styles.textoFicha,
                { opacity: opacityAnim },
              ]}
            >
              {valor}
            </Animated.Text>
          )}
          
          {!valor && (
            <LinearGradient
              colors={['rgba(255,255,255,0.1)', 'transparent']}
              style={styles.brillo}
            />
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  casillaWrapper: {
    margin: 6,
  },
  touchable: {
    borderRadius: 20,
    overflow: "hidden",
  },
  casilla: {
    width: TAMANO_CASILLA,
    height: TAMANO_CASILLA,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  casillaDeshabilitada: {
    opacity: 0.4,
  },
  casillaConValor: {
    borderColor: "rgba(255, 255, 255, 0.4)",
    borderWidth: 3,
  },
  textoFicha: {
    fontSize: TAMANO_CASILLA * 0.5,
    fontWeight: "900",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  brillo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 18,
  },
});