import { Text, View } from "react-native";
import { Screen } from "../components/Screen";

export default function About() {
  return (
    <Screen >
      <View className="flex-1 items-center justify-center p-4">

      <Text className="text-white text-lg m-4 ">
        This is a simple React Native application based on Midudev Course that fetches and displays
        characters from the Rick and Morty API from Axel Fuhrmann. It demonstrates the use of
        functional components, hooks, and styling in React Native.
      </Text>
      <Text className="text-yellow-300 text-lg m-4">
        Developed by ©Lsnm.dev
      </Text>
      <Text className="text-yellow-300 text-lg m-4">
        Version 1.0.0
      </Text>

      </View>
    </Screen>
  );
}
