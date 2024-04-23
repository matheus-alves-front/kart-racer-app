import { RacerProfileType, RacesType, TrackType } from "./types";

export const RacerProfilesMock: RacerProfileType[] = [
  {
    id: '213',
    birthDate: '30/03/2000',
    name: 'Matheus',
    racesFinished: [],
    racesScheduled: [],
    ranking: 'Amador',
    trackRecords: [],
    whatsapp: '9323223'
  },
  {
    id: '2223',
    birthDate: '30/03/2000',
    name: 'Matheus',
    racesFinished: [],
    racesScheduled: [],
    ranking: 'Amador',
    trackRecords: [],
    whatsapp: '9323223'
  }
]

export const TracksMock: TrackType[] = [
  {
    id: 'string',
    name: 'string',
    address: {
      city: 'string',
      state: 'string'
    },
    addressGoogleURL: 'string',
    whatsapp: 'string',
    email: 'string',
    website: 'string',

    categories: ['string'],
    trackModes: ['string'],
    races: [],
    bestTimes: [],
    events: []
  },
  {
    id: 'string',
    name: 'string',
    address: {
      city: 'string',
      state: 'string'
    },
    addressGoogleURL: 'string',
    whatsapp: 'string',
    email: 'string',
    website: 'string',

    categories: ['string'],
    trackModes: ['string'],
    races: [],
    bestTimes: [],
    events: []
  }
]

export const RacesMock: RacesType[] = [
  {
    id: '1',
    date: '30/03/2000',
    time: '15h-16h',
    equipmentPrice: '90',
    price: '80',
    isReserved: true,
    racerHost: RacerProfilesMock[0],
    racersRegistered: RacerProfilesMock,
    category: TracksMock[0].categories[0],
    track: TracksMock[0],
    trackMode: 'Track 1',
    result: null,
  },
  {
    id: '1',
    date: '30/03/2000',
    time: '15h-16h',
    equipmentPrice: '90',
    price: '80',
    isReserved: true,
    racerHost: RacerProfilesMock[0],
    racersRegistered: RacerProfilesMock,
    category: TracksMock[0].categories[0],
    track: TracksMock[0],
    trackMode: 'Track 1',
    result: null,
  }
]

RacerProfilesMock[0].racesFinished = RacesMock
RacerProfilesMock[0].racesScheduled = RacesMock