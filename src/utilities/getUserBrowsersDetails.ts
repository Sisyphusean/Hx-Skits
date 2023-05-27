//Import utilities
import { supportedBrowsers } from "../types/types";
import { checkIfBrowserSupportsPwa } from "./checkifbrowsersupportspwa";
import { getPlatform } from "./getplatformdetails";

const checkBrowserBrandName = (brandName: supportedBrowsers) => {

    try {

        let brandDataArray: [] = (navigator as any).userAgentData.brands

        return brandDataArray.map((brandObject: any) => {

            if (brandObject.brand === brandName) {
                (
                    import.meta.env.VITE_ENV === "dev" ?
                        console.log(`Is ${brandObject.brand} equal to ${brandName}: ${brandObject.brand === brandName}`)
                        : ""
                )
                return true
            }

        })

    } catch (error) {
        console.error("Browser unsupported")
        return false
    }

}

let userOs = getPlatform()

export default function getUserBrowsersDetails() {
    const userAgent = navigator.userAgent;
    let browserName: string = "unknown";
    let doesBrowserSupportPwa: boolean = checkIfBrowserSupportsPwa();

    if (userAgent.includes("Firefox")) {
        browserName = "firefox";
    } if (userAgent.includes("SamsungBrowser")) {
        browserName = "samsung internet";
    } if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
        browserName = "opera";
    } if (userAgent.includes("Trident")) {
        browserName = "internet explorer";
    }
    if (userAgent.includes("Chrome")) {

        if (checkBrowserBrandName("Brave")) {
            browserName = "brave"
        }

        if (checkBrowserBrandName("Google Chrome")) {
            browserName = "chrome"
        }

    }
    if (userAgent.includes("Edg")) {
        browserName = checkBrowserBrandName("Microsoft Edge") ? "edge" : "unknown";
    }
    if (userAgent.includes("Safari") && userOs === "ios" || userOs === "macos") {
        browserName = "safari";
    }

    return { browserName, doesBrowserSupportPwa };
}