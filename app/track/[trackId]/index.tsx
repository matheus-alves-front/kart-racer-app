import { RacesType, TrackType } from "@/@types/types";
import { ScheduleRaceCards } from "@/components/ScheduleRaceCards";
import { ButtonsStyle, TextsStyles } from "@/constants/styles/theme-components";
import { Theme } from "@/constants/Colors";
import { fetchInstance, fetchInstanceWithToken } from "@/utils/fetchInstances";
import { getAddressLabels } from "@/utils/utils";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, Pressable, ScrollView } from "react-native";
import { useLoading } from "@/contexts/loadingContext";

const trackImage = require("../../../assets/images/track-big-image.png");

type TabsValues = "about" | "scheduleRaces" | "trackRecords" | "events"

const Tabs = [
  {
    value: 'about',
    label: 'Sobre'
  },
  {
    value: 'scheduleRaces',
    label: 'Reservas',
  },
  {
    value: 'trackRecords',
    label: 'Melhores Tempos',
  },
  {
    value: 'events',
    label: 'Eventos',
  }
] as {
  value: TabsValues,
  label: string
}[]

export default function TrackIdPage() {
  const { trackId } = useLocalSearchParams();

  const [tabActive, setTabActive] = useState<TabsValues>(Tabs[0].value)
  const [track, setTrack] = useState<TrackType | null>(null)

  const {setIsLoading} = useLoading()

  const getTrack = useCallback(async () => {
    setIsLoading(true)
    const trackResponse: TrackType = await fetchInstanceWithToken(`/track-profile/${trackId}`, {
      method: 'GET'
    })

    if (trackResponse) {
      setTrack(trackResponse)
      return setIsLoading(false)
    }

    router.back()
    return setIsLoading(false)
  }, [])

  const [racesSchedule, setRacesSchedule] = useState<RacesType[]>([])

  const getRacesSchedule = useCallback(async () => {
    const racesResponse: RacesType[] = await fetchInstanceWithToken(`/track/${trackId}/races`, {
      method: 'GET'
    })

    if (racesResponse) setRacesSchedule(racesResponse)
  }, [])


  useEffect(() => {
    getTrack()
    getRacesSchedule()
  }, [])

  if (!track) return (
    <View>
    </View>
  )

  return (
    <ScrollView>
      <View style={style.pageView}>
        <View style={style.header}>
          <Text style={TextsStyles.h1}>{track.name}</Text>
          <Image source={trackImage} style={style.image} />
        </View>
        <View style={ButtonsStyle.tabsGroup}>
          {Tabs.map((tab) => (
            <Pressable 
                key={tab.value}
                style={[
                  ButtonsStyle.tabButton,
                  tabActive === tab.value ? ButtonsStyle.tabActive : {}
                ]}
                onPress={() => setTabActive(tab.value)}
              >
              <Text style={ButtonsStyle.tabButtonText}>{tab.label}</Text>
            </Pressable>
          ))}
        </View>
        
        {tabActive === "about" ? 
          <View style={style.tabView}>
            <Text style={TextsStyles.p}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus saepe eius et recusandae, suscipit laudantium amet eveniet nesciunt ut est nihil officiis laborum quidem blanditiis quisquam molestias culpa assumenda minima ea vero! Eius, dignissimos deleniti. Repudiandae odio consequatur commodi! Impedit iste commodi aliquam veniam esse sequi? Praesentium perspiciatis beatae dolor.</Text>
            <Text style={TextsStyles.p}>Horários: {track.availabilityStart}h - {track.availabilityEnd}h</Text>
            <Text style={TextsStyles.p}>
                Categorias: {track.categories.map((item) => item.name)}
            </Text>
            <Text style={TextsStyles.p}>Endereço: </Text>
            <View style={style.addressSection}>
              {Object.entries(track.address).map(([key, value]) => {
                  return <Text key={key} style={TextsStyles.p}>{getAddressLabels(key)}: {value}</Text>;
              })}
            </View>
            <Text style={TextsStyles.p}>Email: {track.email}</Text>
            <Text style={TextsStyles.p}>Site: {track.website}</Text>
            <View style={{padding: 10}}></View>
            <Pressable
              style={[
                ButtonsStyle.button,
                style.whatsappButton
              ]}
              onPress={() => console.log(track.whatsapp)}
            >
              <Text
                style={[
                  ButtonsStyle.buttonText,
                  style.buttonText
                ]}
              >
                Whatsapp
              </Text>
            </Pressable>
          </View>
        : null}
        {tabActive === 'scheduleRaces' && racesSchedule.length ? 
          <View style={style.tabView}>
            {racesSchedule.map((race) => (
              <ScheduleRaceCards 
                key={race.id}
                race={race}
                trackId={String(trackId)}
              />
            ))}  
          </View>
        : null}
      </View>
    </ScrollView>
  );
}

const { colors, paddings } = Theme

const style = StyleSheet.create({
  pageView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: paddings.superSmall
  },
  header: {
   alignItems: 'center',
   gap: 20,
  },
  tabView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    width: '100%',
    gap: 10,
  },
  addressSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  image: {
    width: 300,
    height: 260,
    borderRadius: 5
  },
  whatsappButton: {
    backgroundColor: colors.black,
    width: '100%',
    marginTop: 'auto',
    marginBottom: 30,
  },
  buttonText: {
    color: colors.white
  }
});
