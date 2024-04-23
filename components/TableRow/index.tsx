import { Theme } from "@/constants/Colors"
import { BlurView } from "expo-blur"
import { ReactNode } from "react"
import { StyleSheet } from "react-native"

export const TableRow = ({
  children
}: {
  children: ReactNode
}) => {
  return (
    <BlurView style={styles.tableRow}>
      {children}
    </BlurView>
  )
}

const {
  colors
} = Theme

const styles = StyleSheet.create({
  tableRow: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  }
})