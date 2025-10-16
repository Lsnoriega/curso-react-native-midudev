// import { Stack } from "expo-router";

import { Link, Stack } from "expo-router";
import { Pressable, View } from "react-native";
import { CircleInfoIcon, Logo } from "./components/Icons";

// export default function RootLayout() {
//   return <Stack />;
// }

export default function Layout() {

    return (
        <View className="flex-1">
        <Stack 
        screenOptions={{
            headerStyle: { backgroundColor: '#0f172b' },
            headerTitle: "",
            headerLeft: () => <Logo/>,
            headerRight: () => (
                <Link href="/about" asChild>
                <Pressable
                    className="p-2 rounded-full active:opacity-70"
                >
                    <CircleInfoIcon color="#66BB6A"/>
                </Pressable>        
                </Link>
            ),
        }}
        />
        </View>
    );
}
