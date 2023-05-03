
//Components
import { useState } from "react";
import AdminPageNameSkitActivity from "../components/AdminPageNameSkit";
import AdminPageSkitSelector from "../components/AdminPageSkitSelector";
import Navbar from "../components/Navbar";
import AdminPageSetTags from "../components/AdminPageSetTags";

export default function Admin() {
    const possibleComponents = { selector: "selector", nameSkit: "nameSkit" }
    const [currentComponent, setCurrentComponent] = useState(possibleComponents.nameSkit)

    return (
        <div
            id="adminPage"
            className="h-full justify-center items-center w-full rounded-lg mb-2">
            <Navbar userType='admin' />

            <div
                className="flex flex-col w-full items-center justify-center h-full">
                {currentComponent === possibleComponents.selector ? <AdminPageSkitSelector />
                    : (
                        <div className="flex flex-col w-full items-center gap-8">
                            <AdminPageSetTags />
                            <AdminPageNameSkitActivity />
                        </div>)
                }
            </div>

        </div>
    )
}