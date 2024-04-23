import { Theme } from "@/constants/Colors"
import { StyleSheet } from "react-native"

const { colors } = Theme

export const ButtonsStyle = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  buttonText: {
    fontFamily: 'Michroma',
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 12,
    paddingBottom: 16
  },
  tabsGroup: {
    paddingVertical: 20,
    flexDirection: `row`,
  },
  tabButton: {
    borderBottomColor: colors.black,
    borderBottomWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  tabButtonText: {
    color: colors.white,
    fontSize: 16,
  } 
})

export const TextsStyles = StyleSheet.create({
  h1: {
    fontFamily: 'Michroma',
    fontSize: 20,
    lineHeight: 22,
    color: colors.white,
    paddingBottom: 8
  },
  h2: {
    fontFamily: 'Michroma',
    fontSize: 18,
    lineHeight: 20,
    color: colors.white,
  },
  h3: {
    fontFamily: 'Michroma',
    fontSize: 16,
    color: colors.white,
    lineHeight: 18
  },
  h4: {
    fontFamily: 'Michroma',
    fontSize: 12,
    color: colors.white
  },
  p: {
    fontFamily: 'Michroma',
    fontSize: 10,
    color: colors.white
  }
})
