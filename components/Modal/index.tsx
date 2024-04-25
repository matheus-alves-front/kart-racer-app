import { Theme } from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import { ReactNode } from "react"
import { Modal, Pressable, StyleSheet, View } from "react-native"

const {colors} = Theme

export const ModalUI = ({
  children,
  isVisible,
  isTransparent,
  onClose
}: {
  children: ReactNode,
  isVisible: boolean,
  onClose: () => void
  isTransparent?: boolean,
}) => {
  return (
    <Modal 
      animationType="fade"
      transparent
      visible={isVisible}
      style={styles.modal}
    >
      <View 
        style={styles.modalOverlay}
      >

      </View>
      <View style={styles.modalView}>
        <View style={[styles.modalContent, isTransparent ? styles.modalContentTransparent : {}]}>
          {isTransparent ? 
            <Pressable style={styles.modalCloseButton} onPress={onClose}>
              <Ionicons size={24} name="close" />
            </Pressable>
          : null}
          {children}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    position: 'relative',
    alignItems: 'center',
  },
  modalView: {
    elevation: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  modalContent: {
    borderRadius: 15,
    backgroundColor: colors.white,
    width: '80%',
    height: '50%',
    padding: 10,
    paddingTop: 36,
    position: 'relative'
  },
  modalContentTransparent: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    elevation: 0,
    backgroundColor: '#000000',
    opacity: 0.8,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  modalCloseButton: {
    position: 'absolute',
    right: 10, 
    top: 10
  },
})