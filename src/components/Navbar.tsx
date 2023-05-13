// React Imports
import React, { useCallback, useState } from "react"

//Components
import { ReactComponent as Hamburger } from "../assets/hamburgerMenu.svg"


//React Router
import { useLocation, useNavigate } from "react-router-dom"

//React Hooks
import { useContext } from "react"

//Import App data context
import { AppDataContext } from "../contexts/appdatacontext"

/**
 * This is the component that renders the Navbar and controls it behavior
 * @returns Navbar React Component
 */
export default function Navbar() {
    const [isVisible, setVisibility] = useState(false)

    const location = useLocation().pathname



    const { appData } = useContext(AppDataContext)

    /**
     * This function toggles the visibility of the navbar
     */
    const toggleMenu = () => {
        setVisibility(!isVisible)
    }


    const navigate = useNavigate()

    return (
        <nav className="sticky top-0 bg-charlestoneGreen p-2
        md:flex md:flex-row md:flex-wrap md:justify-between md:pt-0">

            <div className="flex flex-row flex-wrap justify-between font-medium m-0 border-box content-center">
                <img title="Bababooey!!" alt="Hyphonix Logo" className="w-11" src="/assets/hyphonixLogo.png" />

                <div onClick={toggleMenu} className="flex flex-row flex-wrap align-center">
                    <img alt="Hamburger Icon" title=""
                        src={`${isVisible ? "/assets/xmark.svg" : "/assets/hamburgerMenu.svg"}`} className="w-7 md:hidden" />
                </div>
            </div>


            <div className={`absolute align-center text-charlestoneGreen bg-white p-6 w-full rounded \
            md:flex md:flex-row md:gap-8 md:bg-transparent md:text-white md:visible md:relative md:w-auto
            ${!isVisible ? "invisible animate-y-down" : "visible animate-y-up"}`}>
                <div
                    className="w-full flex flex-col">

                    {((location !== "/home" && location !== "/")) ?
                        <button
                            onClick={(event) => {
                                event.preventDefault()
                                navigate("/home")
                            }}
                            type="button"
                            className="inline-block transition ease-in-out delay-150 text-charlestoneGreen
                    text-base m-0 items-center border-2 border-charlestoneGreen rounded p-2 py-0.25 mb-6
                    hover:bg-silver hover:scale-105 hover:text-charlestoneGreen
                    md:m-0 md:text-white md:border-white md:p-2 md:bg-transparent">
                            Switch to Community mode
                        </button> : ""
                    }

                    {(appData.userData.userType === "admin" && (location !== "/login" && location !== "/admin")) ?
                        <button
                            onClick={(event) => {
                                event.preventDefault()
                                navigate("/login")
                            }}
                            type="button"
                            className="inline-block transition ease-in-out delay-150 text-charlestoneGreen
                    text-base m-0 items-center border-2 border-charlestoneGreen rounded p-2 py-0.25 mb-6
                    hover:bg-silver hover:scale-105 hover:text-charlestoneGreen
                    md:m-0 md:text-white md:border-white md:p-2 md:bg-transparent">
                            Login to the Skit Tool
                        </button> : ""
                    }

                    {(appData.userData.userType === "admin" && (location === "/admin")) ?
                        <button
                            onClick={(event) => {
                                event.preventDefault()
                                navigate("/home")
                            }}
                            type="button"
                            className="inline-block transition ease-in-out delay-150 text-charlestoneGreen
                    text-base m-0 items-center border-2 border-charlestoneGreen rounded p-2 py-0.25 mb-6
                    hover:bg-silver hover:scale-105 hover:text-charlestoneGreen
                    md:m-0 md:text-white md:border-white md:p-2 md:bg-transparent">
                            Log out
                        </button> : ""
                    }

                    {
                        (appData.userData.userType === "limited" && location !== "/login") ?
                            <a
                                onClick={(event) => {
                                    event.preventDefault()
                                    navigate("/login")
                                }}
                                href=""
                                className="text-charlestoneGreen transition ease-in-out text-base m-0 flex items-center 
                                justify-center
                                md:text-white
                                hover:scale-105 hover:underline">
                                Are you a mod?
                            </a> : ""
                    }


                </div>
            </div>

        </nav>
    )
}