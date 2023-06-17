//Import jwt library
import jwt_decode from 'jwt-decode'

//Import custom hook
import { useUsersJWT } from '../customhooks/useUsersJWT'
import { useGetUsername } from '../customhooks/useGetUsername'

//Interfaces
import { jwtDecodedInterface } from '../interfaces/datainterfaces'

/**
 * This function checks if the JWT is valid
 * @param JWT This is the JWT that is to be verified once the app is opened
 * @returns {boolean} A boolean indicating whether or not the JWT is valid
 */
export const checkUserTokenValidity = (userJWT: string, username: string) => {
    let isJWTValid = false
    let decodedJWT: jwtDecodedInterface = jwt_decode(userJWT)
    const currentTime = Date.now()
    const futureTime = currentTime + 60 * 1000;
    const expirationTime = decodedJWT.exp * 1000
    const initialTime = decodedJWT.iat * 1000
    const jwtUsername = decodedJWT.username


    if (currentTime < expirationTime
        && currentTime > initialTime
        && expirationTime > futureTime
        && username === jwtUsername) {
        isJWTValid = true
    }

    return isJWTValid
}