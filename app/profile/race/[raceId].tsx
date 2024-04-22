import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function RaceIdPage() {
  const { raceId } = useLocalSearchParams();

  return (
      <View>
        <Text>Race Id</Text>
      </View>
  )
}