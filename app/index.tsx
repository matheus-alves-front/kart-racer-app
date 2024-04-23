import { CardRecentTrack } from "@/components/CardRecentTrack";
import { CardTrack } from "@/components/CardTrack";
import { TextsStyles } from "@/components/styles/theme-components";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { HeaderHome } from "@/components/HeaderHome";

import { TracksMock } from "@/@types/mock";
import { fetchInstance } from "./utils/fetchInstances";
import { useEffect, useState } from "react";
import { TrackType } from "@/@types/types";

export default function HomePage() {
  const [tracks, setTracks] = useState<TrackType[]>([])

  async function getTracks() {
    const tracksResponse: TrackType[] = await fetchInstance('/track-profile', {
      method: 'GET'
    })

    if (tracksResponse) setTracks(tracksResponse)
  }

  useEffect(() => {
    getTracks()
  }, [])

  useEffect(() => {
    console.log("tracks", tracks)

  }, [tracks])

  return (
    <ScrollView>
      <HeaderHome />
      <Text style={TextsStyles.h1}>Pistas Recentes:</Text>
      <ScrollView style={styles.cardsGrid} horizontal>
        {TracksMock.map((item, index) => (
          <CardRecentTrack 
            key={index}
            track={item}
          />
        ))}
      </ScrollView>
      <Text style={TextsStyles.h1}>Todas as Pistas</Text>
      <View style={styles.cardsGrid}>
        {tracks.map((item, index) => (
          <CardTrack
            key={index}
            track={item}
          />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  cardsGrid: {
    gap: 10,
    paddingBottom: 20,
  }
})