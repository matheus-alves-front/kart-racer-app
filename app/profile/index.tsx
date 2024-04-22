import { CardRecentTrack } from "@/components/CardRecentTrack";
import { CardTrack } from "@/components/CardTrack";
import { TextsStyles } from "@/components/styles/theme-components";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { TracksMock } from "@/@types/mock";
import { HeaderProfile } from "@/components/HeaderProfile";

export default function ProfilePage() {
  return (
    <ScrollView>
      <HeaderProfile />
      <Text style={TextsStyles.h1}>Ultimas Corridas:</Text>
      <ScrollView style={styles.cardsGrid} horizontal>
        {TracksMock.map((item, index) => (
          <CardRecentTrack 
            key={index}
            track={item}
          />
        ))}
      </ScrollView>
      <Text style={TextsStyles.h1}>Corridas Marcadas</Text>
      <View style={styles.cardsGrid}>
        {TracksMock.map((item, index) => (
          <CardTrack
            key={index}
            track={item}
          />
        ))}
      </View>
      <Text style={TextsStyles.h1}>Melhores Tempos:</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  cardsGrid: {
    gap: 10,
    paddingBottom: 20,
  }
})