import { BlurView } from "expo-blur"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ButtonsStyle, TextsStyles } from "../styles/theme-components"
import iconSet from "@expo/vector-icons/build/Fontisto"
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
          <Text style={TextsStyles.h4}>{track.name}</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingLeft: 10,
    paddingRight: 0,
    paddingVertical: 8,
    paddingBottom: 12,
  },
  cardOverflow: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  image: {
    width: 60,
    height: 60,
  },
  icon: {
    width: 30,
    height: 20,
  },
  textGroup: {
    flex: 1,
  },
  button: {
    paddingVertical: 20,
  }
})