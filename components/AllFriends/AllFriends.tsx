import { Pressable, StyleSheet, Text, View } from "react-native"
import { Theme } from "@/constants/Colors"
import { TextsStyles } from "@/constants/styles/theme-components"
import { Fragment, useContext } from "react"
import { LoggedUserContext } from "@/contexts/loggedUser"
import { useRouter } from "expo-router"
import { fetchInstanceWithToken } from "@/utils/fetchInstances"
import { RacerProfileType, SocialFriendshipType } from "@/@types/types"

export function AllFriends() {
  const router = useRouter()

  const {racerFriends, loggedRacer} = useContext(LoggedUserContext)

  return (
    <View style={styles.friendsSection}>
      <Text style={[TextsStyles.h3, {paddingBottom: 10}]}>
        Adicionados {String(racerFriends.length)}
      </Text>
      {racerFriends.length ? racerFriends.map((friendship) => {
        const racer = friendship.racer.id === loggedRacer?.id ? friendship.racerFriend : friendship.racer

        return (
          <Fragment key={friendship.id}>
            {friendship.accepted && 
              <Pressable 
                key={friendship.id}
                onPress={() => router.push(`profile/${racer.id}`)}
              >
                <View 
                  style={styles.friendCard}
                >
                  <Text style={TextsStyles.h4}>{racer.name}</Text>
                  <Pressable onPress={(e) => {
                    e.stopPropagation()
                    router.push(`friendChat/${friendship.id}`)
                  }}>
                    <Text style={TextsStyles.small}>Conversar</Text>
                  </Pressable>
                </View>
              </Pressable>
            }
          </Fragment>
        )
      }) 
      : null}
    </View>
  )
}

export function AllFriendsRequests() {
  const router = useRouter()
  const {racerFriendsRequests, updateRacer, loggedRacer} = useContext(LoggedUserContext)

  const onAcceptRequest = async (racerProfileId: string) => {
    await fetchInstanceWithToken(`/racer/${loggedRacer?.id}/racer-socials/acceptFriend/${racerProfileId}`, {
      method: 'POST'
    })

    await updateRacer()
  }

  const onDeleteRequest = async (racerProfileId: string) => {
    await fetchInstanceWithToken(`/racer/${loggedRacer?.id}/racer-socials/deleteFriend/${racerProfileId}`, {
      method: 'POST'
    })

    await updateRacer()
  }

  return (
    <View style={styles.friendsSection}>
        <Text style={[TextsStyles.h3, {paddingBottom: 10}]}>
          Convites {String(racerFriendsRequests.length)}
        </Text>
        {racerFriendsRequests.map((friendship) => {
          const racer = friendship.racer.id === loggedRacer?.id ? friendship.racerFriend : friendship.racer

          return (
            <Pressable 
              key={friendship.id}
              style={styles.friendCard}
              onPress={() => router.push(`profile/${racer.id}`)}
            >
              <Text style={TextsStyles.h4}>{racer.name}</Text>

              {racer.id !== loggedRacer?.id ? 
              <>
                <Pressable 
                  onPress={(e) => { 
                    e.stopPropagation()
                    onAcceptRequest(racer.id)
                  }} 
                style={{marginLeft: 'auto', paddingHorizontal: 6}}
                >
                  <Text style={TextsStyles.small}>Aceitar</Text>
                </Pressable>
                <Pressable 
                  onPress={(e) => { 
                    e.stopPropagation()
                    onDeleteRequest(racer.id)
                  }} 
                  style={{paddingHorizontal: 6}}
                >
                  <Text style={TextsStyles.small}>Recusar</Text>
                </Pressable>
              </>
              : <Text style={TextsStyles.small}>Pendente</Text>}
            </Pressable>
        )})}
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