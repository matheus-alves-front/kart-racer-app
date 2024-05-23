import { 
  Text, 
  View,
  StyleSheet,
} from "react-native"
import { TextsStyles } from "../../constants/styles/theme-components"
import { RacerProfileType } from "@/@types/types"
import { RacerMenu } from "../RacerMenu/RacerMenu"

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
      <RacerMenu profileId={racer.id} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 20,
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