import { Text, View, FlatList, StyleSheet } from "react-native"
import ViewModel from "../ViewModel/IndexViewModel"

export default function Index() {
    return(
        <FlatList
        data = {ViewModel.getUsers()}
        keyExtractor = {(item) => item.id.toString()}
        renderItem = {({ item }) => (
            <View style = {styles.container}>
                <View style = {styles.item}>
                    <Text style = {styles.text}>{item.name} {item.lastName}</Text>
                </View>
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