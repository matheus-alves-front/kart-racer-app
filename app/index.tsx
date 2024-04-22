import { CardRecentTrack } from "@/components/CardRecentTrack";
import { CardTrack } from "@/components/CardTrack";
import { TextsStyles } from "@/components/styles/theme-components";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Header } from "@/components/Header";

const RecentTracks = [
  {
    name: 'Granja Viana',
    city: 'São Paulo - SP',
    categories: ['13hp', '18hp'],
    date: '30/03/2000'
  },
  {
    name: 'Mogi Kart',
    city: 'Mogi das Cruzes - SP',
    categories: ['13hp', '18hp'],
    date: '30/03/2000'
  },
]

export default function HomePage() {
  return (
    <ScrollView>
      <Header />
      <Text style={TextsStyles.h1}>Pistas Recentes:</Text>
      <ScrollView style={styles.cardsGrid} horizontal>
        {RecentTracks.map((item, index) => (
          <CardRecentTrack 
            key={index}
            categories={item.categories}
            city={item.city}
            date={item.date}
            name={item.name}
          />
        ))}
      </ScrollView>
      <Text style={TextsStyles.h1}>Todas as Pistas</Text>
      <View style={styles.cardsGrid}>
        {RecentTracks.map((item, index) => (
          <CardTrack
            key={index}
            categories={item.categories}
            city={item.city}
            date={item.date}
            name={item.name}
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