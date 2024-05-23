import { Pressable, StyleSheet, Text, View } from "react-native"
import { Theme } from "@/constants/Colors"
import { TextsStyles } from "@/constants/styles/theme-components"

export function AllFriends() {
  return (
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
    </View>
  )
}


const {colors} = Theme

const styles = StyleSheet.create({
  friendsSection: {
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
  },
  container: {
    flex: 1,
    width: '100%',
    padding: 12
  },
})