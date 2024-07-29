import { ChatType, RacerProfileType } from "@/@types/types"
import { Theme } from "@/constants/Colors"
import { TextsStyles } from "@/constants/styles/theme-components"
import { formatTimeMessage } from "@/utils/formatDate"
import { StyleSheet, Text, View } from "react-native"

const {colors} = Theme

export const ChatRenderer = ({
  chat,
  loggedRacer
}: {
  chat: ChatType,
  loggedRacer: RacerProfileType
}) => {
  return (
    <View 
      key={chat.id}
      style={[
        styles.containerMessage,
        chat.senderId === loggedRacer.id ? styles.isMe : styles.isFriend
      ]}
    >
      <View style={[
        styles.chatMesageView,
        chat.senderId === loggedRacer.id ? styles.isMeMessage : styles.isFriendMessage
      ]}>
        <Text
          style={[
            styles.chatMessage,
            chat.senderId === loggedRacer.id ? styles.isMeAlign : styles.isFriendAlign
          ]}
        >
          {chat.message}
        </Text>
        <Text
          style={[
            TextsStyles.small,
            chat.senderId === loggedRacer.id ? styles.isMeAlign : styles.isFriendAlign
          ]}
        >
          {formatTimeMessage(chat.createdAt)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  isMeMessage: {
    backgroundColor: colors.black,
  },
  isFriendMessage: {
    backgroundColor: colors.gray,
  },
  isMe: {
    alignItems: 'flex-end',
  },
  isFriend: {
    alignItems: 'flex-start',
  },
  containerMessage: {
    padding: 10,
    display: 'flex',
  },
  chatMesageView: {
    // justifyContent: 'flex-start',
    borderRadius: 10,
    padding: 10
  },
  chatMessage: {
    fontFamily: 'Michroma',
    fontSize: 12,
    color: colors.white,
    width: 'auto',
    padding: 8,
    textAlign: 'right'
  },
  isMeAlign: {
    textAlign: 'right'
  },
  isFriendAlign: {
    textAlign: 'left'
  },
}) 