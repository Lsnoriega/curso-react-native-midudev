import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { Main } from "./components/Main";

export default function Index() {
  
  return (
    <SafeAreaProvider>
    <Main/>
    </SafeAreaProvider>
  );

}
