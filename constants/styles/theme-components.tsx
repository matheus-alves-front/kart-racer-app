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
    borderBottomColor: 'transparent',
    borderBottomWidth: 4,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  tabActive: {
    borderBottomColor: colors.primary
  },
  tabButtonText: {
    color: colors.white,
    fontSize: 14,
  },
})

export const TextsStyles = StyleSheet.create({
  h1: {
    fontFamily: 'Michroma',
    fontSize: 22,
    lineHeight: 24,
    color: colors.white,
    paddingBottom: 8
  },
  h2: {
    fontFamily: 'Michroma',
    fontSize: 20,
    lineHeight: 22,
    color: colors.white,
  },
  h3: {
    fontFamily: 'Michroma',
    fontSize: 18,
    color: colors.white,
    lineHeight: 20
  },
  h4: {
    fontFamily: 'Michroma',
    fontSize: 14,
    lineHeight: 16,
    color: colors.white
  },
  p: {
    fontFamily: 'Michroma',
    fontSize: 12,
    color: colors.white,
  },
  small: {
    fontFamily: 'Michroma',
    fontSize: 10,
    color: colors.white,
  }
})

export const ViewStyles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
    paddingVertical: 4,
    marginBottom: 4,
  },
  tableRowText: {
    color: colors.white,
    fontSize: 18,
    flex: 1,
  }
})

export const InputStyles = StyleSheet.create({
  inputTextPrimary: {
    backgroundColor: colors.white,
    color: colors.gray,
    fontSize: 14,
    width: '100%',
    maxWidth: 350,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
  }
})
