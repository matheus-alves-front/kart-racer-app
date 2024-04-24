import { 
  Text, 
  Pressable, 
  View,
  Image,
  StyleSheet,
} from "react-native"
import { ButtonsStyle } from "../../constants/styles/theme-components"
import { router } from "expo-router"
import { onLogOut } from "@/utils/fetchInstances"

const profileImage = require('../../assets/images/profile-icon.png')

export const HeaderHome = () => {
  return (
    <View style={styles.header} >
      <Pressable 
        style={ButtonsStyle.button}
        onPress={
          () => {
            console.log('clicou')
            router.push('/profile/')
          }
        }
      >
        <Text style={ButtonsStyle.buttonText}>
          Suas Corridas: 12
        </Text>
      </Pressable>
      <Pressable 
        onPress={onLogOut}
        style={[
          ButtonsStyle.button,
          styles.button
        ]}
      >
        <Image 
          source={profileImage}
        />
      </Pressable>
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