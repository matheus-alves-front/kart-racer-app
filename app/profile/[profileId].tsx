import { TextsStyles, ButtonsStyle } from "@/constants/styles/theme-components";
import { Text, View, StyleSheet, ScrollView, Touchable, Pressable } from "react-native";
import { HeaderProfile } from "@/components/HeaderProfile";
import { CardRaces, EmptyCardRace } from "@/components/CardRaces";
import { useCallback, useEffect, useState } from "react";
import { RacerProfileType } from "@/@types/types";
import { fetchInstanceWithToken, getProfileStorage } from "@/utils/fetchInstances";
import { useLocalSearchParams } from "expo-router";
import { useLoading } from "@/contexts/loadingContext";
import { AllFriends } from "@/components/AllFriends/AllFriends";

type isMeProfileSections = 'races' | 'friends' | 'invites' | 'shared'

const Tabs = [
  {
    value: 'races',
    label: 'Corridas'
  },
  {
    value: 'friends',
    label: 'Amigos',
  },
  {
    value: 'invites',
    label: 'Convites',
  },
  {
    value: 'shared',
    label: 'Compartilhados',
  }
] as {
  value: isMeProfileSections,
  label: string
}[]

export default function ProfilePage() {
  const { profileId } = useLocalSearchParams();
  const { setIsLoading } = useLoading()

  const [racer, setRacer] = useState<RacerProfileType | null>(null)
  const [isMe, setIsMe] = useState(false)
  
  const getProfile = useCallback(async () => {
    setIsLoading(true)
    const profileResponse: RacerProfileType = await fetchInstanceWithToken(`/racer-profile/${profileId}`, {
      method: 'GET'
    })
    
    if (profileResponse) {
      const loggedRacerProfileId = await getProfileStorage()
      const isMe = loggedRacerProfileId === profileId
      
      setIsMe(isMe)
      setRacer(profileResponse)
      return setIsLoading(false)
    }
  }, [])
  
  const [racerSection, setRacerSection] = useState<isMeProfileSections>('races')

  useEffect(() => {
    getProfile()
  }, [])

  if (!racer) return <View></View>

  const finishedRaces = racer.races.filter((race) => race.isFinished)
  const scheduledRaces = racer.races.filter((race) => race.isScheduled)
  const finishedHostedRaces = racer.hostedRaces.filter((race) => race.isFinished)
  const scheduledHostedRaces = racer.hostedRaces.filter((race) => race.isScheduled)

  return (
    <ScrollView>
      <View style={styles.container}>
        <HeaderProfile racer={racer}/>
        {!isMe ? 
          <Pressable style={[ButtonsStyle.button, { marginBottom: 30}]}>
            <Text style={ButtonsStyle.buttonText}>Adicionar Amigo</Text>
          </Pressable>
        : 
        <View style={ButtonsStyle.tabsGroup}>
          {Tabs.map((tab) => (
            <Pressable 
                key={tab.value}
                style={[
                  ButtonsStyle.tabButton,
                  racerSection === tab.value ? ButtonsStyle.tabActive : {}
                ]}
                onPress={() => setRacerSection(tab.value)}
              >
              <Text style={ButtonsStyle.tabButtonText}>{tab.label}</Text>
            </Pressable>
          ))}
        </View>
        }
        {/* <Text style={TextsStyles.p}>Este piloto é seu amigo</Text> */}
        {racerSection === 'friends' ? 
          <AllFriends />
        : null}
        {racerSection === 'races' ? 
          <>
            <Text style={TextsStyles.h1}>Ultimas Corridas:</Text>
            <ScrollView style={styles.cardsGrid} horizontal>
              {!finishedRaces.length ? 
                <EmptyCardRace phrase="Você ainda não tem corridas" />
              : 
              <>
                {finishedRaces.map((item, index) => {
                  return (
                    <CardRaces 
                      key={index}
                      race={item}
                    />
                  )
                })}
              </>
              }
            </ScrollView>
            <Text style={TextsStyles.h1}>Corridas Marcadas</Text>
            <View style={styles.cardsGrid}>
              {!scheduledRaces.length ? 
                  <EmptyCardRace phrase="Nenhuma corrida marcada" />
              :
                <>
                  {scheduledRaces.map((item, index) => (
                    <CardRaces 
                      key={index}
                      race={item}
                      withButton
                    />
                  ))}
                </>
              }
            </View>
            <Text style={TextsStyles.h1}>Melhores Tempos:</Text>
            <View style={styles.cardsGrid}>
              {!racer.trackRecords.length ? 
                  <EmptyCardRace phrase="Nenhuma corrida marcada" />
              : null}
            </View>
          </>
        : null}
      </View>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  cardsGrid: {
    gap: 10,
    paddingBottom: 20,
    paddingTop: 10,
  },
  container: {
    flex: 1,
    width: '100%',
    padding: 12
  },
})