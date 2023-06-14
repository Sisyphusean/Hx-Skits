// React Imports
import React, { useCallback, useState } from "react"

//React Router
import { useLocation, useNavigate, Link } from "react-router-dom"

//React Hooks
import { useContext } from "react"

//Import App data context
import { AppDataContext } from "../contexts/appdatacontext"

//Hook
import { useIsUserLoggedIn } from "../customhooks/useIsUserLoggedIn"

/**
 * This is the component that renders the Navbar and controls it behavior
 * @returns Navbar React Component
 */
export default function Navbar() {
    const [isVisible, setVisibility] = useState(false)

    const location = useLocation().pathname
    const { isUserLoggedIn } = useIsUserLoggedIn()
    const { appData } = useContext(AppDataContext)

    /**
     * This function toggles the visibility of the navbar
     */
    const toggleMenu = () => {
        setVisibility(!isVisible)
    }


    const navigate = useNavigate()

    return (
        <nav className="sticky top-0 bg-charlestoneGreen p-2 z-10 mb-4
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
                    className="w-full flex
                    xxs:flex-col xxs:gap-2
                    sm:flex-row sm:gap-6">

                    {((location !== "/home" && location !== "/")) ?
                        <Link to={"home"}>
                            <button
                                type="button"
                                className="inline-block transition ease-in-out delay-150 text-charlestoneGreen
                    text-base m-0 items-center border-2 border-charlestoneGreen rounded p-2 py-0.25 mb-6
                    hover:bg-silver hover:scale-105 hover:text-charlestoneGreen
                    md:m-0 md:text-white md:border-white md:p-2 md:bg-transparent">
                                Switch to Community mode
                            </button>
                        </Link> : ""
                    }

                    {
                        (((location !== "/login" && location !== "/admin")))
                            ? <button
                                onClick={(event) => {
                                    event.preventDefault()
                                    navigate("/login")
                                }}
                                type="button"
                                className="inline-block transition ease-in-out delay-150 text-charlestoneGreen
                    text-base m-0 items-center border-2 border-charlestoneGreen rounded p-2 py-0.25 mb-6
                    hover:bg-silver hover:scale-105 hover:text-charlestoneGreen
                    md:m-0 md:text-white md:border-white md:p-2 md:bg-transparent">
                                {isUserLoggedIn ? "Switch to Mod mode" : "Login to the Skit Tool"}
                            </button> : ""
                    }

                    {(appData.userData.userType === "admin" && isUserLoggedIn) ?
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


                </div>
            </div>

        </nav>
    )
}