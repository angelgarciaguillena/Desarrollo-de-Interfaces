import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

// =======================
// Botón Personalizado
// =======================
interface BotonPersonalizadoProps {
  onPress: () => void;
  label: string;
}

const BotonPersonalizado: React.FC<BotonPersonalizadoProps> = ({ onPress, label }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

// =======================
// Tarjeta Producto
// =======================
interface TarjetaProductoProps {
  name: string;
  price: number;
  image: any; // en React Native, las imágenes locales se tipan como "any"
  onAddToCart: () => void;
}

const TarjetaProducto: React.FC<TarjetaProductoProps> = ({ name, price, image, onAddToCart }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.price}>Precio: €{price}</Text>
      <BotonPersonalizado onPress={onAddToCart} label="Añadir al carrito" />
    </View>
  );
};

// =======================
// Pantalla Principal
// =======================
const productos = [
  { name: "Camiseta", price: 99.99, image: require("../assets/images/camiseta.png") },
  { name: "Pantalón", price: 39.99, image: require("../assets/images/pantalones.png") },
  { name: "Zapatillas", price: 29.99, image: require("../assets/images/zapatillas.png") },
  { name: "Gorra", price: 14.99, image: require("../assets/images/gorra.png") },
];



const App: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tienda Real Betis Balompié</Text>
        <Text style={styles.cart}>🛒 {cartCount}</Text>
      </View>

      {/* Grid de productos */}
      <FlatList
        data={productos}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TarjetaProducto
            name={item.name}
            price={item.price}
            image={item.image}
            onAddToCart={handleAddToCart}
          />
        )}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

// =======================
// Estilos
// =======================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  cart: {
    fontSize: 20,
    fontWeight: "bold",
  },
  grid: {
    alignItems: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    width: 160,
    margin: 10,
    backgroundColor: "white",
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    marginBottom: 10,
    fontSize: 14,
    color: "#333",
  },
  button: {
    backgroundColor: "#0070f3",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default App;
