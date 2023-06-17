//import useContext hook
import { useContext } from "react"

//Contexts
import { AppDataContext } from "../contexts/appdatacontext"

export const useGetUserData = () => {
    const { appData, setAppData } = useContext(AppDataContext)

    return { appData, setAppData }
}