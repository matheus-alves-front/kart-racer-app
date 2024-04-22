import { BlurView } from "expo-blur"
import { Image, StyleSheet, Text, View } from "react-native"
import { TextsStyles } from "../styles/theme-components"
import { RacesType, TrackType } from "@/@types/types"

const trackImage = require('../../assets/images/track-image.png')

export const CardRacesCompleted = ({
  race
}: {
  race: RacesType
}) => {
  return (
    <View style={styles.cardOverflow}>
      <BlurView intensity={20} style={styles.card}>
        <Image
          source={trackImage}
          style={styles.image}
        />
        <View>
          <Text style={TextsStyles.h4}>{race.track.name}</Text>
          <Text style={TextsStyles.p}>
            Categorias: 
            {race.track.categories.map((item) => (item))}
          </Text>
          <Text style={TextsStyles.p}>{race.date}</Text>
        </View>
      </BlurView>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    padding: 8,
    paddingRight: 12,
    paddingBottom: 12,
  },
  cardOverflow: {
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
  }
})