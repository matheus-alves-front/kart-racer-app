
import { RacerProfileType } from "@/@types/types";
import { Theme } from "@/constants/Colors";
import { ButtonsStyle, InputStyles, TextsStyles } from "@/constants/styles/theme-components";
import { useLoading } from "@/contexts/loadingContext";
import { fetchInstance } from "@/utils/fetchInstances";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, TextInput, Pressable, Platform, KeyboardAvoidingView, ScrollView } from "react-native";

const LogoImageSrc = require('@/assets/images/kart-racer-app-logo.jpg') 

export default function RegisterPage() {
  const [credentials, setCredentials] = useState({
    name: '',
    birthDate: '',
    whatsapp: '',
    password: '',
    ranking: {
      rankingPodiums: 0,
      rankingWins: 0
    }
  })

  const [isDateShow, setIsDateShow] = useState(false)
  const [dateNow, setDateNow] = useState(new Date());

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || dateNow;
    setDateNow(currentDate);
    if (Platform.OS === 'android') {
      setIsDateShow(false);
    }
  };

  useEffect(() => {
    setCredentials({...credentials, birthDate: dateNow.toLocaleDateString('pt-BR')});
  }, [dateNow])

  const {setIsLoading} = useLoading()

  const registerSubmit = async () => {
    setIsLoading(true)
    const registerResponse: RacerProfileType = await fetchInstance('/racer-profile', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })

    if (registerResponse) {
      router.push('/')
      return setIsLoading(false)
    }

    setIsLoading(false)
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView overScrollMode="auto" style={{flex: 1}}>
        <View style={styles.formView}>
          <Image
            style={styles.logo}
            source={LogoImageSrc}
          />
          <Text style={[
            TextsStyles.h2,
            {
              paddingTop: 30,
              fontSize: 24
            }
          ]}>
            Kart Racer App
          </Text>
        </View>
        <View style={styles.formView}>
          <Text style={TextsStyles.h1}>
            Registre-se
          </Text>
          <TextInput 
            style={InputStyles.inputTextPrimary}
            onChangeText={(e) => setCredentials({...credentials, name: e})}
            value={credentials.name}
            placeholder="Seu Nome e Sobrenome"
          />
          <Pressable 
            style={[InputStyles.inputTextPrimary, { justifyContent: 'center' }]}
            onPress={() => setIsDateShow(true)}
          >
            <Text style={styles.dateTextButton}>{dateNow.toLocaleDateString('pt-BR')}</Text>
          </Pressable>
          {isDateShow && (
            <RNDateTimePicker 
              display={Platform.OS === 'ios' ? "spinner" : "default"}
              onChange={onChangeDate}
              value={dateNow}
              maximumDate={new Date(2300, 12, 31)}
              minimumDate={new Date(1950, 1, 1)}
            />
          )}
          <TextInput 
            style={InputStyles.inputTextPrimary}
            keyboardType="number-pad"
            onChangeText={(e) => setCredentials({...credentials, whatsapp: e})}
            value={credentials.whatsapp}
            placeholder="N. Celular"
          />
          <TextInput 
            style={InputStyles.inputTextPrimary}
            onChangeText={(e) => setCredentials({...credentials, password: e})}
            value={credentials.password}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Senha"
          />
        </View>
        <View style={styles.formView}>
          <Pressable 
            style={[
              ButtonsStyle.button,
              {
                width: '100%',
                maxWidth: 350,
                marginBottom: 20,
              }
            ]}
            onPress={registerSubmit}
          >
            <Text style={ButtonsStyle.buttonText}>
              Registrar
            </Text>
          </Pressable>
          <Pressable 
            style={ButtonsStyle.tabButton}
            onPress={() => router.push('/')}
          >
            <Text style={ButtonsStyle.tabButtonText}>
              Já tem uma conta? Faça Login
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const { colors } = Theme

const styles = StyleSheet.create({
  logo: {
    borderRadius: 20,
    width: 100,
    height: 100
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  formView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 20,
    flex: 1
  },
  dateTextButton: {
    color: colors.gray
  }
})