import { createContext, useState } from "react";

export const CountContext = createContext()

export const CountContextProvider = ({children}) => {
  const [count, setcount] = useState(0);


  return (
    <CountContext.Provider 
    value={count, setcount}
    >
      {children}
    </CountContext.Provider>
  )
}