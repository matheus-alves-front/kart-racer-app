import Constants from "expo-constants"

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

    const fetchJson = await fetchRequest.json()

    return fetchJson
  } catch(error) {
    throw new Error(JSON.stringify(error), {});
  }
}