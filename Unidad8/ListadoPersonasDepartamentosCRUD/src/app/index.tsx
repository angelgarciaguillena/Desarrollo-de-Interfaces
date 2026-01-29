import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppDrawer from "./_layout";

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AppDrawer />
    </NavigationContainer>
  );
};

export default App;
