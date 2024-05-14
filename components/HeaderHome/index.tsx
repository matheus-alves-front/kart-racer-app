import { 
  Text, 
  Pressable, 
  View,
  StyleSheet,
} from "react-native"
import { ButtonsStyle } from "../../constants/styles/theme-components"
import { router } from "expo-router"
import { getProfileStorage } from "@/utils/fetchInstances"
import { useCallback, useEffect, useState } from "react"
import { RacerFriends } from "../RacerFriends/RacerFriends"

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
          () => router.push(`/profile/${profileIdState}`)
        }
      >
        <Text style={ButtonsStyle.buttonText}>
          Ver Perfil
        </Text>
      </Pressable>
      <RacerFriends />
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