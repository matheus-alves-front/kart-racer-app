import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ButtonsStyle, TextsStyles, ViewStyles } from "@/components/styles/theme-components";
import { RacerProfilesMock, RacesMock } from "@/@types/mock";
import { useState } from "react";

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
  const { raceId } = useLocalSearchParams();

  let race = RacesMock.find((item) => item.id === raceId)

  const [tabActive, setTabActive] = useState(Tabs[0].value)

  return (
    <ScrollView>
      <View style={styles.textView}>
        <Text style={TextsStyles.h1}>Corrida: {race?.date}-{race?.time}</Text>
        <Text style={TextsStyles.h3}>Categoria: {race?.category}</Text>
        <Text style={TextsStyles.h3}>Pista: {race?.track.name}</Text>
        <Text style={TextsStyles.h3}>Traçado: {race?.trackMode}</Text>
        <Text style={TextsStyles.h3}>Pilotos: {race?.racersRegistered.length}</Text>
      </View>

      <View style={ButtonsStyle.tabsGroup}>
        {Tabs.map((tab) => (
           <TouchableOpacity 
              key={tab.value}
              style={[
                ButtonsStyle.tabButton,
                tabActive === tab.value ? ButtonsStyle.tabActive : {}
              ]}
              onPress={() => setTabActive(tab.value)}
            >
            <Text style={ButtonsStyle.tabButtonText}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {tabActive === 'racersRegistered' ? 
        <View>
          {RacerProfilesMock.map((racer, index) => (
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
        </View>
      : null}
      {tabActive === 'result' ? 
        <View>
          <Text style={TextsStyles.h3}>Sem resultados ainda...</Text>
          <Text style={[TextsStyles.h2, { paddingTop: 30, paddingBottom: 10 }]}>Tempo Total</Text>
          {RacerProfilesMock.map((racer, index) => (
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
          ))}
          <Text style={[TextsStyles.h2, { paddingTop: 30, paddingBottom: 10 }]}>Melhor Volta</Text>
          {RacerProfilesMock.map((racer, index) => (
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
          ))}
          <Text style={[TextsStyles.h2, { paddingTop: 30, paddingBottom: 10 }]}>Penalizações</Text>

          <Text style={[TextsStyles.h2, { paddingTop: 30, paddingBottom: 10 }]}>Observações da Prova</Text>

        </View>
      : null}
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  textView: {
    paddingTop: 50,
    gap: 4,
  }
})