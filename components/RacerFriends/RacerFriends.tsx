import { ButtonsStyle, TextsStyles } from "@/constants/styles/theme-components"
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { ModalUI } from "../Modal"
import { useState } from "react"
import { Theme } from "@/constants/Colors"

const profileImage = require('../../assets/images/profile-icon.png')

export const RacerFriends = () => {
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
          <Text style={[TextsStyles.h1, styles.title]}>Amigos</Text>
          <ScrollView>
            <View style={styles.friendsSection}>
              <Pressable 
                style={styles.friendCard}
                onPress={() => console.log(`clicou perfil sim`)}
              >
                <Text style={TextsStyles.h4}>Amigo 1</Text>
                <Text style={TextsStyles.small}>Ver Perfil</Text>
              </Pressable>
              <Pressable 
                style={styles.friendCard}
                onPress={() => console.log(`clicou perfil sim`)}
              >
                <Text style={TextsStyles.h4}>Amigo 1</Text>
                <Text style={TextsStyles.small}>Ver Perfil</Text>
              </Pressable>
              <Pressable 
                style={styles.friendCard}
                onPress={() => console.log(`clicou perfil sim`)}
              >
                <Text style={TextsStyles.h4}>Amigo 1</Text>
                <Text style={TextsStyles.small}>Ver Perfil</Text>
              </Pressable>
              <Pressable 
                style={styles.friendCard}
                onPress={() => console.log(`clicou perfil sim`)}
              >
                <Text style={TextsStyles.h4}>Amigo 1</Text>
                <Text style={TextsStyles.small}>Ver Perfil</Text>
              </Pressable>
              <Pressable 
                style={styles.friendCard}
                onPress={() => console.log(`clicou perfil sim`)}
              >
                <Text style={TextsStyles.h4}>Amigo 1</Text>
                <Text style={TextsStyles.small}>Ver Perfil</Text>
              </Pressable>
              <Pressable 
                style={styles.friendCard}
                onPress={() => console.log(`clicou perfil sim`)}
              >
                <Text style={TextsStyles.h4}>Amigo 1</Text>
                <Text style={TextsStyles.small}>Ver Perfil</Text>
              </Pressable>
              <Pressable 
                style={styles.friendCard}
                onPress={() => console.log(`clicou perfil sim`)}
              >
                <Text style={TextsStyles.h4}>Amigo 1</Text>
                <Text style={TextsStyles.small}>Ver Perfil</Text>
              </Pressable>
              <Pressable 
                style={styles.friendCard}
                onPress={() => console.log(`clicou perfil sim`)}
              >
                <Text style={TextsStyles.h4}>Amigo 1</Text>
                <Text style={TextsStyles.small}>Ver Perfil</Text>
              </Pressable>
            </View>
          </ScrollView>
      </ModalUI>
    </>
  )
}

const { colors } = Theme 

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
    textAlign: `center`
  },
  friendsSection: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    gap: 6,
  },
  friendCard: {
    backgroundColor: `rgba(0,0,0,0.6)`,
    padding: 20,
    borderRadius: 15,
    justifyContent: `space-between`,
    alignItems: `center`,
    flexDirection: `row`
  }
})