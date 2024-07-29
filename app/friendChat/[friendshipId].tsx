import { ChatType, RacerProfileType, SocialFriendshipType } from "@/@types/types";
import { ChatRenderer } from "@/components/Chat/ChatRenderer";
import { Theme } from "@/constants/Colors";
import { ButtonsStyle, InputStyles, TextsStyles } from "@/constants/styles/theme-components";
import { useLoading } from "@/contexts/loadingContext";
import { useLoggedUser } from "@/contexts/loggedUser";
import { fetchInstanceWithToken } from "@/utils/fetchInstances";
import { socketIo } from "@/utils/socketIo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const { colors } = Theme

export default function FriendChatPage() {
  const router = useRouter()
  const { loggedRacer } = useLoggedUser()
  const { setIsLoading } = useLoading()
  const { friendshipId } = useLocalSearchParams();

  const flatListRef = useRef<FlatList>(null);
  const [chatRender, setChatRender] = useState<ChatType[]>([])
  const [friendProfile, setFriendProfile] = useState<RacerProfileType | null>(null)
  const [isLoadingSending, setIsLoadingSending] = useState(false)

  const getChat = useCallback(async () => {
    setIsLoading(true)
    const chatResponse: SocialFriendshipType = await fetchInstanceWithToken(`/racer/${loggedRacer?.id}/racer-socials/chat/${friendshipId}`, {
      method: 'GET'
    })
    
    if (chatResponse) {
      console.log('chatResponse', chatResponse.racerFriend)
      setChatRender(chatResponse.chat)
      setFriendProfile(loggedRacer?.id === chatResponse.racerId ? chatResponse.racerFriend : chatResponse.racer)
    }

    return setIsLoading(false)
  }, [friendshipId])

  useEffect(() => {
    socketIo.on('connect', () => {
      console.log(`socket connected ${friendshipId}`)
    })
    socketIo.on(`racer-chat/friendship/${friendshipId}`, (body: ChatType) => {
      console.log('body', body)
      setChatRender(prevChatRender => [...prevChatRender, body]);
      setIsLoadingSending(false)
      flatListRef.current && flatListRef.current.scrollToEnd({ animated: true });
    });

    return () => {
      socketIo.off(`racer-chat/friendship/${friendshipId}`);
    }
  }, [friendshipId])

  useEffect(() => {
    getChat()
  }, [])

  if (!loggedRacer) return <View></View>

  const [messageInput, setMessageInput] = useState('')

  const onSendSubmitMessage = async () => {
    setIsLoadingSending(true)
    await fetchInstanceWithToken(`/racer/${loggedRacer.id}/racer-socials/chat/${friendshipId}`, {
      method: 'POST',
      body: JSON.stringify({
        message: messageInput
      })
    })

    setMessageInput('')
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push(`profile/${friendProfile?.id}`)} style={styles.header}>
        <Text style={TextsStyles.h4}>{friendProfile?.name}</Text>
      </Pressable>
      <View style={styles.chat}>
        <KeyboardAvoidingView>
          <FlatList
            ref={flatListRef}
            data={chatRender}
            scrollsToTop={false}
            renderItem={({index, item, separators}) => 
              <ChatRenderer 
              key={item.id}
              loggedRacer={loggedRacer} 
              chat={item} 
              />
            }
            keyExtractor={item => item.id}
            nestedScrollEnabled={true}
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.footer}>
        <TextInput placeholder="Escreva uma mensagem" placeholderTextColor={colors.black} value={messageInput} onChangeText={setMessageInput} style={[InputStyles.inputTextPrimary, styles.sendInput]} />
        <Pressable onPress={onSendSubmitMessage} style={ButtonsStyle.button}>
          <Text>{isLoadingSending ? 'Enviando' : 'Enviar'}</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  chat: {
    flex: 1
  },
  header: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  footer: {
    flexDirection: 'row',
    padding: 10,
    gap: 10
  },
  sendInput: {
    width: 'auto',
    flex: 1,
  }
})