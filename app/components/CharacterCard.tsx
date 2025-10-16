import { Link } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Status } from "./Status";

type Character = {
  id: string;
  image: string;
  title: string;
  species: string;
  status: string;
  location: {
    name: string;
  };
  description: string;
  first_episode: string;
};

interface CharacterCardProps {
  character: Character;
}

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`../character/${character.id}`} asChild>
      <Pressable className=" bg-slate-900 active:opacity-70 border-green-400 border-2 active:border-green-200 rounded-lg m-2">
        <View className="flex-row gap-4">
          <Image source={{ uri: character.image }} className="w-40 overflow-hidden" />
          <View className=" shrink py-8">
            <Text className="text-white font-extrabold text-2xl text-clip">
              {character.title}
            </Text>
            <Text className="text-white text-lg mb-2">
              {character.species} - <Status status={character.status} />
            </Text>
            <Text style={styles.gameDescription}>Last Know Location: </Text>
            <Text className="text-white text-lg">
               {character.location.name}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

export function AnimatedCharacterCard({
  character,
  index,
}: {
  character: Character;
  index: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: index * 250,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <CharacterCard character={character} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    gap: 16,
    padding: 16,
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    marginBottom: 20,
  },
  gameImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 8,
  },
  gameTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  gameDescription: {
    color: "#aaa",
  },
});
