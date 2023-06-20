
//Components
import { useState } from "react";
import AdminPageNameSkitActivity from "../components/admin_page_components/AdminPageNameSkit";
import AdminPageSkitSelector from "../components/admin_page_components/AdminPageSkitSelector";
import AdminPageSetTags from "../components/admin_page_components/AdminPageSetTags";
import Navbar from "../components/Navbar";

//Framer
import { motion } from "framer-motion";

//Animations
import { pageAnimations } from "../constants/animation";


export default function Admin() {
    const possibleComponents = { selector: "selector", nameSkit: "nameSkit" }
    const [currentComponent, setCurrentComponent] = useState(possibleComponents.nameSkit)

    return (
        <div
            id="adminPage"
            className="h-full justify-center items-center w-full rounded-lg mb-2">


            <div
                className="flex flex-col w-full items-center justify-center h-full">
                {/* {currentComponent === possibleComponents.selector
                    ? <AdminPageSkitSelector />
                    : (
                        <div className="flex flex-col w-full items-center gap-8">
                            <AdminPageSetTags />
                            <AdminPageNameSkitActivity />
                        </div>)
                } */}
                <AdminPageSkitSelector />
            </div>
        </div>
    )
}