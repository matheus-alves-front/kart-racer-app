import { TextsStyles } from "@/components/styles/theme-components";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { RacesMock } from "@/@types/mock";
import { HeaderProfile } from "@/components/HeaderProfile";
import { CardRaces } from "@/components/CardRaces";

export default function ProfilePage() {
  return (
    <ScrollView>
      <HeaderProfile />
      <Text style={TextsStyles.h1}>Ultimas Corridas:</Text>
      <ScrollView style={styles.cardsGrid} horizontal>
        {RacesMock.map((item, index) => (
          <CardRaces 
            key={index}
            race={item}
          />
        ))}
      </ScrollView>
      <Text style={TextsStyles.h1}>Corridas Marcadas</Text>
      <View style={styles.cardsGrid}>
        {RacesMock.map((item, index) => (
          <CardRaces 
            key={index}
            race={item}
            withButton
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
    paddingTop: 10,
  }
})