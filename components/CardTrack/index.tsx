import { BlurView } from "expo-blur"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ButtonsStyle, TextsStyles } from "../styles/theme-components"
import { TrackType } from "@/@types/types"

const trackImage = require('../../assets/images/track-image.png')
const arrowIcon = require('../../assets/images/icons/arrow-right-icon.png')

export const CardTrack = ({
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
        <View style={styles.textGroup}>
          <Text style={TextsStyles.h3}>{track.name}</Text>
          <Text style={TextsStyles.p}>
            Categorias: 
            {track.categories.map((item) => (`${item} `))}
          </Text>
          <Text style={TextsStyles.p}>{track.address.city}</Text>
        </View>
        <TouchableOpacity 
          style={[
            ButtonsStyle.button,
            styles.button
          ]}
        >
          <Image
            source={arrowIcon}
            style={styles.icon}
          />
        </TouchableOpacity>
      </BlurView>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 20,
    padding: 8,
    paddingBottom: 12,
  },
  cardOverflow: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: 60,
    height: 60,
  },
  textGroup: {
    flex: 1
  },
  icon: {
    width: 30,
    height: 20,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    margin: 0,
  }
})

