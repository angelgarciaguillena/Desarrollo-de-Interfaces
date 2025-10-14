import { Text, View, FlatList, StyleSheet, TouchableOpacity, Alert, Platform } from "react-native"
import ViewModel from "../ViewModel/IndexViewModel"

export default function Index() {

    const users = ViewModel;

    return(
        <FlatList
        data = {users.getUsers()}
        keyExtractor = {(item) => item.id.toString()}
        renderItem = {({ item }) => (
            
                <View style = {styles.container}>
                    <TouchableOpacity
                        style = {styles.item}
                        onPress={() => {
                            const title = 'Información de la persona';
                            const message = `Nombre: ${item.name}\nApellido: ${item.lastName}\n`;
                            console.log('item pressed:', item);
                            if (Platform.OS === 'web') {
                                // on web, use the browser alert as a reliable fallback
                                (window as any).alert(`${title}\n\n${message}`);
                            } else {
                                Alert.alert(title, message);
                            }
                        }}
                    >
                        <Text style = {styles.text}>{item.name} {item.lastName}</Text>
                    </TouchableOpacity>
                </View>
            
        )}
        />
    )
}

const styles= StyleSheet.create({
  item: {
    padding: 10,
    borderColor: '#000000',
    alignItems: 'center'
  },
  text: {
    fontSize: 22
  },
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#16d1d1ff',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
})