import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListadoPersonas from "./ListadoPersonas";
import EditarInsertarPersona from "./EditarInsertarPersonas";

const Stack = createNativeStackNavigator();

const PersonasLayout: React.FC = () => (
  <Stack.Navigator initialRouteName="ListadoPersonas">
    <Stack.Screen name="ListadoPersonas" component={ListadoPersonas} options={{ title: "Personas" }} />
    <Stack.Screen name="EditarInsertarPersona" component={EditarInsertarPersona} options={{ title: "Editar/Insertar Persona" }} />
  </Stack.Navigator>
);

export default PersonasLayout;
