import React, { createContext, useState } from 'react'

export const DrinkContext = createContext(undefined);

const DrinkProvider = ({children}) => {
  const [drink, setDrink] = useState({});
  const value = {drink, setDrink}  
  return (
    <DrinkContext.Provider
    value={value}
    >{children}</DrinkContext.Provider>
  )
}

export default DrinkProvider