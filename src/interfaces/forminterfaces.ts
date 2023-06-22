//Types
import { skitTypes } from "../types/types"

export interface loginForm {
    //This is the username of the user
    username: string,
    //This is the password of the user
    password: string
}

export interface adminSelectionForm {
    //Selected skit
    skitname: skitTypes
}