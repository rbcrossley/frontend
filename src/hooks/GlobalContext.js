import React, { createContext } from 'react'

export const GlobalContext = createContext()

export const GlobalContextProvider = (props) => {
  return (
    <GlobalContext.Provider value="This information is from Global Context">
      {props.children}
    </GlobalContext.Provider>
  )
}
