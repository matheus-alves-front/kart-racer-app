export interface RacerProfileType {
  id: string,
  name: string,
  birthDate: string,
  whatsapp: string,
  ranking: string,
  racesFinished: RacesType[],
  racesScheduled: RacesType[],
  trackRecords: BestTimesType[]
}

export interface TrackType {
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

export interface RacesType {
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
  result: null
}

export interface BestTimesType {
  id: string,
  racer: RacerProfileType,
  bestTime: string,
  track: TrackType,
}