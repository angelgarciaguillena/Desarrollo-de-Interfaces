import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const BottomTabs = createBottomTabNavigator();
const TopTabs = createMaterialTopTabNavigator();

function InicioScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Pantalla Inicio</Text>
    </View>
  );
}

function ConfiguracionScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Pantalla Configuración</Text>
    </View>
  );
}

function PostsScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Posts del Usuario</Text>
    </View>
  );
}

function GaleriaScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Galería del Usuario</Text>
    </View>
  );
}

function PerfilTabs() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarIndicatorStyle: { backgroundColor: '#007AFF', height: 3 },
        tabBarLabelStyle: { fontSize: 16, fontWeight: '600' },
      }}
    >
      <TopTabs.Screen name="Posts" component={PostsScreen} />
      <TopTabs.Screen name="Galería" component={GaleriaScreen} />
    </TopTabs.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabs.Navigator
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: '#007AFF',
          tabBarLabelStyle: { fontSize: 14 },
        }}
      >
        <BottomTabs.Screen name="Inicio" component={InicioScreen} />
        <BottomTabs.Screen name="Perfil" component={PerfilTabs} />
        <BottomTabs.Screen name="Configuración" component={ConfiguracionScreen} />
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});