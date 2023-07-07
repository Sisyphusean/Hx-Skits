import axios from 'axios';
import { apiResponse } from '../interfaces/apiinterfaces';

const environment = import.meta.env.VITE_ENV
const baseEnvUrl = environment === 'dev' ? import.meta.env.VITE_DEV_BE_BASE_URL : import.meta.env.VITE_BE_BASE_URL

const axiosInstance = axios.create({
    baseURL: baseEnvUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST'
})

/**
 * Getter is a function that fetches data from the backend
 * 
 * @param path This is the sub path of the url that you want to fetch data from
 * @returns The response from the path if successful
 */
export const getter = async (path: string, JWT: string | null = null): Promise<apiResponse> => {
    try {
        if (JWT) {
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${JWT}`
        }
        const response = await axiosInstance.get(path)
        return response.data as apiResponse
    } catch (error) {
        throw new Error("Failed to get data")
    }
}

/**
 * Poster is a function that sends data to the backend
 * 
 * @param path This is the sub path of the url that you want to fetch data from
 * @param data This is the data that you want to send to the backend
 * @param JWT This is the JWT that is sent to the backend in order to authenticate the user
 * @returns The response from the path if successful
 */
export const poster = async (
    path: string,
    data: Object,
    onLoading?: Function,
    JWT: string | null = null): Promise<apiResponse> => {
    try {

        if (JWT) {
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${JWT}`
        }

        if (onLoading) {
            onLoading(true)
        }

        const response = await axiosInstance.post(path, data)
        if (onLoading) {
            onLoading(false)
        }
        return response.data as apiResponse

    } catch (error) {
        if (onLoading) {
            onLoading(false)
        }

        if (axios.isAxiosError(error)) {
            // console.log(error.response?.data)
            return error.response?.data as apiResponse
        } else {
            console.log(error)
            throw new Error("Something went wrong")
        }
    }
}



