// React Imports
import React, { useState } from "react"

//Components
import { ReactComponent as Hamburger } from "../assets/hamburgerMenu.svg"

//Interface
import { navbarProps } from "../interfaces/interfaces"

/**
 * This is the component that renders the Navbar and controls it behavior
 * @returns Navbar React Component
 */
export default function Navbar(props: navbarProps) {
    const [isVisible, setVisibility] = useState(false)
    const userType = props.userType

    function toggleMenu() {
        setVisibility(!isVisible)
    }

    return (
        <nav className="md:flex md:flex-row md:flex-wrap md:justify-between">

            <div className="flex flex-row flex-wrap justify-between font-medium m-0 border-box content-center">
                <img title="Bababooey!!" alt="Hyphonix Logo" className="w-11" src="./favicons/android-chrome-512x512.png" />

                <div onClick={toggleMenu} className="flex flex-row flex-wrap align-center">
                    <img alt="Hamburger Icon" title=""
                        src={`${isVisible ? "/assets/xmark.svg" : "/assets/hamburgerMenu.svg"}`} className="w-7 md:hidden" />
                </div>
            </div>

            <div className={`align-center text-charlestoneGreen bg-white p-6 rounded mt-4  \
            md:flex md:flex-row md:gap-8 md:bg-transparent md:text-white md:visible
            ${!isVisible ? "invisible animate-y-down" : "visible animate-y-up"}`}>

                {userType === "admin" ?
                    <button type="button" className="inline-block transition ease-in-out delay-150 text-charlestoneGreen
                    text-base m-0 items-center border-2 border-charlestoneGreen rounded p-2 py-0.25 mb-6
                    hover:bg-silver hover:scale-105 hover:text-charlestoneGreen
                    md:m-0 md:text-white md:border-white md:p-2 md:bg-transparent">
                        Switch to Community mode
                    </button> : ""
                }

                <a href="" className="text-charlestoneGreen transition ease-in-out text-base m-0 flex items-center
                md:text-white
                hover:scale-105">
                    Are you a mod?
                </a>
            </div>

        </nav>
    )
}