type AddressType = {
  street: string
  city:   string
  state: string
  zip:    string
}

type RankingType=  {
  rankingPodiums: number
  rankingWins:    number
}

type RaceSessions = {
  practiceMinutes:  number
  qualyMinutes:    number
  raceMinutes:     number
  raceLaps?: number
}

type RaceCategories = {
  id: string,
  name: string,
  price: string,
  equipmentPrice: string,
  trackProfile: TrackType,
  races: RacesType[]
}

export interface RacerProfileType {
  id: string,
  name: string,
  whatsapp: string,
  cpf?: string,
  password: string,
  ranking: RankingType,

  tracksUnlocked: TrackType[],
  races: RacesType[],
  hostedRaces: RacesType[],
  trackRecords: TrackRecords[]
}

export interface TrackType {
  id: string,
  email: string,
  name: string,
  availabilityStart: string,
  availabilityEnd: string,
  raceIntervals: string,
  address: AddressType,
  addressGoogleURL: string,
  whatsapp: string,
  website: string,
  trackModes: string[],
  
  racerProfiles: RacerProfileType[],
  categories: RaceCategories[],
  trackRecords: TrackRecords[],
  races: RacesType[]
}

export interface RacesType {
  id: string,
  date: string,
  time: string,
  trackMode?: string,
  sessions: RaceSessions,
  isFinished: boolean,
  isScheduled: boolean,

  category?: RaceCategories,
  track: TrackType,
  trackId: string,
  racerHost: RacerProfileType,
  racersProfiles: RacerProfileType[]
  racersProfileIds: string[]
}

export interface ChatType {
  id: string
  
  senderId: string
  message: string

  createdAt: string

  chatWithFriendshipId: string
}

export interface SocialFriendshipType {
  id: string
  
  chat: ChatType[]
  accepted: boolean

  racerFriendId: string
  racerFriend: RacerProfileType

  racerId: string
  racer: RacerProfileType
}

export interface TrackRecords {
  id: string,
  time: number,

  track: TrackType,
  racerProfile: RacerProfileType
}