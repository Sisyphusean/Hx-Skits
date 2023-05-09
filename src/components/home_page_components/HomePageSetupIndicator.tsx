export default function HomePageSetupLevel() {
    let possibleStates = { complete: "completed", incomplete: "noNotifications", onboarding: "onboarding" }
    let state = possibleStates.complete

    function getDynamicButton(state: string) {
        let buttonText = "Complete Steps"
        let buttonStyle = "border-deepBlue-500 text-white bg-deepBlue-500 \
        hover:text-charlestoneGreen hover:font-bold hover:bg-deepBlue-100\
        active:text-deepBlue-500 active:font-bold active:bg-deepBlue-500 active:scale-95"
        let buttonIconSource = "./assets/arrowRight.svg"

        //Conditionally arrive at the button's text and styles
        if (state === possibleStates.onboarding) {
            buttonText = "Complete Steps"
            buttonStyle = "border-deepBlue-500 text-white bg-deepBlue-500 \
            hover:text-charlestoneGreen hover:font-bold hover:bg-deepBlue-100"
        }

        if (state === possibleStates.incomplete) {
            buttonIconSource = "./assets/warningIcon.svg"
            buttonText = "Enable Notifications"
            buttonStyle = "border-pomegranate-500 text-white bg-pomegranate-500 \
            hover:text-charlestoneGreen hover:font-bold hover:bg-pomegranate-100 \
            active:text-white active:font-bold active:bg-pomegranate-500 active:scale-95"
        }

        if (state === possibleStates.complete) {
            buttonIconSource = "./assets/instagramIcon.svg"
            buttonText = "Follow Sofia on Insta!"
            buttonStyle = "border-deepBlue-500 text-deepBlue-500 bg-white \
            hover:text-charlestoneGreen hover:font-bold hover:bg-deepBlue-100\
            active:text-white active:font-bold active:bg-deepBlue-500 active:scale-95"
        }

        return (
            <div
                className="flex flex-wrap flex-row m-0 p-0 gap-4">

                {/* Conditionally render the Sofia's image*/
                    state === possibleStates.complete
                        ? <img
                            src="./assets/sofiaFace.svg"
                            className="xxs:w-12 sm:w-auto"
                            title="Sofia's pretty face!"
                            alt="Sofia's pretty face!"
                        />
                        : ""
                }

                <button
                    type="button"
                    className={` 
                ${buttonStyle}
                    flex flex-row gap-2 items-center text-left border rounded-lg p-4 transition font-medium
                    hover:scale-105
                `}>
                    {buttonText}
                    <img
                        src={buttonIconSource}
                        alt="Instagram Icon"
                        title=""
                    />
                </button>
            </div>
        )
    }

    function getDynamicHeader(state: string) {
        let headerText: string = "Finish setting up your account and start having fun!"

        //Conditionally arrive at the button's text and styles
        if (state === possibleStates.onboarding) {
            headerText = "Finish setting up your account and start having fun!"
        }

        if (state === possibleStates.incomplete) {
            headerText = "Turn on your notifications or miss out on the fun."
        }

        return headerText
    }

    return (
        <div
            className="flex flex-col bg-white justify-top p-8 rounded-md text-charlestoneGreen w-full h-auto">
            <h4
                className="font-bold text-lg pb-2"
            >
                {getDynamicHeader(state)}
            </h4>

            {/* Dynamic Button as per designs */}
            {getDynamicButton(state)}

        </div>
    )
}