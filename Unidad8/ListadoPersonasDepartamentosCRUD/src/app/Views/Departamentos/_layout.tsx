import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListadoDepartamentos from "./ListadoDepartamentos";
import EditarInsertarDepartamento from "./EditarInsertarDepartamentos";

const Stack = createNativeStackNavigator();

const DepartamentosLayout: React.FC = () => (
  <Stack.Navigator initialRouteName="ListadoDepartamentos">
    <Stack.Screen name="ListadoDepartamentos" component={ListadoDepartamentos} options={{ title: "Departamentos" }} />
    <Stack.Screen name="EditarInsertarDepartamento" component={EditarInsertarDepartamento} options={{ title: "Editar/Insertar Departamento" }} />
  </Stack.Navigator>
);

export default DepartamentosLayout;
