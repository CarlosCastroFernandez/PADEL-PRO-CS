import React, { useState } from 'react'
import { claseContext } from './Context'

const ProviderComponent = (props) => {
    const { children }=props
    const [userLogin,setUserLogin]=useState(undefined)
    const changeUser=(nuevoUser)=>{
        setUserLogin(nuevoUser)
    }
  return (
    <claseContext.Provider value={{userLogin,changeUser}}>
        {children}
    </claseContext.Provider>
  )
}

export default ProviderComponent