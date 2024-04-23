import { useLocalSearchParams } from "expo-router";
import { HeaderProfile } from "@/components/HeaderProfile";
import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { ButtonsStyle, TextsStyles } from "@/components/styles/theme-components";
import { RacesMock } from "@/@types/mock";
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

  const race = RacesMock.find((item) => item.id === raceId)

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
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  textView: {
    paddingTop: 50,
    gap: 4,
  }
})