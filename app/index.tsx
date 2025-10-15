import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { Main } from "./components/Main";

export default function Index() {
  
  return (
    <SafeAreaProvider>
    {/* <View style={styles.container}> */}
    <Main/>
    {/* </View> */}
    </SafeAreaProvider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
}); 


// Nota: Asegúrate de que la función `getCharacters` en `rickandmorty.js` esté correctamente definida y exportada.