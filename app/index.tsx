import { CardRecentTrack } from "@/components/CardRecentTrack";
import { CardTrack } from "@/components/CardTrack";
import { TextsStyles } from "@/components/styles/theme-components";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Header } from "@/components/Header";
import { TracksMock } from "@/@types/mock";

export default function HomePage() {
  return (
    <ScrollView>
      <Header />
      <Text style={TextsStyles.h1}>Pistas Recentes:</Text>
      <ScrollView style={styles.cardsGrid} horizontal>
        {TracksMock.map((item, index) => (
          <CardRecentTrack 
            key={index}
            track={item}
          />
        ))}
      </ScrollView>
      <Text style={TextsStyles.h1}>Todas as Pistas</Text>
      <View style={styles.cardsGrid}>
        {TracksMock.map((item, index) => (
          <CardTrack
            key={index}
            track={item}
          />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  cardsGrid: {
    gap: 10,
    paddingBottom: 20,
  }
})