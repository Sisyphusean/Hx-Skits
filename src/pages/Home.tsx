//React
import React from 'react';

//Components
import Navbar from '../components/Navbar';
import HomepageSkitComponent from '../components/home_page_components/HomePageSkitComponent';
import HomePageLiveIndicator from '../components/home_page_components/HomePageLiveIndicator';
import HomePageSetupLevel from '../components/home_page_components/HomePageSetupIndicator';
import HomePageTutorialCard from '../components/home_page_components/HomePageTutorialCard';

//AppDataContext
import { AppDataContext } from '../contexts/appdatacontext';

//React Hooks
import { useContext } from "react";


export default function Home() {

    const { appData } = useContext(AppDataContext)

    return (
        <div id="home" className="px-4 ">
            <Navbar />
            <div className='flex flex-row flex-wrap px-4 gap-8 h-4/6
             sm:px-32
             lg:px-52'>

                {appData.skitData.currentSkit === "none" ? ""
                    : <HomepageSkitComponent
                        marksCurrentName={appData.skitData.nameSkitData.marksCurrentName}
                        tags={appData.liveData.currentOmegleTags}
                        shouldUserGaslightTheMark={appData.skitData.nameSkitData.shouldTheMarkBeGaslight}
                    />}

                <div
                    className='w-full flex gap-8 flex-col-reverse
                    md:flex-col
                    lg:flex-row'>
                    <HomePageLiveIndicator
                        isHyphonixLiveOnTwitch={appData.liveData.isHyphonixLiveOnTwitch}
                        linkToHyphonixTwitch={appData.liveData.linkToHyphonixTwitch}
                        isHyphonixLiveOnYoutube={appData.liveData.isHyphonixLiveOnYoutube}
                        linkToHyphonixYoutube={appData.liveData.linkToHyphonixYoutube}
                    />
                    <HomePageSetupLevel />
                </div>

                <div
                    className=''>
                    <HomePageTutorialCard />
                </div>

            </div>
        </div>
    )
}