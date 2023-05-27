//Import AppDataContex
import { AppDataContext } from '../contexts/appdatacontext'

//Import useContext hook
import { useContext } from 'react'

export const useIsUserTypeSet = () => {

    const { appData } = useContext(AppDataContext)

    let isUserTypeSet = appData.userData.userType === "admin" || appData.userData.userType === "limited" ? true : false
    let userType = appData.userData.userType

    return { isUserTypeSet, userType }

} 