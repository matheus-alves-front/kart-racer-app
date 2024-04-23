import { TracksMock } from "@/@types/mock";
import { TextsStyles } from "@/components/styles/theme-components";
import { BlurView } from "expo-blur";
import { useLocalSearchParams } from "expo-router";
import { Text, View, Image, StyleSheet } from "react-native";

const trackImage = require("../../assets/images/track-big-image.png");

export default function TrackIdPage() {
  const { trackId } = useLocalSearchParams();
  const track1 = TracksMock[0];

  const track = TracksMock.find((item) => item.id === trackId);

  return (
    <View style={style.card}>
      <View style={style.subCard}>
        <Text style={TextsStyles.h1}>GRANJA VIANA</Text>
        <Image source={trackImage} style={style.image} />
      </View>
        <View style={style.tabsCard}>
          <Text style={TextsStyles.h1}>CARNE</Text>
        </View>
    </View>
  );
}

const style = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 70,
  },
  subCard: {
   alignItems: 'center',
   gap: 40,
  },
  tabsCard: {
    marginTop: 40,
  },
  image: {
    width: 350,
    height: 300,
    borderRadius: 5
  },
});
