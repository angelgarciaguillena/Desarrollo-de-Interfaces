import { Button, Text, View } from "react-native";

function pulsar(){
  alert("Se ha pulsado el boton")
}

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hola mundo</Text>
      <Button title="Boton" onPress={pulsar}/>

    </View>
  );
}
