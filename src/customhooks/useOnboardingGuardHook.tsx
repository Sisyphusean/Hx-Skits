//Import AppDataContex
import { AppDataContext } from '../contexts/appdatacontext'

//Import useContext hook
import { useContext } from 'react'

export const useIsUserTypeSet = () => {

    const { appData } = useContext(AppDataContext)

    return appData.userData.userType === "admin" || appData.userData.userType === "limited" ? true : false

} 