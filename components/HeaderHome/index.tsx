import { 
  Text, 
  Pressable, 
  View,
  Image,
  StyleSheet,
} from "react-native"
import { ButtonsStyle } from "../../constants/styles/theme-components"
import { router } from "expo-router"
import { getProfileStorage, onLogOut } from "@/utils/fetchInstances"
import { useCallback, useEffect, useState } from "react"

const profileImage = require('../../assets/images/profile-icon.png')

export const HeaderHome = () => {
  const [profileIdState, setProfileIdState] = useState('')
  const getProfileId = useCallback(async () => {
    const profileId = await getProfileStorage()

    if (profileId) return setProfileIdState(profileId)
  }, [profileIdState])

  useEffect(() => {
    getProfileId()
  }, [])
  return (
    <View style={styles.header} >
      <Pressable 
        style={ButtonsStyle.button}
        onPress={
          () => {
            console.log('clicou')
            router.push(`/profile/${profileIdState}`)
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