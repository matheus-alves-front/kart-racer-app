import { CardRecentTrack } from "@/components/CardRecentTrack";
import { CardTrack } from "@/components/CardTrack";
import { TextsStyles } from "@/constants/styles/theme-components";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { HeaderHome } from "@/components/HeaderHome";
import { fetchInstanceWithToken, onConnectAuth } from "@/utils/fetchInstances";
import { useCallback, useEffect, useState } from "react";
import { TrackType } from "@/@types/types";

export default function HomePage() {
  onConnectAuth()
  
  const [tracks, setTracks] = useState<TrackType[]>([])

  const getTracks = useCallback(async () => {
    const tracksResponse: TrackType[] = await fetchInstanceWithToken('/track-profile', {
      method: 'GET'
    })

    if (tracksResponse) setTracks(tracksResponse)
  }, [])

  useEffect(() => {
    getTracks()
  }, [])

  return (
    <ScrollView>
      <View style={{paddingHorizontal: 16, overflow: 'visible' }}>
        <HeaderHome />
        <Text style={TextsStyles.h1}>Pistas Recentes:</Text>
        <ScrollView style={styles.cardsGrid} horizontal>
          {tracks.map((item, index) => (
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