/**
 * @description This page makes an internal API call, figures out which platform Hyphonix is live on 
 * (if he is live) and returns links to his youtube and twitch. if he isn't live it returns a link to his discord.
 * @returns HomePageLiveIndicator Component
 */

//import homePageLiveIndicatorProps
import { homePageLiveIndicatorProps } from "../../interfaces/propinterfaces"

//React hooks
import { useCallback } from 'react';

export default function HomePageLiveIndicator({ isHyphonixLiveOnTwitch, isHyphonixLiveOnYoutube }: homePageLiveIndicatorProps) {

    const openLiveLinkOnClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        if (isHyphonixLiveOnTwitch && !isHyphonixLiveOnYoutube) {
            window.open(import.meta.env.VITE_HYPHONIX_TWITCH, '_blank')
        }

        if (isHyphonixLiveOnYoutube && !isHyphonixLiveOnTwitch) {
            window.open(import.meta.env.VITE_HYPHONIX_YOUTUBE, '_blank')
        }
    }, [])


    /**
     * @description This function returns a string that describes what platform Hyphonix is live on (if he is live)
     * @param platform This is the platform that Hyphonix is currently live
     * @returns A string that describes what platform Hyphonix is live on (if he is live)
     */
    function getPlatformText() {
        if (isHyphonixLiveOnYoutube) {
            return 'Hyphonix is currently live on Youtube'
        }

        if (isHyphonixLiveOnTwitch) {
            return 'Hyphonix is currently live on Twitch'
        }

        if (!isHyphonixLiveOnTwitch && !isHyphonixLiveOnYoutube) {
            return 'Hyphonix is NOT live'
        }
    }

    return (
        <div className="flex flex-col bg-white p-8 rounded-md text-charlestoneGreen w-full h-auto" >
            <div className="flex flex-row gap-2 items-start">
                <img
                    src={`${(isHyphonixLiveOnTwitch || isHyphonixLiveOnYoutube) ? './assets/liveIndicatorTrue.svg' : './assets/liveIndicatorFalse.svg'}`}
                    alt={`${(isHyphonixLiveOnTwitch || isHyphonixLiveOnYoutube) ? 'liveIndicatorTrue' : 'liveIndicatorFalse'}`}
                    title="Live indicator"
                />
                <h4
                    className="font-bold text-lg">
                    {getPlatformText()}
                </h4>
            </div>

            <div className="mt-4">
                {isHyphonixLiveOnYoutube

                    ? <a
                        onClick={openLiveLinkOnClick}
                        href="">
                        <button
                            id="youtubeButton"
                            type="button"
                            className='transition flex flex-row items-center text-white p-4 border border-pomegranate-500 
                            rounded-md bg-pomegranate-500
                            hover:text-white hover:font-bold hover:bg-pomegranate-400 hover:scale-105
                            active:text-white active:font-bold active:bg-pomegranate-500 active:scale-95'>
                            Watch him live on Youtube!

                            <img
                                src="assets/youtubeIcon.svg"
                                className="pl-4"
                            />
                        </button>
                    </a>

                    : <div className="m-0 p-0"></div>}

                {isHyphonixLiveOnTwitch

                    ? <a
                        onClick={openLiveLinkOnClick}>
                        <button
                            id="twitchButton"
                            type="button"
                            className='transition flex flex-row items-center text-white p-4 border border-twitch-300 
                            rounded-md bg-twitch-500 
                            hover:text-white hover:font-bold hover:bg-twitch-400 hover:scale-105
                            active:text-white active:font-bold active:bg-twitch-500 active:scale-95'>
                            Watch him live on Twitch!

                            <img
                                src="assets/twitchIcon.svg"
                                className="pl-4"
                            />
                        </button>
                    </a>

                    : <div className="m-0 p-0"></div>}

                {(!isHyphonixLiveOnTwitch && !isHyphonixLiveOnYoutube)

                    ? <a
                        target='_blank' rel='noopener noreferrer'
                        className="flex flex-row"
                        href="">
                        <img
                            className="mr-4"
                            src="/assets/hyphonixFace.svg"
                            title="Hyhonix's derpy face"
                            alt="Hyphonix's derpy face"
                        />
                        <button
                            id="discordButton"
                            type="button"
                            className='transition flex flex-row items-center text-white p-4 border border-discord-400 
                            rounded-md bg-discord-500
                            hover:text-white hover:font-bold hover:bg-discord-400 hover:scale-105
                            active:text-white active:font-bold active:bg-discord-500 active:scale-95'>
                            Join his Discord!

                            <img
                                src="assets/discordIcon.svg"
                                className="pl-4"
                            />
                        </button>
                    </a>
                    : <div className="m-0 p-0"></div>}

            </div>
        </div>
    )
}