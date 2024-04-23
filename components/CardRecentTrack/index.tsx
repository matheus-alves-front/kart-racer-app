import { BlurView } from "expo-blur"
import { Image, StyleSheet, Text, View } from "react-native"
import { TextsStyles } from "../styles/theme-components"
import { TrackType } from "@/@types/types"

const trackImage = require('../../assets/images/track-image.png')

export const CardRecentTrack = ({
  track
}: {
  track: TrackType
}) => {
  return (
    <View style={styles.cardOverflow}>
      <BlurView intensity={20} style={styles.card}>
        <Image
          source={trackImage}
          style={styles.image}
        />
        <View>
          <Text style={TextsStyles.h3}>{track.name}</Text>
          <Text style={TextsStyles.p}>
            Categorias: 
            {track.categories?.map((item) => (item.name))}
          </Text>
          <Text style={TextsStyles.p}>{track.address.city} - {track.address.state}</Text>
        </View>
      </BlurView>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 8,
    gap: 6,
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
  },
  textGroup: {
    flex: 1
  },
})