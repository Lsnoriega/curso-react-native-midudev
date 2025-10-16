import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getCharacters } from "../lib/rickandmorty.js"; // 👈 actualiza esta ruta
import { AnimatedCharacterCard } from "./CharacterCard";
import { Logo } from "./Icons";
import { Screen } from "./Screen";

type Character = {
  id: string;
  image: string;
  title: string;
  species: string;
  status: string;
  location: {
    // Cambia location a objeto
    name: string;
  };
  description: string;
  first_episode: string;
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
    <Screen
      // style={{
      //   paddingBottom: insets.bottom,
      // }}
    >
      {/* <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, marginHorizontal: 10}}>
        <View>
          <Logo width="140" />
        </View>
        <Link href="/about" asChild>
        <Pressable
          className="p-2 rounded-full active:opacity-70"
        >
          <CircleInfoIcon color="#66BB6A"/>
        </Pressable>        
        </Link>
      </View> */}

      {characters.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Logo/>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(character) => character.id}
          renderItem={({ item, index }) => (
            <AnimatedCharacterCard character={item} index={index} />
          )}
        />
        // {characters.map((character) => (
        //   <CharacterCard key={character.id} character={character}

        // ))}
      )}
    </Screen>
  );
}

// Nota: Asegúrate de que la función `getCharacters` en `rickandmorty.js` esté correctamente definida y exportada.
