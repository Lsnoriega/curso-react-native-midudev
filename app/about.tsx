import { Link } from "expo-router";
import { Text } from "react-native";
import { HomeIcon } from "./components/Icons";
import { Screen } from "./components/Screen";

export default function About() {
  return (
    <Screen>
      <Text className="text-white font-extrabold text-2xl text-clip">
        About Screen
      </Text>

      <Text className="text-white text-lg m-4">
        This is a simple React Native application that fetches and displays
        characters from the Rick and Morty API. It demonstrates the use of
        functional components, hooks, and styling in React Native.
      </Text>

      <Link href="/" className="mt-4 p-4 bg-blue-500 rounded">
        Go Back to Home
        <HomeIcon style={{ marginLeft: 8 }} />
      </Link>
    </Screen>
  );
}
