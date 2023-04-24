//React
import React from 'react';

//Components
import Navbar from '../components/Navbar';
import HomepageSkitComponent from '../components/HomePageSkitComponent';
import HomePageLiveIndicator from '../components/HomePageLiveIndicator';
import HomePageSetupLevel from '../components/HomePageSetupIndicator';
import HomePageTutorialCard from '../components/HomePageTutorialCard';


export default function Home() {
    //Boolean used to determine if the user should gaslgight the marks
    let shouldUserGaslightTheMark: boolean = false
    let currentName: string = "Richard"
    let tags: string[] = ["Marcus", 'Darkviper Au', "Say", "Barons", "Going", "Richelle"]

    return (
        <div className="px-4">
            <Navbar userType='admin' />

            <div className='flex flex-col flex-wrap px-4 gap-8
             sm:px-32
             lg:px-52'>
                <HomepageSkitComponent
                    marksCurrentName={currentName}
                    tags={tags}
                    shouldUserGaslightTheMark={shouldUserGaslightTheMark}
                />

                <div
                    className='
                    flex gap-8 flex-col-reverse
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