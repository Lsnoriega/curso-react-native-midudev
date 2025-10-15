import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

type Character = {
  id: string;
  image: string;
  title: string;
  description: string;
};

interface CharacterCardProps {
  character: Character;
}
interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <View className="flex-row gap-4 p-4 mb-10" style={styles.gameContainer}>
      <Image source={{ uri: character.image }} style={styles.gameImage} />
      <View>
      <Text className="" style={styles.gameTitle}>{character.title}</Text>
      <Text style={styles.gameDescription}>{character.description}</Text>
      </View>
    </View>
  );
}

export function AnimatedCharacterCard({ character, index } : { character: Character; index: number }) {
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