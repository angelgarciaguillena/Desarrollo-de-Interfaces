import { View, Text, Button } from 'react-native';

export default function Login({ navigation } : any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pantalla de Login</Text>

      <Button
        title="Entrar"
        onPress={() => navigation.navigate('Home')}
      />

      <Button
        title="Regístrate"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}
