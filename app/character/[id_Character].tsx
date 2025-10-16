import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native"; // 👈 Agrega TouchableOpacity
import { Logo } from "../components/Icons";
import { Screen } from "../components/Screen";
import { getCharacter, getEpisode } from "../lib/rickandmorty";

const extractEpisodeId = (url: string) => {
  if (!url) return null;
  const matches = url.match(/\/(\d+)$/);
  return matches ? matches[1] : null;
};

type Character = {
  id: string;
  image: string;
  title: string;
  gender: string;
  species: string;
  status: string;
  origin: {
    name: string;
    url: string;
    id: string | null;
  };
  location: {
    name: string;
    url: string;
    id: string | null;
  };
  first_episode: string;
};

type Episode = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
};

export default function CharacterDetails() {
  const { id_Character } = useLocalSearchParams<{ id_Character: string }>();

  const [character, setCharacter] = useState<Character | null>(null);
  const [firstEpisode, setFirstEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingEpisode, setLoadingEpisode] = useState(false);

  // Extraer el ID del episodio usando la función auxiliar
  const episodeId = firstEpisode?.id || 
    (character?.first_episode ? extractEpisodeId(character.first_episode) : null);

  console.log("🔍 Debug - Episode ID:", episodeId);
  console.log("🔍 Debug - First Episode:", firstEpisode);

  useEffect(() => {
    if (id_Character) {
      getCharacter(id_Character).then((characterData) => {
        console.log("🎭 Character loaded:", characterData.title);
        console.log("🎭 First episode URL:", characterData.first_episode);
        
        setCharacter(characterData);
        setLoading(false);
        
        if (characterData.first_episode) {
          setLoadingEpisode(true);
          getEpisode(characterData.first_episode)
            .then((episodeData) => {
              console.log("🎭 Episode data received:", episodeData);
              setFirstEpisode(episodeData);
            })
            .catch((error) => {
              console.error("Error loading episode:", error);
            })
            .finally(() => {
              setLoadingEpisode(false);
            });
        }
      }).catch((error) => {
        console.error("Error loading character:", error);
        setLoading(false);
      });
    }
  }, [id_Character]);

  if (loading) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Logo />
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      </Screen>
    );
  }

  if (!character) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text className="text-white text-lg">Personaje no encontrado</Text>
          <Link href="/" className="mt-4 text-blue-500">
            Volver al inicio
          </Link>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#0f172b" },
          headerTintColor: "#0084d1",
          headerLeft: () => null,
        }}
      />

      <ScrollView className="flex-1 bg-gray-900">
        <Image source={{ uri: character.image }} className="w-full h-96 object-cover rounded-lg" />
        
        <View className="p-4">
          <Text className="text-white text-5xl font-bold mb-5">{character.title}</Text>
          
          <View className="flex-row mb-3">
            <View className={`w-4 h-4 rounded-full mr-2 mt-1 ${
              character.status === 'Alive' ? 'bg-green-500' : 
              character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
            }`} />
            <Text className="text-white text-2xl">
              {character.status} - {character.species}
            </Text>
          </View>

          {/* Género */}
          {character.gender && (
            <View className="mb-3">
              <Text className="text-gray-400 text-base">Gender</Text>
              <Text className="text-white text-xl">{character.gender}</Text>
            </View>
          )}

          {/* Origen */}
          {character.origin.name && character.origin.name !== "unknown" && (
            <View className="mb-3">
              <Text className="text-gray-400 text-base">Origin:</Text>
              {character.origin.id ? (
                <Link href={`/location/${character.origin.id}`} >
                  
                    <Text className="text-white text-xl underline">
                      {character.origin.name}
                    </Text>
                  
                </Link>
              ) : (
                <Text className="text-white text-xl">{character.origin.name}</Text>
              )}
            </View>
          )}

          {/* Ubicación actual - CORREGIDO */}
          <View className="mb-3">
            <Text className="text-gray-400 text-base">Last Know Location:</Text>
            {character.location.id ? (
              <Link href={`/location/${character.location.id}`} > {/* ✅ Ruta absoluta */}
                
                  <Text className="text-white text-xl underline">
                    {character.location.name}
                  </Text>
                
              </Link>
            ) : (
              <Text className="text-white text-xl">{character.location.name}</Text>
            )}
          </View>

          {/* Primer Episodio - COMPLETAMENTE CORREGIDO */}
          <View className="mb-3">
            <Text className="text-gray-400 text-base">First Episode:</Text>
            {loadingEpisode ? (
              <ActivityIndicator size="small" color="#00ff00" />
            ) : firstEpisode && episodeId ? (
              <Link href={`/episode/${episodeId}`}> {/* ✅ asChild agregado */}
                 {/* ✅ TouchableOpacity agregado */}
                  <Text className="text-white text-xl underline">
                    {firstEpisode.name}
                  </Text>
                
              </Link>
            ) : (
              <Text className="text-white text-xl">
                {firstEpisode ? firstEpisode.name : "No disponible"}
              </Text>
            )}
          </View>

          {/* Debug info */}
          {/* <View className="mt-6 p-3 bg-blue-900 rounded-lg">
            <Text className="text-white text-sm font-bold">Debug Info:</Text>
            <Text className="text-white text-xs">Episode ID: {episodeId || "null"}</Text>
            <Text className="text-white text-xs">First Episode Name: {firstEpisode?.name || "null"}</Text>
            <Text className="text-white text-xs">First Episode URL: {character.first_episode}</Text>
          </View> */}
        </View>
      </ScrollView>
    </Screen>
  );
}