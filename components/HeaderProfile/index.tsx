import { 
  Text, 
  TouchableOpacity, 
  View,
  Image,
  StyleSheet,
} from "react-native"
import { ButtonsStyle, TextsStyles } from "../styles/theme-components"
import { useRouter } from "expo-router"

const profileImage = require('../../assets/images/profile-icon.png')

export const HeaderProfile = () => {
  const router = useRouter()
  return (
    <View style={styles.header}>
      <View>
        <Text style={TextsStyles.h1}>Matheus Alves</Text>
        <Text style={TextsStyles.p}>Total de Corridas: 10</Text>
        <Text style={TextsStyles.p}>Pódios: 5, Vencidas: 2</Text>
        <Text style={TextsStyles.p}>Ranking: 10</Text>
      </View>
      <TouchableOpacity 
        style={[
          ButtonsStyle.button,
          styles.button
        ]}
      >
        <Image 
          source={profileImage}
          style={styles.buttonImage}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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