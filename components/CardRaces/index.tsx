import { BlurView } from "expo-blur"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ButtonsStyle, TextsStyles } from "../styles/theme-components"
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
    <TouchableOpacity 
      style={styles.cardOverflow}
      onPress={() => withButton ? null : router.push(`/profile/race/${race.id}`)}
    >
      <BlurView intensity={20} style={styles.card}>
        <Image
          source={trackImage}
          style={styles.image}
        />
        <View style={styles.textGroup}>
          <Text style={TextsStyles.h3}>{race.track.name}</Text>
          <Text style={TextsStyles.p}>
            Categorias: 
            {race.track.categories.map((item) => (item))}
          </Text>
          <Text style={TextsStyles.p}>{race.date}</Text>
        </View>
        {withButton 
        ? <TouchableOpacity 
            onPress={() => router.push(`/profile/race/${race.id}`)}
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
        : null}
      </BlurView>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
    padding: 8,
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