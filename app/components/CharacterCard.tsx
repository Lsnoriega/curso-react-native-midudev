import { Image, StyleSheet, Text, View } from "react-native";

type Character = {
  id: string;
  image: string;
  title: string;
  description: string;
};

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <View style={styles.gameContainer}>
      <Image source={{ uri: character.image }} style={styles.gameImage} />
      <Text style={styles.gameTitle}>{character.title}</Text>
      <Text style={styles.gameDescription}>{character.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
 
  gameContainer: {
    justifyContent: "center",
    alignItems: "center",
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