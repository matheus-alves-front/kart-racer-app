import { BlurView } from "expo-blur"
import { Image, StyleSheet, Text, Pressable, View } from "react-native"
import { ButtonsStyle, TextsStyles } from "../../constants/styles/theme-components"
import { RacesType } from "@/@types/types"
import { router } from "expo-router"

const trackImage = require('../../assets/images/track-image.png')
const arrowIcon = require('../../assets/images/icons/arrow-right-icon.png')

export const CardRaces = ({
  race,
  withButton
}: {
  race: RacesType,
  withButton?: boolean
}) => {
  return (
    <Pressable 
      style={styles.cardOverflow}
    >
      <BlurView intensity={20} style={styles.card}>
        <Image
          source={trackImage}
          style={styles.image}
        />
        <View style={styles.textGroup}>
          <Text style={TextsStyles.p}>Data: {race.date}</Text>
          <Text style={TextsStyles.p}>{race.time}</Text>
          <Text style={TextsStyles.p}>Pilotos Inscritos: {race.racersProfileIds.length}</Text>
        </View>
        {withButton 
        ? <Pressable 
            onPress={() => router.push(`/track/${race.trackId}/race/${race.id}`)}
            style={[
              ButtonsStyle.button,
              styles.button
            ]}
          >
            <Image
              source={arrowIcon}
            />
          </Pressable> 
        : null}
      </BlurView>
    </Pressable>
  )
}

export const EmptyCardRace = ({
  phrase
}: {
  phrase: string
}) => {
  return (
    <View style={[styles.cardOverflow, styles.empty]}>
      <BlurView intensity={20} style={styles.card}>
        <Text style={TextsStyles.p}>{phrase}</Text>
      </BlurView>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: 8,
    paddingBottom: 12,
  },
  empty: {
    flex: 1,
    width: '100%',
    borderRadius: 5
  },
  cardOverflow: {
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    margin: `auto`
  },
  textGroup: {
    flex: 1,
    paddingLeft: 6
  },
  button: {
    paddingHorizontal: 14
  }
})