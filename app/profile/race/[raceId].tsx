import { useLocalSearchParams } from "expo-router";
import { HeaderProfile } from "@/components/HeaderProfile";
import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { ButtonsStyle, TextsStyles } from "@/components/styles/theme-components";
import { RacesMock } from "@/@types/mock";
import { TableRow } from "@/components/TableRow";

export default function RaceIdPage() {
  const { raceId } = useLocalSearchParams();

  const race = RacesMock.find((item) => item.id === raceId)

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
        <TouchableOpacity style={ButtonsStyle.tabButton}>
          <Text style={ButtonsStyle.tabButtonText}>Pilotos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ButtonsStyle.tabButton}>
          <Text style={ButtonsStyle.tabButtonText}>Resultado</Text>
        </TouchableOpacity>
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