import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import { ButtonsStyle, TextsStyles, ViewStyles } from "@/constants/styles/theme-components";
import { useCallback, useEffect, useState } from "react";
import { RacesType } from "@/@types/types";
import { fetchInstanceWithToken, getProfileStorage } from "@/utils/fetchInstances";
import { useLoading } from "@/contexts/loadingContext";

const Tabs = [
  {
    value: 'racersRegistered',
    label: 'Pilotos'
  },

  {
    value: 'result',
    label: 'Resultado'
  }
]

export default function RaceIdPage() {
  const { raceId, trackId } = useLocalSearchParams();

  const { setIsLoading } = useLoading()

  const [race, setRace] = useState<RacesType | null>(null)
  const [profileId, setProfileId] = useState('')
  const isProfileOnrace = race?.racersProfiles.find((racer) => racer.id === profileId)

  const getProfileId = useCallback(async () => {
    const id = await getProfileStorage()
    if (id) return setProfileId(id)
  }, [])

  const getRace = useCallback(async () => {
    setIsLoading(true)
    const raceResponse: RacesType = await fetchInstanceWithToken(`/race/${raceId}`, {
      method: 'GET'
    })

    if (raceResponse) {
      setRace(raceResponse)
      return setIsLoading(false)
    }

    router.back()
    return setIsLoading(false)
  }, [raceId])

  const [tabActive, setTabActive] = useState(Tabs[0].value)

  useEffect(() => {
    getRace()
    getProfileId()
  }, [])

  const addProfileToRace = async (raceId: string, racerProfileId: string) => {
    setIsLoading(true)
    const addRacerResponse = await fetchInstanceWithToken(`/track/${trackId}/races/${raceId}/addRacer/${racerProfileId}`, {
      method: 'POST'
    })
  
    if (addRacerResponse) {
      const getUpdatedRace = await fetchInstanceWithToken(`/race/${raceId}`, {
        method: 'GET'
      })

      if (!getUpdatedRace) return router.back()

      setIsLoading(false)

      return setRace(getUpdatedRace)
    }
  }

  const removeProfileFromRace = async (raceId: string, racerProfileId: string) => {
    setIsLoading(true)
    const addRacerResponse = await fetchInstanceWithToken(`/track/${trackId}/races/${raceId}/removeRacer/${racerProfileId}`, {
      method: 'POST'
    })
  
    if (addRacerResponse) {
      const getUpdatedRace = await fetchInstanceWithToken(`/race/${raceId}`, {
        method: 'GET'
      })

      if (!getUpdatedRace) return router.back()

      setIsLoading(false)

      return setRace(getUpdatedRace)
    }
  }

  if (!race) return <View></View>

  return (
    <ScrollView style={{padding: 12}}>
      <View style={styles.textView}>
        <Text style={TextsStyles.h2}>Corrida:</Text>
        <Text style={TextsStyles.h1}>{race?.date}-{race?.time}</Text>
        <Text style={TextsStyles.h3}>Categoria: {race?.category ? race.category.name : 'Não Definido'}</Text>
        <Text style={TextsStyles.h3}>Pista: {race?.track?.name}</Text>
        <Text style={TextsStyles.h3}>Traçado: {race?.trackMode}</Text>
        <Text style={TextsStyles.h3}>Pilotos: {race?.racersProfiles?.length}</Text>
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

      {tabActive === 'racersRegistered' ? 
        <View style={styles.container}>
          {race?.racersProfiles.length ? 
            <>
              {race?.racersProfiles?.map((racer, index) => (
                <View style={ViewStyles.tableRow} key={racer.id}>
                  <Text style={ViewStyles.tableRowText} >{index + 1} - {racer.name}</Text>
                  <Text style={[
                    ViewStyles.tableRowText,
                    {
                      textAlign: 'right'
                    }
                  ]} >Reservado</Text>
                </View>
              ))}
            </>
          : <Text style={TextsStyles.h2}>Sem Pilotos Ainda...</Text>}
        </View>
      : null}
      
      {tabActive === 'result' ? 
        <View style={styles.container}>
          <Text style={TextsStyles.h3}>Sem resultados ainda...</Text>
          
          <Text style={[TextsStyles.h2, { paddingTop: 30, paddingBottom: 10 }]}>Tempo Total</Text>
          {/* {RacerProfilesMock.map((racer, index) => (
            <View style={ViewStyles.tableRow} key={racer.id}>
              <Text style={ViewStyles.tableRowText} >{index + 1} - {racer.name}</Text>
              <Text style={[
                ViewStyles.tableRowText,
                {
                  marginLeft: 40,
                }
              ]} >24:59:12</Text>
              <Text style={[
                ViewStyles.tableRowText,
                  {
                    textAlign: 'right',
                  }
                ]} 
              >
                {index === 0 ? '15 voltas' : '+0.700'}
              </Text>
            </View>
          ))} */}
          <Text style={[TextsStyles.h2, { paddingTop: 30, paddingBottom: 10 }]}>Melhor Volta</Text>
          {/* {RacerProfilesMock.map((racer, index) => (
            <View style={ViewStyles.tableRow} key={racer.id}>
              <Text style={ViewStyles.tableRowText} >{index + 1} - {racer.name}</Text>
              <Text style={[
                ViewStyles.tableRowText,
                {
                  marginLeft: 40,
                }
              ]} >00:59:12</Text>
              <Text style={[
                ViewStyles.tableRowText,
                  {
                    textAlign: 'right',
                  }
                ]} 
              >
                {index === 0 ? 'Melhor' : '+0.700'}
              </Text>
            </View>
          ))} */}
          <Text style={[TextsStyles.h2, { paddingTop: 30, paddingBottom: 10 }]}>Penalizações</Text>

          <Text style={[TextsStyles.h2, { paddingTop: 30, paddingBottom: 10 }]}>Observações da Prova</Text>

        </View>
      : null}
      
      {race?.racersProfiles || race?.racersProfiles.length  
      ? <>
          {isProfileOnrace 
          ?   
            <TouchableOpacity 
              style={[
                ButtonsStyle.button,
                styles.buttonLeftRace
              ]}
              onPress={() => removeProfileFromRace(race.id, profileId)}
            >
              <Text style={ButtonsStyle.buttonText}>Sair da Corrida</Text>
            </TouchableOpacity>
          : 
            <TouchableOpacity 
              style={[
                ButtonsStyle.button,
                styles.buttonScheduleRequest
              ]}
              onPress={() => addProfileToRace(race.id, profileId)}
            >
              <Text style={ButtonsStyle.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
          }
        </> 
      : 
        <TouchableOpacity 
          style={[
            ButtonsStyle.button,
            styles.buttonEnterRace
          ]}
          onPress={() => addProfileToRace(race.id, profileId)}
        >
          <Text style={ButtonsStyle.buttonText}>Entrar na Corrida</Text>
        </TouchableOpacity>
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  textView: {
    paddingTop: 50,
    gap: 4,
  },
  container: {
    paddingBottom: 30
  },
  buttonLeftRace: {

  },
  buttonEnterRace: {

  },
  buttonScheduleRequest: {
    
  }
})