import React, { useState } from 'react'
import { claseContext } from './Context'

const ProviderComponent = (props) => {
    const { children }=props
    const [userLogin,setUserLogin]=useState(undefined)
    const [listHour,setListHour]=useState([])
    const changeUser=(nuevoUser)=>{
        setUserLogin(nuevoUser)
    }
    const changeListHour=(listHours)=>{
      setListHour(listHours)
    }
  return (
    <claseContext.Provider value={{userLogin,changeUser,listHour,changeListHour}}>
        {children}
    </claseContext.Provider>
  )
}

export default ProviderComponent