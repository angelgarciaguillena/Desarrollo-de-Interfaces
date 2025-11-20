import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './index';
import Register from './register';
import Home from './welcome';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen 
          name="Login"
          component={Login} 
          options={{ title: 'Login' }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: 'Nuevo usuario' }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
