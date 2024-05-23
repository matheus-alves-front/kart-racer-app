import { CardRecentTrack } from "@/components/CardRecentTrack";
import { CardTrack } from "@/components/CardTrack";
import { TextsStyles } from "@/constants/styles/theme-components";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { HeaderHome } from "@/components/HeaderHome";
import { fetchInstanceWithToken, onConnectAuth, onLogOut } from "@/utils/fetchInstances";
import { useCallback, useEffect, useState } from "react";
import { TrackType } from "@/@types/types";
import { useLoading } from "@/contexts/loadingContext";

export default function HomePage() {
  onConnectAuth()
  
  const [tracks, setTracks] = useState<TrackType[] | null>(null)
  const {setIsLoading} = useLoading()

  const getTracks = useCallback(async () => {
    setIsLoading(true)
    const tracksResponse: TrackType[] = await fetchInstanceWithToken('/track-profile', {
      method: 'GET'
    })

    if (tracksResponse) {
      setTracks(tracksResponse)
      return setIsLoading(false)
    }

    onLogOut()

    return setIsLoading(false)
  }, [])

  useEffect(() => {
    getTracks()
  }, [])

  if (!tracks) {
    return (
      <View><Text>""</Text></View>
    )
  }

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