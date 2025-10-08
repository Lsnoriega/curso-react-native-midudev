import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Logo } from "./components/Logo";
import { Main } from "./components/Main";

export default function Index() {
  
  return (
    <SafeAreaProvider>
      
    <View style={styles.container}>
      <View style={{ marginTop:20, }}>
      <Logo width="176" height="40" />
      </View>
    <Main/>
    </View>
    </SafeAreaProvider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    paddingVertical: 40,
  },
}); 


// Nota: Asegúrate de que la función `getCharacters` en `rickandmorty.js` esté correctamente definida y exportada.