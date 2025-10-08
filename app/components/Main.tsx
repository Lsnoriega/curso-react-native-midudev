import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getCharacters } from "../lib/rickandmorty.js"; // 👈 actualiza esta ruta
import { CharacterCard } from "./CharacterCard";


type Character = {
  id: string;
  image: string;
  title: string;
  description: string;
  // otras propiedades si tienes
};



export function Main() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getCharacters().then((characters) => {
      setCharacters(characters);
    });
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: "#000", paddingHorizontal: 20 }}>
    
      {characters.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
      <FlatList 
      data={characters} 
      keyExtractor={(character) => character.id} 
      renderItem={({item}) => <CharacterCard character={item} />}
      />
      // {characters.map((character) => (
      //   <CharacterCard key={character.id} character={character} 
      
      // ))}
      )}
    
    </View>
  );

}




// Nota: Asegúrate de que la función `getCharacters` en `rickandmorty.js` esté correctamente definida y exportada.