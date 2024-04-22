import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function TrackIdPage() {
  const { trackId } = useLocalSearchParams();

  return (
      <View>
        <Text>Track ID</Text>
      </View>
  )
}