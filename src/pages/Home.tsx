//React
import React from 'react';

//Components
import Navbar from '../components/Navbar';
import HomepageSkitComponent from '../components/home_page_components/HomePageSkitComponent';
import HomePageLiveIndicator from '../components/home_page_components/HomePageLiveIndicator';
import HomePageSetupLevel from '../components/home_page_components/HomePageSetupIndicator';
import HomePageTutorialCard from '../components/home_page_components/HomePageTutorialCard';


export default function Home() {
    //Boolean used to determine if the user should gaslgight the marks
    let shouldUserGaslightTheMark: boolean = false
    let currentName: string = "Richard"
    let tags: string[] = ["Marcus", 'Darkviper Au', "Say", "Barons", "Going", "Richelle"]

    return (
        <div id="home" className="px-4 ">
            <Navbar/>
            <div className='flex flex-row flex-wrap px-4 gap-8 h-4/6
             sm:px-32
             lg:px-52'>
                <HomepageSkitComponent
                    marksCurrentName={currentName}
                    tags={tags}
                    shouldUserGaslightTheMark={shouldUserGaslightTheMark}
                />

                <div
                    className='w-full flex gap-8 flex-col-reverse
                    md:flex-col
                    lg:flex-row'>
                    <HomePageLiveIndicator />
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