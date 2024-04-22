import { BlurView } from "expo-blur"
import { Image, StyleSheet, Text, View } from "react-native"
import { TextsStyles } from "../styles/theme-components"
import { TrackType } from "@/@types/types"

const trackImage = require('../../assets/images/track-image.png')

export const CardRecentTrack = ({
  name,
  categories,
  address
}: TrackType) => {
  return (
    <View style={styles.cardOverflow}>
      <BlurView intensity={20} style={styles.card}>
        <Image
          source={trackImage}
          style={styles.image}
        />
        <View>
          <Text style={TextsStyles.h4}>{name}</Text>
          <Text style={TextsStyles.p}>
            Categorias: 
            {categories.map((item) => (item))}
          </Text>
          <Text style={TextsStyles.p}>{address.city} - {address.state}</Text>
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
    width: 80,
    height: 80,
  }
})