import { Image } from 'expo-image';
import { View, Text, StyleSheet} from 'react-native';

export default function index() {
  return (
    
    <View style={styles.fondo}>
      <View style={styles.card}>
        <Image style={styles.avatar} source={require('../assets/images/iron.jpg')}></Image>
        <Text style={styles.text}>Fernando Galiana</Text>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  fondo:{
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto'
  },
  card:{
    borderWidth: 2,
    width: 350,
    height: 150,
    padding: 20,
    borderColor: '#000000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold'
  },
  avatar:{
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 20
  }
});