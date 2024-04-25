import { RacesType } from "@/@types/types"
import { StyleSheet, Text, Touchable, Pressable, View } from "react-native"
import { ButtonsStyle, TextsStyles } from "../../constants/styles/theme-components"
import { BlurView } from "expo-blur"
import { Theme } from "@/constants/Colors"
import { getRaceSessions } from "@/utils/utils"
import { fetchInstanceWithToken, getProfileStorage } from "@/utils/fetchInstances"
import { router } from "expo-router"

type ScheduleRaceCardsProps = {
  race: RacesType
}

const { colors } = Theme

export const ScheduleRaceCards = ({
  race
}: ScheduleRaceCardsProps) => {
  return (
    <View style={styles.cardOverflow}>
      <BlurView style={styles.card}>
        <View>
          <Text style={TextsStyles.h4}>{race.time}</Text>
          <Text style={TextsStyles.p}>{race.category?.name}</Text>
          <Text style={TextsStyles.p}>Sessões</Text>
          {Object.entries(race.sessions).map(([key, value]) => {
            if (!value) return null
            return <Text key={key} style={TextsStyles.small}>{getRaceSessions(key)}: {value}min</Text>
          })}
        </View>
        <View>
          <Text style={TextsStyles.small}>Preço: R${race.category?.price}</Text>
          <Text style={TextsStyles.small}>Equipamentos: R${race.category?.price}</Text>
        </View>
      </BlurView>
      <Pressable 
        style={[
          ButtonsStyle.button,
          styles.button,
          race.isScheduled ? {
            backgroundColor: colors.primary
          } : { backgroundColor: colors.secondary }
        ]}
        onPress={() => router.push(`/race/${race.id}`)}
      >
        <Text style={[
          ButtonsStyle.buttonText,
          styles.buttonText, 
        ]}>
          Ver Corrida
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 12,
    gap: 12,
  },
  cardOverflow: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  button: {
    paddingHorizontal: 6,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  buttonText: {
    fontSize: 14
  }
})