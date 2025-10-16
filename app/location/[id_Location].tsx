import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { getLocation } from '../lib/rickandmorty';

type Location = {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
};

export default function LocationDetails() {
  const { id_Location } = useLocalSearchParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id_Location) {
      getLocation(id_Location as string)
        .then(setLocation)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id_Location]);

  if (loading) {
    return (
      <Screen>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#00ff00" />
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
          title: location?.name || 'Location',
          headerLeft: () => null,
        }}
      />
      
      <ScrollView className="flex-1 bg-gray-900 p-4">
        <Text className="text-white text-3xl font-bold mb-4">{location?.name}</Text>
        
        <View className="bg-gray-800 p-4 rounded-lg mb-4">
          <Text className="text-gray-400 text-sm">Type</Text>
          <Text className="text-white text-xl">{location?.type}</Text>
        </View>

        <View className="bg-gray-800 p-4 rounded-lg mb-4">
          <Text className="text-gray-400 text-sm">Dimension</Text>
          <Text className="text-white text-xl">{location?.dimension}</Text>
        </View>

        <View className="bg-gray-800 p-4 rounded-lg">
          <Text className="text-gray-400 text-sm">Residents</Text>
          <Text className="text-white text-xl">{location?.residents.length}</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}