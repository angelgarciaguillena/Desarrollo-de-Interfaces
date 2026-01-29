import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Index from "./Views/Index";
import PersonasLayout from "./Views/Personas/_layout";
import DepartamentosLayout from "./Views/Departamentos/_layout";

const Drawer = createDrawerNavigator();

const AppDrawer: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Inicio">
      <Drawer.Screen name="Inicio" component={Index} />
      <Drawer.Screen name="Personas" component={PersonasLayout} />
      <Drawer.Screen name="Departamentos" component={DepartamentosLayout} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
