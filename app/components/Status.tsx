import { Text } from "react-native";


export function Status({ status }: { status: string }) {
    const getColor = () => {
        switch (status) {
            case "Alive": return "text-green-500";
            case "Dead": return "text-red-500";
            default: return "gray";
        };

    } 
    const color = getColor();

    return <Text className={color}>{status}</Text>
}