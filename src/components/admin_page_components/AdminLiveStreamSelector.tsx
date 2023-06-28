
//Compoents
import Input from "../TextInput"
import RadioInput from "../Radio"
import Button from "../Button"
import { SVG } from "../svgs/svgs"

//Import RHF
import { useForm } from "react-hook-form"

//Interfaces
import { adminLiveStreamSelectorProps } from "../../interfaces/propinterfaces"
import { appData, liveData, skitData } from "../../interfaces/datainterfaces"

//Types
import { skitTypes } from "../../types/types"

//Custom hooks
import { useGetAppData } from "../../customhooks/useGetAppData"
import { toastHandler } from "../../utilities/toastHandler"
import { useSetAppData } from "../../customhooks/useSetAppData"

//React hooks
import { useEffect, useCallback, useState } from "react"

//Framer
import { motion, AnimatePresence } from "framer-motion"

//Constants
import { opacity } from "../../constants/animation"

//Custom Components
import Select from "../SelectInput"


export default function AdminLiveStreamSelector(props: adminLiveStreamSelectorProps) {

    let { minified } = props
    const { appData } = useGetAppData()
    const defaultValues = {
        streamingOn: appData.liveData.isHyphonixLiveOnYoutube ? "youtube" : appData.liveData.isHyphonixLiveOnTwitch ? "twitch" : "none",
        streamlink: appData.liveData.isHyphonixLiveOnYoutube ? appData.liveData.linkToHyphonixYoutube : appData.liveData.isHyphonixLiveOnTwitch ? appData.liveData.linkToHyphonixTwitch : "",
        activityType: appData.skitData.currentSkit ? appData.skitData.currentSkit : "none"
    }
    const [isMinified, toggleMinified] = useState(minified)
    const { register, handleSubmit, setError, watch, reset, formState: { errors } } = useForm({})
    const setAppData = useSetAppData()
    const watchedStreamingOn: string = watch("streamingOn")
    const [currentStreamPlatform, changeCurrentStreamPlatform] = useState(watchedStreamingOn)
    const skitTypes: skitTypes[] = ['none', 'nameSkit', 'raid']
    const displayedUserOptions = ["None (John is just livestreaming random stuff)", "Community Name Skit", "Raid Shadow Legends"]
    let capitalizedCurrentPlatform = currentStreamPlatform ? currentStreamPlatform[0].toUpperCase() + currentStreamPlatform.substring(1) : ""

    useEffect(() => {
        //Reset values to default  when user arrives at the page for the first time for better UX
        reset(defaultValues)
    }, [])

    useEffect(() => {
        changeCurrentStreamPlatform((prev) => {
            return watchedStreamingOn
        })
    }, [watchedStreamingOn])

    const validateLink = (url: string) => {
        const youtubeRegex = /^(https?:\/\/)?((w{3}\.)?)youtu(be\.com|\.be)(\/watch\?v=|\/\d\/|\/embed\/|\/v\/|.+\?v=)?([^#\&\?\n]*)/;
        const twitchRegex = /^(https?:\/\/)?((w{3}\.)?)twitch(\.tv|tv\.com)(\/\w+)*\/?$/;

        return youtubeRegex.test(url) || twitchRegex.test(url)
    }

    const saveLiveStream = (formData: any) => {

        const { streamingOn, streamlink, activityType } = formData
        
        if (validateLink(formData.streamlink) || streamingOn === "none") {

            let modifiedLiveData: liveData = {
                currentOmegleTags: [],
                isHyphonixLiveOnTwitch: false,
                isHyphonixLiveOnYoutube: false,
                linkToHyphonixTwitch: "",
                linkToHyphonixYoutube: ""
            }

            let modifiedCurrentSkit: skitData = {
                currentSkit: "none",
                nameSkitData: { marksCurrentName: "", shouldTheMarkBeGaslight: false }
            }

            if (streamingOn === "twitch") {
                modifiedLiveData = {
                    ...modifiedLiveData,
                    isHyphonixLiveOnTwitch: true,
                    linkToHyphonixTwitch: streamlink,
                    isHyphonixLiveOnYoutube: false,
                    linkToHyphonixYoutube: ""
                }
            }

            if (streamingOn === "youtube") {
                modifiedLiveData = {
                    ...modifiedLiveData,
                    isHyphonixLiveOnYoutube: true,
                    linkToHyphonixYoutube: streamlink,
                    isHyphonixLiveOnTwitch: false,
                    linkToHyphonixTwitch: ""
                }
            }

            if (activityType === "nameSkit" && streamingOn !== "none") {
                modifiedCurrentSkit = {
                    ...modifiedCurrentSkit,
                    currentSkit: "nameSkit"
                }
            }

            let updatedLiveStreamAppData: appData = {
                ...appData,
                skitData: modifiedCurrentSkit,
                liveData: modifiedLiveData

            }

            toggleMinified(true)
            setAppData(updatedLiveStreamAppData)
        }

        if (!validateLink(formData.streamlink)) {
            setError("streamlink", { message: "Please enter a valid link" })
        }
    }

    const getForm = useCallback(() => {
        if (!isMinified) {
            return (
                <form
                    onSubmit={handleSubmit(saveLiveStream)}
                    className="flex flex-col gap-8"
                >

                    <div className="m-0 p-0">
                        <fieldset

                            className="pt-2 flex sm:flex-row gap-4 xxs:flex-col">
                            <legend>Where is Hyphonix streaming?</legend>
                            <RadioInput
                                id="youtube"
                                label="Youtube"
                                name="streamingOn"
                                value="youtube"
                                additionalVariables={{ platform: "youtube" }}
                                register={register} />

                            <RadioInput
                                id="twitch"
                                label="Twitch"
                                name="streamingOn"
                                value="twitch"
                                additionalVariables={{ platform: "twitch" }}
                                register={register} />

                            <RadioInput
                                id="none"
                                label="Not streaming"
                                name="streamingOn"
                                value="none"
                                register={register} />
                        </fieldset>
                    </div>

                    {
                        currentStreamPlatform !== "none" &&
                        <div >
                            <Input
                                id="streamlink"
                                label={`What's the link to the stream?`}
                                placeholder="e.g https://youtube.com/watch?v=dQw4w9WgXcQ"
                                type="text"
                                helpText={null}
                                errorMessage={errors.streamlink && errors.streamlink.message as string}
                                register={register}
                            />
                        </div>

                    }

                    {currentStreamPlatform !== "none" &&
                        <Select
                            id="activityType"
                            label={`What is Hyphonix currently doing on ${capitalizedCurrentPlatform}?`}
                            helpText={null}
                            title="Activity selector"
                            errorMessage={errors.skitType && errors.skitType.message as string}
                            placeholder="Select an activity"
                            options={skitTypes}
                            displayedOptions={displayedUserOptions}
                            register={register}
                        />
                    }

                    <div
                        className="flex xxs:flex-col sm:flex-row gap-6 items-center"
                    >
                        <p
                            className="text-xs leading-4 
                            xxs:w-full">
                            When you click "Send notification", it sends a notification to all viewers who have downloaded this app.
                            The notification would include a link to the live stream, or would let them know if Hyphonix is offline.
                        </p>

                        <Button
                            buttonType="submit"
                            buttonClassType="filled"
                            buttonText="Send notification"
                            buttonIcon="arrowRight"
                            overrideClasses="
                            ml-auto
                            xxs:w-full
                            s:w-3/12
                            sm:w-6/12 items-center"/>

                    </div>
                </form>)
        }

        if (isMinified) {
            const isHxLiveOnTwitch = appData.liveData.isHyphonixLiveOnTwitch
            const isHxLiveOnYoutube = appData.liveData.isHyphonixLiveOnYoutube
            const linkToHxTwitch = appData.liveData.linkToHyphonixTwitch
            const linkToHxYoutube = appData.liveData.linkToHyphonixYoutube
            let messageToUser = <h5 className="w-fit">Hyphonix is not streaming.</h5>
            let svg: React.ReactNode = null;

            if (isHxLiveOnTwitch) {
                svg = <SVG className="fill-twitch-500 w-4 ml-1 h-fit" type="link" />
                messageToUser = <h5 className="flex sm:flex-row xs:flex-row xxs:flex-col xxs:flex-wrap m-0 p-0">Hyphonix is currently streaming on
                    <a href={linkToHxTwitch} target="_blank"
                        className="text-twitch-500 underline flex flex-row items-center h-fit
                        lg:pl-1 md:pl-0 xs:pl-1 xxs:pl-0">
                        Twitch {svg}
                    </a>
                </h5>

            }

            if (isHxLiveOnYoutube) {
                svg = <SVG className="fill-pomegranate-500 w-4 ml-1 h-fit" type="link" />
                messageToUser = <h5 className="flex sm:flex-row xs:flex-row xxs:flex-col xxs:flex-wrap m-0 p-0">Hyphonix is currently streaming on
                    <a href={linkToHxYoutube} target="_blank"
                        className="text-pomegranate-500 underline flex flex-row items-center h-fit
                        lg:pl-1 md:pl-0 xs:pl-1 xxs:pl-0">
                        YouTube {svg}
                    </a>
                </h5>
            }

            return (
                <div
                    className="sm:flex sm:flex-row sm:justify-between sm:font-medium \
                    xxs:flex-col xxs:justify-start"
                >
                    <div
                        className="flex flex-row gap"
                    >
                        {messageToUser}
                    </div>
                    <Button
                        buttonClassType="text"
                        buttonText="Edit"
                        buttonType="button"
                        overrideClasses="w-fit text-deepBlue-500 sm:mt-0 xxs:mt-4 sm:inline-block xxs:block sm:ml-0 xxs:ml-auto"
                        onClick={() => { toggleMinified((prev) => { return !prev }) }}
                    />
                </div>
            )
        }
    }, [isMinified, currentStreamPlatform, errors])

    //Form Error handling
    if (errors.streamingOn?.type == "required") {
        toastHandler.showErrorToast("Please what platform Hyphonix is streaming on before saving", "top-right")
    }

    if (errors.streamlink?.type == "required") {
        setError("streamlink", { message: "Please enter a valid link" })
    }

    return (
        <div className="bg-white h-auto text-charlestoneGreen p-6 rounded-lg
        xxs:w-full">

            <div
                className="flex flex-row items-center justify-between w-full mb-4">
                <small>Live stream notification settings</small>
            </div>

            <AnimatePresence>
                {getForm()}
            </AnimatePresence>

        </div>
    )

}