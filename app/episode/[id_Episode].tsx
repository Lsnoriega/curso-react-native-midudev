import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { getEpisode } from '../lib/rickandmorty';

type Episode = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
  characters?: string[];
};

export default function EpisodeDetails() {
  // ✅ CAMBIA "id" por "id_Episode"
  const { id_Episode } = useLocalSearchParams<{ id_Episode: string }>();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🎬 Episode ID_Episode from URL:', id_Episode); // Debug
    
    if (id_Episode) {
      getEpisode(id_Episode as string)
        .then((episodeData) => {
          console.log('✅ Episode loaded successfully:', episodeData);
          setEpisode(episodeData);
          setError(null);
        })
        .catch((err) => {
          console.error('❌ Error loading episode:', err);
          setError('No se pudo cargar el episodio');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError('No se proporcionó ID del episodio');
      setLoading(false);
    }
  }, [id_Episode]); // ✅ Cambia la dependencia

  if (loading) {
    return (
      <Screen>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#00ff00" />
          <Text className="text-white mt-4">Cargando episodio...</Text>
        </View>
      </Screen>
    );
  }

  if (error || !episode) {
    return (
      <Screen>
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg mb-4">
            {error || "Episodio no encontrado"}
          </Text>
          <Text className="text-gray-400">ID: {id_Episode}</Text>
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
          title: episode.name,
        }}
      />
      
      <ScrollView className="flex-1 bg-gray-900 p-4">
        <Text className="text-white text-3xl font-bold mb-4">{episode.name}</Text>
        
        <View className="bg-gray-800 p-4 rounded-lg mb-4">
          <Text className="text-gray-400 text-sm">Episode Code</Text>
          <Text className="text-white text-xl">{episode.episode}</Text>
        </View>

        <View className="bg-gray-800 p-4 rounded-lg mb-4">
          <Text className="text-gray-400 text-sm">Air Date</Text>
          <Text className="text-white text-xl">{episode.air_date}</Text>
        </View>

        {/* Debug info */}
        {/* <View className="bg-blue-900 p-3 rounded-lg mt-4">
          <Text className="text-white text-sm">Debug Info:</Text>
          <Text className="text-white text-xs">Episode ID: {episode.id}</Text>
          <Text className="text-white text-xs">Name: {episode.name}</Text>
          <Text className="text-white text-xs">Param received: {id_Episode}</Text>
        </View> */}
      </ScrollView>
    </Screen>
  );
}