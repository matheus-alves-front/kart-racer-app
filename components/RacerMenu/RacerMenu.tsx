import { ButtonsStyle, TextsStyles } from "@/constants/styles/theme-components"
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { ModalUI } from "../Modal"
import { useState } from "react"
import { Theme } from "@/constants/Colors"
import { useRouter } from "expo-router"
import { onLogOut } from "@/utils/fetchInstances"
import { useLoggedUser } from "@/contexts/loggedUser"
const { colors } = Theme 

const profileImage = require('../../assets/images/profile-icon.png')

export const RacerMenu = ({
  profileId
}: {
  profileId: string
}) => {
  const {loggedRacer} = useLoggedUser()
  const router = useRouter()
  const [isFriendsModal, setIsFriendsModal] = useState(false)
  
  return (
    <>
      <Pressable 
        onPress={() => setIsFriendsModal(!isFriendsModal)}
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
      <ModalUI 
        isVisible={isFriendsModal}
        onClose={() => setIsFriendsModal(false)}
        isTransparent={false}
      >
          <Text style={[TextsStyles.h1, styles.title]}>Menu</Text>
          <ScrollView>
            <View style={{gap: 10}}>
              <Pressable style={ButtonsStyle.button}
                onPress={() => router.push(`/profile/${loggedRacer?.id}`)}
              >
                <Text style={ButtonsStyle.buttonText}>Ver Perfil</Text>
              </Pressable>
              <Pressable 
                style={[ButtonsStyle.button, {
                }]}
                onPress={() => router.push('home')}
              >
                <Text style={ButtonsStyle.buttonText}>Voltar Início</Text>
              </Pressable>
              <Pressable style={[ButtonsStyle.button, {
                backgroundColor: colors.gray
              }]}
                onPress={() => onLogOut()}
              >
                <Text style={ButtonsStyle.buttonText}>Sair</Text>
              </Pressable>
            </View>
          </ScrollView>
      </ModalUI>
    </>
  )
}


const styles = StyleSheet.create({
  button: {
    borderRadius: 500,
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  buttonImage: {
    height: 28,
  },
  title: {
    color: colors.black,
    textAlign: `center`,
    paddingBottom: 20
  },
})