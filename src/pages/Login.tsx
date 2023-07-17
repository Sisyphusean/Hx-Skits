// Components
import Input from "../components/TextInput"

//Services
import { poster } from "../services/apirequests"

//RHF
import { useForm } from "react-hook-form";

//Interfaces
import { toastHandler } from "../utilities/toastHandler";
import { loginResponse } from "../interfaces/apiinterfaces";

//Import custom hooks
import { useSetAppData } from "../customhooks/useSetAppData";

//AppData Context
import { AppDataContext } from "../contexts/appdatacontext";
import { appData as appDataType } from "../interfaces/datainterfaces";

//React Hooks
import { useContext, useState } from "react";

//React Router Hooks
import { useNavigate } from "react-router-dom";

//Framer Motion Imports
import { motion, useAnimate } from "framer-motion"

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { appData } = useContext(AppDataContext)
    const [isApiLoading, setApiLoadingState] = useState(false)
    const [scope, animate] = useAnimate()
    const navigate = useNavigate()
    const customSetAppData = useSetAppData()
    let usernameErrorMessage = null
    let passwordErrorMessage = null


    const onLoading = (isRequestLoading: boolean) => {
        if (isRequestLoading) {
            setApiLoadingState(true)
        } else {
            setApiLoadingState(false)
        }
    }

    //HandleLogin
    const handleLogin = async (formData: any) => {

        if (!errors.password && !errors.username) {
            poster(
                import.meta.env.VITE_LOGIN_PATH,
                { username: formData.username.toLocaleLowerCase(), password: formData.password },
                onLoading).then(
                    (apiResponse) => {
                        if (apiResponse.status == 400) {
                            toastHandler.showErrorToast("You've entered an invalid username or password. Please try again", "top-right")
                            return
                        }

                        toastHandler.showSuccessToast("You've successfully logged in", "top-right")
                        let { id, username, token } = apiResponse.data as loginResponse
                        let newData: appDataType = {
                            ...appData,
                            userData: {
                                ...appData.userData,
                                userId: id,
                                username: username,
                                userToken: token,
                                userType: "admin",
                                isUserLoggedIn: true
                            }
                        }

                        //Update user data to reflect the new user data
                        customSetAppData(newData)
                        setTimeout(() => {
                            navigate("/admin")
                        }, 2000)
                    }
                )
        }
    }

    //Error validation for form
    if (errors.username?.type === "required") {
        usernameErrorMessage = "Please enter your username"
    }
    if (errors.password?.type === "required") {
        passwordErrorMessage = "Please enter your password"
    }


    return (
        <div className="flex flex-col h-full px-4 md:pt-0 w-full ">

            <div className="flex flex-wrap lg:px-32 md:px-16 justify-center 
            content-center h-full">

                <div className="flex flex-col w-11/12 md:w-7/12 lg:w-6/12 xl:w-5/12">

                    <div className="bg-white px-8 py-14 rounded-md">
                        <h5 className="text-charlestoneGreen font-bold">
                            Login to your Mod account
                        </h5>

                        <div className="pt-4">
                            <form action=""
                                onSubmit={handleSubmit(handleLogin)}
                                className="text-charlestoneGreen flex flex-col flex-wrap gap-4">

                                <Input
                                    id="username"
                                    errorMessage={usernameErrorMessage}
                                    helpText={null}
                                    label="Username"
                                    type="text"
                                    placeholder="Enter your username"
                                    register={register}
                                />

                                <Input
                                    id="password"
                                    errorMessage={passwordErrorMessage}
                                    helpText={null}
                                    label="Password"
                                    type="password"
                                    placeholder="Enter your password"
                                    register={register}
                                />

                                <button
                                    disabled={isApiLoading}
                                    type="submit"
                                    className="flex flex-row gap-2 align-middle items-center justify-center
                                     border-2 text-white bg-deepBlue-500
                                    rounded-lg py-4 px-8 transition font-medium ml-auto mt-4
                                    xxs:w-full
                                    sm:w-auto	
                                    hover:font-medium hover:bg-belizeHole-500 hover:scale-105
                                    active:text-white active:font-bold active:bg-deepBlue-500 active:scale-95">

                                    {isApiLoading ? "Logging you in" : "Login"}


                                    <motion.div
                                        className="m-0 p-0 flex flex-row"
                                        animate={isApiLoading ? { rotate: [0, 360] } : { rotate: 0 }}
                                        transition={isApiLoading
                                            ? {
                                                ease: "linear",
                                                duration: 1.5,
                                                flip: Infinity,
                                                repeat: Infinity
                                            } : { duration: 0, flip: 0, repeat: 0 }}
                                    >
                                        <img
                                            ref={scope}
                                            title=""
                                            alt={isApiLoading ? "Loading Spinner" : "Right arrow"}
                                            className={`inline-block ${isApiLoading ? "ml-2" : "pl-1"}`}
                                            src={isApiLoading ? "./assets/spinner-third.svg" : "./assets/arrowRight.svg"} />
                                    </motion.div>
                                </button>
                            </form>
                        </div>

                    </div>

                </div>

            </div>
        </div >
    )
}