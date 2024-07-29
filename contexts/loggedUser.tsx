import { RacerProfileType, SocialFriendshipType } from "@/@types/types";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { LoadingContext } from "./loadingContext";
import { fetchInstanceWithToken, getProfileStorage } from "@/utils/fetchInstances";

interface LoggedUserContextProps {
  loggedRacer: RacerProfileType | null,
  updateRacer: () => Promise<void>
  setLoggedRacer: (racer: RacerProfileType) => void
  racerFriends: SocialFriendshipType[]
  racerFriendsRequests: SocialFriendshipType[]
}

export const LoggedUserContext = createContext({} as LoggedUserContextProps)

export const useLoggedUser = (): LoggedUserContextProps => {
  const context = useContext(LoggedUserContext);
  if (!context) {
    throw new Error('Context Error');
  }
  return context;
};

export const LoggedUserContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const { setIsLoading } = useContext(LoadingContext)
  const [loggedRacer, setLoggedRacer] = useState<RacerProfileType | null>(null)
  const [racerFriends, setRacerFriends] = useState<SocialFriendshipType[]>([])
  const [racerFriendsRequests, setRacerFriendsRequests] = useState<SocialFriendshipType[]>([])


  const updateRacerFriends = useCallback(async (profileId: string) => {
    const friendsResponse: SocialFriendshipType[] = await fetchInstanceWithToken(`/racer/${profileId}/racer-socials/friends`, {
      method: 'GET'
    })

    const friendsRequestsResponse: SocialFriendshipType[] = await fetchInstanceWithToken(`/racer/${profileId}/racer-socials/friend-requests`, {
      method: 'GET'
    })

    console.log('friendsResponse', friendsResponse)
    
    if (friendsResponse) {
      setRacerFriends(friendsResponse)
    }

    if (friendsRequestsResponse) {
      setRacerFriendsRequests(friendsRequestsResponse)
    }
  }, [])

  const updateRacer = useCallback(async () => {
    setIsLoading(true)
    const profileId = await getProfileStorage()
    const profileResponse: RacerProfileType = await fetchInstanceWithToken(`/racer-profile/${profileId}`, {
      method: 'GET'
    })
    
    setIsLoading(false)
    
    if (profileResponse) {
      setLoggedRacer(profileResponse)
      updateRacerFriends(profileResponse.id)
    }

  }, [])

  
  useEffect(() => {
    setIsLoading(false)
  }, [racerFriendsRequests, racerFriends])


  return (
    <LoggedUserContext.Provider value={{
      loggedRacer,
      setLoggedRacer,
      updateRacer,
      racerFriends,
      racerFriendsRequests
    }}>
      {children}
    </LoggedUserContext.Provider>
  )
}