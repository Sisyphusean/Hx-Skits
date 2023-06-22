//import useContext hook
import { useContext } from "react"

//Contexts
import { AppDataContext } from "../contexts/appdatacontext"

export const useGetAppData = () => {
    const { appData, setAppData } = useContext(AppDataContext)

    return { appData, setAppData }
}