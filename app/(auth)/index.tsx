
import { ButtonsStyle, InputStyles, TextsStyles } from "@/constants/styles/theme-components";
import { fetchInstance, onConnectLogin } from "@/utils/fetchInstances";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {  } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View, Image, StyleSheet, TextInput, Pressable, KeyboardAvoidingView } from "react-native";

const LogoImageSrc = require('@/assets/images/kart-racer-app-logo.jpg') 

export default function LoginPage() {
  onConnectLogin()
  
  const [whatsapp, setWhatsapp] = useState('')
  const [password, setPassword] = useState('')

  const loginSubmit = async () => {
    const loginResponse = await fetchInstance('/racer-profile/login', {
      method: 'POST',
      body: JSON.stringify({
        whatsapp,
        password
      })
    })

    if (loginResponse.token) {
      try {
        await AsyncStorage.setItem('token', loginResponse.token)
        router.push('/home')
      } catch(err) {
        console.log(err)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={LogoImageSrc}
      />
      <Text style={[
        TextsStyles.h2,
        {
          paddingTop: 30,
          fontSize: 30
        }
      ]}>Kart Racer App</Text>
      <View style={styles.formView}>
        <Text style={TextsStyles.h1}>
          Login
        </Text>
        <TextInput 
          style={InputStyles.inputTextPrimary}
          onChangeText={setWhatsapp}
          value={whatsapp}
          placeholder="N. Celular"
        />
        <TextInput 
          style={InputStyles.inputTextPrimary}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Senha"
        />
      </View>
      <Pressable 
        style={[
          ButtonsStyle.button,
          {
            width: '100%',
            maxWidth: 350,
            marginBottom: 20,
          }
        ]}
        onPress={loginSubmit}
      >
        <Text style={ButtonsStyle.buttonText}>
          Entrar
        </Text>
      </Pressable>
      <Pressable 
        style={ButtonsStyle.tabButton}
        onPress={() => router.push('/register')}
      >
        <Text style={ButtonsStyle.tabButtonText}>
          Não tem uma conta? Registre-se Aqui
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    borderRadius: 20,
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 20,
  },
  formView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    flex: 1
  }
})