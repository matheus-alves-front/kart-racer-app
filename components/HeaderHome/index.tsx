import { 
  Text, 
  TouchableOpacity, 
  View,
  Image,
  StyleSheet,
} from "react-native"
import { ButtonsStyle } from "../styles/theme-components"
import { Link, useRouter } from "expo-router"

const profileImage = require('../../assets/images/profile-icon.png')

export const HeaderHome = () => {
  const router = useRouter()
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={ButtonsStyle.button}
        onPress={
          () => router.push('/profile/')
        }
      >
        <Text style={ButtonsStyle.buttonText}>
          Suas Corridas: 12
        </Text>
      </TouchableOpacity>
      <Link 
        href={'/profile/'}
        style={[
          ButtonsStyle.button,
          styles.button
        ]}
      >
        <Image 
          source={profileImage}
        />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingVertical: 36,
    paddingTop: 40
  },
  button: {
    borderRadius: 500,
    paddingVertical: 0,
    paddingHorizontal: 16
  }
})