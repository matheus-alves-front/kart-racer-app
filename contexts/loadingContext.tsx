import { createContext, ReactNode, useContext, useState } from "react";

interface LoadingContextProps {
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void
}

export const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('Context Error');
  }
  return context;
};

export const LoadingContext = createContext({} as LoadingContextProps)

export const LoadingContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{
      isLoading, 
      setIsLoading
    }}>
      {children}
    </LoadingContext.Provider>
  )
}