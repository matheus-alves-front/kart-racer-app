import Constants from "expo-constants"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

const API_URL = Constants.expoConfig?.extra?.apiURL

export async function fetchInstance(
  route: string,
  params: globalThis.RequestInit
) {
  try {
    console.log(`Fetch to: ${API_URL}${route}`)
    const fetchRequest = await fetch(`${API_URL}${route}`, {
      ...params,
      headers: {
        "Content-Type": 'application/json',
        ...params.headers
      },
    })

    if (!fetchRequest.ok) return {
      error: 'remote not ok',
      request: fetchRequest
    }

    const fetchJson = await fetchRequest.json()

    return fetchJson
  } catch(error) {
    throw new Error(JSON.stringify(error), {});
  }
}

export async function fetchInstanceWithToken(
  route: string,
  params: globalThis.RequestInit
) {
  const authToken = await getTokenStorage()
  try {
    console.log(`Fetch to: ${API_URL}${route}`)
    const fetchRequest = await fetch(`${API_URL}${route}`, {
      ...params,
      headers: {
        "Content-Type": 'application/json',
        "Authorization": String(authToken),
        ...params.headers
      },
    })

    if (!fetchRequest.ok || fetchRequest.status === 403) return null

    const fetchJson = await fetchRequest.json()

    return fetchJson
  } catch(error) {
    console.log('FETCH INSTANCE ERROR', error)
  }
}

export async function getTokenStorage() {
  try {
    return await AsyncStorage.getItem('token')
  } catch(err) {
    return ''
  }
}

export async function getProfileStorage() {
  return await AsyncStorage.getItem('profile')
}

export async function onLogOut() {
  try {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('profile')
    return router.push('/')
  } catch(err) {
    return ''
  }
}

export const onConnectAuth = async () => {
  const authToken = await getTokenStorage()

  if (!authToken) {
    onLogOut()
    return router.push('/')
  }
}

export const onConnectLogin = async () => {
  const authToken = await getTokenStorage()
  const profileId = await getProfileStorage()

  if (!authToken || !profileId) return

  return router.push('/home')
}
