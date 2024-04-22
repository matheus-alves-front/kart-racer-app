export type RacerProfileType = {
  id: string,
  name: string,
  birthDate: string,
  whatsapp: string,
  ranking: string,
  racesFinished: RacesType[],
  racesScheduled: RacesType[],
  trackRecords: BestTimesType[]
}

export type TrackType = {
  id: string,
  name: string,
  address: {
    city: string,
    state: string
  },
  addressGoogleURL: string,
  whatsapp: string,
  email: string,
  website: string,

  categories: string[],
  trackModes: string[],
  races: RacesType[],
  bestTimes: BestTimesType[],
  events: []
}

export type RacesType = {
  id: string,
  date: string,
  time: string,
  track: TrackType,
  category: string,
  trackMode: string,
  price: string,
  equipmentPrice: string,
  racersRegistered: RacerProfileType[],
  racerHost: RacerProfileType,
  isReserved: boolean,
  result: any
}

export type BestTimesType = {
  id: string,
  racer: RacerProfileType,
  bestTime: string,
  track: TrackType,
}