
import { ModalUI } from "@/components/Modal";
import { useLoading } from "@/contexts/loadingContext";
import { Image, StyleSheet } from "react-native";

const loading = require("../../assets/images/loading.gif")

export const Loader = () => {
  const {isLoading} = useLoading()
  return (
    <ModalUI 
      isVisible={isLoading}
      onClose={() => null}
      isTransparent={true}
    >
      <Image
        style={styles.loadingImage}
        source={loading}
      />
    </ModalUI>
  )
}

const styles = StyleSheet.create({
  loadingImage: {
    width: 180,
    height: 90,
  }
})