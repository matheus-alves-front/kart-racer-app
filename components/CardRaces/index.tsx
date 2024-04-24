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
        ? <Pressable 
            onPress={() => router.push(`/profile/race/${race.id}`)}
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
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
    flex: 1,
    paddingLeft: 6
  },
  button: {
    paddingHorizontal: 14
  }
})