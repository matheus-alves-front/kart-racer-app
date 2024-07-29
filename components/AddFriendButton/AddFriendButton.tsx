import { RacerProfileType } from "@/@types/types"
import { ButtonsStyle, TextsStyles } from "@/constants/styles/theme-components"
import { LoggedUserContext } from "@/contexts/loggedUser"
import { fetchInstanceWithToken } from "@/utils/fetchInstances"
import { useRouter } from "expo-router"
import { useContext, useEffect, useState } from "react"
import { Pressable, Text } from "react-native"

export const AddFriendButton = ({
  racer,
  loggedId
}: {
  racer: RacerProfileType,
  loggedId: string
}) => {
  const router = useRouter()

  const {racerFriends, updateRacer, racerFriendsRequests} = useContext(LoggedUserContext)

  const addFriendRequest = async () => {
    await fetchInstanceWithToken(`/racer/${loggedId}/racer-socials/addFriend/${racer.id}`, {
      method: 'POST'
    })

    updateRacer()
  } 

  const isMyFriend = racerFriends.some((item) => item.racerId === racer.id || item.racerFriendId === racer.id)

  const findFriendshipId = racerFriends.find((item) => racer.id === item.racerId || racer.id === item.racerFriendId)

  return (
    <>
      {racerFriendsRequests.some((item) => item.racerId === racer.id || item.racerFriendId === racer.id) ?  (
        <Text style={[TextsStyles.h4, {
          textAlign: 'center',
          paddingVertical: 40
        }]}>Convite Pendente</Text>
      ) : null}

      {isMyFriend ? (
        <Pressable 
          onPress={() => router.push(`friendChat/${findFriendshipId?.id}`)} 
          style={[ButtonsStyle.button, { marginBottom: 30}]}
        >
          <Text style={ButtonsStyle.buttonText}>Enviar Mensagem</Text>
        </Pressable>
      )
      : (
        <Pressable onPress={addFriendRequest} style={[ButtonsStyle.button, { marginBottom: 30}]}>
          <Text style={ButtonsStyle.buttonText}>Adicionar Amigo</Text>
        </Pressable>
      )}
    </>
  )
}