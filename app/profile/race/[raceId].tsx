import { useLocalSearchParams } from "expo-router";
import { CardRecentTrack } from "@/components/CardRecentTrack";
import { CardTrack } from "@/components/CardTrack";
import { TextsStyles } from "@/components/styles/theme-components";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { TracksMock } from "@/@types/mock";
import { HeaderProfile } from "@/components/HeaderProfile";

export default function RaceIdPage() {
  const { raceId } = useLocalSearchParams();

  return (
    <ScrollView>
      <HeaderProfile />
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  cardsGrid: {
    gap: 10,
    paddingBottom: 20,
  }
})