import { 
  Text, 
  Pressable, 
  View,
  Image,
  StyleSheet,
} from "react-native"
import { ButtonsStyle, TextsStyles } from "../../constants/styles/theme-components"
import { useRouter } from "expo-router"
import { RacerProfileType } from "@/@types/types"

const profileImage = require('../../assets/images/profile-icon.png')

export const HeaderProfile = ({
  racer
}: {
  racer: RacerProfileType
}) => { 
  return (
    <View style={styles.header}>
      <View>
        <Text style={TextsStyles.h2}>Piloto</Text>
        <Text style={TextsStyles.h1}>{racer.name}</Text>
        <Text style={TextsStyles.p}>Total de Corridas: {racer.races ? racer.races.length : 0}</Text>
        <Text style={TextsStyles.p}>
          Pódios: {racer.ranking.rankingPodiums}, Vencidas: {racer.ranking.rankingWins}
        </Text>
      </View>
      <Pressable 
        style={[
          ButtonsStyle.button,
          styles.button
        ]}
      >
        <Image 
          source={profileImage}
          style={styles.buttonImage}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 36,
    paddingTop: 40,
  },
  button: {
    borderRadius: 500,
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  buttonImage: {
    height: 28,
  }
})